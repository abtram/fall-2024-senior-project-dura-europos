import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import ReactFocusLock from "react-focus-lock";
import { usePortalHandlers } from "@/helpers";
import {
  Backdrop,
  BackdropProps,
  CloseIcon,
  CloseIconProps,
} from "@/components";

interface ModalProps extends HTMLMotionProps<"div"> {
  isOpen: boolean;
  handleClose: () => void;
  hideCloseButton?: boolean;
  backdropDismiss?: boolean;
  onExitComplete?: [string, Dispatch<SetStateAction<string>>];
  closeIconProps?: CloseIconProps;
  backdropProps?: BackdropProps;
}

const Modal: FC<ModalProps> = ({
  children,
  className,
  isOpen,
  handleClose,
  hideCloseButton,
  backdropDismiss = true,
  onExitComplete,
  closeIconProps,
  backdropProps,
  ...componentProps
}: ModalProps) => {
  const [trigger, setTrigger] = onExitComplete ?? [undefined, undefined];
  const isBrowser: boolean = usePortalHandlers(isOpen, handleClose);

  if (!isBrowser) return <></>;

  return createPortal(
    <AnimatePresence
      initial={false}
      mode="wait"
      onExitComplete={() =>
        setTrigger && trigger === "fired" && setTrigger("completed")
      }
    >
      {isOpen && (
        <Backdrop
          {...backdropProps}
          handleClose={backdropDismiss ? handleClose : undefined}
        >
          <ReactFocusLock>
            <motion.div
              {...componentProps}
              tabIndex={-1}
              role="dialog"
              aria-modal={true}
              className={`modalRoot relative m-5 p-5
              bg-backgroundPaper dark:bg-darkBackgroundPaper 
              rounded-lg shadow-lg ${className}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              {children as ReactNode}
              {handleClose && !hideCloseButton && (
                <motion.button
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="modalCloseButton absolute top-0 right-0 p-7"
                  onClick={handleClose}
                  aria-label={`Close ${
                    componentProps["aria-label"] || "dialog"
                  }`}
                >
                  <CloseIcon {...closeIconProps} />
                </motion.button>
              )}
            </motion.div>
          </ReactFocusLock>
        </Backdrop>
      )}
    </AnimatePresence>,
    document.getElementById("modal-portal")!
  );
};

export default Modal;
