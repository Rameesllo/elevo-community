"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Event } from "@/types";
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  Tag,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Upload,
  X,
} from "lucide-react";

interface EventFormProps {
  initialData?: Event;
  isEdit?: boolean;
}

export default function EventForm({ initialData, isEdit = false }: EventFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(initialData?.time || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState(initialData?.category || "sports");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [image, setImage] = useState(initialData?.image || "");
  const [imageUploading, setImageUploading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to upload poster");
      setImage(data.data.url);
    } catch (err: any) {
      setError(err.message || "Could not upload poster");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const payload = {
      title,
      date,
      time: time || null,
      location,
      meetingLink: null,
      description,
      category,
      status: "COMPLETED",
      upcoming: false,
      featured,
      image: image || null,
    };

    try {
      const url = isEdit ? `/api/events/${initialData?.id}` : "/api/events";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        const detailMsg =
          Array.isArray(data.details)
            ? data.details.map((d: any) => `${d.path?.join(".")}: ${d.message}`).join(", ")
            : typeof data.details === "string"
            ? data.details
            : data.details
            ? JSON.stringify(data.details)
            : "";
        throw new Error(detailMsg ? `${data.error}: ${detailMsg}` : data.error || "Failed to save event");
      }

      setSuccess(isEdit ? "Event updated successfully!" : "Event created successfully!");
      setTimeout(() => {
        router.push("/admin/events");
        router.refresh();
      }, 800);
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;

    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/events/${initialData.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete event");
      }

      router.push("/admin/events");
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Could not delete event");
      setDeleteLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header Back Link */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Events List
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
            Delete Event
          </button>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-forest/10 shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-forest">
            {isEdit ? "Edit Community Event" : "Create New Community Event"}
          </h2>
          <p className="text-xs text-dark-text/60 mt-1">
            {isEdit
              ? "Update conducted event poster, details, and archive information."
              : "Archive a conducted event with its poster and details for the community showcase."}
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
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-dark-text uppercase tracking-wider mb-2">
              Event Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Elevo Football Championship 2025"
              className="w-full px-4 py-3 bg-mint-fog/30 border border-forest/15 rounded-xl text-sm font-medium text-dark-text placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-bold text-dark-text uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-forest" /> Date *
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-mint-fog/30 border border-forest/15 rounded-xl text-sm font-medium text-dark-text focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-xs font-bold text-dark-text uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-forest" /> Time
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 09:00 AM - 04:00 PM"
              className="w-full px-4 py-3 bg-mint-fog/30 border border-forest/15 rounded-xl text-sm font-medium text-dark-text placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-dark-text uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-forest" /> Location / Venue *
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Elevo Stadium Ground, Kerala"
              className="w-full px-4 py-3 bg-mint-fog/30 border border-forest/15 rounded-xl text-sm font-medium text-dark-text placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-dark-text uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-forest" /> Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-4 py-3 bg-mint-fog/30 border border-forest/15 rounded-xl text-sm font-medium text-dark-text focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all cursor-pointer"
            >
              <option value="sports">Sports</option>
              <option value="cultural">Cultural</option>
              <option value="social">Social</option>
              <option value="educational">Educational</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Featured */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-5 h-5 accent-forest rounded cursor-pointer"
              />
              <span className="text-xs font-bold text-dark-text">
                Feature on Homepage Hero Banner
              </span>
            </label>
          </div>

          {/* Poster Upload */}
          <div>
            <label className="block text-xs font-bold text-dark-text uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-forest" /> Event Poster (Image)
            </label>
            {image ? (
              <div className="relative group rounded-2xl overflow-hidden border border-forest/15 bg-mint-fog/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="Event poster preview" className="w-full max-h-[320px] object-contain bg-white" />
                <button
                  type="button"
                  onClick={() => setImage("")}
                  className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-dark-text rounded-xl shadow-sm border border-border transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                  <p className="text-[11px] font-semibold text-white">Poster uploaded — click X to replace</p>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-3 w-full px-6 py-8 bg-mint-fog/30 border-2 border-dashed border-forest/15 rounded-2xl cursor-pointer hover:bg-mint-fog/50 hover:border-forest/25 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-white border border-forest/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {imageUploading ? <Loader2 className="w-5 h-5 animate-spin text-forest" /> : <Upload className="w-5 h-5 text-forest" />}
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-dark-text">
                    {imageUploading ? "Uploading poster..." : "Upload event poster"}
                  </p>
                  <p className="text-[11px] text-dark-text/60 mt-1">PNG, JPG, WEBP up to 5MB — will be shown on conducted events archive</p>
                </div>
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={imageUploading} className="hidden" />
              </label>
            )}
            {!image && (
              <label className="mt-3 flex items-center gap-2 text-xs">
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={imageUploading} className="block w-full text-xs text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-forest file:text-white hover:file:bg-forest/90 file:cursor-pointer cursor-pointer" />
              </label>
            )}
            {image && (
              <label className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-mint-fog border border-forest/10 rounded-xl text-xs font-semibold text-forest cursor-pointer hover:bg-mint-fog/80 transition-colors">
                <Upload className="w-3.5 h-3.5" />
                Replace poster
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={imageUploading} className="hidden" />
              </label>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-dark-text uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-forest" /> Event Details *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what was conducted, highlights, chief guests, outcomes..."
              className="w-full px-4 py-3 bg-mint-fog/30 border border-forest/15 rounded-xl text-sm font-medium text-dark-text placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-forest/10">
            <Link
              href="/admin/events"
              className="px-5 py-2.5 bg-mint-fog/50 hover:bg-mint-fog text-dark-text text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-forest hover:bg-forest/90 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving Event...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {isEdit ? "Update Event" : "Create Event"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
