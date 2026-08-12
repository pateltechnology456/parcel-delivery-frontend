import { Shell, DashboardPage } from "../enterprise/EnterpriseHome";
import {
  ArrowUpRight,
  ChevronRight,
  Megaphone,
} from "lucide-react";
import Link from "next/link";

export function CustomerHome({
  section,
  orderId,
}: {
  section?: string;
  orderId?: string;
}) {
  return (
    <Shell>
      {section ? (
        <DashboardPage section={section} orderId={orderId} />
      ) : (
        <div className="retail-shell" style={{ minHeight: 'auto', paddingBottom: 0 }}>
          <div className="retail-main">
          {/* Top Header */}
          <div className="retail-header">
            <div className="retail-location-picker">
              <span className="location-icon green">
                <ArrowUpRight size={16} />
              </span>
              <div className="location-text">
                <b>Pick up from</b>
                <small>Solanki Nagar, Madhya Pradesh 452011, India</small>
              </div>
              <ChevronRight size={18} className="chevron" />
            </div>
          </div>

          {/* Services Grid */}
          <div className="retail-services-grid">
            <Link href="/dashboard/book?vehicle=truck" className="retail-service-card">
              <div className="service-image-placeholder">
                <img src="/images/truck.png" alt="Truck" />
              </div>
              <div className="service-content">
                <b>Trucks</b>
                <ChevronRight size={16} />
              </div>
            </Link>
            <Link href="/dashboard/book?vehicle=bike" className="retail-service-card">
              <div className="service-image-placeholder">
                <img src="/images/bike.png" alt="2 Wheeler" />
              </div>
              <div className="service-content">
                <b>2 Wheeler</b>
                <ChevronRight size={16} />
              </div>
            </Link>
            <Link href="/dashboard/book?vehicle=packers" className="retail-service-card">
              <div className="service-image-placeholder">
                <img src="/images/packers.png" alt="Packers and Movers" />
              </div>
              <div className="service-content">
                <b>Packers & Movers</b>
                <ChevronRight size={16} />
              </div>
            </Link>
          </div>

          {/* Rewards Banner */}
          <div className="retail-banner rewards-banner">
            <div className="rewards-icon-wrap">
              <img src="/images/coin.png" alt="Rewards Coin" />
            </div>
            <div className="banner-text">
              <b>Explore Patel Rewards</b>
              <small>Earn rewards on your deliveries</small>
            </div>
            <ChevronRight size={18} className="chevron" />
          </div>

          {/* Announcements */}
          <div className="retail-announcements">
            <div className="announcement-header">
              <h3>Announcements</h3>
              <button>View all <ChevronRight size={16} /></button>
            </div>
            <div className="announcement-card">
              <div className="announcement-icon-wrap">
                <Megaphone size={24} color="#1d6bff" />
              </div>
              <div className="announcement-text">
                <b>Make your next move smooth and safe</b>
              </div>
              <ChevronRight size={18} className="chevron" />
            </div>
            <div className="announcement-dots">
              <span className="dot active" />
              <span className="dot" />
            </div>
          </div>
          </div>
        </div>
      )}
    </Shell>
  );
}
