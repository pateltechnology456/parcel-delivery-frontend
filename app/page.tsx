'use client'

import { useState } from 'react'
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
} from 'lucide-react'

const services = [
  { icon: Truck, title: 'Same-day delivery', text: 'Fast, reliable doorstep delivery across Indore and beyond.', accent: 'orange' },
  { icon: Route, title: 'Intercity express', text: 'Move parcels between cities with complete visibility at every mile.', accent: 'blue' },
  { icon: Box, title: 'B2B logistics', text: 'Scalable freight workflows built around your business rhythm.', accent: 'blue' },
  { icon: Smartphone, title: 'Tech-enabled shipping', text: 'One control center for orders, drivers, alerts, and analytics.', accent: 'orange' },
]

const faqs = [
  ['Which areas do you deliver to?', 'We deliver across Indore, Madhya Pradesh, and connect businesses to major cities across India.'],
  ['How can I track my shipment?', 'Enter your tracking ID above or use your live dashboard to follow every handoff in real time.'],
  ['Do you support business accounts?', 'Yes. Patel Technology supports growing teams with bulk bookings, COD workflows, APIs, and dedicated support.'],
  ['What makes Patel Technology different?', 'We combine local logistics expertise with the calm, transparent software experience modern businesses expect.'],
]

function LogoMark() {
  return <span className="logo-mark" aria-hidden="true"><span /><span /><span /></span>
}

function Button({ children, variant = 'primary', href = '#contact', className = '' }: { children: React.ReactNode; variant?: 'primary' | 'secondary' | 'ghost'; href?: string; className?: string }) {
  return <a className={`button button-${variant} ${className}`} href={href}>{children}<ArrowRight size={16} /></a>
}

function Navbar() {
  const [open, setOpen] = useState(false)
  return <header className="nav-wrap">
    <nav className="container nav" aria-label="Main navigation">
      <a className="brand" href="#top" aria-label="Patel Technology home"><LogoMark /><span>Patel <b>Technology</b></span></a>
      <div className={`nav-links ${open ? 'nav-open' : ''}`}>
        <a href="#services" onClick={() => setOpen(false)}>Solutions</a>
        <a href="#how-it-works" onClick={() => setOpen(false)}>How it works</a>
        <a href="#about" onClick={() => setOpen(false)}>Why Patel</a>
        <a href="#faq" onClick={() => setOpen(false)}>Resources</a>
        <div className="mobile-actions"><Button variant="secondary" href="#contact">Log in</Button><Button href="#contact">Get started</Button></div>
      </div>
      <div className="nav-actions"><a href="#contact" className="login-link">Log in</a><Button href="#contact">Get started</Button></div>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
    </nav>
  </header>
}

function Hero() {
  const [tracking, setTracking] = useState('')
  const [message, setMessage] = useState('')
  function track() { setMessage(tracking.trim() ? `Tracking ${tracking.trim()} — your shipment is on the way.` : 'Enter a tracking ID to get started.') }
  return <section className="hero section-grid" id="top">
    <div className="container hero-layout">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot" /> Logistics, elevated <span className="eyebrow-line" /></div>
        <h1>Move what <em>matters.</em><br />Move it <span>better.</span></h1>
        <p className="hero-lede">Technology-led delivery solutions for businesses that refuse to compromise on speed, visibility, or care.</p>
        <div className="hero-actions"><Button href="#contact">Ship with confidence</Button><a className="watch-link" href="#how-it-works"><span className="play-icon"><Play size={13} fill="currentColor" /></span> See how it works</a></div>
        <div className="trust-row"><div className="avatar-stack"><span>AK</span><span>RS</span><span>PM</span><span>+7k</span></div><div><div className="stars">★★★★★</div><p>Trusted by 7,000+ businesses</p></div></div>
      </div>
      <div className="hero-visual" aria-label="Live delivery dashboard preview">
        <div className="dashboard-window">
          <div className="window-bar"><span className="traffic"><i /><i /><i /></span><span className="window-title"><span className="live-dot" /> Live operations</span><span className="window-time">08:42 AM · IN</span></div>
          <div className="dashboard-body">
            <div className="map-panel"><div className="map-label label-one"><MapPin size={12} /> Vijay Nagar <b>08:58</b></div><div className="map-label label-two"><MapPin size={12} /> Rajwada <b>09:14</b></div><div className="map-label label-three"><MapPin size={12} /> Bicholi <b>09:31</b></div><svg className="route-map" viewBox="0 0 500 320" preserveAspectRatio="none" aria-hidden="true"><path d="M24 265 C80 210 80 170 150 190 S220 230 270 135 S345 95 455 42" /><path d="M35 30 C120 75 120 130 210 118 S340 160 460 255" /></svg><div className="map-pulse pulse-a" /><div className="map-pulse pulse-b" /><div className="map-pulse pulse-c" /><div className="map-center"><LogoMark /><span>patel<br />central</span></div><div className="map-legend"><span><i className="blue-dot" /> In transit</span><span><i className="orange-dot" /> Delivered</span></div></div>
            <div className="metrics-panel"><div className="mini-heading">Today <ChevronDown size={13} /></div><div className="metric"><span>Active shipments</span><strong>1,284</strong><small>+18.4%</small></div><div className="metric"><span>On-time rate</span><strong>98.6%</strong><small>+2.1%</small></div><div className="chart"><div className="chart-head"><span>Delivery volume</span><b>892</b></div><div className="bars">{[32,48,42,70,55,82,68,92,74,100,88,96].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div><div className="chart-labels"><span>6 AM</span><span>12 PM</span><span>6 PM</span></div></div><div className="status-card"><span className="status-icon"><BadgeCheck size={15} /></span><span><b>All systems go</b><small>Network operating normally</small></span><span className="status-check"><Check size={14} /></span></div></div>
          </div>
        </div>
        <div className="floating-card card-delivered"><span className="floating-icon orange"><Check size={15} /></span><span><b>Delivered</b><small>PT-2048 · Just now</small></span></div><div className="floating-card card-speed"><Zap size={16} /><span><b>18 min</b><small>Average dispatch</small></span></div>
      </div>
    </div>
    <div className="container tracking-box"><div className="tracking-copy"><ScanLine size={21} /><div><b>Track your shipment</b><span>Real-time updates, right when you need them.</span></div></div><div className="tracking-form"><label className="sr-only" htmlFor="tracking">Tracking ID</label><input id="tracking" value={tracking} onChange={e => setTracking(e.target.value)} placeholder="Enter tracking ID" onKeyDown={e => e.key === 'Enter' && track()} /><button onClick={track}>Track package <ArrowRight size={15} /></button></div>{message && <p className="tracking-message" role="status">{message}</p>}</div>
  </section>
}

function LogoStrip() { return <section className="logo-strip"><div className="container logo-strip-inner"><span>THE LOGISTICS PARTNER FOR</span><div className="client-logos"><b>Northstar</b><b className="logo-serif">ORBIT</b><b className="logo-mono">NEXUS</b><b>parcel<span>pro</span></b><b className="logo-serif">CARTFLOW</b></div></div></section> }

function Services() { return <section className="section services-section" id="services"><div className="container"><div className="section-heading"><div><div className="eyebrow blue-eyebrow">What we do</div><h2>Built for the pace<br />of <em>modern business.</em></h2></div><p>From your first order to your thousandth route, our technology and people keep every delivery moving forward.</p></div><div className="service-grid">{services.map(({ icon: Icon, title, text, accent }) => <article className="service-card" key={title}><div className={`service-icon ${accent}`}><Icon size={22} /></div><h3>{title}</h3><p>{text}</p><a href="#contact">Explore solution <ArrowRight size={14} /></a></article>)}</div></div></section> }

function HowItWorks() { return <section className="section workflow-section" id="how-it-works"><div className="container"><div className="section-heading centered"><div><div className="eyebrow blue-eyebrow">The simple way to ship</div><h2>Less chasing.<br /><em>More moving.</em></h2></div><p>Our platform turns logistics from a daily fire drill into a competitive advantage.</p></div><div className="workflow-grid">{[['01', Package, 'Create a shipment', 'Tell us where it needs to go. We handle the rest.'], ['02', Route, 'We route it smarter', 'Our network finds the fastest, most efficient path.'], ['03', BadgeCheck, 'They get it. You know.', 'Real-time proof of delivery, without the follow-ups.']].map(([number, Icon, title, text]) => <div className="workflow-step" key={number as string}><div className="step-number">{number as string}</div><div className="step-icon"><Icon size={23} /></div><h3>{title as string}</h3><p>{text as string}</p>{number !== '03' && <div className="step-connector"><ArrowRight size={16} /></div>}</div>)}</div></div></section> }

function StatsFeature() { return <section className="section feature-section" id="about"><div className="container"><div className="stats-row"><div><strong>98.6<span>%</span></strong><p>on-time delivery rate</p></div><div><strong>7k<span>+</span></strong><p>businesses moving with us</p></div><div><strong>18<span>min</span></strong><p>average dispatch time</p></div><div><strong>24<span>/7</span></strong><p>support that shows up</p></div></div><div className="feature-layout"><div className="feature-art"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-route"><span /><span /><span /></div><div className="art-core"><LogoMark /><b>PT</b><small>Central</small></div><span className="art-label label-top"><span className="blue-dot" /> Live network</span><span className="art-label label-bottom"><Clock3 size={12} /> 99.2% uptime</span></div><div className="feature-copy"><div className="eyebrow blue-eyebrow">The Patel difference</div><h2>Clarity at every<br /><em>single mile.</em></h2><p>We believe great logistics should feel invisible. That means giving you the confidence to focus on your business, while we take care of what comes next.</p><div className="check-list"><span><Check size={15} /> One platform, every shipment</span><span><Check size={15} /> Proactive delivery intelligence</span><span><Check size={15} /> Real people when it matters</span></div><Button variant="secondary" href="#contact">Discover Patel Technology</Button></div></div></div></section> }

function Vehicles() { return <section className="section vehicles-section"><div className="container"><div className="section-heading"><div><div className="eyebrow blue-eyebrow">Ready for every route</div><h2>Right vehicle.<br /><em>Right on time.</em></h2></div><p>A flexible fleet designed for the last mile, the long haul, and everything in between.</p></div><div className="vehicle-grid"><article className="vehicle-card vehicle-primary"><div className="vehicle-top"><span>01 / 03</span><Truck size={21} /></div><div className="vehicle-illustration van"><div className="van-cab" /><div className="van-body"><span /><span /></div><div className="wheel wheel-one" /><div className="wheel wheel-two" /></div><h3>City delivery</h3><p>Fast, agile, and ready for every neighborhood.</p><a href="#contact">Explore fleet <ArrowRight size={14} /></a></article><article className="vehicle-card"><div className="vehicle-top"><span>02 / 03</span><Box size={21} /></div><div className="vehicle-illustration mini-truck"><div className="truck-bed" /><div className="truck-cab" /><div className="wheel wheel-one" /><div className="wheel wheel-two" /></div><h3>Intercity express</h3><p>Reliable power for longer distances.</p><a href="#contact">Explore fleet <ArrowRight size={14} /></a></article><article className="vehicle-card"><div className="vehicle-top"><span>03 / 03</span><Globe2 size={21} /></div><div className="vehicle-illustration cargo"><div className="cargo-box"><span /><span /><span /></div></div><h3>Freight & cargo</h3><p>Built to move more, without the complexity.</p><a href="#contact">Explore fleet <ArrowRight size={14} /></a></article></div></div></section> }

function Platform() { return <section className="section platform-section"><div className="container platform-layout"><div className="platform-copy"><div className="eyebrow blue-eyebrow">Your command center</div><h2>Everything you need.<br /><em>Nothing you don&apos;t.</em></h2><p>See every order, route, and delivery in one beautifully simple dashboard. Built for humans, powerful enough for scale.</p><div className="platform-list"><span><BarChart3 size={18} /><b>Know what&apos;s happening</b><small>Live performance analytics</small></span><span><Bell size={18} /><b>Stay ahead of issues</b><small>Proactive delay notifications</small></span><span><Code2 size={18} /><b>Connect your stack</b><small>Simple, flexible API access</small></span></div><Button href="#contact">Explore the platform</Button></div><div className="platform-preview"><div className="preview-header"><span className="brand-small"><LogoMark /> Patel Central</span><span className="preview-user">AK <ChevronDown size={13} /></span></div><div className="preview-content"><div className="preview-side"><span className="side-active"><BarChart3 size={14} /> Overview</span><span><Package size={14} /> Shipments</span><span><Route size={14} /> Routes</span><span><Users size={14} /> Customers</span><span><BarChart3 size={14} /> Analytics</span></div><div className="preview-main"><div className="preview-greeting"><span><small>Tuesday, 12 August 2025</small><b>Good morning, Ankit</b></span><button>+ New shipment</button></div><div className="preview-stats"><span><small>Total shipments</small><b>1,284</b><i>+18.4%</i></span><span><small>In transit</small><b>472</b><i>+8.2%</i></span><span><small>Delivered</small><b>798</b><i>+12.6%</i></span></div><div className="preview-chart"><div><b>Shipment activity</b><small>Last 7 days · <strong>All routes</strong></small></div><div className="line-chart"><svg viewBox="0 0 520 120" preserveAspectRatio="none" aria-label="Shipment activity graph"><path className="grid-lines" d="M0 20H520M0 60H520M0 100H520" /><path className="chart-line orange-line" d="M0 90 C35 75 45 80 75 65 S110 80 135 55 S175 63 205 43 S240 57 265 42 S300 49 330 32 S375 52 400 36 S450 30 520 12" /><path className="chart-line blue-line" d="M0 108 C40 100 55 96 85 102 S120 90 150 95 S190 80 220 85 S260 72 290 78 S330 63 365 70 S400 52 435 60 S480 42 520 45" /></svg></div><div className="line-labels"><span>Aug 06</span><span>Aug 07</span><span>Aug 08</span><span>Aug 09</span><span>Aug 10</span><span>Aug 11</span><span>Aug 12</span></div></div></div></div></div></div></section> }

function Testimonials() { return <section className="section testimonials-section"><div className="container"><div className="quote-mark">“</div><blockquote>Patel Technology has completely changed how we think about delivery. It&apos;s not just a logistics partner — it feels like an extension of our team.</blockquote><div className="quote-person"><span className="person-avatar">VP</span><span><b>Vikram Patel</b><small>Founder, Northstar Commerce</small></span><span className="quote-stars">★★★★★</span></div></div></section> }

function FAQ() { const [active, setActive] = useState(0); return <section className="section faq-section" id="faq"><div className="container faq-layout"><div><div className="eyebrow blue-eyebrow">Questions, answered</div><h2>Good to know.<br /><em>Better to ask.</em></h2><p>Can&apos;t find what you&apos;re looking for? Our team is always happy to help.</p><a className="text-link" href="#contact">Talk to our team <ArrowRight size={14} /></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${active === index ? 'faq-active' : ''}`} key={question}><button onClick={() => setActive(active === index ? -1 : index)} aria-expanded={active === index}><span>{question}</span><span className="faq-plus">{active === index ? '−' : '+'}</span></button>{active === index && <p>{answer}</p>}</div>)}</div></div></section> }

function CTA() { return <section className="cta-section" id="contact"><div className="container cta-inner"><div className="cta-orbit orbit-one" /><div className="cta-orbit orbit-two" /><div className="eyebrow light-eyebrow"><span className="eyebrow-dot" /> Your next move starts here</div><h2>Ready to move<br /><em>better?</em></h2><p>Join thousands of businesses building what&apos;s next with Patel Technology.</p><div className="cta-actions"><Button href="mailto:hello@pateltechnology.in">Start shipping today</Button><a href="mailto:hello@pateltechnology.in" className="cta-contact">Talk to a human <ArrowRight size={15} /></a></div></div></section> }

function Footer() { return <footer className="footer"><div className="container"><div className="footer-top"><div><a className="brand footer-brand" href="#top"><LogoMark /><span>Patel <b>Technology</b></span></a><p>Technology-led logistics<br />for the way business moves.</p></div><div className="footer-links"><div><b>Company</b><a href="#about">About us</a><a href="#contact">Careers</a><a href="#contact">Contact</a></div><div><b>Solutions</b><a href="#services">Delivery</a><a href="#services">B2B logistics</a><a href="#services">Platform</a></div><div><b>Connect</b><a href="mailto:hello@pateltechnology.in">Email us</a><a href="#contact">LinkedIn</a><a href="#contact">Instagram</a></div></div></div><div className="footer-bottom"><span>© 2025 Patel Technology. All rights reserved.</span><span>Made for the move <span className="orange-heart">●</span></span><span><a href="#contact">Privacy</a> · <a href="#contact">Terms</a></span></div></div></footer> }

export default function Page() { return <main><Navbar /><Hero /><LogoStrip /><Services /><HowItWorks /><StatsFeature /><Vehicles /><Platform /><Testimonials /><FAQ /><CTA /><Footer /></main> }
