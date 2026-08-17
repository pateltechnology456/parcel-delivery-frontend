"use client";

import { PageHeading, Button } from "../EnterpriseHome";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgePercent,
  Bike,
  Box,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  Edit3,
  FileText,
  Info,
  LocateFixed,
  MapPin,
  Package,
  QrCode,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
  User,
  Wallet,
  Zap,
} from "lucide-react";
import { orders } from "../data";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

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
  weightPresets: string[];
}

const VEHICLES: Record<VehicleKey, VehicleConfig> = {
  bike: {
    id: "bike",
    name: "2 Wheeler / Scooter",
    sub: "Up to 20 kg",
    capacity: "20 kg max",
    dimensions: "Small parcels & documents",
    eta: "15 - 25 mins",
    icon: Bike,
    baseKm: 2,
    baseFare: 40,
    perKmRate: 8,
    accent: "#1154d9",
    bgAccent: "rgba(17, 84, 217, 0.08)",
    weightPresets: ["Up to 2 kg", "2 - 5 kg", "5 - 10 kg", "10 - 20 kg"],
  },
  tempo: {
    id: "tempo",
    name: "3 Wheeler / Tempo",
    sub: "Up to 500 kg",
    capacity: "500 kg max",
    dimensions: "5.5 ft (L) × 3.5 ft (W)",
    eta: "30 - 40 mins",
    icon: Package,
    baseKm: 2,
    baseFare: 140,
    perKmRate: 18,
    accent: "#ff6b2c",
    bgAccent: "rgba(255, 107, 44, 0.08)",
    weightPresets: ["Up to 100 kg", "100 - 250 kg", "250 - 500 kg"],
  },
  truck: {
    id: "truck",
    name: "Mini Truck (Tata Ace)",
    sub: "Up to 1,000 kg (1 Ton)",
    capacity: "1,000 kg max",
    dimensions: "7 ft (L) × 4.5 ft (W) × 5 ft (H)",
    eta: "40 - 50 mins",
    icon: Truck,
    baseKm: 2,
    baseFare: 280,
    perKmRate: 28,
    accent: "#7957d8",
    bgAccent: "rgba(121, 87, 216, 0.08)",
    weightPresets: ["Up to 300 kg", "300 - 600 kg", "600 - 1000 kg"],
  },
  packers: {
    id: "packers",
    name: "Packers & Movers",
    sub: "Up to 2,000 kg + Helpers",
    capacity: "Full 1/2 BHK Relocation",
    dimensions: "9 ft (L) × 6 ft (W) Covered Container",
    eta: "Scheduled Slot",
    icon: Box,
    baseKm: 2,
    baseFare: 750,
    perKmRate: 45,
    accent: "#2dbb76",
    bgAccent: "rgba(45, 187, 118, 0.08)",
    weightPresets: ["1 RK / Studio", "1 BHK Shifting", "2 BHK Shifting", "Office Cargo"],
  },
};

export function Book() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialVehicle = (searchParams?.get("vehicle") as VehicleKey) || "bike";

  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  const [vehicleType, setVehicleType] = useState<VehicleKey>(
    VEHICLES[initialVehicle] ? initialVehicle : "bike"
  );
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [packageType, setPackageType] = useState("Documents");
  const [packageWeight, setPackageWeight] = useState("Up to 2 kg");
  const [isFragile, setIsFragile] = useState(false);
  const [locating, setLocating] = useState(false);
  const [distanceKm, setDistanceKm] = useState(6.5);
  const [speed, setSpeed] = useState<"express" | "standard">("express");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "wallet" | "cod">("upi");
  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [pickupOtp, setPickupOtp] = useState("4821");
  const [deliveryOtp, setDeliveryOtp] = useState("7390");
  const [isEditing, setIsEditing] = useState(false);
  const [editSenderName, setEditSenderName] = useState("");
  const [editSenderPhone, setEditSenderPhone] = useState("");
  const [editPickup, setEditPickup] = useState("");
  const [editReceiverName, setEditReceiverName] = useState("");
  const [editReceiverPhone, setEditReceiverPhone] = useState("");
  const [editDropoff, setEditDropoff] = useState("");

  const currentVeh = VEHICLES[vehicleType] || VEHICLES.bike;

  const handleLocate = () => {
    setLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const locStr = `Vijay Nagar, Scheme 54, Indore (${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)})`;
          if (isEditing) {
            setEditPickup(locStr);
          } else {
            setPickup(locStr);
          }
          setLocating(false);
          toast.success("Current location detected!");
        },
        () => {
          const locStr = "Vijay Nagar, Indore, MP";
          if (isEditing) {
            setEditPickup(locStr);
          } else {
            setPickup(locStr);
          }
          setLocating(false);
        }
      );
    } else {
      const locStr = "Vijay Nagar, Indore, MP";
      if (isEditing) {
        setEditPickup(locStr);
      } else {
        setPickup(locStr);
      }
      setLocating(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("mock_current_user");
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        if (u.fullName && !name) setName(u.fullName);
        if (u.phone && !phone) setPhone(u.phone);
      } catch (e) {
        console.error("Error reading current user", e);
      }
    }

    const draft = localStorage.getItem("active_booking_draft") || localStorage.getItem("estimate_data");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (parsed.pickup) setPickup(parsed.pickup);
        if (parsed.dropoff) setDropoff(parsed.dropoff);
        const sName = parsed.name || "";
        const sPhone = parsed.phone || "";
        if (sName) setName(sName);
        if (sPhone) setPhone(sPhone);
        setReceiverName(parsed.receiverName || sName);
        setReceiverPhone(parsed.receiverPhone || sPhone);
        if (parsed.vehicle && VEHICLES[parsed.vehicle as VehicleKey]) {
          setVehicleType(parsed.vehicle as VehicleKey);
        }
        if (parsed.distanceKm) {
          setDistanceKm(parsed.distanceKm);
        } else {
          const pLen = (parsed.pickup || "").length;
          const dLen = (parsed.dropoff || "").length;
          setDistanceKm(Math.max(3.2, Number(((pLen + dLen) % 18 + 3.8).toFixed(1))));
        }
      } catch (e) {
        console.error("Error reading draft", e);
      }
    }
  }, []);

  useEffect(() => {
    if (currentVeh.weightPresets && currentVeh.weightPresets.length > 0) {
      setPackageWeight(currentVeh.weightPresets[0]);
    }
  }, [vehicleType, currentVeh]);

  const handleStartEdit = () => {
    setEditSenderName(name);
    setEditSenderPhone(phone);
    setEditPickup(pickup);
    setEditReceiverName(receiverName || name);
    setEditReceiverPhone(receiverPhone || phone);
    setEditDropoff(dropoff);
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

    const sName = editSenderName.trim();
    const sPhone = editSenderPhone.replace(/\D/g, '');
    const rName = editReceiverName.trim() || sName;
    const rPhone = editReceiverPhone.trim() ? editReceiverPhone.replace(/\D/g, '') : sPhone;

    setName(sName);
    setPhone(sPhone);
    setPickup(editPickup);
    setReceiverName(rName);
    setReceiverPhone(rPhone);
    setDropoff(editDropoff);

    const pLen = editPickup.length;
    const dLen = editDropoff.length;
    const calcDist = Math.max(3.2, Number(((pLen + dLen) % 18 + 3.8).toFixed(1)));
    setDistanceKm(calcDist);

    setIsEditing(false);
    toast.success("Route and contact details updated!");
  };

  const extraKm = Math.max(0, distanceKm - currentVeh.baseKm);
  const distanceFare = Math.round(extraKm * currentVeh.perKmRate);
  const baseCalc = currentVeh.baseFare + distanceFare;
  const speedMultiplier = speed === "express" ? 1.2 : 1.0;
  const subtotal = Math.round(baseCalc * speedMultiplier);
  const discount = Math.min(Math.round(subtotal * 0.2), 60);
  const gst = Math.round((subtotal - discount) * 0.05);
  const total = Math.max(30, subtotal - discount + gst);

  const handleNextStep = () => {
    if (!pickup.trim() || !dropoff.trim()) {
      toast.error("Please provide both pickup and delivery locations.");
      return;
    }
    if (!name.trim() || !phone.trim()) {
      toast.error("Please enter sender name and contact number.");
      return;
    }
    setStep("payment");
  };

  const handleConfirmOrder = () => {
    setProcessing(true);
    setTimeout(() => {
      const generatedId = `PT-${Math.floor(1000 + Math.random() * 9000)}`;
      const pOtp = `${Math.floor(1000 + Math.random() * 9000)}`;
      const dOtp = `${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderId(generatedId);
      setPickupOtp(pOtp);
      setDeliveryOtp(dOtp);

      const newOrder = {
        id: generatedId,
        destination: dropoff.split(",")[0] || "Palasia Square, Indore",
        pickup: pickup.split(",")[0] || "Vijay Nagar, Indore",
        type: currentVeh.name,
        date: "Today, Just now",
        status: "In Transit",
        color: "blue",
        amount: `₹${total}`,
        pickupOtp: pOtp,
        deliveryOtp: dOtp,
      };

      orders.unshift(newOrder);
      const savedOrders = JSON.parse(localStorage.getItem("mock_orders") || "[]");
      savedOrders.unshift(newOrder);
      localStorage.setItem("mock_orders", JSON.stringify(savedOrders));

      localStorage.removeItem("active_booking_draft");
      localStorage.removeItem("estimate_data");

      setProcessing(false);
      setStep("success");
      toast.success("Shipment booked successfully!");
    }, 1200);
  };

  if (step === "payment") {
    return (
      <div style={{ maxWidth: '960px', margin: '0 auto', paddingBottom: '60px' }}>
        <PageHeading
          eyebrow="Workspace / Checkout"
          title="Payment & Order Confirmation"
          description="Review your delivery bill, choose a payment method, and generate OTP security keys."
          action={
            <Button variant="secondary" onClick={() => setStep("details")}>
              ← Back to Details
            </Button>
          }
        />

        <div className="payment-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
          <div className="dash-card payment-card" style={{ padding: '24px', borderRadius: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0b2a62', margin: '0 0 16px' }}>
              Select Payment Method
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                onClick={() => setPaymentMethod("upi")}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '16px',
                  borderRadius: '14px',
                  border: paymentMethod === "upi" ? '2px solid #1154d9' : '1px solid #e2e8f0',
                  background: paymentMethod === "upi" ? '#eff6ff' : '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: '#1154d9',
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center'
                }}>
                  <QrCode size={22} />
                </div>
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: '14px', color: '#0b2a62', display: 'block' }}>UPI / Dynamic QR</b>
                  <small style={{ color: '#64748b', fontSize: '12px' }}>Google Pay, PhonePe, Paytm, BHIM</small>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                />
              </div>

              <div
                onClick={() => setPaymentMethod("wallet")}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '16px',
                  borderRadius: '14px',
                  border: paymentMethod === "wallet" ? '2px solid #2dbb76' : '1px solid #e2e8f0',
                  background: paymentMethod === "wallet" ? '#f0fdf4' : '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: '#2dbb76',
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center'
                }}>
                  <Wallet size={22} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <b style={{ fontSize: '14px', color: '#0b2a62' }}>Patel Business Wallet</b>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#2dbb76', background: '#dcfce7', padding: '1px 6px', borderRadius: '4px' }}>
                      Fastest
                    </span>
                  </div>
                  <small style={{ color: '#64748b', fontSize: '12px' }}>Available Balance: ₹ 4,280.00</small>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "wallet"}
                  onChange={() => setPaymentMethod("wallet")}
                />
              </div>

              <div
                onClick={() => setPaymentMethod("cod")}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '16px',
                  borderRadius: '14px',
                  border: paymentMethod === "cod" ? '2px solid #ff6b2c' : '1px solid #e2e8f0',
                  background: paymentMethod === "cod" ? '#fff7ed' : '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: '#ff6b2c',
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center'
                }}>
                  <CreditCard size={22} />
                </div>
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: '14px', color: '#0b2a62', display: 'block' }}>Pay Driver on Pickup (COD)</b>
                  <small style={{ color: '#64748b', fontSize: '12px' }}>Cash or Direct UPI to Driver</small>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
              </div>

            </div>

            {paymentMethod === "upi" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: '20px',
                  padding: '18px',
                  background: '#f8fafc',
                  border: '1px dashed #cbd5e1',
                  borderRadius: '14px',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  width: '130px',
                  height: '130px',
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  margin: '0 auto 12px',
                  display: 'grid',
                  placeItems: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>
                  <QrCode size={100} color="#0b2a62" />
                </div>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                  Scan with any UPI App • Auto-Verifies in 3s
                </p>
              </motion.div>
            )}

            <button
              type="button"
              className="dash-button primary full"
              disabled={processing}
              onClick={handleConfirmOrder}
              style={{
                marginTop: '24px',
                padding: '16px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 800,
                boxShadow: '0 8px 24px rgba(34, 197, 94, 0.35)',
                border: 'none',
                cursor: processing ? 'wait' : 'pointer'
              }}
            >
              {processing ? "Confirming & Dispatching..." : `Pay & Confirm Booking (₹${total})`}
            </button>
          </div>

          <div className="dash-card summary-card" style={{ padding: '24px', borderRadius: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0b2a62', margin: '0 0 16px' }}>
              Shipment Summary
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #e2e8f0' }}>
                <span style={{ color: '#64748b' }}>Selected Vehicle</span>
                <b style={{ color: '#0b2a62' }}>{currentVeh.name}</b>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #e2e8f0' }}>
                <span style={{ color: '#64748b' }}>Estimated Distance</span>
                <b style={{ color: '#0b2a62' }}>{distanceKm} km</b>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #e2e8f0' }}>
                <span style={{ color: '#64748b' }}>Package Type</span>
                <b style={{ color: '#0b2a62' }}>{packageType} ({packageWeight})</b>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #e2e8f0' }}>
                <span style={{ color: '#64748b' }}>Sender & Contact</span>
                <b style={{ color: '#0b2a62' }}>{name} ({phone})</b>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #e2e8f0' }}>
                <span style={{ color: '#64748b' }}>Receiver</span>
                <b style={{ color: '#0b2a62' }}>{receiverName || "Receiver"} ({receiverPhone || phone})</b>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #e2e8f0' }}>
                <span style={{ color: '#64748b' }}>Delivery Speed</span>
                <b style={{ color: speed === "express" ? '#ff6b2c' : '#1154d9', textTransform: 'capitalize' }}>
                  {speed === "express" ? "⚡ Express Priority (15m)" : "Standard Slot"}
                </b>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '6px', fontSize: '16px' }}>
                <b style={{ color: '#0b2a62' }}>Total Payable</b>
                <b style={{ color: '#1154d9' }}>₹{total}</b>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={16} color="#22c55e" />
              <span>Includes 100% money-back guarantee & real-time GPS tracking.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '60px' }}>
        <PageHeading
          eyebrow="Workspace / Booking Confirmed"
          title="Shipment Created Successfully!"
          description={`Order #${orderId} is registered. A delivery partner is being assigned.`}
          action={
            <Button href="/dashboard/orders">
              View All Orders <ArrowRight size={14} />
            </Button>
          }
        />

        <div className="dash-card booking-card" style={{ padding: '0', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.06)' }}>
          <div style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', padding: '36px 24px', color: '#fff', textAlign: 'center' }}>
            <CheckCircle2 size={54} color="#fff" style={{ margin: '0 auto 12px' }} />
            <h2 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: '#fff' }}>Booking Confirmed & Paid</h2>
            <p style={{ margin: '6px 0 0', opacity: 0.9, fontSize: '14px' }}>Order ID: <b>{orderId}</b> • Estimated Arrival: <b>12 Mins</b></p>
          </div>

          <div style={{ padding: '32px' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '18px 24px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>Pickup OTP</span>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#15803d', letterSpacing: '4px' }}>{pickupOtp}</div>
                <small style={{ color: '#166534', fontSize: '11px' }}>Share with pickup driver</small>
              </div>
              <div style={{ width: '1px', height: '45px', background: '#bbf7d0' }} />
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>Delivery Drop OTP</span>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#15803d', letterSpacing: '4px' }}>{deliveryOtp}</div>
                <small style={{ color: '#166534', fontSize: '11px' }}>Share at destination upon receipt</small>
              </div>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0b2a62', marginBottom: '14px' }}>Live Shipment Dispatch Status</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
                  <b style={{ fontSize: '13px', color: '#0b2a62' }}>Order Placed & Payment Verified</b>
                  <small style={{ color: '#64748b', marginLeft: 'auto' }}>Just now</small>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#1154d9', animation: 'pulse 1.5s infinite' }} />
                  <b style={{ fontSize: '13px', color: '#1154d9' }}>Assigning Nearest {currentVeh.name} Driver</b>
                  <small style={{ color: '#64748b', marginLeft: 'auto' }}>In progress</small>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.5 }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#cbd5e1' }} />
                  <span style={{ fontSize: '13px', color: '#64748b' }}>Pickup from {pickup.split(',')[0]}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.5 }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#cbd5e1' }} />
                  <span style={{ fontSize: '13px', color: '#64748b' }}>Delivery to {dropoff.split(',')[0]}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button href={`/dashboard/track?id=${orderId}`} variant="primary" style={{ flex: 1, minHeight: '44px' }}>
                Track Live GPS Map <ArrowRight size={15} />
              </Button>
              <button
                type="button"
                onClick={() => {
                  setStep("details");
                  setPickup("");
                  setDropoff("");
                }}
                className="dash-button secondary"
                style={{ borderRadius: '7px' }}
              >
                Book Another Delivery
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 1: DETAILS & VEHICLE SELECTOR
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '60px' }}>
      <PageHeading
        eyebrow="Workspace / New Shipment"
        title="Book a Delivery"
        description="Choose your vehicle, review pickup & drop route, and get instant driver dispatch."
        action={
          (pickup || dropoff) ? (
            <button
              type="button"
              onClick={() => {
                setPickup("");
                setDropoff("");
                setName("");
                setPhone("");
                setReceiverName("");
                setReceiverPhone("");
                localStorage.removeItem("active_booking_draft");
                localStorage.removeItem("estimate_data");
                toast.success("Form cleared!");
              }}
              className="dash-button secondary"
              style={{ padding: '8px 14px', fontSize: '12px' }}
            >
              Clear Form
            </button>
          ) : undefined
        }
      />

      <div className="booking-layout" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px',
        alignItems: 'start'
      }}>
        
        {/* LEFT COLUMN: Vehicle Selection & Package Specifications */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: Choose Your Vehicle (Matching Fare Estimate Style) */}
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
                const isSelected = vehicleType === vKey;
                const Icon = veh.icon;

                const extra = Math.max(0, distanceKm - veh.baseKm);
                const vBase = veh.baseFare + Math.round(extra * veh.perKmRate);
                const vSpeed = speed === "express" ? 1.2 : 1.0;
                const vSubtotal = Math.round(vBase * vSpeed);
                const vDisc = Math.min(Math.round(vSubtotal * 0.2), 60);
                const vGst = Math.round((vSubtotal - vDisc) * 0.05);
                const vEst = Math.max(30, vSubtotal - vDisc + vGst);

                return (
                  <motion.div
                    key={vKey}
                    onClick={() => setVehicleType(vKey)}
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
                          <span>⚖️ {veh.capacity}</span>
                          <span>•</span>
                          <span>⚡ {veh.eta}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#0b2a62' }}>
                        ₹ {vEst}
                      </div>
                      <small style={{ fontSize: '11px', color: '#64748b' }}>
                        ₹{veh.perKmRate}/km
                      </small>
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
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontWeight: 600, color: '#334155' }}>
                <span>📏 Dimensions: <b>{currentVeh.dimensions}</b></span>
                <span>⚖️ Max Payload: <b>{currentVeh.capacity}</b></span>
              </div>
            </div>
          </div>

          {/* Card 2: Package Specifications & Speed */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0b2a62', margin: '0 0 16px' }}>
              2. Package Specifications & Speed
            </h3>

            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '16px' }}>
              <label>
                Package Type
                <select value={packageType} onChange={(e) => setPackageType(e.target.value)}>
                  <option value="Documents">Documents / Office Files</option>
                  <option value="Electronics">Electronics & Appliances</option>
                  <option value="Apparel">Apparel & Textiles</option>
                  <option value="Food & Medicines">Food & Medicines</option>
                  <option value="Industrial Cargo">Industrial Cargo & Machinery</option>
                  <option value="Household Shifting">Household Furniture & Boxes</option>
                  <option value="Other">Other Goods</option>
                </select>
              </label>

              <label>
                Estimated Weight ({currentVeh.name.split('/')[0].trim()})
                <select value={packageWeight} onChange={(e) => setPackageWeight(e.target.value)}>
                  {currentVeh.weightPresets.map((preset) => (
                    <option key={preset} value={preset}>{preset}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="check-field" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#475569', marginBottom: '18px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isFragile}
                onChange={(e) => setIsFragile(e.target.checked)}
              />
              <span>This package contains fragile or delicate items (Special Handling sticker will be added)</span>
            </label>

            {/* Delivery Speed Selector */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '8px' }}>
                Delivery Speed Option
              </label>
              <div className="speed-options" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: speed === "express" ? '2px solid #1154d9' : '1px solid #e2e8f0',
                    background: speed === "express" ? '#eff6ff' : '#fff',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="radio"
                      name="speed"
                      checked={speed === "express"}
                      onChange={() => setSpeed("express")}
                    />
                    <div>
                      <b style={{ fontSize: '13px', color: '#0b2a62', display: 'block' }}>⚡ Express Priority</b>
                      <small style={{ fontSize: '11px', color: '#64748b' }}>Dispatch in 15 mins</small>
                    </div>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#1154d9', background: '#dce8ff', padding: '2px 6px', borderRadius: '4px' }}>
                    Popular
                  </span>
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: speed === "standard" ? '2px solid #1154d9' : '1px solid #e2e8f0',
                    background: speed === "standard" ? '#eff6ff' : '#fff',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="radio"
                      name="speed"
                      checked={speed === "standard"}
                      onChange={() => setSpeed("standard")}
                    />
                    <div>
                      <b style={{ fontSize: '13px', color: '#0b2a62', display: 'block' }}>Standard Slot</b>
                      <small style={{ fontSize: '11px', color: '#64748b' }}>Scheduled today</small>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Route & Address Details at TOP + Fare Breakdown below */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '90px' }}>
          
          {/* Card 1: Route & Address Details (TOP OF RIGHT COLUMN) */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0b2a62', margin: 0 }}>
                Route & Address Details
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569' }}>Pickup Address *</label>
                      <button
                        type="button"
                        onClick={handleLocate}
                        disabled={locating}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#1154d9',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: 0
                        }}
                      >
                        <LocateFixed size={12} /> {locating ? "Locating..." : "Use GPS"}
                      </button>
                    </div>
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
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px', flexWrap: 'wrap', gap: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <b style={{ fontSize: '13px', color: '#0b2a62' }}>Pickup (Sender)</b>
                        <span style={{ fontSize: '12px', color: '#15803d', background: '#dcfce7', padding: '1px 8px', borderRadius: '99px', fontWeight: 700 }}>
                          {name || "Sender"} • {phone || "Phone not set"}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleLocate}
                        disabled={locating}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#1154d9',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <LocateFixed size={12} /> {locating ? "Locating..." : "Use GPS"}
                      </button>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: pickup ? '#475569' : '#94a3b8', lineHeight: 1.45 }}>
                      {pickup || "Click Edit Route or GPS to add pickup address"}
                    </p>
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
                        {receiverName || name || "Receiver"} • {receiverPhone || phone || "Phone not set"}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: dropoff ? '#475569' : '#94a3b8', lineHeight: 1.45 }}>
                      {dropoff || "Click Edit Route to add destination address"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Fare Summary & Breakdown (MIDDLE OF RIGHT COLUMN) */}
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

            {/* Bill items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#475569' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Base Fare (First {currentVeh.baseKm} km)</span>
                <b style={{ color: '#1e293b' }}>₹ {currentVeh.baseFare}</b>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Distance Fare ({extraKm.toFixed(1)} km × ₹{currentVeh.perKmRate}/km)</span>
                <b style={{ color: '#1e293b' }}>₹ {distanceFare}</b>
              </div>

              {speed === "express" && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ff6b2c' }}>
                  <span>⚡ Express Priority (+20%)</span>
                  <b>+ ₹ {Math.round(baseCalc * 0.2)}</b>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                <span>Pro Member Discount</span>
                <b>- ₹ {discount}</b>
              </div>

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
                  ₹ {total}
                </span>
              </div>
            </div>

            {/* Action button */}
            <motion.button
              type="button"
              onClick={handleNextStep}
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
              Proceed to Payment ({currentVeh.name.split('/')[0].trim()}) <ArrowRight size={18} />
            </motion.button>
          </div>

          {/* Card 3: Guaranteed Trust Badges */}
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
              <span><b>Transit Insurance included</b> up to ₹50,000</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#334155' }}>
              <CheckCircle2 size={18} color="#1154d9" />
              <span><b>OTP Security</b> at pickup & drop delivery</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#334155' }}>
              <Clock3 size={18} color="#ff6b2c" />
              <span><b>Guaranteed 15-min</b> live driver dispatch</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
