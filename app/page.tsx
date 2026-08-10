"use client";

import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  Box,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  Globe2,
  Menu,
  MapPin,
  Package,
  Play,
  Route,
  ScanLine,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Truck,
  Users,
  X,
  Zap,
} from "lucide-react";
import { DeliveryAnimation } from "../components/delivery-animation";
import { EstimateForm } from "../components/estimate-form";

const services = [
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

const faqs = [
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

function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function Button({
  children,
  variant = "primary",
  href = "/login",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  className?: string;
}) {
  return (
    <a className={`button button-${variant} ${className}`} href={href}>
      {children}
      <ArrowRight size={16} />
    </a>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav-wrap">
      <nav className="container nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Patel Technology home">
          <LogoMark />
          <span>
            Patel <b>Technology</b>
          </span>
        </a>
        <div className={`nav-links ${open ? "nav-open" : ""}`}>
          <a href="/register/enterprise" onClick={() => setOpen(false)}>
            For enterprise
          </a>
          <a href="/register/partner" onClick={() => setOpen(false)}>
            Delivery partners
          </a>
          <div className="mobile-actions">
            
            <Button href="/login">Get started</Button>
          </div>
        </div>
        <div className="nav-actions">
         
          <Button href="/login">Log in</Button>
        </div>
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
    </header>
  );
}

function Hero() {
  const [tracking, setTracking] = useState("");
  const [message, setMessage] = useState("");
  function track() {
    setMessage(
      tracking.trim()
        ? `Tracking ${tracking.trim()} — your shipment is on the way.`
        : "Enter a tracking ID to get started.",
    );
  }
  return (
    <section className="hero section-grid" id="top">
      <div className="container hero-layout">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" /> Logistics, elevated{" "}
            <span className="eyebrow-line" />
          </div>
          <h1>
            Move what <em>matters.</em>
            <br />
            Move it <span>better.</span>
          </h1>
          <p className="hero-lede">
            Technology-led delivery solutions for businesses that refuse to
            compromise on speed, visibility, or care.
          </p>
          <div className="hero-actions">
            <Button href="#contact">Ship with confidence</Button>
            <a className="watch-link" href="#how-it-works">
              <span className="play-icon">
                <Play size={13} fill="currentColor" />
              </span>{" "}
              See how it works
            </a>
          </div>
          <div className="trust-row">
            <div className="avatar-stack">
              <span>AK</span>
              <span>RS</span>
              <span>PM</span>
              <span>+7k</span>
            </div>
            <div>
              <div className="stars">★★★★★</div>
              <p>Trusted by 7,000+ businesses</p>
            </div>
          </div>
        </div>
        <div
          className="hero-visual"
          aria-label="Live delivery dashboard preview"
        >
          <div className="dashboard-window">
            <div className="window-bar">
              <span className="traffic">
                <i />
                <i />
                <i />
              </span>
              <span className="window-title">
                <span className="live-dot" /> Live operations
              </span>
              <span className="window-time">08:42 AM · IN</span>
            </div>
            <div className="dashboard-body">
              <div className="map-panel">
                <div className="map-label label-one">
                  <MapPin size={12} /> Vijay Nagar <b>08:58</b>
                </div>
                <div className="map-label label-two">
                  <MapPin size={12} /> Rajwada <b>09:14</b>
                </div>
                <div className="map-label label-three">
                  <MapPin size={12} /> Bicholi <b>09:31</b>
                </div>
                <svg
                  className="route-map"
                  viewBox="0 0 500 320"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M24 265 C80 210 80 170 150 190 S220 230 270 135 S345 95 455 42" />
                  <path d="M35 30 C120 75 120 130 210 118 S340 160 460 255" />
                </svg>
                <div className="map-pulse pulse-a" />
                <div className="map-pulse pulse-b" />
                <div className="map-pulse pulse-c" />
                <div className="map-center">
                  <LogoMark />
                  <span>
                    patel
                    <br />
                    central
                  </span>
                </div>
                <div className="map-legend">
                  <span>
                    <i className="blue-dot" /> In transit
                  </span>
                  <span>
                    <i className="orange-dot" /> Delivered
                  </span>
                </div>
              </div>
              <div className="metrics-panel">
                <div className="mini-heading">
                  Today <ChevronDown size={13} />
                </div>
                <div className="metric">
                  <span>Active shipments</span>
                  <strong>1,284</strong>
                  <small>+18.4%</small>
                </div>
                <div className="metric">
                  <span>On-time rate</span>
                  <strong>98.6%</strong>
                  <small>+2.1%</small>
                </div>
                <div className="chart">
                  <div className="chart-head">
                    <span>Delivery volume</span>
                    <b>892</b>
                  </div>
                  <div className="bars">
                    {[32, 48, 42, 70, 55, 82, 68, 92, 74, 100, 88, 96].map(
                      (height, i) => (
                        <i key={i} style={{ height: `${height}%` }} />
                      ),
                    )}
                  </div>
                  <div className="chart-labels">
                    <span>6 AM</span>
                    <span>12 PM</span>
                    <span>6 PM</span>
                  </div>
                </div>
                <div className="status-card">
                  <span className="status-icon">
                    <BadgeCheck size={15} />
                  </span>
                  <span>
                    <b>All systems go</b>
                    <small>Network operating normally</small>
                  </span>
                  <span className="status-check">
                    <Check size={14} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="floating-card card-delivered">
            <span className="floating-icon orange">
              <Check size={15} />
            </span>
            <span>
              <b>Delivered</b>
              <small>PT-2048 · Just now</small>
            </span>
          </div>
          <div className="floating-card card-speed">
            <Zap size={16} />
            <span>
              <b>18 min</b>
              <small>Average dispatch</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}



function Services() {
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




function Platform() {
  return (
    <section className="section platform-section">
      <div className="container platform-layout">
        <div className="platform-copy">
          <div className="eyebrow blue-eyebrow">Your command center</div>
          <h2>
            Everything you need.
            <br />
            <em>Nothing you don&apos;t.</em>
          </h2>
          <p>
            See every order, route, and delivery in one beautifully simple
            dashboard. Built for humans, powerful enough for scale.
          </p>
          <div className="platform-list">
            <span>
              <BarChart3 size={18} />
              <b>Know what&apos;s happening</b>
              <small>Live performance analytics</small>
            </span>
            <span>
              <Bell size={18} />
              <b>Stay ahead of issues</b>
              <small>Proactive delay notifications</small>
            </span>
            <span>
              <Code2 size={18} />
              <b>Connect your stack</b>
              <small>Simple, flexible API access</small>
            </span>
          </div>
          <Button href="#contact">Explore the platform</Button>
        </div>
        <div className="platform-preview">
          <DeliveryAnimation />
        </div>
      </div>
    </section>
  );
}


function FAQ() {
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

function CTA() {
  return (
    <section className="cta-section" id="contact">
      <div className="container cta-inner">
        <div className="cta-orbit orbit-one" />
        <div className="cta-orbit orbit-two" />
        <div className="eyebrow light-eyebrow">
          <span className="eyebrow-dot" /> Your next move starts here
        </div>
        <h2>
          Ready to move
          <br />
          <em>better?</em>
        </h2>
        <p>
          Join thousands of businesses building what&apos;s next with Patel
          Technology.
        </p>
        <div className="cta-actions">
          <Button href="mailto:hello@pateltechnology.in">
            Start shipping today
          </Button>
          <a href="mailto:hello@pateltechnology.in" className="cta-contact">
            Talk to a human <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <a className="brand footer-brand" href="#top">
              <LogoMark />
              <span>
                Patel <b>Technology</b>
              </span>
            </a>
            <p>
              Technology-led logistics
              <br />
              for the way business moves.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <b>Company</b>
              <a href="#about">About us</a>
              <a href="#contact">Careers</a>
              <a href="#contact">Contact</a>
            </div>
            <div>
              <b>Solutions</b>
              <a href="#services">Delivery</a>
              <a href="#services">B2B logistics</a>
              <a href="#services">Platform</a>
            </div>
            <div>
              <b>Connect</b>
              <a href="mailto:hello@pateltechnology.in">Email us</a>
              <a href="#contact">LinkedIn</a>
              <a href="#contact">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Patel Technology. All rights reserved.</span>
          <span>
            Made for the move <span className="orange-heart">●</span>
          </span>
          <span>
            <a href="#contact">Privacy</a> · <a href="#contact">Terms</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <EstimateForm />
      <Services />
      <Platform />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
