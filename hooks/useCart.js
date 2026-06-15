"use client";

import { useEffect } from "react";
import { useCart } from "@/Context/CartContext";
import { useDebounce } from "./useDebounce";

export function useCartSync(userId, userEmail) {
  const items = useCart((state) => state.items);

  // 👇 THIS is the key fix
  const debouncedItems = useDebounce(items, 3000);

  useEffect(() => {
    if (!userId) return;

    if (debouncedItems.length === 0) return;

    console.log("🔥 API CALLING WITH DEBOUNCED ITEMS");

    fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        userEmail,
        items: debouncedItems,
      }),
    });

  }, [debouncedItems, userId, userEmail]);
}