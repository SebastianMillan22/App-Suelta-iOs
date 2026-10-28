import React from "react";

export default function HamburgerButton({
  onClick,
  isOpen = false,
  color = "#3f6b5b",
  size = 22,
  label = "Abrir menú"
}) {
  return (
    <button
      onClick={onClick}
      id="btn-hamburger-menu"
      aria-label={label}
      title={label}
      style={{
        background: "rgba(111, 168, 146, 0.12)",
        border: "none",
        cursor: "pointer",
        width: 42,
        height: 42,
        borderRadius: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4.5,
        padding: 0,
        transition: "transform 0.2s cubic-bezier(0.34, 1.3, 0.64, 1), background-color 0.2s ease",
        color: color,
        zIndex: 50,
        flexShrink: 0
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.backgroundColor = "rgba(111, 168, 146, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.backgroundColor = "rgba(111, 168, 146, 0.12)";
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(0.92)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <div
        style={{
          width: 19,
          height: 2.2,
          backgroundColor: color,
          borderRadius: 2,
          transition: "transform 0.3s ease, opacity 0.3s ease",
          transform: isOpen ? "rotate(45deg) translate(5px, 5px)" : "none"
        }}
      />
      <div
        style={{
          width: 14,
          height: 2.2,
          backgroundColor: color,
          borderRadius: 2,
          marginLeft: -5,
          transition: "opacity 0.2s ease, width 0.3s ease",
          opacity: isOpen ? 0 : 1
        }}
      />
      <div
        style={{
          width: 19,
          height: 2.2,
          backgroundColor: color,
          borderRadius: 2,
          transition: "transform 0.3s ease",
          transform: isOpen ? "rotate(-45deg) translate(5px, -5px)" : "none"
        }}
      />
    </button>
  );
}
