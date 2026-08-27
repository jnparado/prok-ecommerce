"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

import { cn } from "@/lib/utils";

type ChatRole = "user" | "assistant";
type ChatMessage = { role: ChatRole; content: string };

const suggestions = [
  "What espresso machines do you carry?",
  "Where is your showroom?",
  "Do you have Catcher Gourmet syrups?",
];

function renderText(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return <span key={index}>{part}</span>;
    const href = match[2];
    const safe = href.startsWith("/") || href.startsWith("https://www.prokrate.com");
    if (!safe) return <span key={index}>{match[1]}</span>;
    return (
      <a
        key={index}
        href={href}
        className="font-medium text-[#82502a] underline decoration-[#c4a882] underline-offset-2"
      >
        {match[1]}
      </a>
    );
  });
}

export function SiteChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi — I’m the Prokrate assistant. Ask about espresso machines, grinders, Marcafé coffee, Catcher Gourmet flavours, training, or how to visit us in Davao.",
    },
  ]);
  const scroller = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    field.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || pending) return;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setPending(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.filter((item) => item.role === "user" || item.role === "assistant"),
        }),
      });
      const data = (await response.json()) as { reply?: string; error?: string };
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.reply || data.error || "I couldn’t reply just then. Please try again, or call 082-322 3478.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "The chat is unavailable right now. Call 082-322 3478 or visit us in Davao City.",
        },
      ]);
    } finally {
      setPending(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void send(input);
  }

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[90] flex flex-col items-end gap-3 sm:right-5 sm:bottom-5">
      {open ? (
        <section
          className="pointer-events-auto flex h-[min(520px,calc(100dvh-7rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl bg-[#fffaf4] shadow-[0_18px_50px_rgba(80,50,20,0.22)] ring-1 ring-[#eadfce]"
          aria-label="Prokrate chat"
        >
          <header className="flex items-center justify-between bg-[#82502a] px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Prokrate Assistant</p>
              <p className="text-[11px] text-white/75">Machines, coffee, flavours &amp; service</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 transition-colors hover:bg-white/15"
              aria-label="Close chat"
            >
              <X className="size-4" />
            </button>
          </header>

          <div ref={scroller} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={cn("flex", item.role === "user" ? "justify-end" : "justify-start")}
              >
                <p
                  className={cn(
                    "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-[13px] leading-5",
                    item.role === "user"
                      ? "rounded-br-md bg-[#82502a] text-white"
                      : "rounded-bl-md bg-white text-[#3d2416] ring-1 ring-[#eadfce]"
                  )}
                >
                  {renderText(item.content)}
                </p>
              </div>
            ))}
            {pending ? (
              <p className="text-[12px] text-zinc-400">Thinking…</p>
            ) : null}
            {messages.length < 3 ? (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {suggestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => void send(item)}
                    className="rounded-full bg-white px-2.5 py-1 text-left text-[11px] text-[#82502a] ring-1 ring-[#eadfce] transition-colors hover:bg-[#f6efe6]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 border-t border-[#eadfce] bg-white p-3">
            <input
              ref={field}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about a machine or flavour…"
              maxLength={1200}
              className="h-10 min-w-0 flex-1 rounded-full border border-[#eadfce] bg-[#fffaf4] px-3 text-sm text-[#3d2416] outline-none focus:border-[#c4a882]"
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              className="flex size-10 items-center justify-center rounded-full bg-[#82502a] text-white transition-colors hover:bg-[#6d4123] disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="size-4" />
            </button>
          </form>
        </section>
      ) : null}

      {open ? null : (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="pointer-events-auto flex size-14 items-center justify-center rounded-full bg-[#82502a] text-white shadow-[0_12px_28px_rgba(80,50,20,0.28)] transition-transform hover:scale-105 hover:bg-[#6d4123]"
        aria-expanded={open}
        aria-label="Open Prokrate assistant"
      >
        <MessageCircle className="size-6" />
      </button>
      )}
    </div>
  );
}
