import React, { FC } from "react";
import { HTMLMotionProps, motion } from "framer-motion";

export interface BackdropProps extends HTMLMotionProps<"div"> {
  handleClose?: () => void;
  anchor?: "left" | "right" | "center" | "top" | "bottom";
  blurHigh?: boolean;
}

export const Backdrop: FC<BackdropProps> = ({
  children,
  handleClose,
  anchor = "center",
  blurHigh = false,
  className,
  ...componentProps
}: BackdropProps) => (
  <motion.div
    {...componentProps}
    className={`
      backdropRoot
      z-50 fixed inset-0
      flex ${
        anchor === "left"
          ? "justify-start items-center"
          : anchor === "right"
          ? "justify-end items-center"
          : anchor === "top"
          ? "justify-center items-start"
          : anchor === "bottom"
          ? "justify-center items-end"
          : "justify-center items-center"
      }
      bg-backdrop backdrop-filter ${
        blurHigh ? "backdrop-blur-xl" : "backdrop-blur-sm"
      } ${className}
    `}
    onClick={handleClose}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);
