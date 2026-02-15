"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function AdminHeader({ title, subtitle, actions }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  return (
    <header className="bg-gray-950 border-b border-gray-800 px-8 py-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          {actions}
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
