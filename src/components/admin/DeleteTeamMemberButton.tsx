"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

interface DeleteTeamMemberButtonProps {
  memberId: string;
  memberName: string;
}

export default function DeleteTeamMemberButton({
  memberId,
  memberName,
}: DeleteTeamMemberButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to remove "${memberName}" from the team directory?`))
      return;

    setLoading(true);
    try {
      const res = await fetch(`/api/team/${memberId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete team member");
      }
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to delete team member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-colors font-bold flex items-center gap-1 cursor-pointer disabled:opacity-50"
      title="Delete team member"
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <Trash2 className="w-3.5 h-3.5" />
      )}
      <span className="hidden sm:inline">Delete</span>
    </button>
  );
}
