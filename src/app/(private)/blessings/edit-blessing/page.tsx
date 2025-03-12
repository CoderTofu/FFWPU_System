"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditBlessing() {
  const router = useRouter();

  useEffect(() => {
    router.push("/blessings");
  }, [router]);

  return null;
}
