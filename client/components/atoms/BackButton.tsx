import React, { CSSProperties } from 'react';
import { useRouter } from 'next/router';

type BackButtonProps = {
  onClick?: () => void;
  label?: string;
  style?: CSSProperties;
};

const BackButton: React.FC<BackButtonProps> = ({ onClick, label = "← Back", style }) => {
  const router = useRouter(); // Initialize router here

  const handleClick = () => {
    if (onClick) {
      onClick(); // Call the provided onClick function if it exists
    } else {
      router.push("/"); // Default action: go to homepage ("/")
    }
  };

  return (
    <button
      onClick={handleClick}
      style={style}
      className="text-blue-300 hover:text-blue-500 mb-4 text-lg"
    >
      {label}
    </button>
  );
};

export default BackButton;
