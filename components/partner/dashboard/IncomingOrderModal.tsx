"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Check,
  ChevronRight,
  Clock3,
  Flame,
  MapPin,
  Navigation,
  Package,
  Route,
  ShieldCheck,
  Truck,
  Volume2,
  VolumeX,
  X,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export interface IncomingOrderData {
  id: string;
  pickup: string;
  dropoff: string;
  distance: string;
  estTime: string;
  pay: number;
  itemType: string;
  vehicle: string;
  customerName: string;
  surge?: string;
}

interface IncomingOrderModalProps {
  order: IncomingOrderData | null;
  onAccept: (order: IncomingOrderData) => void;
  onDecline: (order: IncomingOrderData) => void;
}

export function IncomingOrderModal({ order, onAccept, onDecline }: IncomingOrderModalProps) {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [soundMuted, setSoundMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play audio chime using Web Audio API
  const playChime = () => {
    if (soundMuted) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.12); // A5

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.36);
    } catch (e) {
      console.warn("Web Audio alert suppressed", e);
    }
  };

  useEffect(() => {
    if (!order) return;

    setSecondsLeft(30);
    playChime();
    const soundInterval = setInterval(() => {
      playChime();
    }, 4000);

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          clearInterval(soundInterval);
          onDecline(order);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(soundInterval);
    };
  }, [order, soundMuted]);

  if (!order) return null;

  const progressPercent = (secondsLeft / 30) * 100;

  const handleAcceptOrder = () => {
    onAccept(order);
    toast.success(`Order ${order.id} Accepted! Navigating to pickup...`);
    router.push(`/partner/orders/${order.id}`);
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
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
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(11, 23, 46, 0.78)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            background: "#ffffff",
            borderRadius: "28px",
            width: "100%",
            maxWidth: "480px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.45)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            overflow: "hidden",
            zIndex: 10,
          }}
        >
          {/* Top Banner with Surge & Sound Toggle */}
          <div
            style={{
              padding: "16px 20px",
              background: "linear-gradient(135deg, #1154d9 0%, #0039c7 100%)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 12px #22c55e",
                  display: "inline-block",
                }}
              />
              <b style={{ fontSize: "14px", letterSpacing: "0.02em" }}>NEW DELIVERY REQUEST</b>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {order.surge && (
                <span
                  style={{
                    background: "rgba(255, 107, 44, 0.9)",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                  }}
                >
                  <Flame size={12} /> {order.surge}
                </span>
              )}
              <button
                type="button"
                onClick={() => setSoundMuted(!soundMuted)}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  display: "grid",
                  placeItems: "center",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
              >
                {soundMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "24px 20px" }}>
            {/* Payout & Timer Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <div>
                <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Your Guaranteed Earnings</span>
                <h2 style={{ fontSize: "32px", fontWeight: 900, color: "#0b2a62", margin: "2px 0 0" }}>
                  ₹{order.pay}
                </h2>
              </div>

              {/* Circular Countdown Progress Indicator */}
              <div
                style={{
                  position: "relative",
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "#f1f5f9",
                  display: "grid",
                  placeItems: "center",
                  border: `3px solid ${secondsLeft < 10 ? "#ef4444" : "#1154d9"}`,
                  transition: "border-color 0.3s ease",
                }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 900,
                    color: secondsLeft < 10 ? "#ef4444" : "#0b2a62",
                  }}
                >
                  {secondsLeft}s
                </span>
              </div>
            </div>

            {/* Trip Specs Tags */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginBottom: "18px",
              }}
            >
              <span
                style={{
                  background: "#eff6ff",
                  color: "#1154d9",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: "8px",
                }}
              >
                📍 {order.distance} total trip
              </span>
              <span
                style={{
                  background: "#f0fdf4",
                  color: "#16a34a",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: "8px",
                }}
              >
                ⏱️ {order.estTime} trip ETA
              </span>
              <span
                style={{
                  background: "#fef3c7",
                  color: "#d97706",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: "8px",
                }}
              >
                📦 {order.itemType}
              </span>
            </div>

            {/* Route Timeline */}
            <div
              style={{
                background: "#f8fafc",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                padding: "16px",
                marginBottom: "22px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {/* Pickup */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "#dcfce7",
                    color: "#16a34a",
                    display: "grid",
                    placeItems: "center",
                    fontSize: "12px",
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  A
                </span>
                <div>
                  <small style={{ fontSize: "10.5px", fontWeight: 700, color: "#16a34a", textTransform: "uppercase" }}>
                    Pickup Location
                  </small>
                  <b style={{ fontSize: "13px", color: "#0f172a", display: "block" }}>{order.pickup}</b>
                </div>
              </div>

              {/* Dashed line */}
              <div style={{ borderLeft: "2px dashed #cbd5e1", marginLeft: "14px", height: "10px" }} />

              {/* Drop */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "#ffedd5",
                    color: "#ea580c",
                    display: "grid",
                    placeItems: "center",
                    fontSize: "12px",
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  B
                </span>
                <div>
                  <small style={{ fontSize: "10.5px", fontWeight: 700, color: "#ea580c", textTransform: "uppercase" }}>
                    Drop-off Destination
                  </small>
                  <b style={{ fontSize: "13px", color: "#0f172a", display: "block" }}>{order.dropoff}</b>
                </div>
              </div>
            </div>

            {/* Actions Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px" }}>
              <motion.button
                type="button"
                onClick={() => onDecline(order)}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "14px",
                  borderRadius: "14px",
                  background: "#f1f5f9",
                  color: "#64748b",
                  border: "none",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <X size={16} /> Decline
              </motion.button>

              <motion.button
                type="button"
                onClick={handleAcceptOrder}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: "14px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #1154d9 0%, #0043c7 100%)",
                  color: "#ffffff",
                  border: "none",
                  fontSize: "14.5px",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 10px 25px rgba(17, 84, 217, 0.4)",
                }}
              >
                <Check size={18} /> Accept Order (₹{order.pay})
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
