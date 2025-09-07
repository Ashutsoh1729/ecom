"use client";
// For demo purposes

import { useState, useEffect } from "react";

export function CommandModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Open modal with Ctrl+K or Cmd+K
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault(); // Prevent browser's default find action
        setIsOpen(true);
      }

      // Close modal with Escape key
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    // Add event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{ padding: "2rem", background: "white", borderRadius: "8px" }}
      >
        <h2>Modal Open</h2>
        <p>Press &apos; Escape &apos; to close.</p>
      </div>
    </div>
  );
}
