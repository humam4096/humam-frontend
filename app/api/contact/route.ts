// src/app/api/contact/route.ts
import { getDb } from "@/db/client";
import { contacts } from "@/db/schema";
import { validateContactInput } from "@/lib/validation";
import { sendContactNotificationSafe } from "@/lib/email";
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
  try {
    const body = await req.json().catch(() => null);
    const data = validateContactInput(body);

    if (!data) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const db = getDb();

    // Save contact to database
    await db.insert(contacts).values(data);

    // Send email notification asynchronously (non-blocking)
    // This runs in the background and doesn't delay the response
    sendContactNotificationSafe({
      name: data.name,
      email: data.email,
      company: data.company || undefined,
      industry: data.industry || undefined,
      service: data.service || undefined,
      message: data.message,
    }).catch((error) => {
      // Log error but don't fail the request
      console.error("Failed to send email notification:", error);
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return Response.json({ 
      error: "Failed to process contact form" 
    }, { status: 500 });
  }
}