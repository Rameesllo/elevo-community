"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ToggleMemberActive({ id, isActive }: { id: string; isActive: boolean }) {
  const [active, setActive] = useState(isActive);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleToggle() {
    setLoading(true);
    try {
      const res = await fetch(`/api/members/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !active }),
      });
      if (res.ok) {
        setActive((prev) => !prev);
        router.refresh();
      }
    } catch {
      alert("Failed to update status.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      title={active ? "Click to deactivate" : "Click to activate"}
      style={{
        position: "relative",
        display: "inline-block",
        width: "44px",
        height: "24px",
        background: "none",
        border: "none",
        cursor: loading ? "not-allowed" : "pointer",
        padding: 0,
        opacity: loading ? 0.7 : 1,
      }}
    >
      <div
        style={{
          width: "44px",
          height: "24px",
          borderRadius: "24px",
          background: active ? "#123c2a" : "#ccc",
          transition: "background 0.3s",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "3px",
            left: active ? "23px" : "3px",
            width: "18px",
            height: "18px",
            background: "white",
            borderRadius: "50%",
            transition: "left 0.3s",
          }}
        />
      </div>
    </button>
  );
}
