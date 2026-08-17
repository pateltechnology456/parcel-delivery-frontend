"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Bike,
  Box,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Flame,
  Globe2,
  MapPin,
  Package,
  Phone,
  Play,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  User,
  Zap,
} from "lucide-react";
import toast from "react-hot-toast";

export function Hero() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"estimate" | "track">("estimate");

  // Fare Estimate State
  const [city, setCity] = useState("Indore");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("bike");
  const [customerType, setCustomerType] = useState("individual");

  // Tracking State
  const [trackingId, setTrackingId] = useState("");
  const [trackedOrder, setTrackedOrder] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleEstimateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pickup.trim() || !dropoff.trim()) {
      toast.error("Please enter both pickup and drop addresses.");
      return;
    }

    if (!name.trim() || !phone.trim()) {
      toast.error("Please enter your name and phone number.");
      return;
    }

    if (phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    const data = {
      pickup,
      dropoff,
      name,
      phone,
      type: customerType,
      city,
      vehicle,
    };
    localStorage.setItem("estimate_data", JSON.stringify(data));
    toast.success("Calculating best fare for you...");
    router.push("/fare-estimate");
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      toast.error("Please enter a tracking ID (e.g. PT-2841)");
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setTrackedOrder({
        id: trackingId.toUpperCase(),
        status: "In Transit",
        eta: "22 mins away",
        from: pickup || "Vijay Nagar, Indore",
        to: dropoff || "Palasia Square, Indore",
        driver: "Arjun Kumar (MP-09-XX-4821)",
        steps: [
          { label: "Order Placed", done: true, time: "08:45 AM" },
          { label: "Partner Assigned", done: true, time: "08:48 AM" },
          { label: "Pickup Verified (OTP)", done: true, time: "09:12 AM" },
          { label: "Out for Delivery", done: false, current: true, time: "ETA 09:34 AM" },
        ],
      });
    }, 600);
  };

  return (
    <section className="hero-section" style={{
      position: 'relative',
      padding: '48px 20px 80px',
      background: 'linear-gradient(180deg, #f0f6ff 0%, #f8fafc 100%)',
      overflow: 'hidden'
    }}>
      {/* Decorative Glow Backgrounds */}
      <div style={{
        position: 'absolute',
        top: '-120px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '900px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(29, 107, 255, 0.12) 0%, rgba(255, 107, 44, 0.05) 50%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Top Header & Tagline */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 40px' }}>
         

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            style={{
              fontSize: 'clamp(32px, 5.5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.035em',
              color: '#0b2a62',
              margin: '0 0 18px'
            }}
          >
            Move what <span style={{
              background: 'linear-gradient(135deg, #1154d9 0%, #003db3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>matters</span>. Move it <span style={{
              background: 'linear-gradient(135deg, #ff6b2c 0%, #e04f0f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>better</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: '#475569',
              lineHeight: 1.6,
              maxWidth: '680px',
              margin: '0 auto 28px'
            }}
          >
            Technology-powered parcel delivery for businesses & individuals. Real-time GPS tracking, verified OTP security, and lightning-fast dispatch across India.
          </motion.p>
        </div>

        {/* Central Glassmorphism Action Widget */}
        <motion.div
          suppressHydrationWarning
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(220, 231, 244, 0.9)',
            borderRadius: '24px',
            boxShadow: '0 20px 50px -12px rgba(11, 42, 98, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
            padding: '24px',
            overflow: 'hidden'
          }}
        >
          {/* Tab Switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #eef2f6',
            paddingBottom: '18px',
            marginBottom: '22px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{
              display: 'inline-flex',
              background: '#f1f5f9',
              padding: '4px',
              borderRadius: '12px',
              gap: '4px'
            }}>
              <button
                type="button"
                onClick={() => setActiveTab("estimate")}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 18px',
                  borderRadius: '9px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: activeTab === "estimate" ? '#ffffff' : 'transparent',
                  color: activeTab === "estimate" ? '#1154d9' : '#64748b',
                  boxShadow: activeTab === "estimate" ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Truck size={16} /> Instant Fare Calculator
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("track")}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 18px',
                  borderRadius: '9px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: activeTab === "track" ? '#ffffff' : 'transparent',
                  color: activeTab === "track" ? '#1154d9' : '#64748b',
                  boxShadow: activeTab === "track" ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Search size={16} /> Track Shipment
              </button>
            </div>

            {/* City Selector */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#f8fafc',
              padding: '6px 12px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              fontSize: '12px',
              fontWeight: 600,
              color: '#334155'
            }}>
              <MapPin size={14} color="#1154d9" />
              <span>City:</span>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontWeight: 700,
                  color: '#0b2a62',
                  cursor: 'pointer'
                }}
              >
                <option value="Indore">Indore</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Ujjain">Ujjain</option>
                <option value="Dewas">Dewas</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi NCR</option>
              </select>
            </div>
          </div>

          {/* TAB 1: FARE ESTIMATE */}
          {activeTab === "estimate" && (
            <form onSubmit={handleEstimateSubmit}>
              {/* Form Input Fields Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                marginBottom: '18px'
              }}>
                {/* Pickup */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                    PICKUP ADDRESS *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Scheme 54, Vijay Nagar"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0f172a'
                    }}
                  />
                </div>

                {/* Dropoff */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#ff6b2c', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff6b2c' }} />
                    DROP ADDRESS *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Palasia Square, Indore"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0f172a'
                    }}
                  />
                </div>

                {/* Sender Name */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>
                    SENDER NAME *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ankit Patel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0f172a'
                    }}
                  />
                </div>

                {/* Phone */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>
                    MOBILE NUMBER *
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0f172a'
                    }}
                  />
                </div>
              </div>

              {/* Bottom Action Row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px',
                paddingTop: '6px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="customerType"
                      checked={customerType === "individual"}
                      onChange={() => setCustomerType("individual")}
                    />
                    Personal Use
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="customerType"
                      checked={customerType === "business"}
                      onChange={() => setCustomerType("business")}
                    />
                    Business / Enterprise
                  </label>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #1154d9 0%, #0043c7 100%)',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(17, 84, 217, 0.3)'
                  }}
                >
                  Calculate Fare & Book <ArrowRight size={16} />
                </motion.button>
              </div>
            </form>
          )}

          {/* TAB 2: TRACK SHIPMENT */}
          {activeTab === "track" && (
            <div>
              <form onSubmit={handleTrackSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                <div style={{
                  flex: 1,
                  minWidth: '240px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px',
                  padding: '12px 16px'
                }}>
                  <Search size={18} color="#64748b" />
                  <input
                    type="text"
                    placeholder="Enter Tracking ID (e.g. PT-2841, PT-802)"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    style={{
                      width: '100%',
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#0f172a'
                    }}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSearching}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '12px',
                    background: '#1154d9',
                    color: '#fff',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {isSearching ? "Searching..." : "Track Now"} <ArrowRight size={16} />
                </motion.button>
              </form>

              {/* Quick sample chips */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b', marginBottom: '18px' }}>
                <span>Try demo tracking:</span>
                {["PT-2841", "PT-2942", "PT-802"].map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => {
                      setTrackingId(sample);
                    }}
                    style={{
                      background: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      padding: '3px 8px',
                      color: '#1154d9',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {sample}
                  </button>
                ))}
              </div>

              {/* Track Result Card */}
              {trackedOrder && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '20px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Shipment</span>
                      <h4 style={{ margin: 0, fontSize: '18px', color: '#0b2a62' }}>{trackedOrder.id}</h4>
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#e0f2fe', color: '#0284c7', padding: '6px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 700 }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0284c7' }} />
                      {trackedOrder.status} · {trackedOrder.eta}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', padding: '12px 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', marginBottom: '16px' }}>
                    <div>
                      <small style={{ color: '#64748b', fontSize: '11px' }}>Pickup</small>
                      <p style={{ margin: '2px 0 0', fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{trackedOrder.from}</p>
                    </div>
                    <div>
                      <small style={{ color: '#64748b', fontSize: '11px' }}>Destination</small>
                      <p style={{ margin: '2px 0 0', fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{trackedOrder.to}</p>
                    </div>
                    <div>
                      <small style={{ color: '#64748b', fontSize: '11px' }}>Driver</small>
                      <p style={{ margin: '2px 0 0', fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{trackedOrder.driver}</p>
                    </div>
                  </div>

                  {/* Step Timeline */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                    {trackedOrder.steps.map((s: any, i: number) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: s.done ? '#22c55e' : s.current ? '#1154d9' : '#e2e8f0',
                          color: '#fff',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: '10px',
                          fontWeight: 700
                        }}>
                          {s.done ? "✓" : i + 1}
                        </div>
                        <div>
                          <b style={{ display: 'block', fontSize: '11px', color: s.current ? '#1154d9' : '#334155' }}>{s.label}</b>
                          <small style={{ fontSize: '10px', color: '#94a3b8' }}>{s.time}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        {/* Bottom Trust & Feature Badges Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            maxWidth: '1040px',
            margin: '40px auto 0'
          }}
        >
          {[
            { icon: Clock3, title: "15 Mins Dispatch", sub: "Rapid pickup across city limits" },
            { icon: ShieldCheck, title: "OTP Verified", sub: "Zero lost or fake deliveries" },
            { icon: Route, title: "Live GPS Tracking", sub: "End-to-end route visibility" },
            { icon: Star, title: "4.9★ Rated Service", sub: "Trusted by 7,000+ businesses" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '16px',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(17, 84, 217, 0.1)',
                  color: '#1154d9',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={20} />
                </div>
                <div>
                  <b style={{ display: 'block', fontSize: '13px', color: '#0b2a62', marginBottom: '2px' }}>{item.title}</b>
                  <small style={{ fontSize: '11px', color: '#64748b' }}>{item.sub}</small>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

