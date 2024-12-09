import React, { FC, SVGAttributes } from "react";

export interface CloseIconProps extends SVGAttributes<SVGSVGElement> {}

export const CloseIcon: FC<CloseIconProps> = ({
  ...componentProps
}: CloseIconProps) => {
  return (
    <svg
      width="16"
      height="16"
      {...componentProps}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.67156 16C1.24668 16 0.821803 15.8435 0.486373 15.5082C-0.162124 14.8599 -0.162124 13.7869 0.486373 13.1387L13.1433 0.486203C13.7918 -0.162068 14.8651 -0.162068 15.5136 0.486203C16.1621 1.13447 16.1621 2.20747 15.5136 2.85574L2.85674 15.5082C2.54367 15.8435 2.09644 16 1.67156 16Z" />
      <path d="M14.3284 16C13.9036 16 13.4787 15.8435 13.1433 15.5082L0.486373 2.85574C-0.162124 2.20747 -0.162124 1.13447 0.486373 0.486203C1.13487 -0.162068 2.20825 -0.162068 2.85674 0.486203L15.5136 13.1387C16.1621 13.7869 16.1621 14.8599 15.5136 15.5082C15.1782 15.8435 14.7533 16 14.3284 16Z" />
    </svg>
  );
};
