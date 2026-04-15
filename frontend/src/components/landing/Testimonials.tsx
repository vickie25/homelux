import React from 'react';
import { TESTIMONIALS } from '../../data/mockData';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-heading">Real Stories, Real Smiles</h2>
          <p className="text-gray-500 font-light max-w-xl mx-auto">
            What our community says about their Homelux experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 relative">
          {/* Decorative Quote Mark */}
          <Quote className="absolute -top-10 -left-10 w-40 h-40 text-gray-50 opacity-10 -z-10" />
          
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#FDFBF7] p-10 rounded-[3rem] space-y-8 relative group"
            >
              <div className="flex text-accent gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              
              <p className="text-xl text-gray-700 font-light italic leading-relaxed">
                "{testimonial.feedback}"
              </p>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatarUrl}
                  alt={testimonial.userName}
                  className="w-16 h-16 rounded-2xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.userName}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const NewsletterSection: React.FC = () => {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden relative min-h-[500px] flex items-center p-12 bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1616489953149-8646b149b5ae?q=80&w=2070&auto=format&fit=crop"
          alt="Newsletter"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 max-w-xl space-y-8 text-white">
          <h2 className="text-5xl font-heading">Come See & Feel the Difference</h2>
          <p className="text-gray-300 text-lg font-light leading-relaxed">
            Subscribe to our newsletter for exclusive collections, home decor tips, and 10% off your first order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-4 text-white placeholder-white/60 focus:ring-2 focus:ring-accent outline-none"
            />
            <button className="btn-accent-custom whitespace-nowrap">Subscribe Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};
