"use client";

import { ArrowRight, Truck, Route, Box, Smartphone, Zap, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const services = [
  {
    icon: Truck,
    badge: "Hyperlocal Express",
    title: "Same-Day Doorstep Delivery",
    text: "Fast & reliable pickup in under 15 minutes. Best for food, medicines, urgent documents, and local retail.",
    tag: "⚡ Within 2 Hours",
    accent: "#ff6b2c",
    bgAccent: "rgba(255, 107, 44, 0.08)",
    link: "/fare-estimate"
  },
  {
    icon: Route,
    badge: "Pan-India Network",
    title: "Intercity Express Cargo",
    text: "Move parcels and freight across Indore, Bhopal, Mumbai, Delhi & beyond with end-to-end GPS visibility.",
    tag: "🗺️ 25+ Cities",
    accent: "#1154d9",
    bgAccent: "rgba(17, 84, 217, 0.08)",
    link: "/fare-estimate"
  },
  {
    icon: Box,
    badge: "Enterprise B2B",
    title: "Dedicated B2B Freight & COD",
    text: "Custom logistics workflows, bulk booking discounts, COD remittance within 24 hours, and assigned account managers.",
    tag: "🏢 For Businesses",
    accent: "#7957d8",
    bgAccent: "rgba(121, 87, 216, 0.08)",
    link: "/register/enterprise"
  },
  {
    icon: Smartphone,
    badge: "Smart Platform",
    title: "Tech-Enabled Control Center",
    text: "One unified dashboard for live driver tracking, OTP verification, instant digital Proof-of-Delivery, and webhook APIs.",
    tag: "📊 Real-time Dashboard",
    accent: "#2dbb76",
    bgAccent: "rgba(45, 187, 118, 0.08)",
    link: "/login"
  },
];

export function Services() {
  return (
    <section className="services-section" id="services" style={{ padding: '80px 20px', background: '#ffffff' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 50px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '99px',
            background: 'rgba(17, 84, 217, 0.08)',
            color: '#1154d9',
            fontSize: '12px',
            fontWeight: 700,
            marginBottom: '12px'
          }}>
            <Sparkles size={13} />
            LOGISTICS SOLUTIONS
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 800,
            color: '#0b2a62',
            letterSpacing: '-0.03em',
            margin: '0 0 14px'
          }}>
            Built for the speed of modern commerce
          </h2>
          <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
            From single-parcel urgent deliveries to scalable enterprise bulk supply chains — we keep your business moving forward.
          </p>
        </div>

        {/* Services 4-Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          {services.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                whileHover={{ y: -6, boxShadow: '0 20px 35px -10px rgba(11, 42, 98, 0.09)' }}
                transition={{ duration: 0.2 }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '20px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '14px',
                      background: item.bgAccent,
                      color: item.accent,
                      display: 'grid',
                      placeItems: 'center'
                    }}>
                      <Icon size={26} />
                    </div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: item.accent,
                      background: item.bgAccent,
                      padding: '4px 10px',
                      borderRadius: '99px'
                    }}>
                      {item.tag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0b2a62', margin: '0 0 10px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.55, margin: '0 0 20px' }}>
                    {item.text}
                  </p>
                </div>

                <Link
                  href={item.link}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: item.accent,
                    textDecoration: 'none'
                  }}
                >
                  Explore Solution <ArrowRight size={14} />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

