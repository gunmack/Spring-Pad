"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import DropdownMenu from "@/components/dropdown";

export default function ProtectedLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <div className="min-h-screen min-w-screen">
      <DropdownMenu />
      <div>
        {children}
      </div>
    </div>
  );
}
