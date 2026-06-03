import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Zap, ChevronRight, Sparkles, Code2, Terminal, FileText, StickyNote, Shield, X, Check, Copy } from "lucide-react";
const tools = [{
  id: "prompt-enhancer",
  icon: /* @__PURE__ */ jsx(Sparkles, { size: 24 }),
  title: "Prompt Enhancer",
  desc: "Transform basic prompts into detailed, optimized instructions for better AI responses.",
  color: "var(--neon-cyan)",
  badge: "Popular"
}, {
  id: "code-explainer",
  icon: /* @__PURE__ */ jsx(Code2, { size: 24 }),
  title: "Code Explainer",
  desc: "Paste any code snippet and get a clear, line-by-line explanation in plain English.",
  color: "var(--neon-purple)",
  badge: "Dev"
}, {
  id: "linux-helper",
  icon: /* @__PURE__ */ jsx(Terminal, { size: 24 }),
  title: "Linux Command Helper",
  desc: "Describe what you want to do and get the right Linux command with explanation.",
  color: "var(--neon-green)",
  badge: "Terminal"
}, {
  id: "text-summarizer",
  icon: /* @__PURE__ */ jsx(FileText, { size: 24 }),
  title: "Text Summarizer",
  desc: "Condense long articles, documents, or text into concise, readable summaries.",
  color: "var(--neon-pink)",
  badge: "NLP"
}, {
  id: "ai-notes",
  icon: /* @__PURE__ */ jsx(StickyNote, { size: 24 }),
  title: "AI Notes",
  desc: "Smart note-taking with AI-powered organization, tagging, and search.",
  color: "var(--neon-cyan)",
  badge: "Productivity"
}, {
  id: "cyber-assistant",
  icon: /* @__PURE__ */ jsx(Shield, { size: 24 }),
  title: "Cybersecurity Assistant",
  desc: "Get guidance on security best practices, vulnerability explanations, and defense strategies.",
  color: "var(--neon-purple)",
  badge: "Security"
}];
const toolContent = {
  "prompt-enhancer": {
    placeholder: 'Enter your basic prompt here...\nExample: "write a story"',
    buttonLabel: "Enhance Prompt",
    process: (input) => {
      if (!input.trim()) return "";
      return `✨ Enhanced Prompt:

${input.trim()}

Additional Context: Please provide a detailed, well-structured response with specific examples. Use clear headings where appropriate. Consider edge cases and include practical applications. Aim for comprehensive coverage while maintaining clarity and conciseness.

Tone: Professional yet accessible
Format: Structured with examples
Length: Comprehensive but focused`;
    }
  },
  "code-explainer": {
    placeholder: "Paste your code here...\nExample:\ndef fibonacci(n):\n    if n <= 1: return n\n    return fibonacci(n-1) + fibonacci(n-2)",
    buttonLabel: "Explain Code",
    process: (input) => {
      if (!input.trim()) return "";
      const lines = input.trim().split("\n");
      return `📖 Code Explanation:

Language detected: ${input.includes("def ") ? "Python" : input.includes("function") ? "JavaScript" : "Unknown"}
Lines analyzed: ${lines.length}

This code snippet defines functionality that processes data and returns a result.

[Connect to AI API for detailed analysis]

Line-by-line breakdown:
${lines.slice(0, 5).map((l, i) => `  Line ${i + 1}: ${l.trim() || "(empty)"}`).join("\n")}
${lines.length > 5 ? `  ... and ${lines.length - 5} more lines` : ""}

💡 Tip: For deep code analysis, use the AI Chat with your code.`;
    }
  },
  "linux-helper": {
    placeholder: 'Describe what you want to do...\nExample: "find all files larger than 100MB in my home directory"',
    buttonLabel: "Get Command",
    process: (input) => {
      if (!input.trim()) return "";
      const examples = {
        "find": "find ~ -size +100M -type f 2>/dev/null",
        "list": "ls -la --sort=size",
        "disk": "df -h && du -sh /*",
        "process": "ps aux | grep -v grep | sort -k3 -rn | head -20",
        "port": "ss -tulpn | grep LISTEN",
        "network": "ip addr show && ip route show"
      };
      const key = Object.keys(examples).find((k) => input.toLowerCase().includes(k));
      const cmd = key ? examples[key] : `# Command for: "${input.trim()}"
# Connecting to AI for precise command...`;
      return `🖥️ Linux Command:

$ ${cmd}

Explanation:
This command performs the requested operation safely.
Always review commands before running as root.

⚠️ Use with caution in production environments.`;
    }
  },
  "text-summarizer": {
    placeholder: "Paste text to summarize...",
    buttonLabel: "Summarize",
    process: (input) => {
      if (!input.trim()) return "";
      const words = input.trim().split(/\s+/).length;
      const sentences = input.trim().split(/[.!?]+/).filter(Boolean);
      const preview = sentences[0]?.trim() || input.slice(0, 100);
      return `📝 Summary:

Original: ${words} words, ${sentences.length} sentences
Reduction: ~${Math.round((1 - Math.min(50, words) / words) * 100)}%

Key Points:
• ${preview}${sentences[1] ? "\n• " + sentences[1].trim() : ""}

[Connect to AI API for intelligent summarization]

💡 For best results, use the AI Chat for full document analysis.`;
    }
  },
  "ai-notes": {
    placeholder: "Start typing your note...",
    buttonLabel: "Save & Analyze",
    process: (input) => {
      if (!input.trim()) return "";
      const words = input.split(/\s+/).length;
      const topics = ["AI", "code", "security", "data", "network", "system"];
      const detected = topics.filter((t) => input.toLowerCase().includes(t));
      return `📌 Note Saved!

Word count: ${words}
Detected topics: ${detected.length ? detected.join(", ") : "General"}
Sentiment: Neutral
Priority: Medium

AI Tags: #${detected[0] || "note"} #mindstack #${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}

✅ Note indexed and searchable.`;
    }
  },
  "cyber-assistant": {
    placeholder: 'Ask about cybersecurity...\nExample: "What is SQL injection and how to prevent it?"',
    buttonLabel: "Get Security Advice",
    process: (input) => {
      if (!input.trim()) return "";
      return `🛡️ Security Analysis:

Query: "${input.trim()}"

Security Recommendations:
• Always validate and sanitize user inputs
• Use parameterized queries to prevent SQL injection
• Implement proper authentication and authorization
• Enable HTTPS and use secure headers
• Keep dependencies updated
• Follow the principle of least privilege

⚠️ Educational Note:
This information is for defensive security purposes only.
Always obtain proper authorization before testing systems.

[Connect to AI API for detailed security guidance]`;
    }
  }
};
function ToolModal({
  tool,
  onClose
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const config = toolContent[tool.id];
  const handleProcess = () => {
    const result = config.process(input);
    setOutput(result);
  };
  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsx("div", { className: "modal-overlay", onClick: onClose, children: /* @__PURE__ */ jsxs("div", { className: "glass-card w-full max-w-2xl max-h-[85vh] flex flex-col", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-5 border-b", style: {
      borderColor: "rgba(0,245,255,0.1)"
    }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-lg flex items-center justify-center", style: {
          background: `${tool.color}15`,
          border: `1px solid ${tool.color}30`,
          color: tool.color
        }, children: tool.icon }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", style: {
            color: "var(--text-primary)"
          }, children: tool.title }),
          /* @__PURE__ */ jsx("p", { className: "text-xs", style: {
            color: "var(--text-muted)"
          }, children: tool.desc })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "p-1.5 rounded-lg hover:text-[var(--neon-pink)] transition-colors", style: {
        color: "var(--text-muted)"
      }, children: /* @__PURE__ */ jsx(X, { size: 18 }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-5 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-2", style: {
          color: "var(--text-muted)"
        }, children: "Input" }),
        /* @__PURE__ */ jsx("textarea", { value: input, onChange: (e) => setInput(e.target.value), placeholder: config.placeholder, rows: 5, style: {
          width: "100%",
          background: "rgba(13,20,40,0.9)",
          border: `1px solid ${tool.color}30`,
          borderRadius: "8px",
          color: "var(--text-primary)",
          padding: "12px",
          fontSize: "13px",
          fontFamily: tool.id === "code-explainer" || tool.id === "linux-helper" ? "monospace" : "inherit",
          resize: "vertical",
          outline: "none",
          lineHeight: "1.6"
        } })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: handleProcess, disabled: !input.trim(), className: "w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-40", style: {
        background: `linear-gradient(135deg, ${tool.color}20, ${tool.color}10)`,
        border: `1px solid ${tool.color}40`,
        color: tool.color
      }, children: [
        /* @__PURE__ */ jsx(Zap, { size: 14 }),
        config.buttonLabel
      ] }),
      output && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-medium", style: {
            color: "var(--text-muted)"
          }, children: "Output" }),
          /* @__PURE__ */ jsxs("button", { onClick: handleCopy, className: "flex items-center gap-1 text-xs transition-colors", style: {
            color: copied ? "var(--neon-green)" : "var(--text-muted)"
          }, children: [
            copied ? /* @__PURE__ */ jsx(Check, { size: 12 }) : /* @__PURE__ */ jsx(Copy, { size: 12 }),
            copied ? "Copied!" : "Copy"
          ] })
        ] }),
        /* @__PURE__ */ jsx("pre", { className: "terminal-body terminal text-xs whitespace-pre-wrap", style: {
          fontSize: "12px"
        }, children: output })
      ] })
    ] })
  ] }) });
}
function ToolsPage() {
  const [activeTool, setActiveTool] = useState(null);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen px-4 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6", style: {
          background: "rgba(176,68,255,0.08)",
          border: "1px solid rgba(176,68,255,0.2)",
          color: "var(--neon-purple)"
        }, children: [
          /* @__PURE__ */ jsx(Zap, { size: 11 }),
          "AI-Powered Tools"
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-3 section-title gradient-text", children: "AI Tools" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm mt-8 max-w-xl mx-auto", style: {
          color: "var(--text-muted)"
        }, children: "Specialized tools powered by AI to boost your productivity, learning, and security workflows." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: tools.map((tool) => /* @__PURE__ */ jsxs("button", { onClick: () => setActiveTool(tool), className: "glass-card tool-card glow-border p-6 text-left group", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl flex items-center justify-center", style: {
            background: `${tool.color}12`,
            border: `1px solid ${tool.color}25`,
            color: tool.color
          }, children: tool.icon }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-0.5 rounded-full", style: {
            color: tool.color,
            background: `${tool.color}10`,
            border: `1px solid ${tool.color}20`
          }, children: tool.badge }) })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", style: {
          color: "var(--text-primary)"
        }, children: tool.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed mb-4", style: {
          color: "var(--text-muted)"
        }, children: tool.desc }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity", style: {
          color: tool.color
        }, children: [
          "Open Tool ",
          /* @__PURE__ */ jsx(ChevronRight, { size: 12 })
        ] })
      ] }, tool.id)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 p-5 rounded-xl text-sm text-center", style: {
        background: "rgba(0,245,255,0.03)",
        border: "1px solid rgba(0,245,255,0.1)",
        color: "var(--text-muted)"
      }, children: [
        /* @__PURE__ */ jsx(Sparkles, { size: 14, className: "inline mr-2", style: {
          color: "var(--neon-cyan)"
        } }),
        "Tools use local processing now. Connect your AI API key for intelligent, context-aware results."
      ] })
    ] }),
    activeTool && /* @__PURE__ */ jsx(ToolModal, { tool: activeTool, onClose: () => setActiveTool(null) })
  ] });
}
export {
  ToolsPage as component
};
