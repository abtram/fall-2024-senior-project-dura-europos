import React, { ReactEventHandler } from "react";
import Image from "next/image";
import { LocationObject } from "@/types";
import startCase from "lodash/startCase";

interface Props {
  data: LocationObject[] | undefined;
  changeItem: (item: LocationObject | null) => void;
  groupToDisplay: string | null;
  setScroll: ReactEventHandler<HTMLDivElement>;
  updateScroll: () => void;
}

const ImageDisplay = ({
  data,
  changeItem,
  groupToDisplay,
  setScroll,
  updateScroll,
}: Props) => {
  return (
    <div
      id="modalScroller"
      className="border-4 border-gray-400 overflow-scroll p-5 h-full"
      onLoad={setScroll}
      onScroll={updateScroll}
    >
      <h2 className="text-3xl pb-5">{startCase(groupToDisplay!)}</h2>
      <div className="flex-1 grid grid-cols-3 gap-5">
        {data
          ?.filter(
            (artObject: LocationObject) => artObject.type === groupToDisplay
          )
          .map((item: LocationObject, index: number) => (
            <a key={index} href="">
              <Image
                key={index}
                src={item.imageLink}
                width={150}
                height={150}
                alt={item.name}
                onMouseEnter={(e) => {
                  (e.target as Element).classList.add("scale-125");
                }}
                onMouseLeave={(e) => {
                  (e.target as Element).classList.remove("scale-125");
                }}
                onClick={(e) => {
                  e.preventDefault();
                  changeItem(item);
                }}
              />
            </a>
          ))}
      </div>
    </div>
  );
};

export default ImageDisplay;
