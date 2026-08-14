"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export const faqs = [
  [
    "Which areas do you deliver to?",
    "We deliver across Indore, Madhya Pradesh, and connect businesses to major cities across India.",
  ],
  [
    "How can I track my shipment?",
    "Enter your tracking ID above or use your live dashboard to follow every handoff in real time.",
  ],
  [
    "Do you support business accounts?",
    "Yes. Patel Technology supports growing teams with bulk bookings, COD workflows, APIs, and dedicated support.",
  ],
  [
    "What makes Patel Technology different?",
    "We combine local logistics expertise with the calm, transparent software experience modern businesses expect.",
  ],
];

export function FAQ() {
  const [active, setActive] = useState(0);
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-layout">
        <div>
          <div className="eyebrow blue-eyebrow">Questions, answered</div>
          <h2>
            Good to know.
            <br />
            <em>Better to ask.</em>
          </h2>
          <p>
            Can&apos;t find what you&apos;re looking for? Our team is always
            happy to help.
          </p>
          <a className="text-link" href="#contact">
            Talk to our team <ArrowRight size={14} />
          </a>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <div
              className={`faq-item ${active === index ? "faq-active" : ""}`}
              key={question}
            >
              <button
                onClick={() => setActive(active === index ? -1 : index)}
                aria-expanded={active === index}
              >
                <span>{question}</span>
                <span className="faq-plus">{active === index ? "−" : "+"}</span>
              </button>
              {active === index && <p>{answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
