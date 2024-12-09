import React, { useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLocationObjects, useWindowSize } from "@/helpers";
import { Location, LocationObject } from "@/types";
import { useRouter } from "next/router";
import { LOCATIONS } from "@/constants";
import BackButton from "../atoms/BackButton"; // Import the BackButton component

type GroupedLocationObjects = {
  [key: string]: LocationObject[];
};

const LocationView = () => {
  const router = useRouter();
  const { location } = router.query;

  const { isLoading, data } = useLocationObjects();
  const [winWidth] = useWindowSize();

  const scrollPos = useRef(0);

  const setScrollPos = (pos: number) => {
    scrollPos.current = pos;
  };

  const groupByType = (
    artObjects: LocationObject[]
  ): GroupedLocationObjects => {
    const groupedArtObjects: GroupedLocationObjects = {};

    artObjects.forEach((artObject) => {
      const type = artObject.type;

      if (groupedArtObjects[type]) {
        groupedArtObjects[type].push(artObject);
      } else {
        groupedArtObjects[type] = [artObject];
      }
    });
    const sortedObjs = sortBySize(groupedArtObjects);
    return Object.fromEntries(sortedObjs);
  };

  const sortBySize = (groupedArtObjects: GroupedLocationObjects) => {
    return Object.entries(groupedArtObjects).sort(
      (a, b) => b[1].length - a[1].length
    );
  };

  const calculateSize = (count: number) => {
    const baseSize = 100 + count * 10;
    const maxSize = winWidth && winWidth * 0.8;
    const maxImageSize = 400;
    // origin: return maxSize && Math.min(baseSize, maxSize);
    // v1: return maxSize ? Math.min(Math.min(baseSize, maxSize), maxImageSize) : baseSize;
    if (!maxSize) {
      // If maxSize is undefined, just return the base size capped at maxImageSize.
      return Math.min(baseSize, maxImageSize);
    }
  
    if (baseSize <= maxSize) {
      // If the base size is smaller than or equal to maxSize,
      // return the base size capped at maxImageSize.
      return Math.min(baseSize, maxImageSize);
    }
  
    // Calculate the scaling factor based on the ratio of maxSize to baseSize.
    const scaleFactor = maxSize / baseSize;
  
    // Scale the base size by the scaling factor and return the result capped at maxImageSize.
    return Math.min(baseSize * scaleFactor, maxImageSize);
  };

  

  const getRandomObject = (items: LocationObject[]) => {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  };

  const [groupToDisplay, setGroupToDisplay] = useState<string | null>(null);

  const openGroup = (type: string) => {
    setGroupToDisplay(type);
  };

  const TypeModal = dynamic(() => import("../organisms/TypeModal"), {
    ssr: false,
  });

  return (
    <div className="w-[97%] min-h-screen flex flex-col justify-center items-center z-10 border-black">
      <BackButton label="← Back to Map"
      className="text-black"
      style={{
        position: 'fixed',
        top: '1rem',
        left: '1rem',
        color: 'black',
      }}/>
      <div className="flex flex-col justify-center items-center mt-10 mb-10 bg-yellow-500/75 rounded-lg text-black border-black border-4">
        {isLoading ? (
          <div className="px-5">
            <div className="bg-slate-400 min-w-[600px] w-5/6 h-[80px] animate-pulse mt-5 rounded-xl" />
            <div className="text-2xl mt-4 pb-5 px-5">
              <p>Location Description Placeholder</p>
            </div>
          </div>
        ) : (
          <>
            <div className="text-6xl tracking-widest pt-5 px-5">
              {
                LOCATIONS.find(
                  (keyLocation: Location) => keyLocation.key === location
                )?.name
              }
            </div>
            <div className="mt-4 pb-5 px-5 text-center">
              <p>
              {
                LOCATIONS.find(
                  (keyLocation: Location) => keyLocation.key === location
                )?.description || "No description available for this location."
              }
              </p>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-wrap h-[75vh] items-center justify-center gap-3 bg-yellow-500/40 z-20 border-black border-4 overflow-scroll w-full">
        {isLoading ? (
          <div className="w-full h-full flex flex-col justify-center items-center">
            Loading...
          </div>
        ) : data ? (
          Object.entries(groupByType(data)).map(([type, items]) => {
            const size = calculateSize(items.length);
            const object = getRandomObject(items);
            return (
              <div
                key={type}
                className="relative p-2 group overflow-clip cursor-pointer my-5 border-4 border-black w-full"
                style={{
                  width: size,
                  height: size,
                }}
                onClick={() => openGroup(type)}
              >
                <h2 className="text-sm font-bold bg-black w-fit px-1 z-20">
                  {type.toUpperCase()} - ({items.length})
                </h2>
                <Image
                  src={object.imageLink}
                  fill
                  alt={object.name}
                  className="-z-10 transition duration-500 group-hover:scale-110"
                />
              </div>
            );
          })
        ) : (
          <div>no data</div>
        )}
      </div>
      <TypeModal
        groupToDisplay={groupToDisplay}
        setGroupToDisplay={setGroupToDisplay}
        data={data}
        scrollPos={scrollPos}
        setScrollPos={setScrollPos}
      />
    </div>
  );
};

export default LocationView;
