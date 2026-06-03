import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const UPLOAD_TIMEOUT_MS = 50000;

export async function POST(request) {
  try {
    await dbConnect();

    // get form data
    const formData = await request.formData();

    // Text fields
    const title = formData.get("title");
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    const description = formData.get("description");
    const price = formData.get("price");
    const category = formData.get("category");
    const stock = formData.get("stock");
    const colors = formData.get("colors") || "[]";

    // File
    const file = formData.get("file");

    // Validate file
    if (!file || typeof file === "string") {
      return NextResponse.json(
        {
          success: false,
          message: "No valid file provided",
        },
        { status: 400 },
      );
    }

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid file type",
        },
        { status: 400 },
      );
    }

    // Validate size
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          message: "File too large",
        },
        { status: 400 },
      );
    }

    // Convert to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    let uploadResult;

    try {
      const uploadPromise = new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "Product_Images",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(buffer);
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => {
          reject(new Error("Upload timeout"));
        }, UPLOAD_TIMEOUT_MS),
      );

      uploadResult = await Promise.race([uploadPromise, timeoutPromise]);
    } catch (cloudError) {
      console.log(cloudError);

      return NextResponse.json(
        {
          success: false,
          message: "Cloudinary upload failed",
        },
        { status: 500 },
      );
    }

    // Create Product
    const product = await Product.create({
      title,
      slug,
      description,
      price,
      category,
      stock,
      image: uploadResult.secure_url,
      colors,
    });

    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const category = searchParams.get("category") || null;

    // ─── Single Product ───────────────

    if (id) {
      const product = await Product.findById(id);

      if (!product) {
        return NextResponse.json(
          { success: false, message: "Product not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({ success: true, product }, { status: 200 });
    }

    // ─── Validate Pagination Params ────────────

    if (page < 1 || limit < 1) {
      return NextResponse.json(
        { success: false, message: "Page and limit must be greater than 0" },
        { status: 400 },
      );
    }

    if (limit > 100) {
      return NextResponse.json(
        { success: false, message: "Limit cannot exceed 100" },
        { status: 400 },
      );
    }

    // ─── Build Filter ─────────────────────────────────────────────
    const filter = {};

    if (category) {
      filter.category = { $regex: category, $options: "i" }; // case-insensitive
    }

    // ─── Fetch Paginated Products ─────────────────────────────────
    const skip = (page - 1) * limit;

    const [products, totalProducts] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalProducts / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json(
      {
        success: true,
        products,
        pagination: {
          totalProducts,
          totalPages,
          currentPage: page,
          limit,
          hasNextPage,
          hasPrevPage,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/product error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
