// src/app/api/contact/route.ts
import { getDb } from "@/db/client";
import { contacts } from "@/db/schema";
import { validateContactInput } from "@/lib/validation";
import { desc } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const db = getDb();
    
    // Fetch all contacts, ordered by most recent first
    const allContacts = await db
      .select()
      .from(contacts)
      .orderBy(desc(contacts.createdAt));

    return Response.json({ 
      success: true, 
      data: allContacts 
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return Response.json({ 
      error: "Failed to fetch contacts" 
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const data = validateContactInput(body);


  if (!data) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const db = getDb();

  await db.insert(contacts).values(data);

  return Response.json({ success: true }, { status: 201 });
}