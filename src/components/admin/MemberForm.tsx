"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface MemberFormProps {
  initialData?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    educationLevel?: string | null;
    institution?: string | null;
    skills?: string | null;
    image?: string | null;
    isActive?: boolean;
    joinedAt?: string;
  };
  isEditing?: boolean;
}

const EDUCATION_LEVELS = [
  "Primary",
  "Secondary",
  "Higher Secondary",
  "Graduate",
  "Post Graduate",
  "Other",
];

export default function MemberForm({ initialData = {}, isEditing = false }: MemberFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string>(initialData.image || "");

  const [formData, setFormData] = useState({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    email: initialData.email ?? "",
    phone: initialData.phone ?? "",
    address: initialData.address ?? "",
    educationLevel: initialData.educationLevel ?? "",
    institution: initialData.institution ?? "",
    skills: initialData.skills ?? "",
    image: initialData.image ?? "",
    isActive: initialData.isActive !== undefined ? initialData.isActive : true,
    joinedAt: initialData.joinedAt ?? "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formPayload = new FormData();
    formPayload.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formPayload });
      const json = await res.json();
      if (json.success) {
        setFormData((prev) => ({ ...prev, image: json.data.url }));
        setImagePreview(json.data.url);
      } else {
        setError("Image upload failed.");
      }
    } catch {
      setError("Image upload failed.");
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("First name and last name are required.");
      return;
    }

    setLoading(true);
    setError("");

    const url = isEditing ? `/api/members/${initialData.id}` : "/api/members";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Failed to save member.");
      } else {
        router.push("/admin/members");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="member-form">
      <style>{`
        .member-form {
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
          min-height: 80px;
        }
        .toggle-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
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
        input:checked + .slider {
          background: #123c2a;
        }
        input:checked + .slider:before {
          transform: translateX(20px);
        }
        .section-header {
          font-size: 1rem;
          font-weight: 700;
          color: #123c2a;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e8f5ef;
          margin-bottom: 0.25rem;
        }
        .image-upload-area {
          border: 2px dashed #c8e6d5;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          background: #f8fdf9;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .image-upload-area:hover {
          border-color: #123c2a;
          background: #eef9f4;
        }
        .image-preview {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #123c2a;
          margin: 0 auto 0.75rem;
          display: block;
        }
        .upload-hint {
          font-size: 0.8125rem;
          color: #6b9e7e;
          margin-top: 0.375rem;
        }
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
        .btn-cancel:hover {
          background: #e8f5ef;
        }
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
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-submit:hover:not(:disabled) {
          background: #0d2e1f;
        }
        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        @media (max-width: 640px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {error && <div className="error-msg">⚠️ {error}</div>}

      <div>
        <div className="section-header">Personal Information</div>
        <div className="form-grid" style={{ marginTop: "1rem" }}>
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Mohamed"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Fousiya"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="member@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
            />
          </div>
          <div className="form-group full">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Puliyamparambu, Kozhikode, Kerala"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="section-header">Education & Skills</div>
        <div className="form-grid" style={{ marginTop: "1rem" }}>
          <div className="form-group">
            <label htmlFor="educationLevel">Education Level</label>
            <select id="educationLevel" name="educationLevel" value={formData.educationLevel} onChange={handleChange}>
              <option value="">-- Select Level --</option>
              {EDUCATION_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="institution">Institution / School / College</label>
            <input
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              placeholder="e.g. Government Arts & Science College"
            />
          </div>
          <div className="form-group full">
            <label htmlFor="skills">Skills</label>
            <input
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. Photography, Public Speaking, Football"
            />
            <span style={{ fontSize: "0.75rem", color: "#6b9e7e" }}>Comma-separated list of skills</span>
          </div>
        </div>
      </div>

      <div>
        <div className="section-header">Profile Image</div>
        <div style={{ marginTop: "1rem" }}>
          <label htmlFor="memberImage" className="image-upload-area">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="image-preview" />
            ) : (
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📷</div>
            )}
            <div style={{ fontWeight: 600, color: "#123c2a", fontSize: "0.9rem" }}>
              {uploadingImage ? "Uploading..." : imagePreview ? "Change Photo" : "Upload Profile Photo"}
            </div>
            <div className="upload-hint">PNG, JPG or WEBP · Max 5MB</div>
          </label>
          <input
            id="memberImage"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            style={{ display: "none" }}
            onChange={handleImageUpload}
            disabled={uploadingImage}
          />
          {imagePreview && (
            <button
              type="button"
              onClick={() => { setImagePreview(""); setFormData((p) => ({ ...p, image: "" })); }}
              style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "#dc2626", background: "none", border: "none", cursor: "pointer" }}
            >
              ✕ Remove photo
            </button>
          )}
        </div>
      </div>

      <div>
        <div className="section-header">Status &amp; Dates</div>
        <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="form-group">
            <label htmlFor="joinedAt">Joined Date</label>
            <input
              id="joinedAt"
              name="joinedAt"
              type="date"
              value={formData.joinedAt}
              onChange={handleChange}
            />
            <span style={{ fontSize: "0.75rem", color: "#6b9e7e" }}>
              Leave blank to use today&apos;s date for new members.
            </span>
          </div>
          <div className="toggle-row">
            <label className="toggle-switch">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
              />
              <span className="slider"></span>
            </label>
            <span style={{ fontWeight: 600, color: formData.isActive ? "#123c2a" : "#999" }}>
              {formData.isActive ? "Active Member" : "Inactive"}
            </span>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={() => router.push("/admin/members")}>
          Cancel
        </button>
        <button type="submit" className="btn-submit" disabled={loading || uploadingImage}>
          {loading ? "⏳ Saving..." : isEditing ? "💾 Update Member" : "➕ Add Member"}
        </button>
      </div>
    </form>
  );
}
