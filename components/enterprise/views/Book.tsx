import { PageHeading, Button } from "../EnterpriseHome";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, FileText, MapPin, Package, Route, Search, ShieldCheck, Zap, LocateFixed } from "lucide-react";
import { orders } from "../data";

export function Book() {
  const searchParams = useSearchParams();
  const vehicle = searchParams?.get('vehicle') || 'bike';
  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  const [pickup, setPickup] = useState("");
  const [locating, setLocating] = useState(false);

  const handleLocate = () => {
    setLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPickup(`Current Location (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`);
          setLocating(false);
        },
        () => {
          setPickup("Current Location (Indore)");
          setLocating(false);
        }
      );
    } else {
      setPickup("Current Location (Indore)");
      setLocating(false);
    }
  };

  if (step === "payment") {
    return (
      <>
        <PageHeading
          eyebrow="Workspace / New shipment / Payment"
          title="Choose payment method"
          description="Complete your booking by selecting a payment method."
        />
        <div className="booking-layout">
          <div className="dash-card booking-card">
            <div className="form-section">
              <h2>Payment Method</h2>
              <p>Select how you want to pay for this shipment.</p>
              <div className="speed-options" style={{ marginTop: '16px' }}>
                <label>
                  <input type="radio" name="payment" defaultChecked />
                  <span>
                    <b>Razorpay</b>
                    <small>Pay securely via UPI, Cards, or Netbanking</small>
                  </span>
                  <i style={{ background: '#1154d9', color: 'white', borderColor: '#1154d9' }}>Recommended</i>
                </label>
                <label>
                  <input type="radio" name="payment" />
                  <span>
                    <b>Cash on Delivery (COD)</b>
                    <small>Pay when the parcel is delivered</small>
                  </span>
                </label>
              </div>
            </div>
            <button
              className="dash-button primary full"
              onClick={() => {
                const newId = `PT-${2050 + Math.floor(Math.random() * 100)}`;
                orders.unshift({
                  id: newId,
                  destination: "New Delhi, DL",
                  type: vehicle === "bike" ? "Local delivery" : "Express delivery",
                  date: "Today, Just now",
                  status: "Pending",
                  color: "orange",
                  amount: "₹840",
                });
                setStep("success");
              }}
            >
              Confirm Booking (Pay ₹840) <ArrowRight />
            </button>
            <button
              className="dash-button secondary full"
              style={{ marginTop: '12px' }}
              onClick={() => setStep("details")}
            >
              Back to details
            </button>
          </div>
          <div className="booking-aside">
            <div className="dash-card estimate-card">
              <h2>Estimated cost</h2>
              <strong>₹840</strong>
              <span>Express delivery</span>
              <div className="estimate-line">
                <span>Base fare</span>
                <b>₹720</b>
              </div>
              <div className="estimate-line">
                <span>GST (18%)</span>
                <b>₹120</b>
              </div>
              <div className="estimate-total">
                <span>Total</span>
                <b>₹840</b>
              </div>
              <p>
                <ShieldCheck /> Secure payments powered by Razorpay.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (step === "success") {
    return (
      <>
        <PageHeading
          eyebrow="Workspace / Receipt"
          title="Order Confirmed"
          description="Your shipment has been created successfully."
          action={
            <Button href="/dashboard/orders">
              View all orders <ArrowRight />
            </Button>
          }
        />
        <div className="booking-layout">
          <div className="dash-card booking-card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ background: '#2eaf6b', padding: '32px 24px', color: 'white', textAlign: 'center' }}>
              <CheckCircle2 size={48} color="white" style={{ margin: '0 auto 16px' }} />
              <h2 style={{ fontSize: '24px', fontWeight: 600, margin: 0, color: 'white' }}>Payment Successful</h2>
              <p style={{ opacity: 0.9, marginTop: '8px' }}>Your booking has been confirmed and a driver is being assigned.</p>
            </div>
            
            <div style={{ padding: '32px 24px' }}>
              <h3 style={{ fontSize: '14px', color: '#8a99ac', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Receipt Details</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px dashed #dfe7f1', marginBottom: '16px' }}>
                <span style={{ color: '#4b5b72' }}>Order ID</span>
                <b style={{ color: '#0b2a62' }}>PT-2051</b>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px dashed #dfe7f1', marginBottom: '16px' }}>
                <span style={{ color: '#4b5b72' }}>Vehicle Type</span>
                <b style={{ color: '#0b2a62', textTransform: 'capitalize' }}>{vehicle}</b>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px dashed #dfe7f1', marginBottom: '16px' }}>
                <span style={{ color: '#4b5b72' }}>Route</span>
                <b style={{ color: '#0b2a62' }}>Indore to New Delhi</b>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px dashed #dfe7f1', marginBottom: '24px' }}>
                <span style={{ color: '#4b5b72' }}>Payment Method</span>
                <b style={{ color: '#0b2a62' }}>Razorpay</b>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <Button href="/dashboard/track">Track shipment</Button>
                <Button href="/dashboard/orders" variant="secondary">Go to Orders</Button>
              </div>
            </div>
          </div>
          
          <div className="booking-aside">
            <div className="dash-card estimate-card">
              <h2>Amount Paid</h2>
              <strong>₹840</strong>
              <div style={{ marginTop: '16px', borderTop: '1px solid #dfe7f1', paddingTop: '16px' }}>
                <div className="estimate-line">
                  <span>Base fare</span>
                  <b>₹720</b>
                </div>
                <div className="estimate-line">
                  <span>GST (18%)</span>
                  <b>₹120</b>
                </div>
                <div className="estimate-total">
                  <span>Total</span>
                  <b>₹840</b>
                </div>
              </div>
              <div style={{ marginTop: '16px', padding: '12px', background: '#f5f8fc', borderRadius: '6px', fontSize: '11px', color: '#4b5b72', display: 'flex', gap: '8px' }}>
                <FileText size={14} color="#1154d9" />
                A copy of this receipt has been sent to your registered email.
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeading
        eyebrow="Workspace / New shipment"
        title="Book a delivery"
        description="Tell us where it needs to go. We’ll handle the rest."
      />
      <div className="booking-layout">
        <div className="dash-card booking-card">
          <div className="form-section">
            <h2>Route details</h2>
            <p>Choose your pickup and destination.</p>
            <div className="route-fields">
              <label>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '6px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4b5b72', fontSize: '13px', fontWeight: 600 }}>
                    <MapPin size={16} /> Pickup location
                  </span>
                  <button type="button" onClick={handleLocate} disabled={locating} style={{ background: 'none', border: 'none', color: '#1154d9', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}>
                    <LocateFixed size={14} /> {locating ? "Locating..." : "Use current location"}
                  </button>
                </div>
                <input 
                  placeholder="Search pickup address" 
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                />
              </label>
              <label>
                <span>
                  <MapPin /> Delivery location
                </span>
                <input placeholder="Search destination" />
              </label>
            </div>
          </div>
          <div className="form-section">
            <h2>Package details</h2>
            <p>Help us move it safely.</p>
            <div className="form-grid">
              <label>
                Vehicle type
                <select defaultValue={vehicle}>
                  <option value="truck">Trucks</option>
                  <option value="bike">2 Wheeler</option>
                  <option value="packers">Packers & Movers</option>
                </select>
              </label>
              <label>
                Package type
                <select defaultValue="Documents">
                  <option>Documents</option>
                  <option>Electronics</option>
                  <option>Fragile goods</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                Weight
                <select defaultValue="Up to 2 kg">
                  <option>Up to 2 kg</option>
                  <option>2–5 kg</option>
                  <option>5–10 kg</option>
                  <option>10+ kg</option>
                </select>
              </label>
            </div>
            <label className="check-field">
              <input type="checkbox" /> This package contains fragile items
            </label>
          </div>
          <div className="form-section">
            <h2>Delivery speed</h2>
            <div className="speed-options">
              <label>
                <input type="radio" name="speed" defaultChecked />
                <span>
                  <b>Express</b>
                  <small>Fastest · from ₹840</small>
                </span>
                <i>Recommended</i>
              </label>
              <label>
                <input type="radio" name="speed" />
                <span>
                  <b>Standard</b>
                  <small>Reliable · from ₹540</small>
                </span>
              </label>
            </div>
          </div>
          <button
            className="dash-button primary full"
            onClick={() => setStep("payment")}
            style={{ marginTop: '24px' }}
          >
            Continue to payment <ArrowRight />
          </button>
        </div>
        <div className="booking-aside">
          <div className="dash-card estimate-card">
            <h2>Estimated cost</h2>
            <strong>₹840</strong>
            <span>Express delivery</span>
            <div className="estimate-line">
              <span>Base fare</span>
              <b>₹720</b>
            </div>
            <div className="estimate-line">
              <span>GST (18%)</span>
              <b>₹120</b>
            </div>
            <div className="estimate-total">
              <span>Total</span>
              <b>₹840</b>
            </div>
            <p>
              <ShieldCheck /> No hidden charges. Pay from your wallet after
              review.
            </p>
          </div>
          <div className="booking-tip">
            <Zap />
            <span>
              <b>Pro tip</b>
              <small>Save 12% by adding multiple shipments together.</small>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
