import React, {
  Dispatch,
  MutableRefObject,
  ReactEventHandler,
  useRef,
  useState,
} from "react";
import { LocationObject } from "@/types";
import { ImageDisplay, ItemDisplay, Modal } from "@/components";

interface Props {
  groupToDisplay: string | null;
  setGroupToDisplay: Dispatch<React.SetStateAction<string | null>>;
  data: LocationObject[] | undefined;
  scrollPos: MutableRefObject<number>;
  setScrollPos: (pos: number) => void;
}

const TypeModal = ({
  data,
  groupToDisplay,
  setGroupToDisplay,
  scrollPos,
  setScrollPos,
}: Props) => {
  const [itemToDisplay, setItemToDisplay] = useState<LocationObject | null>(
    null
  );

  const modalOpen = useRef<boolean>(Boolean(groupToDisplay));

  const closeGroup = () => {
    setGroupToDisplay(null);
    setItemToDisplay(null);
    modalOpen.current = false;
  };

  const updateScroll = () => {
    let scrollElt = document.getElementById("modalScroller");
    setScrollPos(scrollElt ? scrollElt.scrollTop : 0);
  };

  const setScroll = () => {
    let scrollElt = document.getElementById("modalScroller");
    if (scrollElt) {
      scrollElt.scrollTop = scrollPos.current;
    }
  };

  const changeItem = (item: LocationObject | null) => {
    setItemToDisplay(item);
  };

  const closeItem = () => {
    changeItem(null);
  };

  return (
    <Modal
      isOpen={modalOpen.current}
      handleClose={closeGroup}
      className="[&_.modalCloseButton]:top-5 [&_.modalCloseButton]:right-5 [&_.modalCloseButton]:fill-white"
    >
      <div className="flex flex-row items-center gap-20 h-[80vh] max-w-[80vw]">
        <div
          className={`h-[80vh] max-w-[80vw] bg-gray-700 p-5 rounded-xl overflow-hidden pt-20 flex flex-row ${
            itemToDisplay ? "gap-20" : ""
          }`}
        >
          <ImageDisplay
            data={data}
            changeItem={changeItem}
            groupToDisplay={groupToDisplay}
            updateScroll={updateScroll}
            setScroll={setScroll}
          />
          <ItemDisplay itemToDisplay={itemToDisplay} closeItem={closeItem} />
        </div>
      </div>
    </Modal>
  );
};

export default TypeModal;
