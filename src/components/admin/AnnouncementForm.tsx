"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AnnouncementFormProps {
  initialData?: {
    id?: string;
    title?: string;
    content?: string;
    summary?: string;
    category?: string;
    badge?: string;
    important?: boolean;
    published?: boolean;
    date?: string;
  };
  isEditing?: boolean;
}

const CATEGORIES = ["General", "Urgent", "Event", "Meeting", "Notice"];

export default function AnnouncementForm({ initialData = {}, isEditing = false }: AnnouncementFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: initialData.title || "",
    content: initialData.content || "",
    summary: initialData.summary || "",
    category: initialData.category || "General",
    badge: initialData.badge || "",
    important: initialData.important ?? false,
    published: initialData.published ?? false,
    date: initialData.date ? initialData.date.split("T")[0] : new Date().toISOString().split("T")[0],
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required.");
      return;
    }

    setLoading(true);
    setError("");

    // Auto-generate summary if empty
    const payload = {
      ...formData,
      summary: formData.summary.trim() || formData.content.slice(0, 120) + "...",
    };

    const url = isEditing ? `/api/announcements/${initialData.id}` : "/api/announcements";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Failed to save announcement.");
      } else {
        router.push("/admin/announcements");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="announcement-form">
      <style jsx>{`
        .announcement-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }
        .form-group.full {
          grid-column: 1 / -1;
        }
        label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #2d5a3d;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        input,
        select,
        textarea {
          padding: 0.625rem 0.875rem;
          border: 1.5px solid #c8e6d5;
          border-radius: 8px;
          font-size: 0.9375rem;
          background: #f8fdf9;
          color: #1a1a1a;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        input:focus,
        select:focus,
        textarea:focus {
          border-color: #123c2a;
          box-shadow: 0 0 0 3px rgba(18, 60, 42, 0.12);
          background: #fff;
        }
        textarea {
          resize: vertical;
          min-height: 180px;
          font-family: inherit;
          line-height: 1.6;
        }
        .section-header {
          font-size: 1rem;
          font-weight: 700;
          color: #123c2a;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e8f5ef;
          margin-bottom: 0.25rem;
        }
        .toggle-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          background: #f0faf5;
          border: 1px solid #c8e6d5;
        }
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }
        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          inset: 0;
          background: #ccc;
          border-radius: 24px;
          cursor: pointer;
          transition: 0.3s;
          border: none;
          box-shadow: none;
          padding: 0;
        }
        .slider:before {
          content: "";
          position: absolute;
          height: 18px;
          width: 18px;
          left: 3px;
          top: 3px;
          background: white;
          border-radius: 50%;
          transition: 0.3s;
        }
        input:checked + .slider { background: #123c2a; }
        input:checked + .slider:before { transform: translateX(20px); }
        .urgent-toggle .slider { background: #ccc; }
        input:checked + .urgent-slider { background: #dc2626 !important; }
        .error-msg {
          background: #fef2f2;
          border: 1px solid #fca5a5;
          color: #dc2626;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
        }
        .form-actions {
          display: flex;
          gap: 0.875rem;
          justify-content: flex-end;
          padding-top: 0.75rem;
          border-top: 1px solid #e8f5ef;
        }
        .btn-cancel {
          padding: 0.625rem 1.5rem;
          border: 1.5px solid #123c2a;
          background: transparent;
          color: #123c2a;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9375rem;
          transition: all 0.2s;
        }
        .btn-cancel:hover { background: #e8f5ef; }
        .btn-submit {
          padding: 0.625rem 1.75rem;
          background: #123c2a;
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9375rem;
          transition: all 0.2s;
        }
        .btn-submit:hover:not(:disabled) { background: #0d2e1f; }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {error && <div className="error-msg">⚠️ {error}</div>}

      <div>
        <div className="section-header">Announcement Details</div>
        <div className="form-grid" style={{ marginTop: "1rem" }}>
          <div className="form-group full">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Annual General Meeting — Save the Date"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input id="date" name="date" type="date" value={formData.date} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="badge">Badge Label (optional)</label>
            <input
              id="badge"
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              placeholder="e.g. New, Important, Action Required"
            />
          </div>
          <div className="form-group full">
            <label htmlFor="summary">Short Summary (auto-generated if empty)</label>
            <input
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Brief one-liner preview of the announcement..."
            />
          </div>
          <div className="form-group full">
            <label htmlFor="content">Full Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write the full announcement content here..."
              required
            />
          </div>
        </div>
      </div>

      <div>
        <div className="section-header">Publishing Settings</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
          <div className="toggle-row">
            <label className="toggle-switch">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
              />
              <span className="slider"></span>
            </label>
            <div>
              <span style={{ fontWeight: 700, color: formData.published ? "#123c2a" : "#666" }}>
                {formData.published ? "🌐 Published — Visible to public" : "📝 Draft — Not visible publicly"}
              </span>
              <div style={{ fontSize: "0.75rem", color: "#6b9e7e", marginTop: "2px" }}>
                Only published announcements appear on the public website.
              </div>
            </div>
          </div>
          <div className="toggle-row">
            <label className="toggle-switch">
              <input
                type="checkbox"
                name="important"
                checked={formData.important}
                onChange={(e) => setFormData((prev) => ({ ...prev, important: e.target.checked }))}
              />
              <span className="slider" style={formData.important ? { background: "#dc2626" } : {}}></span>
            </label>
            <div>
              <span style={{ fontWeight: 700, color: formData.important ? "#dc2626" : "#666" }}>
                {formData.important ? "🔴 Marked as Important" : "Mark as Important"}
              </span>
              <div style={{ fontSize: "0.75rem", color: "#6b9e7e", marginTop: "2px" }}>
                Important announcements are highlighted prominently on the public site.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={() => router.push("/admin/announcements")}>
          Cancel
        </button>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading
            ? "⏳ Saving..."
            : isEditing
            ? "💾 Update Announcement"
            : formData.published
            ? "🌐 Publish Announcement"
            : "📝 Save as Draft"}
        </button>
      </div>
    </form>
  );
}
