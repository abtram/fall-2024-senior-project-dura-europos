import React from "react";
import LocationView from "@/components/templates/LocationView";

const LocationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[url('/bg.jpg')] bg-cover bg-no-repeat bg-fixed">
      <LocationView />
    </div>
  );
};

export default LocationPage;
