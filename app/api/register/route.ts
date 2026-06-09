import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { registerFormSchema } from "@/lib/validators/auth.schema";
import { User } from "@/models/user.model";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const result = registerFormSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          success: false,
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Email already exists.",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return Response.json(
      {
        success: true,
        message: "Account created successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to create account.",
      },
      { status: 500 }
    );
  }
}
