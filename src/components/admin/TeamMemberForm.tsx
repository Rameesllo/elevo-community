"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TeamMember } from "@/types";
import {
  User,
  Briefcase,
  Layers,
  Mail,
  Phone,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  ArrowLeft,
  Save,
  ImageIcon,
} from "lucide-react";

interface TeamMemberFormProps {
  initialData?: TeamMember;
  isEdit?: boolean;
}

export default function TeamMemberForm({
  initialData,
  isEdit = false,
}: TeamMemberFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(initialData?.name || "");
  const [role, setRole] = useState(initialData?.role || "");
  const legacyMap: Record<string, string> = {
    "Executive Committee": "Current Team",
    "Office Bearers": "Current Team",
    "Program Coordinators": "Current Team",
    "Youth Wing": "Current Team",
  };
  const [department, setDepartment] = useState(
    (initialData?.department && legacyMap[initialData.department]) || initialData?.department || "Current Team"
  );
  const [email, setEmail] = useState(initialData?.email || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [initials, setInitials] = useState(initialData?.initials || "");
  const [badge, setBadge] = useState(initialData?.badge || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [linkedin, setLinkedin] = useState((initialData as any)?.linkedin || "");
  const [instagram, setInstagram] = useState((initialData as any)?.instagram || "");
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);
  const [displayOrder, setDisplayOrder] = useState(initialData?.displayOrder ?? 0);

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload image");
      }

      setImage(data.data.url);
    } catch (err: any) {
      setError(err.message || "Failed to upload photo");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const autoInitials =
      initials.trim() ||
      name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 3);

    const payload = {
      name,
      role,
      department,
      bio: null,
      email: email || null,
      phone: phone || null,
      initials: autoInitials,
      badge: badge || null,
      image: image || null,
      linkedin: linkedin || null,
      instagram: instagram || null,
      isActive,
      displayOrder: Number(displayOrder) || 0,
    };

    try {
      const url = isEdit ? `/api/team/${initialData?.id}` : "/api/team";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save team member");
      }

      setSuccess(
        isEdit
          ? "Team member updated successfully!"
          : "Team member created successfully!"
      );
      setTimeout(() => {
        router.push("/admin/team");
        router.refresh();
      }, 800);
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    if (
      !confirm(
        `Are you sure you want to remove ${initialData.name} from the team directory?`
      )
    )
      return;

    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/team/${initialData.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete team member");
      }

      router.push("/admin/team");
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Could not delete member");
      setDeleteLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back link & Delete button */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/admin/team"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Team Directory
        </Link>

        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteLoading}
            className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-xl transition-colors border border-red-200 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {deleteLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
            Delete Member
          </button>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-forest/10 shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-forest">
            {isEdit ? "Edit Team Member" : "Add New Team Member"}
          </h2>
          <p className="text-xs text-dark-text/60 mt-1">
            Configure coordinator profile details, department role, order priority, and photo.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo Upload Box */}
          <div className="bg-mint-fog/30 p-5 rounded-2xl border border-forest/15 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-24 h-24 rounded-2xl bg-forest/10 border-2 border-forest/20 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
              {image ? (
                <Image
                  src={image}
                  alt="Profile Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-xl font-black text-forest">
                  {initials || (name ? name.slice(0, 2).toUpperCase() : "TM")}
                </span>
              )}

              {uploading && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center text-white">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              )}
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <h4 className="text-xs font-bold text-dark-text">Profile Photograph</h4>
              <p className="text-[11px] text-dark-text/60">
                Upload a headshot (PNG, JPG, WEBP). Recommended size 400x400px.
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="px-3.5 py-1.5 bg-forest hover:bg-forest/90 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{image ? "Change Photo" : "Upload Photo"}</span>
                </button>

                {image && (
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="px-3 py-1.5 bg-white border border-forest/20 text-red-600 hover:bg-red-50 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Name & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-dark-text uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-forest" /> Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Arjun Menon"
                className="w-full px-4 py-3 bg-mint-fog/30 border border-forest/15 rounded-xl text-sm font-medium text-dark-text placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-dark-text uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-forest" /> Role / Title *
              </label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. President / Sports Director"
                className="w-full px-4 py-3 bg-mint-fog/30 border border-forest/15 rounded-xl text-sm font-medium text-dark-text placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Department & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-dark-text uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-forest" /> Layer / Team Group *
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as any)}
                className="w-full px-4 py-3 bg-mint-fog/30 border border-forest/15 rounded-xl text-sm font-medium text-dark-text focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all cursor-pointer"
              >
                <option value="Founders">Founders — Layer 1</option>
                <option value="Current Team">Current Team — Layer 2</option>
                <option value="Alumni">Alumni — Layer 3</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-dark-text uppercase tracking-wider mb-2">
                Badge Label (Optional)
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Executive Head / Technology"
                className="w-full px-4 py-3 bg-mint-fog/30 border border-forest/15 rounded-xl text-sm font-medium text-dark-text placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-dark-text uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-forest" /> Email (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="member@elevo.org"
                className="w-full px-4 py-3 bg-mint-fog/30 border border-forest/15 rounded-xl text-sm font-medium text-dark-text placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-dark-text uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-forest" /> Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 bg-mint-fog/30 border border-forest/15 rounded-xl text-sm font-medium text-dark-text placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* LinkedIn & Instagram */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-dark-text uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 text-forest flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.96 0-1.74-.79-1.74-1.76s.78-1.76 1.74-1.76 1.74.79 1.74 1.76-.78 1.76-1.74 1.76zm15.5 12.27h-3v-5.6c0-1.34-.03-3.06-1.86-3.06-1.86 0-2.15 1.45-2.15 2.95v5.71h-3s.04-9.26 0-11h3v1.56c.4-.62 1.11-1.5 2.71-1.5 1.98 0 3.47 1.29 3.47 4.06v6.88z"/></svg>
                </span> LinkedIn URL (Optional)
              </label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-4 py-3 bg-mint-fog/30 border border-forest/15 rounded-xl text-sm font-medium text-dark-text placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-dark-text uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 text-forest flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.22a3.7 3.7 0 01-.9 1.38 3.7 3.7 0 01-1.38.9c-.42.16-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.05-.41-2.22C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.22-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.15 0-3.52.01-4.77.07-1.08.05-1.67.23-2.06.38-.52.2-.89.44-1.28.83-.39.39-.63.76-.83 1.28-.15.39-.33.98-.38 2.06C2.65 8.83 2.64 9.2 2.64 12s.01 3.17.07 4.42c.05 1.08.23 1.67.38 2.06.2.52.44.89.83 1.28.39.39.76.63 1.28.83.39.15.98.33 2.06.38 1.25.06 1.62.07 4.77.07s3.52-.01 4.77-.07c1.08-.05 1.67-.23 2.06-.38.52-.2.89-.44 1.28-.83.39-.39.63-.76.83-1.28.15-.39.33-.98.38-2.06.06-1.25.07-1.62.07-4.42s-.01-3.17-.07-4.42c-.05-1.08-.23-1.67-.38-2.06a2.7 2.7 0 00-.83-1.28 2.7 2.7 0 00-1.28-.83c-.39-.15-.98-.33-2.06-.38C15.52 3.97 15.15 3.96 12 3.96zm0 3.06a5.98 5.98 0 110 11.96 5.98 5.98 0 010-11.96zm0 1.8a4.18 4.18 0 100 8.36 4.18 4.18 0 000-8.36zm6.23-2.59a1.4 1.4 0 110 2.8 1.4 1.4 0 010-2.8z"/></svg>
                </span> Instagram URL (Optional)
              </label>
              <input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://instagram.com/username"
                className="w-full px-4 py-3 bg-mint-fog/30 border border-forest/15 rounded-xl text-sm font-medium text-dark-text placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Display Order & Active Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-mint-fog/20 p-4 rounded-2xl border border-forest/10">
            <div>
              <label className="block text-xs font-bold text-dark-text uppercase tracking-wider mb-1">
                Display Order Priority
              </label>
              <p className="text-[11px] text-dark-text/60 mb-2">
                Lower number displays first (e.g. 1 for President).
              </p>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                className="w-32 px-3 py-2 bg-white border border-forest/20 rounded-xl text-sm font-bold text-forest focus:outline-none focus:ring-2 focus:ring-forest"
              />
            </div>

            <div className="pt-2 sm:pt-0">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-5 h-5 accent-forest rounded cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold text-dark-text block">
                    Active on Public Team Directory
                  </span>
                  <span className="text-[11px] text-dark-text/60 block">
                    Unchecking will hide this member from public view.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-forest/10">
            <Link
              href="/admin/team"
              className="px-5 py-2.5 bg-mint-fog/50 hover:bg-mint-fog text-dark-text text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading || uploading}
              className="px-6 py-2.5 bg-forest hover:bg-forest/90 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving Member...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {isEdit ? "Update Member" : "Add Member"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
