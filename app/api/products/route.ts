import { requireAdmin, requireAuth } from "@/lib/api-guard";
import { connectDB } from "@/lib/db";
import { productApiSchema } from "@/lib/validators/product.schema";
import { Product } from "@/models/product.model";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({ createdAt: -1 }).lean();

    return Response.json(
      {
        success: true,
        data: products,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const guard = await requireAdmin();

  if (!guard.authorized) {
    return guard.response;
  }

  try {
    await connectDB();

    const body = await request.json();

    const validation = productApiSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.error?.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    await Product.create(validation.data);

    return Response.json({
      success: true,
      message: "Product created successfully",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to create products",
      },
      { status: 500 }
    );
  }
}
