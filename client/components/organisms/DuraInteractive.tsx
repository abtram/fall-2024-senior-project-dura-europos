import React from "react";
import { motion } from "framer-motion";
import {
  ImageOverlay,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import { MAP_BOUNDS, MAP_CENTER, MAP_HEIGHT, MAP_WIDTH } from "@/constants";
import { useRouter } from "next/router";
import { LOCATIONS } from "@/constants";
import { Location } from "@/types";
import Image from "next/image";

const DuraInteractive = () => {
  const router = useRouter();

  return (
    <div>
      <MapContainer
        center={MAP_CENTER}
        zoom={15.5}
        scrollWheelZoom={false}
        style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ImageOverlay
          url="/dura.jpeg"
          bounds={MAP_BOUNDS}
          opacity={0.6}
          zIndex={10}
        />

        {LOCATIONS.map((location: Location) => {
          return (
            <Marker key={location.key} position={location.latlong}>
              <Popup>
                <div className="flex flex-col items-center gap-3 w-[120px]">
                  <div className="font-primaryBold">{location.name}</div>
                  <div>
                    <Image
                      src={location.image}
                      width={100}
                      height={100}
                      alt={location.key}
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="bg-primary p-3 text-white rounded-lg"
                    onClick={() => router.push(`/${location.key}`)}
                  >
                    View Images
                  </motion.button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default DuraInteractive;
