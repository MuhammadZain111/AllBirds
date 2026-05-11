import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/UserModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const users = await User.find();

    const formattedUsers = users.map(user => ({
      id: user._id,
  ...user._doc
}));

    console.log("Users fetched:", formattedUsers);

    return NextResponse.json({
      success: true,
      users: formattedUsers ,
    });
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}