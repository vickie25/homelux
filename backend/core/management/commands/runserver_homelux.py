"""
Custom management command: runserver_homelux
Checks database connectivity and prints branded startup messages before
delegating to the standard Django runserver command.
"""
from django.core.management.commands.runserver import Command as RunserverCommand
from django.db import connection


CYAN    = "\033[96m"
GREEN   = "\033[92m"
YELLOW  = "\033[93m"
RED     = "\033[91m"
BOLD    = "\033[1m"
RESET   = "\033[0m"

BANNER = f"""
{CYAN}{BOLD}
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║          ██╗  ██╗ ██████╗ ███╗   ███╗███████╗           ║
║          ██║  ██║██╔═══██╗████╗ ████║██╔════╝           ║
║          ███████║██║   ██║██╔████╔██║█████╗             ║
║          ██╔══██║██║   ██║██║╚██╔╝██║██╔══╝             ║
║          ██║  ██║╚██████╔╝██║ ╚═╝ ██║███████╗           ║
║          ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝           ║
║                                                          ║
║              L U X   A D M I N   E N G I N E            ║
╚══════════════════════════════════════════════════════════╝
{RESET}"""


def check_database():
    """Try to open a cursor. Returns (ok: bool, message: str)."""
    try:
        connection.ensure_connection()
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        db_name = connection.settings_dict.get("NAME", "unknown")
        db_engine = connection.settings_dict.get("ENGINE", "").split(".")[-1]
        return True, f"{db_engine.upper()} › {db_name}"
    except Exception as exc:
        return False, str(exc)


class Command(RunserverCommand):
    help = "Homelux branded runserver with DB health check"

    def execute(self, *args, **options):
        print(BANNER)

        # Database check
        db_ok, db_info = check_database()
        if db_ok:
            print(f"  {GREEN}{BOLD}✔  DATABASE CONNECTED{RESET}  {CYAN}{db_info}{RESET}")
        else:
            print(f"  {RED}{BOLD}✘  DATABASE ERROR:{RESET}  {db_info}")
            print(f"  {YELLOW}  Server will start but API calls may fail.{RESET}")

        print()
        super().execute(*args, **options)

    def inner_run(self, *args, **options):
        # Called just before the actual HTTP listener starts
        addr   = options.get("addrport") or f"{self.addr}:{self.port}"
        print(f"  {GREEN}{BOLD}✔  SERVER RUNNING SUCCESSFULLY{RESET}")
        print(f"  {CYAN}   Local:   http://{addr}/{RESET}")
        print(f"  {CYAN}   Admin:   http://{addr}/admin/{RESET}")
        print(f"  {CYAN}   API:     http://{addr}/api/{RESET}")
        print()
        super().inner_run(*args, **options)
