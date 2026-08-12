import { PageHeading, Button } from "../EnterpriseHome";
import Link from "next/link";
import { useState } from "react";
import { MapPin, Truck } from "lucide-react";
import { orders } from "../data";

export function MapPreview() {
  return (
    <div className="track-map">
      <div className="map-grid" />
      <div className="map-road road-a" />
      <div className="map-road road-b" />
      <div className="map-road road-c" />
      <span className="map-place place-a">Mumbai</span>
      <span className="map-place place-b">Indore</span>
      <span className="map-place place-c">Bengaluru</span>
      <div className="map-route-line" />
      <div className="map-marker marker-start">
        <MapPin />
      </div>
      <div className="map-marker marker-end">
        <Truck />
      </div>
      <div className="map-truck-label">
        <span className="live-pulse" /> On the move <b>ETA 08:58 AM</b>
      </div>
    </div>
  );
}
