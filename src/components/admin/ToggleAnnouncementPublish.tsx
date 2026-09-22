"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ToggleAnnouncementPublish({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  const [isPublished, setIsPublished] = useState(published);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleToggle() {
    setLoading(true);
    try {
      const res = await fetch(`/api/announcements/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !isPublished }),
      });
      if (res.ok) {
        setIsPublished((prev) => !prev);
        router.refresh();
      }
    } catch {
      alert("Failed to update publish status.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      title={isPublished ? "Click to unpublish" : "Click to publish"}
      style={{
        padding: "0.3rem 0.75rem",
        background: isPublished ? "#e8f5ef" : "#f5f5f5",
        color: isPublished ? "#123c2a" : "#666",
        border: `1px solid ${isPublished ? "#a7d7b8" : "#ddd"}`,
        borderRadius: "999px",
        fontSize: "0.775rem",
        fontWeight: 700,
        cursor: loading ? "not-allowed" : "pointer",
        transition: "all 0.2s",
        opacity: loading ? 0.7 : 1,
        whiteSpace: "nowrap",
      }}
    >
      {isPublished ? "🌐 Published" : "📝 Draft"}
    </button>
  );
}
