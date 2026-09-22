"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Event } from "@/types";
import {
  Calendar,
  Clock,
  MapPin,
  Link as LinkIcon,
  FileText,
  Tag,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  ArrowLeft,
  Save,
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
  const [meetingLink, setMeetingLink] = useState(initialData?.meetingLink || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState(initialData?.category || "sports");
  const [status, setStatus] = useState<"UPCOMING" | "COMPLETED" | "CANCELLED">(
    initialData?.status || "UPCOMING"
  );
  const [featured, setFeatured] = useState(initialData?.featured || false);

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
      meetingLink: meetingLink || null,
      description,
      category,
      status,
      upcoming: status === "UPCOMING",
      featured,
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
        throw new Error(data.error || "Failed to save event");
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
              ? "Update event schedules, location, meeting links, or mark as completed."
              : "Publish a new sports, cultural, social, or educational community event."}
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

          {/* Date, Time, Status Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

            <div>
              <label className="block text-xs font-bold text-dark-text uppercase tracking-wider mb-2">
                Status *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-4 py-3 bg-mint-fog/30 border border-forest/15 rounded-xl text-sm font-medium text-dark-text focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all cursor-pointer"
              >
                <option value="UPCOMING">Upcoming</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Location & Meeting Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <div>
              <label className="block text-xs font-bold text-dark-text uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-forest" /> Meeting Link (Optional)
              </label>
              <input
                type="url"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="e.g. https://meet.google.com/xyz"
                className="w-full px-4 py-3 bg-mint-fog/30 border border-forest/15 rounded-xl text-sm font-medium text-dark-text placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Category & Featured */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
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

            <div className="pt-6">
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
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-dark-text uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-forest" /> Event Description *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the event itinerary, requirements, and participation details..."
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
