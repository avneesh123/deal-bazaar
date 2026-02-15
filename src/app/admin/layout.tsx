"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session && pathname !== "/admin") {
        router.push("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Login page — no sidebar
  if (pathname === "/admin") {
    return <>{children}</>;
  }

  // Not authenticated — redirect to login
  if (!session) {
    router.push("/admin");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminSidebar />
      <div className="ml-64">{children}</div>
    </div>
  );
}
