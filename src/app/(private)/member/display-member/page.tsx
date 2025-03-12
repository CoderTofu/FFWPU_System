"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DisplayMember() {
  const router = useRouter();

  useEffect(() => {
    router.push("/member/view-members");
  }, [router]);

  return null;
}
