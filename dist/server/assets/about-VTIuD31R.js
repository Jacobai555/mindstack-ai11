import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Brain, Code2, ExternalLink, Github, BookOpen, Heart, Globe, Shield, Zap } from "lucide-react";
const pillars = [{
  icon: /* @__PURE__ */ jsx(Brain, { size: 20 }),
  title: "AI Engineering Lab",
  desc: "A hands-on environment for experimenting with AI models, prompts, and multi-provider architectures. Built for engineers who want to go beyond chat interfaces.",
  color: "var(--neon-cyan)"
}, {
  icon: /* @__PURE__ */ jsx(Zap, { size: 20 }),
  title: "Offline AI Experimentation",
  desc: "MindStack AI supports fully offline operation through Ollama. Run LLaMA, Mistral, and other open models locally with zero data leaving your machine.",
  color: "var(--neon-purple)"
}, {
  icon: /* @__PURE__ */ jsx(BookOpen, { size: 20 }),
  title: "Educational Platform",
  desc: "From ML basics to transformer architecture — interactive lessons, visual explanations, and real code examples that help you build genuine AI understanding.",
  color: "var(--neon-green)"
}, {
  icon: /* @__PURE__ */ jsx(Shield, { size: 20 }),
  title: "Security Learning",
  desc: "An ethical cybersecurity lab with tools for learning hash functions, password security, Linux commands, and network fundamentals. Always educational.",
  color: "var(--neon-pink)"
}];
const techStack = [{
  name: "TanStack Start",
  role: "Full-stack React framework",
  url: "#"
}, {
  name: "TanStack Router",
  role: "Type-safe file-based routing",
  url: "#"
}, {
  name: "TanStack AI",
  role: "Multi-provider AI orchestration",
  url: "#"
}, {
  name: "Anthropic Claude",
  role: "Primary AI provider",
  url: "#"
}, {
  name: "Tailwind CSS v4",
  role: "Utility-first styling",
  url: "#"
}, {
  name: "Netlify",
  role: "Deployment and edge functions",
  url: "#"
}, {
  name: "Vite 7",
  role: "Build tooling",
  url: "#"
}, {
  name: "TypeScript 5.7",
  role: "Type safety across the stack",
  url: "#"
}];
function AboutPage() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen px-4 py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsx("div", { className: "ai-orb flex items-center justify-center", style: {
        width: "80px",
        height: "80px"
      }, children: /* @__PURE__ */ jsx(Brain, { size: 32, color: "rgba(0,245,255,0.9)" }) }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-5xl font-bold mb-4 gradient-text", children: "MindStack AI" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg max-w-2xl mx-auto", style: {
        color: "var(--text-muted)"
      }, children: "An open-source AI engineering lab built for developers, learners, and AI enthusiasts who want more than a chat interface." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "glass-card p-8 mb-12 text-center relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none", style: {
        background: "radial-gradient(ellipse at 50% 0%, rgba(0,245,255,0.05) 0%, transparent 70%)"
      } }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs font-mono mb-3", style: {
          color: "var(--neon-cyan)"
        }, children: "// MISSION" }),
        /* @__PURE__ */ jsx("blockquote", { className: "text-xl font-medium leading-relaxed max-w-3xl mx-auto", style: {
          color: "var(--text-primary)"
        }, children: '"To democratize AI engineering by providing a unified, open-source platform where anyone can experiment with large language models, learn cybersecurity fundamentals, and build AI-powered tools — all from a single, offline-capable environment."' })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-6 mb-14", children: pillars.map((p) => /* @__PURE__ */ jsxs("div", { className: "glass-card tool-card p-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center mb-4", style: {
        background: `${p.color}12`,
        border: `1px solid ${p.color}25`,
        color: p.color
      }, children: p.icon }),
      /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", style: {
        color: "var(--text-primary)"
      }, children: p.title }),
      /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed", style: {
        color: "var(--text-muted)"
      }, children: p.desc })
    ] }, p.title)) }),
    /* @__PURE__ */ jsxs("div", { className: "mb-14", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold mb-6 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Code2, { size: 18, style: {
          color: "var(--neon-cyan)"
        } }),
        /* @__PURE__ */ jsx("span", { style: {
          color: "var(--text-primary)"
        }, children: "Technology Stack" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: techStack.map((tech) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl", style: {
        background: "rgba(0,245,255,0.02)",
        border: "1px solid rgba(0,245,255,0.08)"
      }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-medium text-sm", style: {
            color: "var(--text-primary)"
          }, children: tech.name }),
          /* @__PURE__ */ jsx("div", { className: "text-xs", style: {
            color: "var(--text-muted)"
          }, children: tech.role })
        ] }),
        /* @__PURE__ */ jsx(ExternalLink, { size: 14, style: {
          color: "var(--text-muted)"
        } })
      ] }, tech.name)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "glass-card p-8 mb-12 text-center", style: {
      borderColor: "rgba(176,68,255,0.2)"
    }, children: [
      /* @__PURE__ */ jsx(Github, { size: 32, className: "mx-auto mb-4", style: {
        color: "var(--neon-purple)"
      } }),
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-2", style: {
        color: "var(--text-primary)"
      }, children: "Open Source Inspired" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm mb-6 max-w-lg mx-auto", style: {
        color: "var(--text-muted)"
      }, children: "MindStack AI is built with open-source technologies and an open-source spirit. Contributions, feedback, and forks are welcome." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 justify-center", children: [
        /* @__PURE__ */ jsxs("a", { href: "https://github.com", target: "_blank", rel: "noopener noreferrer", className: "btn-neon btn-neon-purple", children: [
          /* @__PURE__ */ jsx(Github, { size: 15 }),
          "View on GitHub"
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/learn", className: "btn-neon btn-neon-cyan", children: [
          /* @__PURE__ */ jsx(BookOpen, { size: 15 }),
          "Read the Docs"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center text-sm", style: {
      color: "var(--text-muted)"
    }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsx(Heart, { size: 14, style: {
          color: "var(--neon-pink)"
        } }),
        /* @__PURE__ */ jsx("span", { children: "Built with love for the AI engineering community" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4 text-xs", children: [
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Globe, { size: 12 }),
          " Deployed on Netlify"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Brain, { size: 12 }),
          " Powered by Claude + TanStack AI"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Shield, { size: 12 }),
          " Educational use only"
        ] })
      ] })
    ] })
  ] }) });
}
export {
  AboutPage as component
};
