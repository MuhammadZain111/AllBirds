import { getServerSession } from "next-auth"; 
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/UserModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ success: false });
  }

  const user = await User.findOne({ email: session.user.email });

  return NextResponse.json({
    success: true,
    user,
  });
}