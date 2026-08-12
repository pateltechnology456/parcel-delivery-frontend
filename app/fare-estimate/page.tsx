import { Navbar } from "@/components/navbar";
import { BadgePercent, Bike, Truck } from "lucide-react";

export default function FareEstimatePage() {
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
                    <b>Ankit Sharma • 8982120711</b>
                    <button className="edit-btn">Edit</button>
                  </div>
                  <p>Sayaji Square, Vijay Nagar, Indore, Madhya Pradesh...</p>
                </div>
              </div>
              
              <div className="timeline-line"></div>
              
              <div className="timeline-item">
                <div className="timeline-marker red"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <b>Ankit Sharma • 8982120711</b>
                    <button className="edit-btn">Edit</button>
                  </div>
                  <p>Solanki Nagar, Indore, Madhya Pradesh, India</p>
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
                  <span className="price">₹ 54</span>
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
                <div className="vehicle-option-price">₹ 120</div>
              </div>
            </div>
            
            <div className="fare-footer">
              <div className="discount-banner">
                <BadgePercent size={14} />
                <span>Get up to 30% off on your first order. *T&C apply</span>
              </div>
              <button className="book-btn">Book Now</button>
            </div>
            
          </div>
          
        </div>
      </div>
    </main>
  );
}
