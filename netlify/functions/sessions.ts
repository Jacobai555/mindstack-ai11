import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { chatSessions } from "../../db/schema.js";
import { desc, eq } from "drizzle-orm";

export default async (req: Request) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method === "GET") {
    const sessions = await db
      .select()
      .from(chatSessions)
      .orderBy(desc(chatSessions.updatedAt));
    return Response.json(sessions, { headers });
  }

  if (req.method === "POST") {
    const { title } = await req.json();
    const [session] = await db
      .insert(chatSessions)
      .values({ title: title || "New Chat" })
      .returning();
    return Response.json(session, { status: 201, headers });
  }

  if (req.method === "DELETE") {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return new Response("Missing id", { status: 400, headers });
    await db.delete(chatSessions).where(eq(chatSessions.id, id));
    return new Response(null, { status: 204, headers });
  }

  return new Response("Method not allowed", { status: 405, headers });
};

export const config: Config = {
  path: "/api/sessions",
};
