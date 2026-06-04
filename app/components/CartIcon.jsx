'use client'
import { useCart } from '@/context/CartContext'

export default function CartIcon() {
  const { totalItems } = useCart()
  return (
    <div>
      🛒 {totalItems > 0 && <span>{totalItems}</span>}
    </div>
  )
}