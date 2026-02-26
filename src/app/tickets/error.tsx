"use client";
import { Placeholder } from "@/components/placeholder";

export default function Error(error: { message: string }) {
  return <Placeholder label={error.message || "Something went wrong"} />;
}
