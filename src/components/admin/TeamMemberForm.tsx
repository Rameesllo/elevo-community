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
  FileText,
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
  const [department, setDepartment] = useState(
    initialData?.department || "Office Bearers"
  );
  const [bio, setBio] = useState(initialData?.bio || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [initials, setInitials] = useState(initialData?.initials || "");
  const [badge, setBadge] = useState(initialData?.badge || "");
  const [image, setImage] = useState(initialData?.image || "");
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
      bio,
      email: email || null,
      phone: phone || null,
      initials: autoInitials,
      badge: badge || null,
      image: image || null,
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
                <Layers className="w-3.5 h-3.5 text-forest" /> Department *
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as any)}
                className="w-full px-4 py-3 bg-mint-fog/30 border border-forest/15 rounded-xl text-sm font-medium text-dark-text focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all cursor-pointer"
              >
                <option value="Executive Committee">Executive Committee</option>
                <option value="Office Bearers">Office Bearers</option>
                <option value="Program Coordinators">Program Coordinators</option>
                <option value="Youth Wing">Youth Wing</option>
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

          {/* Bio */}
          <div>
            <label className="block text-xs font-bold text-dark-text uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-forest" /> Biography / Summary *
            </label>
            <textarea
              required
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Provide a brief summary of the coordinator's background and responsibilities..."
              className="w-full px-4 py-3 bg-mint-fog/30 border border-forest/15 rounded-xl text-sm font-medium text-dark-text placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
            />
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
