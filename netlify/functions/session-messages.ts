import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { chatMessages, chatSessions } from "../../db/schema.js";
import { asc, eq } from "drizzle-orm";

export default async (req: Request) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method === "GET") {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get("sessionId");
    if (!sessionId) {
      return new Response("Missing sessionId", { status: 400, headers });
    }
    const messages = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(asc(chatMessages.createdAt));
    return Response.json(messages, { headers });
  }

  if (req.method === "POST") {
    const body = await req.json();
    const { sessionId, role, content } = body;
    if (!sessionId || !role || content === undefined) {
      return new Response("Missing required fields", { status: 400, headers });
    }
    const [message] = await db
      .insert(chatMessages)
      .values({ sessionId, role, content })
      .returning();

    // bump the session's updatedAt so the sidebar sorts correctly
    await db
      .update(chatSessions)
      .set({ updatedAt: new Date() })
      .where(eq(chatSessions.id, sessionId));

    return Response.json(message, { status: 201, headers });
  }

  return new Response("Method not allowed", { status: 405, headers });
};

export const config: Config = {
  path: "/api/session-messages",
};
