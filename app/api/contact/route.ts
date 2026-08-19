// src/app/api/contact/route.ts
import { getDb } from "@/db/client";
import { contacts } from "@/db/schema";
import { validateContactInput } from "@/lib/validation";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const data = validateContactInput(body);


  if (!data) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const db = getDb();
  console.log(db)

  await db.insert(contacts).values(data);

  return Response.json({ success: true }, { status: 201 });
}