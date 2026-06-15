'use client';

// hooks/useCart.js
// Drop-in hook — call addToCart() whenever the user adds an item.
// It persists the cart to MongoDB automatically, resetting the 24-hour window.

import { useCallback } from 'react';

/**
 * useCart(user)
 * @param {{ id: string, email: string, name?: string }} user  — current logged-in user
 */
export function useCart(user) {
  /**
   * addToCart(items)
   * @param {Array<{ productId, name, price, quantity, image? }>} items
   */
  const addToCart = useCallback(
    async (items) => {
      if (!user?.id || !user?.email) {
        console.warn('[useCart] No authenticated user — skipping cart sync');
        return;
      }

      try {
        const res = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            userEmail: user.email,
            userName: user.name || 'Customer',
            items,
          }),
        });

        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        console.log('[useCart] Cart saved, id:', data.cartId);
        return data.cartId;
      } catch (err) {
        console.error('[useCart] Failed to sync cart:', err);
      }
    },
    [user]
  );

  /** Call this after a successful checkout to stop the reminder. */
  const markPurchased = useCallback(async () => {
    if (!user?.id) return;
    await fetch('/api/cart', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id }),
    });
  }, [user]);

  return { addToCart, markPurchased };
}
