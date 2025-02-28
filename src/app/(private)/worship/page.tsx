"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Worship() {
  const router = useRouter();

  useEffect(() => {
    router.push("/worship/view-worship");
  }, [router]);

  return null;
}
