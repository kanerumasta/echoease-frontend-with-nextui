"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { z } from "zod";

import { BookInSchema } from "@/schemas/booking-schemas";

export const MyMap = ({
  booking,
}: {
  booking: z.infer<typeof BookInSchema>;
}) => {
  const eventLocation: [number, number] =
    booking.latitude && booking.longitude
      ? [booking.latitude, booking.longitude]
      : [0, 0];
  // Fix for Leaflet Marker icons
  const DefaultIcon = L.icon({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div className="h-96 mt-6 rounded-lg overflow-hidden">
      <MapContainer center={eventLocation} className="h-full w-full" zoom={13}>
        {/* Map Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker */}
        <Marker position={eventLocation}>
          <Popup>
            <strong>{booking.venue?.toUpperCase() || "Event Venue"}</strong>
            <br />
            {booking.location}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
