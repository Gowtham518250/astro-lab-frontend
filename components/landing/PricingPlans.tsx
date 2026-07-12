"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for exploring our catalog and learning the basics.",
    features: [
      "Access to 100+ free courses",
      "Community forum access",
      "Basic learning paths",
      "Ad-supported experience"
    ],
    buttonText: "Start for Free",
    buttonUrl: "/register",
    popular: false
  },
  {
    name: "Plus",
    price: "39",
    description: "Everything you need to master new skills and get certified.",
    features: [
      "Everything in Free",
      "Unlimited course access",
      "Verified certificates",
      "Interactive coding environments",
      "Ad-free experience"
    ],
    buttonText: "Start 7-Day Free Trial",
    buttonUrl: "/register?plan=plus",
    popular: true
  },
  {
    name: "Enterprise",
    price: "99",
    description: "Empower your entire team with unlimited learning.",
    features: [
      "Everything in Plus",
      "Custom learning paths",
      "Admin reporting dashboard",
      "1-on-1 expert mentorship",
      "Dedicated success manager"
    ],
    buttonText: "Contact Sales",
    buttonUrl: "#",
    popular: false
  }
];

export default function PricingPlans() {
  return (
    <section id="business" className="py-24 bg-[var(--color-background-alt)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary)]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Choose the plan that best fits your learning goals. No hidden fees.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`relative rounded-3xl p-8 flex flex-col ${
                plan.popular 
                  ? 'bg-gradient-to-b from-[var(--color-primary)]/20 to-[var(--color-background)] border-2 border-[var(--color-primary)] shadow-[0_0_30px_rgba(124,92,255,0.3)] transform md:-translate-y-4' 
                  : 'glass-panel'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-primary)] text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-sm text-gray-400 mb-6 min-h-[40px]">{plan.description}</p>
              
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">${plan.price}</span>
                {plan.price !== "0" && <span className="text-gray-400 font-medium">/month</span>}
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-[var(--color-secondary)]' : 'text-gray-400'}`} />
                    <span className="text-sm text-gray-300 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href={plan.buttonUrl}
                className={`w-full py-3.5 rounded-full text-center font-bold transition-all ${
                  plan.popular 
                    ? 'bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white shadow-[0_0_20px_rgba(124,92,255,0.4)] hover:shadow-[0_0_30px_rgba(76,201,240,0.6)] hover:-translate-y-0.5' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
