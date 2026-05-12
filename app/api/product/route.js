import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";



const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];



const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const UPLOAD_TIMEOUT_MS = 10000;

export async function POST(request) {
  try {
    await dbConnect();

    // Get form data
    const formData = await request.formData();

    // Text fields
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const category = formData.get("category");
    const stock = formData.get("stock");

    // File
    const file = formData.get("file");

    // Validate file
    if (!file || typeof file === "string") {
      return NextResponse.json(
        {
          success: false,
          message: "No valid file provided",
        },
        { status: 400 }
      );
    }

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid file type",
        },
        { status: 400 }
      );
    }

    // Validate size
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          message: "File too large",
        },
        { status: 400 }
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
            }
          )
          .end(buffer);
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => {
          reject(new Error("Upload timeout"));
        }, UPLOAD_TIMEOUT_MS)
      );

      uploadResult = await Promise.race([
        uploadPromise,
        timeoutPromise,
      ]);
    } catch (cloudError) {
      console.log(cloudError);

      return NextResponse.json(
        {
          success: false,
          message: "Cloudinary upload failed",
        },
        { status: 500 }
      );
    }

    // Create Product
    const product = await Product.create({
      title,
      description,
      price,
      category,
      stock,
      image: uploadResult.secure_url,
    });

    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );

  }
}



export async function GET() {
  try {
    await dbConnect();

    const products = await Product.find();

    return NextResponse.json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}