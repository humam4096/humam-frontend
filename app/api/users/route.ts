// src/app/api/users/route.ts
import { getDb } from "@/db/client";
import { users } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const db = getDb();
    
    // Fetch all users, ordered by most recent first
    const allUsers = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .orderBy(desc(users.createdAt));

    return Response.json({ 
      success: true, 
      data: allUsers 
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json({ 
      error: "Failed to fetch users" 
    }, { status: 500 });
  }
}
