import { jsxs, jsx } from "react/jsx-runtime";
import { useRef, useState, useEffect, useCallback } from "react";
import { Plus, MessageSquare, Clock, Trash2, Zap, Brain, Square, Send } from "lucide-react";
import { Streamdown } from "streamdown";
import { createChatClientOptions, fetchServerSentEvents, useChat } from "@tanstack/ai-react";
createChatClientOptions({
  connection: fetchServerSentEvents("/api/chat")
});
const useAIChat = (options) => {
  const onFinishRef = useRef(options?.onFinish);
  onFinishRef.current = options?.onFinish;
  const [chatOptions] = useState(
    () => createChatClientOptions({
      connection: fetchServerSentEvents("/api/chat"),
      initialMessages: options?.initialMessages,
      onFinish: (msg) => {
        onFinishRef.current?.(msg);
      }
    })
  );
  const chat = useChat(chatOptions);
  return { ...chat, clearMessages: chat.clear };
};
async function apiGetSessions() {
  try {
    const res = await fetch("/api/sessions");
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}
async function apiCreateSession(title) {
  const res = await fetch("/api/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title
    })
  });
  return res.json();
}
async function apiDeleteSession(id) {
  await fetch(`/api/sessions?id=${encodeURIComponent(id)}`, {
    method: "DELETE"
  });
}
async function apiGetMessages(sessionId) {
  try {
    const res = await fetch(`/api/session-messages?sessionId=${encodeURIComponent(sessionId)}`);
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}
async function apiSaveMessage(sessionId, role, content) {
  await fetch("/api/session-messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sessionId,
      role,
      content
    })
  });
}
function dbToUIMessage(msg) {
  return {
    id: msg.id,
    role: msg.role,
    parts: [{
      type: "text",
      content: msg.content
    }],
    createdAt: new Date(msg.createdAt)
  };
}
function getMessageText(msg) {
  const part = msg.parts.find((p) => p.type === "text");
  return part && "content" in part ? part.content ?? "" : "";
}
function formatTime(dateStr) {
  const date = new Date(dateStr);
  const now = /* @__PURE__ */ new Date();
  const diffMins = Math.floor((now.getTime() - date.getTime()) / 6e4);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString();
}
const SUGGESTIONS = ["Explain how neural networks work", "Write a Python function to sort a list", "What is the difference between AI and ML?", "Help me understand transformers in NLP"];
function TypingIndicator() {
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5 items-center px-4 py-3", children: [
    /* @__PURE__ */ jsx("div", { className: "typing-dot" }),
    /* @__PURE__ */ jsx("div", { className: "typing-dot" }),
    /* @__PURE__ */ jsx("div", { className: "typing-dot" })
  ] });
}
function MessageBubble({
  message
}) {
  const isUser = message.role === "user";
  return /* @__PURE__ */ jsxs("div", { className: `flex gap-3 mb-4 ${isUser ? "flex-row-reverse" : ""}`, children: [
    /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold", style: isUser ? {
      background: "linear-gradient(135deg, var(--neon-purple), var(--neon-pink))",
      color: "#fff"
    } : {
      background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
      color: "#080b14"
    }, children: isUser ? "You" : /* @__PURE__ */ jsx(Brain, { size: 14 }) }),
    /* @__PURE__ */ jsx("div", { className: `max-w-[75%] px-4 py-3 text-sm ${isUser ? "chat-bubble-user" : "chat-bubble-ai"}`, style: {
      color: "var(--text-primary)"
    }, children: message.parts.map((part, i) => {
      if (part.type === "text" && "content" in part && part.content) {
        return /* @__PURE__ */ jsx("div", { className: "ai-prose", children: /* @__PURE__ */ jsx(Streamdown, { children: part.content }) }, i);
      }
      return null;
    }) })
  ] });
}
function ChatInterface({
  initialSessionId,
  initialMessages,
  onSessionCreated,
  onSidebarToggle
}) {
  const [input, setInput] = useState("");
  const sessionIdRef = useRef(initialSessionId);
  const creatingRef = useRef(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const onFinish = useCallback(async (message) => {
    const sid = sessionIdRef.current;
    if (!sid) return;
    const text = getMessageText(message);
    if (text) apiSaveMessage(sid, "assistant", text);
  }, []);
  const {
    messages,
    sendMessage,
    isLoading,
    stop,
    clearMessages
  } = useAIChat({
    initialMessages,
    onFinish
  });
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, isLoading]);
  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    inputRef.current?.focus();
    if (!sessionIdRef.current && !creatingRef.current) {
      creatingRef.current = true;
      try {
        const session = await apiCreateSession(text.slice(0, 60));
        sessionIdRef.current = session.id;
        onSessionCreated(session);
      } catch {
        creatingRef.current = false;
        return;
      }
      creatingRef.current = false;
    }
    const sid = sessionIdRef.current;
    if (sid) apiSaveMessage(sid, "user", text);
    sendMessage(text);
  };
  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-4 py-3 border-b", style: {
      borderColor: "rgba(0,245,255,0.08)"
    }, children: [
      /* @__PURE__ */ jsx("button", { onClick: onSidebarToggle, className: "p-1.5 rounded transition-colors hover:text-[var(--neon-cyan)]", style: {
        color: "var(--text-muted)"
      }, title: "Toggle sidebar", children: /* @__PURE__ */ jsx(MessageSquare, { size: 16 }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Brain, { size: 16, style: {
          color: "var(--neon-cyan)"
        } }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm", children: "MindStack Chat" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full animate-pulse", style: {
          background: "var(--neon-green)"
        } }),
        /* @__PURE__ */ jsx("span", { className: "text-xs", style: {
          color: "var(--text-muted)"
        }, children: "Connected" }),
        messages.length > 0 && /* @__PURE__ */ jsx("button", { onClick: () => clearMessages?.(), className: "p-1.5 rounded transition-colors hover:text-[var(--neon-pink)]", style: {
          color: "var(--text-muted)"
        }, title: "Clear chat view", children: /* @__PURE__ */ jsx(Trash2, { size: 14 }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto", children: messages.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col items-center justify-center px-4 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "ai-orb w-16 h-16 mb-6 flex items-center justify-center", style: {
        width: "64px",
        height: "64px"
      }, children: /* @__PURE__ */ jsx(Brain, { size: 28, color: "rgba(0,245,255,0.9)" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-2 gradient-text", children: "MindStack AI" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm mb-8 max-w-sm", style: {
        color: "var(--text-muted)"
      }, children: "Your intelligent assistant. Ask me anything about AI, code, science, or just chat." }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg", children: SUGGESTIONS.map((s) => /* @__PURE__ */ jsx("button", { onClick: () => {
        setInput(s);
        inputRef.current?.focus();
      }, className: "text-left px-3 py-2.5 rounded-lg text-xs transition-all hover:-translate-y-0.5", style: {
        background: "rgba(0,245,255,0.04)",
        border: "1px solid rgba(0,245,255,0.12)",
        color: "var(--text-muted)"
      }, children: s }, s)) })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto w-full px-4 py-6", children: [
      messages.map((msg) => /* @__PURE__ */ jsx(MessageBubble, { message: msg }, msg.id)),
      isLoading && /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center", style: {
          background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
          color: "#080b14"
        }, children: /* @__PURE__ */ jsx(Brain, { size: 14 }) }),
        /* @__PURE__ */ jsx("div", { className: "chat-bubble-ai", children: /* @__PURE__ */ jsx(TypingIndicator, {}) })
      ] }),
      /* @__PURE__ */ jsx("div", { ref: messagesEndRef })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "px-4 py-4 border-t", style: {
      borderColor: "rgba(0,245,255,0.08)",
      background: "rgba(8,11,20,0.6)"
    }, children: [
      isLoading && /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-3", children: /* @__PURE__ */ jsxs("button", { onClick: stop, className: "flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all", style: {
        background: "rgba(255,45,120,0.1)",
        border: "1px solid rgba(255,45,120,0.3)",
        color: "var(--neon-pink)"
      }, children: [
        /* @__PURE__ */ jsx(Square, { size: 10, className: "fill-current" }),
        "Stop generating"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto flex gap-2 items-end", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsx("textarea", { ref: inputRef, value: input, onChange: (e) => setInput(e.target.value), onKeyDown: handleKey, placeholder: "Ask MindStack AI anything… (Enter to send, Shift+Enter for new line)", rows: 1, style: {
          background: "rgba(13,20,40,0.9)",
          border: "1px solid rgba(0,245,255,0.2)",
          borderRadius: "10px",
          color: "var(--text-primary)",
          padding: "10px 16px",
          width: "100%",
          resize: "none",
          fontSize: "14px",
          outline: "none",
          lineHeight: "1.5",
          maxHeight: "120px",
          overflowY: "auto",
          fontFamily: "inherit"
        }, onInput: (e) => {
          const t = e.target;
          t.style.height = "auto";
          t.style.height = Math.min(t.scrollHeight, 120) + "px";
        }, disabled: isLoading }) }),
        /* @__PURE__ */ jsx("button", { onClick: handleSend, disabled: !input.trim() || isLoading, className: "flex-shrink-0 p-2.5 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed", style: {
          background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
          color: "#080b14"
        }, children: /* @__PURE__ */ jsx(Send, { size: 16, strokeWidth: 2.5 }) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-xs mt-2", style: {
        color: "var(--text-muted)"
      }, children: "MindStack AI may produce inaccurate information. Always verify important facts." })
    ] })
  ] });
}
function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [initialMessages, setInitialMessages] = useState([]);
  const [chatKey, setChatKey] = useState(0);
  useEffect(() => {
    apiGetSessions().then(setSessions);
  }, []);
  const startNewChat = useCallback(() => {
    setActiveSessionId(null);
    setInitialMessages([]);
    setChatKey((k) => k + 1);
  }, []);
  const selectSession = useCallback(async (id) => {
    if (id === activeSessionId) return;
    const dbMsgs = await apiGetMessages(id);
    setActiveSessionId(id);
    setInitialMessages(dbMsgs.map(dbToUIMessage));
    setChatKey((k) => k + 1);
  }, [activeSessionId]);
  const handleSessionCreated = useCallback((session) => {
    setActiveSessionId(session.id);
    setSessions((prev) => [session, ...prev]);
  }, []);
  const handleDeleteSession = useCallback(async (id, e) => {
    e.stopPropagation();
    await apiDeleteSession(id);
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (id === activeSessionId) startNewChat();
  }, [activeSessionId, startNewChat]);
  return /* @__PURE__ */ jsxs("div", { className: "flex h-[calc(100vh-64px)]", style: {
    color: "var(--text-primary)"
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: `sidebar transition-all duration-300 flex-shrink-0 flex flex-col ${sidebarOpen ? "w-64" : "w-0 overflow-hidden"}`, children: [
      /* @__PURE__ */ jsx("div", { className: "p-4 border-b", style: {
        borderColor: "rgba(0,245,255,0.1)"
      }, children: /* @__PURE__ */ jsxs("button", { onClick: startNewChat, className: "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors", style: {
        background: "rgba(0,245,255,0.06)",
        border: "1px solid rgba(0,245,255,0.2)",
        color: "var(--neon-cyan)"
      }, children: [
        /* @__PURE__ */ jsx(Plus, { size: 14 }),
        "New Chat"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-3", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs font-medium mb-2 px-2", style: {
          color: "var(--text-muted)"
        }, children: "Chat History" }),
        sessions.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-xs px-2", style: {
          color: "var(--text-muted)"
        }, children: "No chats yet" }) : /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1", children: sessions.map((session) => {
          const isActive = session.id === activeSessionId;
          return /* @__PURE__ */ jsxs("div", { onClick: () => selectSession(session.id), className: "group px-2 py-2 rounded-lg text-xs cursor-pointer transition-all flex items-start gap-2", style: {
            background: isActive ? "rgba(0,245,255,0.08)" : void 0,
            border: isActive ? "1px solid rgba(0,245,255,0.2)" : "1px solid transparent"
          }, children: [
            /* @__PURE__ */ jsx(MessageSquare, { size: 12, className: "flex-shrink-0 mt-0.5", style: {
              color: "var(--neon-cyan)"
            } }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: "truncate", style: {
                color: "var(--text-primary)"
              }, children: session.title }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 mt-0.5", style: {
                color: "var(--text-muted)"
              }, children: [
                /* @__PURE__ */ jsx(Clock, { size: 9 }),
                /* @__PURE__ */ jsx("span", { children: formatTime(session.updatedAt) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: (e) => handleDeleteSession(session.id, e), className: "opacity-0 group-hover:opacity-100 flex-shrink-0 p-0.5 rounded transition-all hover:text-[var(--neon-pink)]", style: {
              color: "var(--text-muted)"
            }, title: "Delete chat", children: /* @__PURE__ */ jsx(Trash2, { size: 11 }) })
          ] }, session.id);
        }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-4 border-t", style: {
        borderColor: "rgba(0,245,255,0.1)"
      }, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs", style: {
        color: "var(--text-muted)"
      }, children: [
        /* @__PURE__ */ jsx(Zap, { size: 12, style: {
          color: "var(--neon-green)"
        } }),
        "AI Provider: Auto-select"
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(ChatInterface, { initialSessionId: activeSessionId, initialMessages, onSessionCreated: handleSessionCreated, onSidebarToggle: () => setSidebarOpen((o) => !o) }, chatKey)
  ] });
}
export {
  ChatPage as component
};
