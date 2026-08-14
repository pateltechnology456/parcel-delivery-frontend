"use client";

import { Navbar } from "@/components/navbar";
import { BadgePercent, Bike, Truck } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FareEstimatePage() {
  const router = useRouter();
  const [data, setData] = useState({
    pickup: "Sayaji Square, Vijay Nagar, Indore, Madhya Pradesh...",
    dropoff: "Solanki Nagar, Indore, Madhya Pradesh, India",
    name: "Ankit Sharma",
    phone: "8982120711",
    scooterPrice: 54,
    truckPrice: 120
  });

  useEffect(() => {
    const stored = localStorage.getItem("estimate_data");
    if (stored) {
      const parsed = JSON.parse(stored);
      
      const pLen = parsed.pickup ? parsed.pickup.length : 20;
      const dLen = parsed.dropoff ? parsed.dropoff.length : 20;
      const dynamicScooter = Math.floor((pLen + dLen) * 1.5 + 20);
      const dynamicTruck = Math.floor(dynamicScooter * 2.2);

      setData(prev => ({
        pickup: parsed.pickup || prev.pickup,
        dropoff: parsed.dropoff || prev.dropoff,
        name: parsed.name || prev.name,
        phone: parsed.phone || prev.phone,
        scooterPrice: dynamicScooter,
        truckPrice: dynamicTruck
      }));
    }
  }, []);

  const handleBook = () => {
    const user = localStorage.getItem("mock_current_user");
    if (user) {
      router.push("/dashboard/book?vehicle=bike");
    } else {
      router.push("/login?redirect=" + encodeURIComponent("/dashboard/book?vehicle=bike"));
    }
  };

  return (
    <main className="fare-estimate-page">
      <Navbar />
      
      <div className="fare-container">
        <div className="fare-card">
          
          {/* Left Side: Address Details */}
          <div className="fare-left">
            <h3>Address Details</h3>
            
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker green"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <b>{data.name} • {data.phone}</b>
                    <button className="edit-btn">Edit</button>
                  </div>
                  <p>{data.pickup}</p>
                </div>
              </div>
              
              <div className="timeline-line"></div>
              
              <div className="timeline-item">
                <div className="timeline-marker red"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <b>{data.name} • {data.phone}</b>
                    <button className="edit-btn">Edit</button>
                  </div>
                  <p>{data.dropoff}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Vertical Divider */}
          <div className="fare-divider"></div>
          
          {/* Right Side: Select Vehicle */}
          <div className="fare-right">
            <h3>Select Vehicle</h3>
            
            <div className="vehicle-options">
              {/* Option 1: Selected */}
              <div className="vehicle-option selected">
                <div className="vehicle-option-image">
                  <Bike size={40} className="text-blue-600" />
                </div>
                <p className="vehicle-name">Scooter</p>
                <div className="vehicle-details">
                  <span className="weight">20 Kg</span>
                  <span className="price">₹ {data.scooterPrice}</span>
                </div>
              </div>
              
              {/* Option 2: Unselected */}
              <div className="vehicle-option unselected">
                <div className="vehicle-option-left">
                  <Truck size={24} className="text-gray-500" />
                  <div className="vehicle-option-text">
                    <b>Mini Truck</b>
                    <small>500 kg</small>
                  </div>
                </div>
                <div className="vehicle-option-price">₹ {data.truckPrice}</div>
              </div>
            </div>
            
            <div className="fare-footer">
              <div className="discount-banner">
                <BadgePercent size={14} />
                <span>Get up to 30% off on your first order. *T&C apply</span>
              </div>
              <button className="book-btn" onClick={handleBook}>Book Now</button>
            </div>
            
          </div>
          
        </div>
      </div>
    </main>
  );
}
