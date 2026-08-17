"use client";

import { Navbar } from "@/components/navbar";
import {
  ArrowRight,
  BadgePercent,
  Bike,
  Box,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Edit3,
  Flame,
  Info,
  MapPin,
  Package,
  Route,
  Shield,
  ShieldCheck,
  Sparkles,
  Tag,
  Truck,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

type VehicleKey = "bike" | "tempo" | "truck" | "packers";

interface VehicleConfig {
  id: VehicleKey;
  name: string;
  sub: string;
  capacity: string;
  dimensions: string;
  eta: string;
  icon: any;
  baseKm: number;
  baseFare: number;
  perKmRate: number;
  accent: string;
  bgAccent: string;
  description: string;
}

const VEHICLES: Record<VehicleKey, VehicleConfig> = {
  bike: {
    id: "bike",
    name: "2 Wheeler / Scooter",
    sub: "Up to 20 kg",
    capacity: "20 kg max payload",
    dimensions: "Small parcels & documents",
    eta: "15 - 25 mins",
    icon: Bike,
    baseKm: 2,
    baseFare: 40,
    perKmRate: 8,
    accent: "#1154d9",
    bgAccent: "rgba(17, 84, 217, 0.08)",
    description: "Ideal for food, medicine, documents, apparel, and urgent parcels."
  },
  tempo: {
    id: "tempo",
    name: "3 Wheeler / Tempo",
    sub: "Up to 500 kg",
    capacity: "500 kg max payload",
    dimensions: "5.5 ft (L) × 3.5 ft (W)",
    eta: "30 - 40 mins",
    icon: Package,
    baseKm: 2,
    baseFare: 140,
    perKmRate: 18,
    accent: "#ff6b2c",
    bgAccent: "rgba(255, 107, 44, 0.08)",
    description: "Best for retail stocks, electronics cartons, heavy boxes, and B2B goods."
  },
  truck: {
    id: "truck",
    name: "Mini Truck (Tata Ace / 1 Ton)",
    sub: "Up to 1,000 kg",
    capacity: "1,000 kg (1 Ton) payload",
    dimensions: "7 ft (L) × 4.5 ft (W) × 5 ft (H)",
    eta: "40 - 50 mins",
    icon: Truck,
    baseKm: 2,
    baseFare: 280,
    perKmRate: 28,
    accent: "#7957d8",
    bgAccent: "rgba(121, 87, 216, 0.08)",
    description: "Great for industrial freight, machinery, furniture, and pallet loads."
  },
  packers: {
    id: "packers",
    name: "Packers & Movers",
    sub: "Up to 2,000 kg + Helpers",
    capacity: "Full 1/2 BHK Relocation",
    dimensions: "9 ft (L) × 6 ft (W) Covered Container",
    eta: "Scheduled / Priority",
    icon: Box,
    baseKm: 2,
    baseFare: 750,
    perKmRate: 45,
    accent: "#2dbb76",
    bgAccent: "rgba(45, 187, 118, 0.08)",
    description: "Full-service house/office shifting with loading, unloading & transport."
  },
};

export default function FareEstimatePage() {
  const router = useRouter();

  const [selectedVehicle, setSelectedVehicle] = useState<VehicleKey>("bike");
  const [distanceKm, setDistanceKm] = useState<number>(6.5);
  const [promoApplied, setPromoApplied] = useState<boolean>(true);
  const [promoCode, setPromoCode] = useState<string>("FIRST30");
  const [promoInput, setPromoInput] = useState<string>("");

  const [isEditing, setIsEditing] = useState(false);
  const [editSenderName, setEditSenderName] = useState("");
  const [editSenderPhone, setEditSenderPhone] = useState("");
  const [editPickup, setEditPickup] = useState("");
  const [editReceiverName, setEditReceiverName] = useState("");
  const [editReceiverPhone, setEditReceiverPhone] = useState("");
  const [editDropoff, setEditDropoff] = useState("");

  const [data, setData] = useState({
    pickup: "Scheme No 54, Vijay Nagar, Indore, MP",
    dropoff: "Palasia Square, MG Road, Indore, MP",
    name: "Ankit Sharma",
    phone: "98765 43210",
    receiverName: "Ankit Sharma",
    receiverPhone: "98765 43210",
    city: "Indore",
    type: "individual",
  });

  useEffect(() => {
    const stored = localStorage.getItem("estimate_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const senderName = parsed.name || "Ankit Sharma";
        const senderPhone = parsed.phone || "98765 43210";

        setData(prev => ({
          pickup: parsed.pickup || prev.pickup,
          dropoff: parsed.dropoff || prev.dropoff,
          name: senderName,
          phone: senderPhone,
          receiverName: parsed.receiverName || senderName,
          receiverPhone: parsed.receiverPhone || senderPhone,
          city: parsed.city || prev.city,
          type: parsed.type || prev.type,
        }));

        if (parsed.vehicle && VEHICLES[parsed.vehicle as VehicleKey]) {
          setSelectedVehicle(parsed.vehicle as VehicleKey);
        }

        // Calculate approximate distance based on string seed
        const pLen = (parsed.pickup || "").length;
        const dLen = (parsed.dropoff || "").length;
        const calcDist = Math.max(3.2, Number(((pLen + dLen) % 18 + 3.8).toFixed(1)));
        setDistanceKm(calcDist);
      } catch (e) {
        console.error("Error parsing estimate data", e);
      }
    }
  }, []);

  const currentVeh = VEHICLES[selectedVehicle];

  // Pricing calculations
  const extraKm = Math.max(0, distanceKm - currentVeh.baseKm);
  const distanceFare = Math.round(extraKm * currentVeh.perKmRate);
  const subtotal = currentVeh.baseFare + distanceFare;
  const discount = promoApplied ? Math.min(Math.round(subtotal * 0.25), 80) : 0;
  const gst = Math.round((subtotal - discount) * 0.05);
  const finalTotal = Math.max(30, subtotal - discount + gst);

  const handleApplyPromo = () => {
    if (promoInput.trim().toUpperCase() === "SAVE30" || promoInput.trim().toUpperCase() === "FIRST30") {
      setPromoApplied(true);
      setPromoCode(promoInput.trim().toUpperCase());
      toast.success("Promo code applied! 25% discount activated.");
    } else {
      toast.error("Invalid promo code. Try 'FIRST30'");
    }
  };

  const handleStartEdit = () => {
    setEditSenderName(data.name);
    setEditSenderPhone(data.phone);
    setEditPickup(data.pickup);
    setEditReceiverName(data.receiverName || data.name);
    setEditReceiverPhone(data.receiverPhone || data.phone);
    setEditDropoff(data.dropoff);
    setIsEditing(true);
  };

  const handleSaveAddresses = () => {
    if (!editPickup.trim() || !editDropoff.trim()) {
      toast.error("Please enter both pickup and drop addresses.");
      return;
    }
    if (!editSenderName.trim() || !editSenderPhone.trim()) {
      toast.error("Please enter sender name and contact number.");
      return;
    }
    if (editSenderPhone.replace(/\D/g, '').length !== 10) {
      toast.error("Please enter a valid 10-digit sender phone number.");
      return;
    }
    if (editReceiverPhone && editReceiverPhone.replace(/\D/g, '').length !== 10) {
      toast.error("Please enter a valid 10-digit receiver phone number.");
      return;
    }

    const updatedData = {
      ...data,
      name: editSenderName,
      phone: editSenderPhone.replace(/\D/g, ''),
      pickup: editPickup,
      receiverName: editReceiverName.trim() || editSenderName,
      receiverPhone: editReceiverPhone.trim() ? editReceiverPhone.replace(/\D/g, '') : editSenderPhone.replace(/\D/g, ''),
      dropoff: editDropoff,
    };

    setData(updatedData);

    const pLen = editPickup.length;
    const dLen = editDropoff.length;
    const calcDist = Math.max(3.2, Number(((pLen + dLen) % 18 + 3.8).toFixed(1)));
    setDistanceKm(calcDist);

    localStorage.setItem("estimate_data", JSON.stringify(updatedData));
    setIsEditing(false);
    toast.success("Route and contact details updated!");
  };

  const handleBookNow = () => {
    const user = localStorage.getItem("mock_current_user");
    const bookingDetails = {
      ...data,
      vehicle: selectedVehicle,
      finalTotal,
      distanceKm,
    };
    localStorage.setItem("active_booking_draft", JSON.stringify(bookingDetails));

    if (user) {
      router.push(`/dashboard/book?vehicle=${selectedVehicle}`);
    } else {
      router.push(`/login?redirect=${encodeURIComponent(`/dashboard/book?vehicle=${selectedVehicle}`)}`);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '80px' }}>
      <Navbar />

      <div style={{ maxWidth: '1180px', margin: '36px auto 0', padding: '0 20px' }}>
        {/* Top Breadcrumb & Heading */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#64748b',
            fontSize: '13px',
            fontWeight: 600,
            marginBottom: '8px'
          }}>
            <span>Home</span>
            <ChevronRight size={14} />
            <span style={{ color: '#1154d9' }}>Fare Calculator</span>
            <ChevronRight size={14} />
            <span style={{ color: '#0b2a62' }}>{data.city}</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 800,
            color: '#0b2a62',
            letterSpacing: '-0.03em',
            margin: 0
          }}>
            Instant Delivery Estimate & Vehicle Selection
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '6px 0 0' }}>
            Transparent pricing, zero hidden charges. Live dispatch in under 15 minutes.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
          alignItems: 'start'
        }}>
          {/* LEFT COLUMN: Vehicle Selector & Route Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Vehicle Selection Cards */}
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0b2a62', margin: 0 }}>
                  1. Choose Your Vehicle
                </h3>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#1154d9', background: '#eff6ff', padding: '4px 10px', borderRadius: '99px' }}>
                  {distanceKm} km trip
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(Object.keys(VEHICLES) as VehicleKey[]).map((vKey) => {
                  const veh = VEHICLES[vKey];
                  const isSelected = selectedVehicle === vKey;
                  const Icon = veh.icon;

                  // Price for this vehicle
                  const extra = Math.max(0, distanceKm - veh.baseKm);
                  const vSubtotal = veh.baseFare + Math.round(extra * veh.perKmRate);
                  const vDisc = promoApplied ? Math.min(Math.round(vSubtotal * 0.25), 80) : 0;
                  const vGst = Math.round((vSubtotal - vDisc) * 0.05);
                  const vTotal = Math.max(30, vSubtotal - vDisc + vGst);

                  return (
                    <motion.div
                      key={vKey}
                      onClick={() => setSelectedVehicle(vKey)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 18px',
                        borderRadius: '16px',
                        border: isSelected ? `2px solid ${veh.accent}` : '1px solid #e2e8f0',
                        background: isSelected ? veh.bgAccent : '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '12px',
                          background: isSelected ? veh.accent : '#f1f5f9',
                          color: isSelected ? '#ffffff' : '#475569',
                          display: 'grid',
                          placeItems: 'center',
                          flexShrink: 0,
                          transition: 'all 0.2s ease'
                        }}>
                          <Icon size={24} />
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <b style={{ fontSize: '15px', color: isSelected ? '#0b2a62' : '#1e293b' }}>
                              {veh.name}
                            </b>
                            {isSelected && (
                              <span style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                background: veh.accent,
                                color: '#fff',
                                display: 'inline-grid',
                                placeItems: 'center',
                                fontSize: '11px'
                              }}>
                                ✓
                              </span>
                            )}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '3px', fontSize: '12px', color: '#64748b' }}>
                            <span>📦 {veh.sub}</span>
                            <span>•</span>
                            <span>⚡ {veh.eta}</span>
                          </div>
                        </div>
                      </div>

                      {/* Price Tag */}
                      <div style={{ textAlign: 'right' }}>
                        <b style={{ fontSize: '18px', color: '#0b2a62' }}>₹ {vTotal}</b>
                        {promoApplied && (
                          <small style={{ display: 'block', color: '#22c55e', fontSize: '11px', fontWeight: 600 }}>
                            Saved ₹{vDisc}
                          </small>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Selected Vehicle Specs Banner */}
              <div style={{
                marginTop: '18px',
                padding: '14px 16px',
                borderRadius: '12px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                fontSize: '12px',
                color: '#475569'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#0b2a62', marginBottom: '4px' }}>
                  <Info size={14} color="#1154d9" />
                  {currentVeh.name} Specifications:
                </div>
                <p style={{ margin: '0 0 6px', color: '#64748b' }}>{currentVeh.description}</p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontWeight: 600, color: '#334155' }}>
                  <span>📏 Dimensions: <b>{currentVeh.dimensions}</b></span>
                  <span>⚖️ Capacity: <b>{currentVeh.capacity}</b></span>
                </div>
              </div>
            </div>

            {/* Address Details Card */}
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0b2a62', margin: 0 }}>
                  2. Route & Address Details
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    if (isEditing) {
                      setIsEditing(false);
                    } else {
                      handleStartEdit();
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: isEditing ? '#fee2e2' : '#eff6ff',
                    border: '1px solid',
                    borderColor: isEditing ? '#fca5a5' : '#bfdbfe',
                    color: isEditing ? '#dc2626' : '#1154d9',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Edit3 size={13} /> {isEditing ? "Cancel Edit" : "Edit Route"}
                </button>
              </div>

              {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Sender Section */}
                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a' }} />
                      Sender (Pickup) Details
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Sender Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Ankit Sharma"
                          value={editSenderName}
                          onChange={(e) => setEditSenderName(e.target.value)}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Sender Mobile *</label>
                        <input
                          type="tel"
                          placeholder="10-digit mobile"
                          maxLength={10}
                          value={editSenderPhone}
                          onChange={(e) => setEditSenderPhone(e.target.value.replace(/\D/g, ''))}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Pickup Address *</label>
                      <input
                        type="text"
                        placeholder="Street, Landmark, Area, City"
                        value={editPickup}
                        onChange={(e) => setEditPickup(e.target.value)}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Receiver Section */}
                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#ea580c', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ea580c' }} />
                      Receiver (Dropoff) Details
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Receiver Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Rahul Verma"
                          value={editReceiverName}
                          onChange={(e) => setEditReceiverName(e.target.value)}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Receiver Mobile</label>
                        <input
                          type="tel"
                          placeholder="10-digit mobile"
                          maxLength={10}
                          value={editReceiverPhone}
                          onChange={(e) => setEditReceiverPhone(e.target.value.replace(/\D/g, ''))}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Drop / Destination Address *</label>
                      <input
                        type="text"
                        placeholder="Street, Landmark, Area, City"
                        value={editDropoff}
                        onChange={(e) => setEditDropoff(e.target.value)}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                    <button
                      type="button"
                      onClick={handleSaveAddresses}
                      style={{
                        padding: '10px 22px',
                        borderRadius: '10px',
                        background: '#1154d9',
                        color: '#fff',
                        border: 'none',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(17, 84, 217, 0.25)'
                      }}
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      style={{
                        padding: '10px 18px',
                        borderRadius: '10px',
                        background: '#f1f5f9',
                        color: '#475569',
                        border: '1px solid #cbd5e1',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', position: 'relative' }}>
                  {/* Timeline connecting line */}
                  <div style={{
                    position: 'absolute',
                    left: '11px',
                    top: '20px',
                    bottom: '24px',
                    width: '2px',
                    background: '#e2e8f0',
                    borderLeft: '2px dashed #94a3b8'
                  }} />

                  {/* Pickup */}
                  <div style={{ display: 'flex', gap: '14px', position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#22c55e', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0, marginTop: '2px', boxShadow: '0 0 0 4px rgba(34, 197, 94, 0.15)' }}>
                      A
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                        <b style={{ fontSize: '13px', color: '#0b2a62' }}>Pickup (Sender)</b>
                        <span style={{ fontSize: '12px', color: '#15803d', background: '#dcfce7', padding: '1px 8px', borderRadius: '99px', fontWeight: 700 }}>
                          {data.name} • {data.phone}
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.45 }}>{data.pickup}</p>
                    </div>
                  </div>

                  {/* Dropoff */}
                  <div style={{ display: 'flex', gap: '14px', position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#ff6b2c', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0, marginTop: '2px', boxShadow: '0 0 0 4px rgba(255, 107, 44, 0.15)' }}>
                      B
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                        <b style={{ fontSize: '13px', color: '#0b2a62' }}>Dropoff (Receiver)</b>
                        <span style={{ fontSize: '12px', color: '#c2410c', background: '#ffedd5', padding: '1px 8px', borderRadius: '99px', fontWeight: 700 }}>
                          {data.receiverName || "Receiver"} • {data.receiverPhone || "Contact added"}
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.45 }}>{data.dropoff}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Fare Breakdown & Booking Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '90px' }}>
            
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(11, 42, 98, 0.06)'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0b2a62', margin: '0 0 16px' }}>
                Fare Summary & Breakdown
              </h3>

              {/* Promo Banner */}
              <div style={{
                background: 'linear-gradient(135deg, #effcf5 0%, #e6f9f0 100%)',
                border: '1px solid #bfe7d0',
                borderRadius: '12px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '18px',
                color: '#15803d',
                fontSize: '12px',
                fontWeight: 600
              }}>
                <BadgePercent size={20} color="#22c55e" />
                <span><b>{promoCode}</b> applied! 25% discount on your booking.</span>
              </div>

              {/* Detailed Bill items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#475569' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Base Fare (First {currentVeh.baseKm} km)</span>
                  <b style={{ color: '#1e293b' }}>₹ {currentVeh.baseFare}</b>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Distance Fare ({extraKm.toFixed(1)} km × ₹{currentVeh.perKmRate}/km)</span>
                  <b style={{ color: '#1e293b' }}>₹ {distanceFare}</b>
                </div>

                {promoApplied && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                    <span>First Move Offer ({promoCode})</span>
                    <b>- ₹ {discount}</b>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Taxes & Platform GST (5%)</span>
                  <b style={{ color: '#1e293b' }}>₹ {gst}</b>
                </div>

                <div style={{
                  borderTop: '1px solid #e2e8f0',
                  paddingTop: '14px',
                  marginTop: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline'
                }}>
                  <div>
                    <b style={{ fontSize: '16px', color: '#0b2a62', display: 'block' }}>Total Estimated Amount</b>
                    <small style={{ color: '#64748b', fontSize: '11px' }}>Inclusive of all taxes & insurance</small>
                  </div>
                  <span style={{ fontSize: '28px', fontWeight: 800, color: '#1154d9' }}>
                    ₹ {finalTotal}
                  </span>
                </div>
              </div>

              {/* Promo Code Input Box */}
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '10px',
                    padding: '8px 12px'
                  }}>
                    <Tag size={15} color="#64748b" />
                    <input
                      type="text"
                      placeholder="Enter Promo Code"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        outline: 'none',
                        fontSize: '12px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        width: '100%'
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '10px',
                      background: '#1154d9',
                      color: '#fff',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Book Now Button */}
              <motion.button
                type="button"
                onClick={handleBookNow}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  marginTop: '22px',
                  padding: '16px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #1154d9 0%, #0043c7 100%)',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 24px rgba(17, 84, 217, 0.35)'
                }}
              >
                Proceed to Book ({currentVeh.name.split('/')[0].trim()}) <ArrowRight size={18} />
              </motion.button>
            </div>

            {/* Guaranteed Trust Badges */}
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#334155' }}>
                <ShieldCheck size={18} color="#22c55e" />
                <span><b>Complimentary Transit Insurance</b> up to ₹50,000</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#334155' }}>
                <CheckCircle2 size={18} color="#1154d9" />
                <span><b>Verified Driver with OTP</b> handoff at pickup & drop</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#334155' }}>
                <Clock3 size={18} color="#ff6b2c" />
                <span><b>Live Dispatch Guarantee</b> within 15 minutes</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
