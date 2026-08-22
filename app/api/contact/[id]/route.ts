import { getDb } from "@/db/client";
import { contacts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const messageId = parseInt(id);

    if (isNaN(messageId)) {
      return Response.json({ error: "Invalid message ID" }, { status: 400 });
    }

    const body = await req.json().catch(() => null);

    if (!body || !body.status) {
      return Response.json({ error: "Status is required" }, { status: 400 });
    }

    const { status } = body;

    // Validate status value
    if (!["new", "read", "replied"].includes(status)) {
      return Response.json({ error: "Invalid status value" }, { status: 400 });
    }

    const db = getDb();

    // Update the message status
    const result = await db
      .update(contacts)
      .set({ status })
      .where(eq(contacts.id, messageId))
      .returning();

    if (result.length === 0) {
      return Response.json({ error: "Message not found" }, { status: 404 });
    }

    return Response.json({
      success: true,
      data: result[0],
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating message status:", error);
    return Response.json({
      error: "Failed to update message status",
    }, { status: 500 });
  }
}
