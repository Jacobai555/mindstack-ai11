import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Sparkles, Brain, Zap, Wrench, BookOpen, ChevronRight, ArrowRight, Cpu, Code2, Globe, Lock, MessageSquare, Shield } from "lucide-react";
const features = [{
  icon: /* @__PURE__ */ jsx(MessageSquare, { size: 22 }),
  title: "AI Chat",
  desc: "ChatGPT-style interface powered by real AI. Multi-provider support with streaming responses.",
  color: "var(--neon-cyan)",
  to: "/chat"
}, {
  icon: /* @__PURE__ */ jsx(Wrench, { size: 22 }),
  title: "AI Tools",
  desc: "Prompt enhancer, code explainer, text summarizer, and more specialized AI tools.",
  color: "var(--neon-purple)",
  to: "/tools"
}, {
  icon: /* @__PURE__ */ jsx(Shield, { size: 22 }),
  title: "Cyber Lab",
  desc: "Educational cybersecurity terminal with hash generators, Linux commands, and networking basics.",
  color: "var(--neon-green)",
  to: "/cyber-lab"
}, {
  icon: /* @__PURE__ */ jsx(BookOpen, { size: 22 }),
  title: "Learn AI",
  desc: "From fundamentals to transformers. Interactive lessons on ML, neural networks, and AI agents.",
  color: "var(--neon-pink)",
  to: "/learn"
}];
const stats = [{
  label: "AI Providers",
  value: "4+"
}, {
  label: "Tools Available",
  value: "12+"
}, {
  label: "Learning Modules",
  value: "6"
}, {
  label: "Open Source",
  value: "100%"
}];
function HomePage() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative min-h-[90vh] flex items-center justify-center grid-bg", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none", style: {
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,245,255,0.06) 0%, rgba(176,68,255,0.04) 40%, transparent 70%)"
      } }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center px-4 max-w-5xl mx-auto fade-in-up", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8", style: {
          background: "rgba(0,245,255,0.08)",
          border: "1px solid rgba(0,245,255,0.2)",
          color: "var(--neon-cyan)"
        }, children: [
          /* @__PURE__ */ jsx(Sparkles, { size: 12 }),
          /* @__PURE__ */ jsx("span", { children: "AI Engineering Lab v1.0" }),
          /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-[var(--neon-green)] animate-pulse" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsx("div", { className: "ai-orb flex items-center justify-center", children: /* @__PURE__ */ jsx(Brain, { size: 48, color: "rgba(0,245,255,0.9)" }) }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-5xl sm:text-7xl font-bold mb-4 tracking-tight", children: /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "MindStack AI" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl font-medium mb-3", style: {
          color: "var(--text-muted)"
        }, children: "Offline AI Engineering Lab and Intelligent Assistant Platform" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base max-w-2xl mx-auto mb-10", style: {
          color: "var(--text-muted)"
        }, children: "Explore cutting-edge AI capabilities, build with multiple AI providers, learn cybersecurity, and master machine learning — all in one futuristic platform." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 justify-center", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/chat", className: "btn-neon btn-neon-solid", children: [
            /* @__PURE__ */ jsx(Zap, { size: 16 }),
            "Launch AI"
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: "/tools", className: "btn-neon btn-neon-cyan", children: [
            /* @__PURE__ */ jsx(Wrench, { size: 16 }),
            "Explore Tools"
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: "/learn", className: "btn-neon btn-neon-purple", children: [
            /* @__PURE__ */ jsx(BookOpen, { size: 16 }),
            "Learn AI"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40", children: /* @__PURE__ */ jsx(ChevronRight, { size: 20, style: {
          transform: "rotate(90deg)",
          color: "var(--neon-cyan)"
        } }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-12 border-y", style: {
      borderColor: "rgba(0,245,255,0.06)",
      background: "rgba(0,245,255,0.01)"
    }, children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6", children: stats.map((stat) => /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold gradient-text", children: stat.value }),
      /* @__PURE__ */ jsx("div", { className: "text-sm mt-1", style: {
        color: "var(--text-muted)"
      }, children: stat.label })
    ] }, stat.label)) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-center mb-3 section-title", children: "Platform Features" }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-sm mt-6 mb-12", style: {
        color: "var(--text-muted)"
      }, children: "Everything you need to explore, build, and learn with AI" }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: features.map((f) => /* @__PURE__ */ jsxs(Link, { to: f.to, className: "glass-card tool-card p-6 group no-underline", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg flex items-center justify-center mb-4", style: {
          background: `${f.color}15`,
          border: `1px solid ${f.color}30`,
          color: f.color
        }, children: f.icon }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", style: {
          color: "var(--text-primary)"
        }, children: f.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed", style: {
          color: "var(--text-muted)"
        }, children: f.desc }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity", style: {
          color: f.color
        }, children: [
          "Explore ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 12 })
        ] })
      ] }, f.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 px-4", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "glass-card p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs font-mono mb-3", style: {
          color: "var(--neon-cyan)"
        }, children: "// AI PROVIDERS" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-4", style: {
          color: "var(--text-primary)"
        }, children: "Multi-Provider AI Architecture" }),
        /* @__PURE__ */ jsx("p", { className: "mb-6", style: {
          color: "var(--text-muted)"
        }, children: "MindStack AI intelligently routes your queries to the best available AI provider. Seamless fallback chain ensures you always get a response." }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [{
          label: "Anthropic Claude",
          badge: "Preferred",
          color: "var(--neon-cyan)"
        }, {
          label: "OpenAI GPT-4o",
          badge: "Fallback",
          color: "var(--neon-purple)"
        }, {
          label: "Google Gemini",
          badge: "Fallback",
          color: "var(--neon-green)"
        }, {
          label: "Ollama (Local)",
          badge: "Offline",
          color: "var(--neon-pink)"
        }].map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg", style: {
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)"
        }, children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", style: {
            color: "var(--text-primary)"
          }, children: item.label }),
          /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-0.5 rounded-full", style: {
            color: item.color,
            background: `${item.color}15`,
            border: `1px solid ${item.color}30`
          }, children: item.badge })
        ] }, item.label)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "terminal", children: [
        /* @__PURE__ */ jsxs("div", { className: "terminal-header", children: [
          /* @__PURE__ */ jsx("div", { className: "terminal-dot", style: {
            background: "#ff5f57"
          } }),
          /* @__PURE__ */ jsx("div", { className: "terminal-dot", style: {
            background: "#febc2e"
          } }),
          /* @__PURE__ */ jsx("div", { className: "terminal-dot", style: {
            background: "#28c840"
          } }),
          /* @__PURE__ */ jsx("span", { className: "text-xs ml-2", style: {
            color: "var(--text-muted)"
          }, children: "mindstack-ai ~ terminal" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "terminal-body text-xs", children: [
          /* @__PURE__ */ jsx("div", { className: "terminal-prompt", children: "initializing MindStack AI v1.0" }),
          /* @__PURE__ */ jsx("div", { style: {
            color: "#64748b"
          }, children: "Checking providers..." }),
          /* @__PURE__ */ jsx("div", { style: {
            color: "var(--neon-green)"
          }, children: "✓ Anthropic connected" }),
          /* @__PURE__ */ jsx("div", { style: {
            color: "var(--neon-green)"
          }, children: "✓ OpenAI connected" }),
          /* @__PURE__ */ jsx("div", { style: {
            color: "var(--neon-green)"
          }, children: "✓ Gemini connected" }),
          /* @__PURE__ */ jsx("div", { style: {
            color: "var(--neon-purple)"
          }, children: "⟳ Ollama (local) ready" }),
          /* @__PURE__ */ jsx("div", { className: "mt-2", style: {
            color: "#64748b"
          }, children: "Loading tools..." }),
          /* @__PURE__ */ jsx("div", { style: {
            color: "var(--neon-green)"
          }, children: "✓ 12 tools loaded" }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 terminal-prompt", style: {
            color: "var(--neon-cyan)"
          }, children: "System ready. Hello, Engineer. _" })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-8 section-title", children: "Start Exploring" }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 flex flex-wrap gap-4 justify-center", children: [{
        icon: /* @__PURE__ */ jsx(Cpu, { size: 14 }),
        label: "Cyber Lab",
        to: "/cyber-lab",
        color: "var(--neon-green)"
      }, {
        icon: /* @__PURE__ */ jsx(Code2, { size: 14 }),
        label: "Code Explainer",
        to: "/tools",
        color: "var(--neon-cyan)"
      }, {
        icon: /* @__PURE__ */ jsx(Globe, { size: 14 }),
        label: "Learn Transformers",
        to: "/learn",
        color: "var(--neon-purple)"
      }, {
        icon: /* @__PURE__ */ jsx(Lock, { size: 14 }),
        label: "Password Checker",
        to: "/cyber-lab",
        color: "var(--neon-pink)"
      }, {
        icon: /* @__PURE__ */ jsx(Brain, { size: 14 }),
        label: "AI Agents",
        to: "/learn",
        color: "var(--neon-cyan)"
      }].map((item) => /* @__PURE__ */ jsxs(Link, { to: item.to, className: "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5", style: {
        color: item.color,
        background: `${item.color}10`,
        border: `1px solid ${item.color}25`
      }, children: [
        item.icon,
        item.label
      ] }, item.label)) })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { className: "py-10 px-4 border-t", style: {
      borderColor: "rgba(0,245,255,0.06)"
    }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Brain, { size: 18, style: {
          color: "var(--neon-cyan)"
        } }),
        /* @__PURE__ */ jsx("span", { className: "font-bold gradient-text", children: "MindStack AI" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs", style: {
        color: "var(--text-muted)"
      }, children: "Open-source AI engineering platform · Educational use only" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-xs", style: {
        color: "var(--text-muted)"
      }, children: [
        /* @__PURE__ */ jsx("a", { href: "https://github.com", target: "_blank", rel: "noopener noreferrer", className: "hover:text-[var(--neon-cyan)] transition-colors", children: "GitHub" }),
        /* @__PURE__ */ jsx(Link, { to: "/about", className: "hover:text-[var(--neon-cyan)] transition-colors", children: "About" }),
        /* @__PURE__ */ jsx(Link, { to: "/learn", className: "hover:text-[var(--neon-cyan)] transition-colors", children: "Docs" })
      ] })
    ] }) })
  ] });
}
export {
  HomePage as component
};
