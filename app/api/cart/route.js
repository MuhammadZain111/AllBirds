import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Cart from '@/models/Cart';



// POST /api/cart  — add or update a cart
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { userId, userEmail, userName, items } = body;

    if (!userId || !userEmail || !items?.length) {
      return NextResponse.json(
        { error: 'userId, userEmail, and items are required' },
        { status: 400 }
      );
    }

    // Upsert cart for this user
    const cart = await Cart.findOneAndUpdate(
      { userId, status: 'active' },
      {
        userId,
        userEmail,
        userName: userName || 'Customer',
        items,
        updatedAt: new Date(),
        // Reset reminder flag so the 24-hour window restarts on cart update
        reminderSent: false,
        reminderSentAt: null,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, cartId: cart._id });
  } catch (error) {
    console.error('[POST /api/cart]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/cart  — mark cart as converted (purchased)
export async function PATCH(request) {
  try {
    await connectDB();
    const { userId } = await request.json();

    await Cart.findOneAndUpdate(
      { userId, status: 'active' },
      { status: 'converted' }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[PATCH /api/cart]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
