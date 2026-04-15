import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white">
      {/* Final CTA Bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-4xl font-heading">Your Dream Space is Waiting</h2>
            <p className="text-gray-400 font-light">Join 10,000+ happy customers who transformed their homes with Homelux.</p>
          </div>
          <div className="flex gap-4">
            <button className="btn-accent-custom flex items-center gap-2 group">
              Start Shopping <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
            </button>
            <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <div className="text-3xl font-heading font-extrabold flex items-baseline">
            <span className="text-white tracking-tighter">Home</span>
            <span className="text-accent italic tracking-tighter">LuX</span>
          </div>
          <p className="text-gray-400 font-light leading-relaxed">
            Crafting premium interiors with confidence and care. Our mission is to transform every living space into a masterpiece of comfort and style.
          </p>
          <div className="flex gap-4">
            {[
              { label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
              { label: 'Instagram', path: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01' },
              { label: 'Twitter', path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
              { label: 'Youtube', path: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.46-5.58z' }
            ].map((social, i) => (
              <a 
                key={i} 
                href="#" 
                aria-label={`Follow us on ${social.label}`}
                className="p-2 bg-white/5 rounded-lg hover:bg-accent transition-all text-white group"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 transition-transform group-hover:scale-110"
                >
                  <path d={social.path} />
                  {social.label === 'Instagram' && <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />}
                  {social.label === 'Youtube' && <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold">Quick Links</h4>
          <ul className="space-y-4 text-gray-400">
            {['Home', 'Shop All', 'Collections', 'Design Services', 'Showrooms'].map((item) => (
              <li key={item}><a href="#" className="hover:text-accent transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold">Customer Support</h4>
          <ul className="space-y-4 text-gray-400">
            {['Shipping Policy', 'Returns & Refunds', 'Privacy Policy', 'Terms of Service', 'FAQ'].map((item) => (
              <li key={item}><a href="#" className="hover:text-accent transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold">Our Newsletter</h4>
          <p className="text-gray-400 text-sm">Be the first to know about new arrivals and exclusive offers.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 flex-1 outline-none focus:border-accent"
            />
            <button 
              aria-label="Subscribe to Newsletter"
              className="bg-accent p-2 rounded-lg text-white hover:bg-accent/90 cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 HomeLux. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50 contrast-0 grayscale invert" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-50 contrast-0 grayscale invert" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4 opacity-50 contrast-0 grayscale invert" />
          </div>
        </div>
      </div>
    </footer>
  );
};
