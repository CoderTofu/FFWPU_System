"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditEvent() {
  const router = useRouter();

  useEffect(() => {
    router.push("/event");
  }, [router]);

  return null;
}
