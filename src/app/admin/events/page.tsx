import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { getEventsService } from "@/lib/services/events.service";
import AdminNav from "@/components/admin/AdminNav";
import DeleteEventButton from "@/components/admin/DeleteEventButton";
import {
  Calendar,
  PlusCircle,
  MapPin,
  Clock,
  Link as LinkIcon,
  Edit,
  Search,
} from "lucide-react";

export default async function AdminEventsPage() {
  const session = await getAuthSession();
  if (!session) redirect("/admin/login");

  const events = await getEventsService();

  return (
    <div className="min-h-screen bg-mint-fog/30 text-dark-text pb-16">
      <AdminNav user={session} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-forest/10 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-forest flex items-center gap-2.5">
              <Calendar className="w-6 h-6 text-forest" />
              Events Management
            </h1>
            <p className="text-xs text-dark-text/70 mt-1">
              Create, view, update, and manage community activities, tournaments, and drives.
            </p>
          </div>

          <Link
            href="/admin/events/create"
            className="px-4 py-2.5 bg-forest hover:bg-forest/90 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Event</span>
          </Link>
        </div>

        {/* Events Table / Card Listing */}
        <div className="bg-white rounded-3xl border border-forest/10 shadow-sm overflow-hidden">
          {events.length === 0 ? (
            <div className="p-12 text-center text-xs text-dark-text/60">
              No events found. Click "Create New Event" to add your first community activity.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-mint-fog/60 border-b border-forest/10 text-dark-text/70 uppercase tracking-wider font-bold">
                    <th className="py-4 px-6">Event Title & Category</th>
                    <th className="py-4 px-4">Date & Time</th>
                    <th className="py-4 px-4">Location / Link</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/10 font-medium text-dark-text">
                  {events.map((evt) => (
                    <tr key={evt.id} className="hover:bg-mint-fog/20 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-sm text-forest">{evt.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="capitalize text-[11px] text-dark-text/60 font-semibold bg-mint-fog px-2 py-0.5 rounded-md">
                            {evt.category}
                          </span>
                          {evt.featured && (
                            <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5 font-bold text-dark-text">
                          <Calendar className="w-3.5 h-3.5 text-forest" />
                          {evt.date}
                        </div>
                        {evt.time && (
                          <div className="flex items-center gap-1.5 text-[11px] text-dark-text/60 mt-0.5">
                            <Clock className="w-3 h-3" />
                            {evt.time}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5 line-clamp-1 max-w-[200px]">
                          <MapPin className="w-3.5 h-3.5 text-forest shrink-0" />
                          <span className="truncate">{evt.location}</span>
                        </div>
                        {evt.meetingLink && (
                          <a
                            href={evt.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:underline mt-0.5 font-semibold"
                          >
                            <LinkIcon className="w-3 h-3" /> Join Link
                          </a>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                            evt.status === "COMPLETED"
                              ? "bg-gray-100 text-gray-700"
                              : evt.status === "CANCELLED"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {evt.status || (evt.upcoming ? "UPCOMING" : "COMPLETED")}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/events/${evt.id}/edit`}
                            className="p-2 bg-mint-fog/60 hover:bg-mint-fog text-forest rounded-xl transition-colors font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </Link>
                          <DeleteEventButton eventId={evt.id} eventTitle={evt.title} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
