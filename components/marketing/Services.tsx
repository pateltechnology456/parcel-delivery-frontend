"use client";

import { ArrowRight, Truck, Route, Box, Smartphone } from "lucide-react";

export const services = [
  {
    icon: Truck,
    title: "Same-day delivery",
    text: "Fast, reliable doorstep delivery across Indore and beyond.",
    accent: "orange",
  },
  {
    icon: Route,
    title: "Intercity express",
    text: "Move parcels between cities with complete visibility at every mile.",
    accent: "blue",
  },
  {
    icon: Box,
    title: "B2B logistics",
    text: "Scalable freight workflows built around your business rhythm.",
    accent: "blue",
  },
  {
    icon: Smartphone,
    title: "Tech-enabled shipping",
    text: "One control center for orders, drivers, alerts, and analytics.",
    accent: "orange",
  },
];

export function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow blue-eyebrow">What we do</div>
            <h2>
              Built for the pace
              <br />
              of <em>modern business.</em>
            </h2>
          </div>
          <p>
            From your first order to your thousandth route, our technology and
            people keep every delivery moving forward.
          </p>
        </div>
        <div className="service-grid">
          {services.map(({ icon: Icon, title, text, accent }) => (
            <article className="service-card" key={title}>
              <div className={`service-icon ${accent}`}>
                <Icon size={22} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href="#contact">
                Explore solution <ArrowRight size={14} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
