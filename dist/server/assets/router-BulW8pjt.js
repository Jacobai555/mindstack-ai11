import { useRouterState, Link, createRootRoute, HeadContent, Outlet, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { Brain, Sun, Moon, X, Menu } from "lucide-react";
import { toolDefinition, chat, maxIterations, toServerSentEventsResponse } from "@tanstack/ai";
import { anthropicText } from "@tanstack/ai-anthropic";
import { openaiText } from "@tanstack/ai-openai";
import { geminiText } from "@tanstack/ai-gemini";
import { ollamaText } from "@tanstack/ai-ollama";
import { z } from "zod";
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/chat", label: "AI Chat" },
  { to: "/tools", label: "Tools" },
  { to: "/cyber-lab", label: "Cyber Lab" },
  { to: "/learn", label: "Learn AI" },
  { to: "/about", label: "About" }
];
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const router = useRouterState();
  const currentPath = router.location.pathname;
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      className: `fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "glass border-b border-[rgba(0,245,255,0.1)]" : ""}`,
      style: { backdropFilter: scrolled ? "blur(20px)" : "none" },
      children: [
        /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-16", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-8 h-8 rounded-lg flex items-center justify-center",
                style: { background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))" },
                children: /* @__PURE__ */ jsx(Brain, { size: 18, color: "#080b14", strokeWidth: 2.5 })
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-lg gradient-text", children: "MindStack AI" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center gap-1", children: navLinks.map((link) => /* @__PURE__ */ jsx(
            Link,
            {
              to: link.to,
              className: `nav-link px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${currentPath === link.to ? "active text-[var(--neon-cyan)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"}`,
              children: link.label
            },
            link.to
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setDarkMode(!darkMode),
                className: "p-2 rounded-lg text-[var(--text-unmuted)] hover:text-[var(--neon-cyan)] transition-colors",
                title: "Toggle theme",
                children: darkMode ? /* @__PURE__ */ jsx(Sun, { size: 18 }) : /* @__PURE__ */ jsx(Moon, { size: 18 })
              }
            ),
            /* @__PURE__ */ jsx(Link, { to: "/chat", className: "hidden md:flex btn-neon btn-neon-cyan text-xs px-4 py-2", children: "Launch AI" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setMenuOpen(!menuOpen),
                className: "md:hidden p-2 text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors",
                children: menuOpen ? /* @__PURE__ */ jsx(X, { size: 20 }) : /* @__PURE__ */ jsx(Menu, { size: 20 })
              }
            )
          ] })
        ] }) }),
        menuOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden glass border-t border-[rgba(0,245,255,0.1)]", children: /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 space-y-1", children: [
          navLinks.map((link) => /* @__PURE__ */ jsx(
            Link,
            {
              to: link.to,
              onClick: () => setMenuOpen(false),
              className: `block px-3 py-2 text-sm rounded-lg transition-colors ${currentPath === link.to ? "text-[var(--neon-cyan)] bg-[rgba(0,245,255,0.05)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"}`,
              children: link.label
            },
            link.to
          )),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/chat",
              onClick: () => setMenuOpen(false),
              className: "block btn-neon btn-neon-cyan text-center text-xs mt-2",
              children: "Launch AI"
            }
          )
        ] }) })
      ]
    }
  );
}
function ParticleBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId;
    let particles = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const colors = ["#00f5ff", "#b044ff", "#00ff88", "#ff2d78"];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return /* @__PURE__ */ jsx("canvas", { ref: canvasRef, id: "particle-canvas" });
}
const Route$7 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MindStack AI — Intelligent Assistant Platform" },
      { name: "description", content: "Offline AI Engineering Lab and Intelligent Assistant Platform. Chat, tools, cybersecurity lab, and AI learning resources." },
      { name: "theme-color", content: "#080b14" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" }
    ]
  }),
  component: RootDocument
});
function RootDocument() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", "data-theme": "dark", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { style: { background: "var(--bg-dark)", minHeight: "100vh" }, children: [
      /* @__PURE__ */ jsx(ParticleBackground, {}),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsx(Navbar, {}),
        /* @__PURE__ */ jsx("main", { style: { paddingTop: "64px" }, children: /* @__PURE__ */ jsx(Outlet, {}) })
      ] }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$5 = () => import("./tools-CEN_ERnx.js");
const Route$6 = createFileRoute("/tools")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./learn-4C9ZnTRD.js");
const Route$5 = createFileRoute("/learn")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./cyber-lab-DKFmD-3j.js");
const Route$4 = createFileRoute("/cyber-lab")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./chat-Ct7k48Ek.js");
const Route$3 = createFileRoute("/chat")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./about-VTIuD31R.js");
const Route$2 = createFileRoute("/about")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-B_62jn-8.js");
const Route$1 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const getWeatherToolDef = toolDefinition({
  name: "getWeather",
  description: "Get the current weather for a city. Returns temperature, condition, and humidity.",
  inputSchema: z.object({
    city: z.string().describe("The city to get weather for")
  }),
  outputSchema: z.object({
    city: z.string(),
    temperature: z.number(),
    condition: z.string(),
    humidity: z.number()
  })
});
const getWeather = getWeatherToolDef.server(({ city }) => {
  const conditions = ["sunny", "cloudy", "rainy", "partly cloudy", "windy"];
  return {
    city,
    temperature: Math.floor(Math.random() * 30) + 5,
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    humidity: Math.floor(Math.random() * 50) + 30
  };
});
const SYSTEM_PROMPT = `You are MindStack AI, an intelligent assistant for an AI engineering platform. You help users with:

1. AI/ML concepts: Explain machine learning, neural networks, transformers, and AI agents clearly
2. Code assistance: Write, debug, and explain code in any language
3. Cybersecurity education: Explain security concepts, vulnerabilities, and best practices (educational only)
4. General questions: Answer thoughtfully on any topic
5. Weather: Use getWeather to check current weather for any city

PERSONALITY:
- Knowledgeable but approachable
- Give concrete examples when explaining concepts
- Encourage learning and experimentation
- For security topics, always emphasize ethical and legal use

INSTRUCTIONS:
- Format responses with markdown when helpful (code blocks, lists, headers)
- Be concise but complete — don't pad responses
- When users ask about weather, use the getWeather tool
- Never assist with illegal activities or harmful content`;
const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const requestSignal = request.signal;
        if (requestSignal.aborted) {
          return new Response(null, { status: 499 });
        }
        const abortController = new AbortController();
        try {
          const body = await request.json();
          const { messages } = body;
          const data = body.data || {};
          let provider = data.provider || "ollama";
          let model = data.model || "mistral:7b";
          if (process.env.ANTHROPIC_API_KEY) {
            provider = "anthropic";
            model = "claude-haiku-4-5";
          } else if (process.env.OPENAI_API_KEY) {
            provider = "openai";
            model = "gpt-4o";
          } else if (process.env.GEMINI_API_KEY) {
            provider = "gemini";
            model = "gemini-2.0-flash-exp";
          }
          const adapterConfig = {
            anthropic: () => anthropicText(model || "claude-haiku-4-5"),
            openai: () => openaiText(model || "gpt-4o"),
            gemini: () => geminiText(model || "gemini-2.0-flash-exp"),
            ollama: () => ollamaText(model || "mistral:7b")
          };
          const adapter = adapterConfig[provider]();
          const stream = chat({
            adapter,
            tools: [getWeather],
            systemPrompts: [SYSTEM_PROMPT],
            agentLoopStrategy: maxIterations(5),
            messages,
            abortController
          });
          return toServerSentEventsResponse(stream, { abortController });
        } catch (error) {
          console.error("Chat error:", error);
          if (error.name === "AbortError" || abortController.signal.aborted) {
            return new Response(null, { status: 499 });
          }
          return new Response(
            JSON.stringify({
              error: "Failed to process chat request",
              message: error.message
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" }
            }
          );
        }
      }
    }
  }
});
const ToolsRoute = Route$6.update({
  id: "/tools",
  path: "/tools",
  getParentRoute: () => Route$7
});
const LearnRoute = Route$5.update({
  id: "/learn",
  path: "/learn",
  getParentRoute: () => Route$7
});
const CyberLabRoute = Route$4.update({
  id: "/cyber-lab",
  path: "/cyber-lab",
  getParentRoute: () => Route$7
});
const ChatRoute = Route$3.update({
  id: "/chat",
  path: "/chat",
  getParentRoute: () => Route$7
});
const AboutRoute = Route$2.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$7
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const ApiChatRoute = Route.update({
  id: "/api/chat",
  path: "/api/chat",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  ChatRoute,
  CyberLabRoute,
  LearnRoute,
  ToolsRoute,
  ApiChatRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
