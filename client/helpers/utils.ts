import { useCallback, useEffect, useState } from "react";

/**
 * Hook that detects changes in window size and triggers a re-render
 *
 * @returns Array containing window width and height
 */

export const useWindowSize = () => {
  const [size, setSize] = useState<number[]>([0, 0]);

  useEffect(() => {
    const updateSize = () => {
      setSize([
        window.innerWidth > window.outerWidth
          ? window.outerWidth
          : window.innerWidth,
        window.innerHeight > window.outerHeight
          ? window.outerHeight
          : window.innerHeight,
      ]);
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

/**
 * Hook that optimizes user interaction with portal components.
 *
 * @param isOpen Open state of portal.
 * @param handleClose Close portal handler.
 *
 * @returns Boolean value of rendering state.
 */
export const usePortalHandlers = (isOpen: boolean, handleClose: () => void) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen || event.key !== "Escape") return;

      handleClose();
    },
    [handleClose, isOpen]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isOpen]);

  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return isBrowser;
};
