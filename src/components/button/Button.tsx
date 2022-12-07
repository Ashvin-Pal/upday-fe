import React from "react";

import "./Button.css";

interface ButtonType {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

export function Button({
  onClick = () => {},
  children,
  disabled = false,
  type = undefined,
}: ButtonType) {
  return (
    <button onClick={onClick} disabled={disabled} type={type} className="Button">
      {children}
    </button>
  );
}
