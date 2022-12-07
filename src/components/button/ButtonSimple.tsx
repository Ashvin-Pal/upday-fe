import React from "react";

import "./ButtonSimple.css";

interface ButtonType {
  onClick(): void;
  children: React.ReactNode;
  disabled?: boolean;
}

export function ButtonSimple({ onClick, children, disabled = false }: ButtonType) {
  return (
    <button onClick={onClick} disabled={disabled} className="ButtonSimple">
      <span>{children}</span>
    </button>
  );
}
