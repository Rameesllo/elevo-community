"use client";

import { useState } from "react";
import { Bell, Trash2, CheckCircle, PlusCircle, Check } from "lucide-react";

export default function NotificationsClient({
  initialNotifications,
  admins,
  currentAdminId,
  isAdminRole,
}: {
  initialNotifications: any[];
  admins: any[];
  currentAdminId: string;
  isAdminRole: boolean;
}) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showCreate, setShowCreate] = useState(false);
  const [formData, setFormData] = useState({ adminId: currentAdminId, message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMarkRead = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, { method: "PATCH" });
      if (!res.ok) throw new Error("Failed to mark read");
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const res = await fetch(`/api/notifications?adminId=${currentAdminId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markAllRead" }),
      });
      if (!res.ok) throw new Error("Failed to mark all read");
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this notification?")) return;
    try {
      const res = await fetch(`/api/notifications/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/notifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to create");

      if (formData.adminId === currentAdminId) {
        setNotifications([json.data, ...notifications]);
      } else {
        alert("Notification sent successfully!");
      }
      
      setShowCreate(false);
      setFormData({ adminId: currentAdminId, message: "" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm font-bold text-dark-text/70">
          {unreadCount} unread notification{unreadCount !== 1 && "s"}
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="px-4 py-2 bg-mint-fog text-forest rounded-xl text-sm font-bold hover:bg-mint-fog/80 flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Mark all read
            </button>
          )}
          {isAdminRole && (
            <button
              onClick={() => setShowCreate(!showCreate)}
              className="px-4 py-2 bg-forest text-white rounded-xl text-sm font-bold hover:bg-forest/90 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              {showCreate ? "Cancel" : "New Alert"}
            </button>
          )}
        </div>
      </div>

      {showCreate && isAdminRole && (
        <div className="bg-white p-6 rounded-2xl border border-forest/10 shadow-sm max-w-xl mx-auto">
          <h2 className="text-lg font-bold text-forest mb-4">Send Notification</h2>
          {error && <div className="text-red-600 text-sm mb-4 bg-red-50 p-3 rounded-lg">{error}</div>}
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">Target Admin / Manager</label>
              <select
                required
                className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                value={formData.adminId}
                onChange={(e) => setFormData({ ...formData, adminId: e.target.value })}
              >
                {admins.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.email}) - {a.role}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Message</label>
              <textarea
                required
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-forest text-white rounded-lg font-bold hover:bg-forest/90"
            >
              {loading ? "Sending..." : "Send Notification"}
            </button>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-forest/10 shadow-sm text-center">
            <Bell className="w-8 h-8 text-dark-text/30 mx-auto mb-2" />
            <p className="text-dark-text/60 font-medium">You have no notifications.</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-2xl border flex items-start justify-between gap-4 transition-colors ${
                n.read ? "bg-white border-forest/10" : "bg-mint-fog/40 border-forest/30 shadow-sm"
              }`}
            >
              <div className="flex items-start gap-3 flex-1">
                <div className={`mt-1 p-2 rounded-full ${n.read ? "bg-gray-100 text-gray-400" : "bg-forest/10 text-forest"}`}>
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <p className={`text-sm ${n.read ? "text-dark-text/80" : "font-bold text-dark-text"}`}>
                    {n.message}
                  </p>
                  <p className="text-xs text-dark-text/50 mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!n.read && (
                  <button
                    onClick={() => handleMarkRead(n.id)}
                    className="p-2 text-forest hover:bg-forest/10 rounded-lg transition-colors"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(n.id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
