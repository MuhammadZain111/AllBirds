import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";

export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    const deletedItem = await UserModel.findByIdAndDelete(id);

    if (!deletedItem) {
      return Response.json({ message: "Item not found" }, { status: 404 });
    }

    return Response.json({
      message: "Item deleted successfully",
      deletedItem,
    });
  } catch (error) {
    return Response.json(
      { message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}
