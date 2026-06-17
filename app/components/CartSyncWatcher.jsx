"use client";
import { useCartSync } from "@/hooks/useCartSync";

export default function CartSyncWatcher() {
  useCartSync();
  return null;
}