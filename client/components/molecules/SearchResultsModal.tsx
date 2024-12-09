import React, { useState } from "react";
import Image from "next/image";
import { LocationObject } from "@/types";
import ItemDisplay from "@/components/molecules/ItemDisplay";  // Reuse ItemDisplay for detailed view
import Modal from "@/components/molecules/Modal";  // Assuming you have a Modal component for the pop-up

interface Props {
  searchResults: LocationObject[];
  onClose: () => void;
}

const SearchResultsModal = ({ searchResults, onClose }: Props) => {
  const [selectedItem, setSelectedItem] = useState<LocationObject | null>(null);

  return (
    <Modal isOpen={true} handleClose={onClose}>
  <div className="p-5 h-[80vh] overflow-auto"> {/* Set height and overflow */}
    {selectedItem ? (
      <ItemDisplay itemToDisplay={selectedItem} closeItem={() => setSelectedItem(null)} />
    ) : (
      <div>
        <h2 className="text-3xl pb-5">Search Results</h2>
        <div className="grid grid-cols-3 gap-5">
          {searchResults.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <Image
                src={item.imageLink}
                width={150}
                height={150}
                alt={item.name}
                className="hover:scale-125 transition-transform"
              />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</Modal>

  );
};

export default SearchResultsModal;
