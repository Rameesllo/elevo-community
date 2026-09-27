"use client";

import { useState } from "react";
import { ShieldCheck, UserCog, Trash2, PlusCircle, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminListClient({
  initialAdmins,
  currentAdminId,
}: {
  initialAdmins: any[];
  currentAdminId: string;
}) {
  const router = useRouter();
  const [admins, setAdmins] = useState(initialAdmins);
  const [showCreate, setShowCreate] = useState(false);
  const [formData, setFormData] = useState({ email: "", name: "", password: "", role: "MANAGER" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this admin account?")) return;
    try {
      const res = await fetch(`/api/admins/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to delete admin");
      setAdmins((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleRoleChange = async (id: string, newRole: string) => {
    try {
      const res = await fetch(`/api/admins/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update role");
      setAdmins((prev) => prev.map((a) => (a.id === id ? { ...a, role: newRole } : a)));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleActiveToggle = async (id: string, newActive: boolean) => {
    try {
      const res = await fetch(`/api/admins/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newActive }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update active status");
      setAdmins((prev) => prev.map((a) => (a.id === id ? { ...a, isActive: newActive } : a)));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to create admin");
      
      setAdmins([json.data, ...admins]);
      setShowCreate(false);
      setFormData({ email: "", name: "", password: "", role: "MANAGER" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="px-4 py-2 bg-forest text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-forest/90"
        >
          <PlusCircle className="w-4 h-4" />
          {showCreate ? "Cancel" : "Add Admin"}
        </button>
      </div>

      {showCreate && (
        <div className="bg-white p-6 rounded-2xl border border-forest/10 shadow-sm max-w-xl mx-auto">
          <h2 className="text-xl font-bold text-forest mb-4">Create Admin Account</h2>
          {error && <div className="text-red-600 text-sm mb-4 bg-red-50 p-3 rounded-lg">{error}</div>}
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">Name</label>
              <input
                type="text"
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Password</label>
              <input
                type="password"
                required
                minLength={6}
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Role</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="MANAGER">MANAGER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-forest text-white rounded-lg font-bold hover:bg-forest/90"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-forest/10 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-mint-fog/30 text-dark-text/70 text-xs uppercase tracking-wider">
              <th className="p-4 font-bold border-b border-forest/10">Name / Email</th>
              <th className="p-4 font-bold border-b border-forest/10">Role</th>
              <th className="p-4 font-bold border-b border-forest/10">Status</th>
              <th className="p-4 font-bold border-b border-forest/10 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest/10">
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-mint-fog/20 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-dark-text">{admin.name || "N/A"}</div>
                  <div className="text-xs text-dark-text/60">{admin.email}</div>
                </td>
                <td className="p-4">
                  <select
                    value={admin.role}
                    onChange={(e) => handleRoleChange(admin.id, e.target.value)}
                    disabled={admin.id === currentAdminId}
                    className="p-1 border border-gray-300 rounded text-sm bg-white"
                  >
                    <option value="MANAGER">MANAGER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
                <td className="p-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={admin.isActive}
                      onChange={(e) => handleActiveToggle(admin.id, e.target.checked)}
                      disabled={admin.id === currentAdminId}
                      className="w-4 h-4 text-forest focus:ring-forest border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium">
                      {admin.isActive ? "Active" : "Inactive"}
                    </span>
                  </label>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleDelete(admin.id)}
                    disabled={admin.id === currentAdminId}
                    className={`p-2 rounded-lg text-rose-600 hover:bg-rose-50 ${
                      admin.id === currentAdminId ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    title="Delete Account"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {admins.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-dark-text/60 text-sm">
                  No admin accounts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
