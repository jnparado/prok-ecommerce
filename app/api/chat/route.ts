import { fallbackChatReply, getChatSystemPrompt } from "@/lib/chat";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 40;
const hits = new Map<string, number[]>();

function tooMany(ip: string) {
  const now = Date.now();
  const next = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (next.length >= MAX_HITS) {
    hits.set(ip, next);
    return true;
  }
  next.push(now);
  hits.set(ip, next);
  return false;
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

async function completeWithModel(messages: ChatMessage[]) {
  const openaiKey = process.env.OPENAI_API_KEY?.trim();
  const groqKey = process.env.GROQ_API_KEY?.trim();

  const endpoint = groqKey
    ? "https://api.groq.com/openai/v1/chat/completions"
    : openaiKey
      ? "https://api.openai.com/v1/chat/completions"
      : "";
  const apiKey = groqKey || openaiKey;
  const model = groqKey ? "llama-3.1-8b-instant" : "gpt-4o-mini";

  if (!endpoint || !apiKey) return null;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: 420,
      messages: [
        { role: "system", content: getChatSystemPrompt() },
        ...messages.slice(-10),
      ],
    }),
  });

  if (!response.ok) return null;
  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return data.choices?.[0]?.message?.content?.trim() || null;
}

export async function POST(request: Request) {
  if (tooMany(clientIp(request))) {
    return Response.json({ error: "Please wait a moment, then try again." }, { status: 429 });
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages)
    ? body.messages
        .filter(
          (item): item is ChatMessage =>
            !!item &&
            (item.role === "user" || item.role === "assistant") &&
            typeof item.content === "string"
        )
        .map((item) => ({
          role: item.role,
          content: item.content.trim().slice(0, 1200),
        }))
        .filter((item) => item.content)
        .slice(-10)
    : [];

  const lastUser = [...messages].reverse().find((item) => item.role === "user");
  if (!lastUser) {
    return Response.json({ error: "Please type a message." }, { status: 400 });
  }

  try {
    const live = await completeWithModel(messages);
    return Response.json({ reply: live || fallbackChatReply(lastUser.content) });
  } catch {
    return Response.json({ reply: fallbackChatReply(lastUser.content) });
  }
}
