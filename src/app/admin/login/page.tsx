"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, ShieldCheck, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Login failed. Please check credentials.");
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setLoading(false);
    }
  };

  const handleQuickFill = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
  };

  return (
    <div className="p-8">
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-dark-text uppercase tracking-wider mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@elevo.org"
              className="w-full pl-11 pr-4 py-3 bg-mint-fog/30 border border-forest/15 rounded-xl text-sm font-medium text-dark-text placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-dark-text uppercase tracking-wider mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-11 pr-4 py-3 bg-mint-fog/30 border border-forest/15 rounded-xl text-sm font-medium text-dark-text placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 bg-forest hover:bg-forest/90 text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Authenticating...
            </>
          ) : (
            <>
              Sign In to Dashboard
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Quick Demo Helper Box */}
      <div className="mt-8 pt-6 border-t border-forest/10">
        <p className="text-[11px] font-semibold text-dark-text/60 uppercase tracking-wider text-center mb-3">
          Quick Account Select (Demo)
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => handleQuickFill("admin@elevo.org", "Admin@1234")}
            className="p-2.5 bg-mint-fog/50 hover:bg-mint-fog border border-forest/10 rounded-xl text-forest font-medium text-left transition-colors flex flex-col cursor-pointer"
          >
            <span className="font-bold text-dark-text flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-forest" /> Admin
            </span>
            <span className="text-[10px] text-dark-text/60">admin@elevo.org</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickFill("manager@elevo.org", "Manager@1234")}
            className="p-2.5 bg-mint-fog/50 hover:bg-mint-fog border border-forest/10 rounded-xl text-forest font-medium text-left transition-colors flex flex-col cursor-pointer"
          >
            <span className="font-bold text-dark-text flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Manager
            </span>
            <span className="text-[10px] text-dark-text/60">manager@elevo.org</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F5EF] via-white to-[#F0F9F5] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-forest/10 overflow-hidden relative">
        {/* Top Decorative Header */}
        <div className="bg-forest text-white p-8 text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center p-3 border border-white/20">
              <Image
                src="/elevo-logo.png"
                alt="Elevo Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Elevo Admin Portal</h1>
          <p className="text-xs text-mint-fog/80 mt-1">Authorized Management Access</p>
        </div>

        <Suspense
          fallback={
            <div className="p-12 text-center text-xs font-semibold text-forest flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-forest" />
              Loading login portal...
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
