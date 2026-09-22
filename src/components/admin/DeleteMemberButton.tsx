"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteMemberButton({ id, name }: { id: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    try {
      await fetch(`/api/members/${id}`, { method: "DELETE" });
      router.refresh();
    } catch {
      alert("Failed to delete member.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: "0.375rem 0.75rem",
          background: "#fef2f2",
          color: "#dc2626",
          border: "1px solid #fca5a5",
          borderRadius: "6px",
          fontSize: "0.8rem",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Delete
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "2rem",
              maxWidth: "400px",
              width: "90%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>⚠️</div>
            <h3 style={{ margin: "0 0 0.5rem", color: "#1a1a1a" }}>Delete Member?</h3>
            <p style={{ color: "#666", fontSize: "0.9rem", margin: "0 0 1.5rem" }}>
              Are you sure you want to delete <strong>{name}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button
                onClick={() => setOpen(false)}
                style={{
                  padding: "0.5rem 1.25rem",
                  border: "1.5px solid #ccc",
                  background: "transparent",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                style={{
                  padding: "0.5rem 1.25rem",
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
