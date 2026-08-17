import { PageHeading, Button } from "../EnterpriseHome";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Bell, CheckCircle2, MapPin, Search, Truck } from "lucide-react";
import { MapPreview } from "./MapPreview";
import toast from "react-hot-toast";

export function Track() {
  const [id, setId] = useState("PT-2048");
  const [tracking, setTracking] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [orderInfo, setOrderInfo] = useState<any>(null);

  const handleTrack = () => {
    setTracking(true);
    setTimeout(() => {
      const saved = JSON.parse(localStorage.getItem('mock_orders') || '[]');
      const found = saved.find((o: any) => o.id === id);
      if (found) {
        setOrderInfo(found);
      } else if (id !== "PT-2048") {
        toast.error("Order not found. Showing sample tracking info.");
      }
      setTracking(false);
    }, 800);
  };

  return (
    <>
      <PageHeading
        eyebrow="Workspace / Tracking"
        title="Track a parcel"
        description="Real-time visibility for every shipment, every mile."
      />
      <div className="track-search">
        <Search />
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter tracking ID"
        />
        <button onClick={handleTrack} disabled={tracking}>
          {tracking ? "Searching..." : "Track shipment"} <ArrowRight />
        </button>
      </div>
      <div className="track-layout" style={{ opacity: tracking ? 0.5 : 1, transition: 'opacity 0.2s' }}>
        <div className="dash-card track-card">
          <div className="track-card-heading">
            <div>
              <span className="track-status">
                <i /> {orderInfo?.status || "In transit"}
              </span>
              <h2>{id}</h2>
              <p>{orderInfo?.type || "Express delivery"} · Booked today · To: {orderInfo?.destination || "Indore"}</p>
            </div>
            <button className={`outline-button ${subscribed ? 'active' : ''}`} onClick={() => setSubscribed(!subscribed)}>
              <Bell /> {subscribed ? "Updates on" : "Get updates"}
            </button>
          </div>
          <MapPreview />
          <div className="timeline">
            <div className="timeline-item done">
              <span>
                <CheckCircle2 />
              </span>
              <div>
                <b>Shipment picked up</b>
                <small>Indore, MP · Today, 08:12 AM</small>
              </div>
            </div>
            <div className="timeline-item done">
              <span>
                <CheckCircle2 />
              </span>
              <div>
                <b>In transit to destination</b>
                <small>On route · Today, 08:32 AM</small>
              </div>
            </div>
            <div className="timeline-item current">
              <span>
                <Truck />
              </span>
              <div>
                <b>Out for delivery</b>
                <small>Expected today by 09:14 AM</small>
              </div>
            </div>
            <div className="timeline-item">
              <span>
                <MapPin />
              </span>
              <div>
                <b>Delivered</b>
                <small>Pending</small>
              </div>
            </div>
          </div>
        </div>
        <div className="dash-card shipment-summary">
          <h2>Shipment summary</h2>
          <div className="summary-row">
            <span>From</span>
            <b>Vijay Nagar, Indore</b>
          </div>
          <div className="summary-row">
            <span>To</span>
            <b>HSR Layout, Bengaluru</b>
          </div>
          <div className="summary-row">
            <span>Recipient</span>
            <b>Rohan Mehta</b>
          </div>
          <div className="summary-row">
            <span>Package</span>
            <b>2.5 kg · Electronics</b>
          </div>
          <Button href={`/dashboard/orders/${id}`} variant="secondary">
            View order details <ArrowRight />
          </Button>
        </div>
      </div>
    </>
  );
}
