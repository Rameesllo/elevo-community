import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSessionToken, COOKIE_NAME } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/api-response";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // 1. Fetch admin from DB
    const admin = await prisma.admin.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!admin) {
      return apiError("Invalid email or password", 401);
    }

    if (!admin.isActive) {
      return apiError("Your account has been deactivated. Please contact an administrator.", 403);
    }

    // 2. Verify password
    const isPasswordValid = await verifyPassword(password, admin.passwordHash);
    if (!isPasswordValid) {
      return apiError("Invalid email or password", 401);
    }

    // 3. Create session token
    const token = await createSessionToken({
      id: admin.id,
      email: admin.email,
      name: admin.name || "Administrator",
      role: admin.role,
    });

    // 4. Return success response with HttpOnly cookie
    const response = apiSuccess({
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return apiError("Validation error", 400, error.errors);
    }
    return apiError("Authentication failed", 500, error?.message || error);
  }
}
