import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();

    const product = await Product.create(body);

    return Response.json(
      {
        success: true,
        product,
      },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  const products = await Product.find();
  return Response.json(products);
}
