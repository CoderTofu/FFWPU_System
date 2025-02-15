"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Member() {
  const router = useRouter();

  useEffect(() => {
    router.push("/member/add-member");
  }, [router]);

  return null; // No need for an empty div
}
