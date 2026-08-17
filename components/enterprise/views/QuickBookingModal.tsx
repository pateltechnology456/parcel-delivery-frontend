"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LocateFixed, X, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export interface DashVehicle {
  key: string;
  name: string;
  sub: string;
  capacity: string;
  eta: string;
  basePrice: string;
  accent: string;
  bgAccent: string;
  icon?: any;
  img?: string;
}

interface QuickBookingModalProps {
  vehicle: DashVehicle | null;
  onClose: () => void;
}

export function QuickBookingModal({ vehicle, onClose }: QuickBookingModalProps) {
  const router = useRouter();

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [locating, setLocating] = useState(false);

  // Initialize contact details from logged-in user profile
  useEffect(() => {
    if (!vehicle) return;

    let defaultName = "";
    let defaultPhone = "";

    // 1. Read currently logged-in user
    const storedUser = localStorage.getItem("mock_current_user");
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        if (u.fullName || u.name) defaultName = u.fullName || u.name;
        if (u.phone) defaultPhone = u.phone;
      } catch (e) {
        console.error(e);
      }
    }

    // 2. Read draft if exists
    const draft = localStorage.getItem("active_booking_draft") || localStorage.getItem("estimate_data");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (parsed.pickup) setPickup(parsed.pickup);
        if (parsed.dropoff) setDropoff(parsed.dropoff);
        if (parsed.name) defaultName = parsed.name;
        if (parsed.phone) defaultPhone = parsed.phone;
        setReceiverName(parsed.receiverName || defaultName);
        setReceiverPhone(parsed.receiverPhone || defaultPhone);
      } catch (e) {
        console.error(e);
      }
    } else {
      setReceiverName(defaultName);
      setReceiverPhone(defaultPhone);
    }

    setName(defaultName);
    setPhone(defaultPhone);
    if (!receiverName) setReceiverName(defaultName);
    if (!receiverPhone) setReceiverPhone(defaultPhone);
  }, [vehicle]);

  const handleLocate = () => {
    setLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPickup(`Vijay Nagar, Scheme 54, Indore (${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)})`);
          setLocating(false);
          toast.success("Location detected!");
        },
        () => {
          setPickup("Vijay Nagar, Scheme 54, Indore, MP");
          setLocating(false);
        }
      );
    } else {
      setPickup("Vijay Nagar, Scheme 54, Indore, MP");
      setLocating(false);
    }
  };

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();

    if (!vehicle) return;

    if (!pickup.trim() || !dropoff.trim()) {
      toast.error("Please enter both Pickup and Drop locations.");
      return;
    }

    if (!name.trim() || !phone.trim()) {
      toast.error("Please enter sender name and 10-digit mobile number.");
      return;
    }

    if (phone.replace(/\D/g, "").length !== 10) {
      toast.error("Please enter a valid 10-digit sender phone number.");
      return;
    }

    if (receiverPhone && receiverPhone.replace(/\D/g, "").length !== 10) {
      toast.error("Please enter a valid 10-digit receiver phone number.");
      return;
    }

    const sName = name.trim();
    const sPhone = phone.replace(/\D/g, "");
    const rName = receiverName.trim() || sName;
    const rPhone = receiverPhone.trim() ? receiverPhone.replace(/\D/g, "") : sPhone;

    const pLen = pickup.length;
    const dLen = dropoff.length;
    const calcDistance = Math.max(3.2, Number(((pLen + dLen) % 18 + 3.8).toFixed(1)));

    const draftData = {
      pickup: pickup.trim(),
      dropoff: dropoff.trim(),
      name: sName,
      phone: sPhone,
      receiverName: rName,
      receiverPhone: rPhone,
      vehicle: vehicle.key,
      city: "Indore",
      type: vehicle.name,
      distanceKm: calcDistance,
    };

    localStorage.setItem("active_booking_draft", JSON.stringify(draftData));
    localStorage.setItem("estimate_data", JSON.stringify(draftData));

    onClose();
    toast.success(`Opening booking setup for ${vehicle.name}...`);
    router.push(`/dashboard/book?vehicle=${vehicle.key}`);
  };

  if (!vehicle) return null;

  const Icon = vehicle.icon;

  return (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            background: "#ffffff",
            borderRadius: "24px",
            width: "100%",
            maxWidth: "560px",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            border: "1px solid #e2e8f0",
            padding: "28px",
            zIndex: 10,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: vehicle.bgAccent,
                  color: vehicle.accent,
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                {Icon ? <Icon size={26} /> : vehicle.img ? <img src={vehicle.img} alt={vehicle.name} style={{ width: "28px", height: "28px", objectFit: "contain" }} /> : null}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0b2a62", margin: 0 }}>
                    {vehicle.name}
                  </h3>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: vehicle.accent,
                      background: vehicle.bgAccent,
                      padding: "2px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    {vehicle.capacity}
                  </span>
                </div>
                <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#64748b" }}>
                  Enter pickup & drop locations to calculate fare and proceed to instant dispatch.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              style={{
                background: "#f1f5f9",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                color: "#64748b",
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleProceed} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Sender Pickup Box */}
            <div
              style={{
                background: "#f8fafc",
                borderRadius: "14px",
                border: "1px solid #e2e8f0",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#16a34a",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#16a34a" }} />
                  1. Pickup (Sender)
                </span>
                <button
                  type="button"
                  onClick={handleLocate}
                  disabled={locating}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#1154d9",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: 0,
                  }}
                >
                  <LocateFixed size={12} /> {locating ? "Locating..." : "Use Current GPS"}
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "4px" }}>
                    Sender Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ankit Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "4px" }}>
                    Sender Mobile *
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    required
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", outline: "none" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "4px" }}>
                  Pickup Address / Landmark *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Plot 42, Vijay Nagar, Scheme 54, Indore"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  required
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", outline: "none" }}
                />
              </div>
            </div>

            {/* Receiver Dropoff Box */}
            <div
              style={{
                background: "#f8fafc",
                borderRadius: "14px",
                border: "1px solid #e2e8f0",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#ea580c",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ea580c" }} />
                2. Dropoff (Receiver)
              </span>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "4px" }}>
                    Receiver Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Verma"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "4px" }}>
                    Receiver Mobile
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile"
                    maxLength={10}
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value.replace(/\D/g, ""))}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", outline: "none" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "4px" }}>
                  Drop / Destination Address *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Shop 12, Palasia Square, AB Road, Indore"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  required
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", outline: "none" }}
                />
              </div>
            </div>

            {/* Action Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                marginTop: "6px",
                padding: "16px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #1154d9 0%, #0043c7 100%)",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: 800,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 8px 24px rgba(17, 84, 217, 0.35)",
              }}
            >
              Proceed to Book ({vehicle.name}) <ArrowRight size={16} />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
