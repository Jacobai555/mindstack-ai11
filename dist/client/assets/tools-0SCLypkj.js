import{c as l,r as a,j as e,X as f}from"./index-c_APeYLY.js";import{Z as p}from"./zap-B2ZOb6Xn.js";import{C as b}from"./chevron-right-Dd4AZjYq.js";import{S as u}from"./sparkles-DMhljypf.js";import{C as g}from"./code-xml-COh1pJT7.js";import{T as v}from"./terminal-Ci6sEFLX.js";import{S as j}from"./shield-BqmVPAfj.js";const w=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],k=l("check",w);const N=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],C=l("copy",N);const z=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],$=l("file-text",z);const A=[["path",{d:"M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z",key:"1dfntj"}],["path",{d:"M15 3v5a1 1 0 0 0 1 1h5",key:"6s6qgf"}]],S=l("sticky-note",A),T=[{id:"prompt-enhancer",icon:e.jsx(u,{size:24}),title:"Prompt Enhancer",desc:"Transform basic prompts into detailed, optimized instructions for better AI responses.",color:"var(--neon-cyan)",badge:"Popular"},{id:"code-explainer",icon:e.jsx(g,{size:24}),title:"Code Explainer",desc:"Paste any code snippet and get a clear, line-by-line explanation in plain English.",color:"var(--neon-purple)",badge:"Dev"},{id:"linux-helper",icon:e.jsx(v,{size:24}),title:"Linux Command Helper",desc:"Describe what you want to do and get the right Linux command with explanation.",color:"var(--neon-green)",badge:"Terminal"},{id:"text-summarizer",icon:e.jsx($,{size:24}),title:"Text Summarizer",desc:"Condense long articles, documents, or text into concise, readable summaries.",color:"var(--neon-pink)",badge:"NLP"},{id:"ai-notes",icon:e.jsx(S,{size:24}),title:"AI Notes",desc:"Smart note-taking with AI-powered organization, tagging, and search.",color:"var(--neon-cyan)",badge:"Productivity"},{id:"cyber-assistant",icon:e.jsx(j,{size:24}),title:"Cybersecurity Assistant",desc:"Get guidance on security best practices, vulnerability explanations, and defense strategies.",color:"var(--neon-purple)",badge:"Security"}],I={"prompt-enhancer":{placeholder:`Enter your basic prompt here...
Example: "write a story"`,buttonLabel:"Enhance Prompt",process:t=>t.trim()?`✨ Enhanced Prompt:

${t.trim()}

Additional Context: Please provide a detailed, well-structured response with specific examples. Use clear headings where appropriate. Consider edge cases and include practical applications. Aim for comprehensive coverage while maintaining clarity and conciseness.

Tone: Professional yet accessible
Format: Structured with examples
Length: Comprehensive but focused`:""},"code-explainer":{placeholder:`Paste your code here...
Example:
def fibonacci(n):
    if n <= 1: return n
    return fibonacci(n-1) + fibonacci(n-2)`,buttonLabel:"Explain Code",process:t=>{if(!t.trim())return"";const r=t.trim().split(`
`);return`📖 Code Explanation:

Language detected: ${t.includes("def ")?"Python":t.includes("function")?"JavaScript":"Unknown"}
Lines analyzed: ${r.length}

This code snippet defines functionality that processes data and returns a result.

[Connect to AI API for detailed analysis]

Line-by-line breakdown:
${r.slice(0,5).map((s,n)=>`  Line ${n+1}: ${s.trim()||"(empty)"}`).join(`
`)}
${r.length>5?`  ... and ${r.length-5} more lines`:""}

💡 Tip: For deep code analysis, use the AI Chat with your code.`}},"linux-helper":{placeholder:`Describe what you want to do...
Example: "find all files larger than 100MB in my home directory"`,buttonLabel:"Get Command",process:t=>{if(!t.trim())return"";const r={find:"find ~ -size +100M -type f 2>/dev/null",list:"ls -la --sort=size",disk:"df -h && du -sh /*",process:"ps aux | grep -v grep | sort -k3 -rn | head -20",port:"ss -tulpn | grep LISTEN",network:"ip addr show && ip route show"},s=Object.keys(r).find(o=>t.toLowerCase().includes(o));return`🖥️ Linux Command:

$ ${s?r[s]:`# Command for: "${t.trim()}"
# Connecting to AI for precise command...`}

Explanation:
This command performs the requested operation safely.
Always review commands before running as root.

⚠️ Use with caution in production environments.`}},"text-summarizer":{placeholder:"Paste text to summarize...",buttonLabel:"Summarize",process:t=>{if(!t.trim())return"";const r=t.trim().split(/\s+/).length,s=t.trim().split(/[.!?]+/).filter(Boolean),n=s[0]?.trim()||t.slice(0,100);return`📝 Summary:

Original: ${r} words, ${s.length} sentences
Reduction: ~${Math.round((1-Math.min(50,r)/r)*100)}%

Key Points:
• ${n}${s[1]?`
• `+s[1].trim():""}

[Connect to AI API for intelligent summarization]

💡 For best results, use the AI Chat for full document analysis.`}},"ai-notes":{placeholder:"Start typing your note...",buttonLabel:"Save & Analyze",process:t=>{if(!t.trim())return"";const r=t.split(/\s+/).length,n=["AI","code","security","data","network","system"].filter(o=>t.toLowerCase().includes(o));return`📌 Note Saved!

Word count: ${r}
Detected topics: ${n.length?n.join(", "):"General"}
Sentiment: Neutral
Priority: Medium

AI Tags: #${n[0]||"note"} #mindstack #${new Date().toISOString().split("T")[0]}

✅ Note indexed and searchable.`}},"cyber-assistant":{placeholder:`Ask about cybersecurity...
Example: "What is SQL injection and how to prevent it?"`,buttonLabel:"Get Security Advice",process:t=>t.trim()?`🛡️ Security Analysis:

Query: "${t.trim()}"

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

[Connect to AI API for detailed security guidance]`:""}};function P({tool:t,onClose:r}){const[s,n]=a.useState(""),[o,x]=a.useState(""),[c,m]=a.useState(!1),d=I[t.id],h=()=>{const i=d.process(s);x(i)},y=async()=>{await navigator.clipboard.writeText(o),m(!0),setTimeout(()=>m(!1),2e3)};return e.jsx("div",{className:"modal-overlay",onClick:r,children:e.jsxs("div",{className:"glass-card w-full max-w-2xl max-h-[85vh] flex flex-col",onClick:i=>i.stopPropagation(),children:[e.jsxs("div",{className:"flex items-center justify-between p-5 border-b",style:{borderColor:"rgba(0,245,255,0.1)"},children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-9 h-9 rounded-lg flex items-center justify-center",style:{background:`${t.color}15`,border:`1px solid ${t.color}30`,color:t.color},children:t.icon}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold",style:{color:"var(--text-primary)"},children:t.title}),e.jsx("p",{className:"text-xs",style:{color:"var(--text-muted)"},children:t.desc})]})]}),e.jsx("button",{onClick:r,className:"p-1.5 rounded-lg hover:text-[var(--neon-pink)] transition-colors",style:{color:"var(--text-muted)"},children:e.jsx(f,{size:18})})]}),e.jsxs("div",{className:"flex-1 overflow-y-auto p-5 space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs font-medium mb-2",style:{color:"var(--text-muted)"},children:"Input"}),e.jsx("textarea",{value:s,onChange:i=>n(i.target.value),placeholder:d.placeholder,rows:5,style:{width:"100%",background:"rgba(13,20,40,0.9)",border:`1px solid ${t.color}30`,borderRadius:"8px",color:"var(--text-primary)",padding:"12px",fontSize:"13px",fontFamily:t.id==="code-explainer"||t.id==="linux-helper"?"monospace":"inherit",resize:"vertical",outline:"none",lineHeight:"1.6"}})]}),e.jsxs("button",{onClick:h,disabled:!s.trim(),className:"w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-40",style:{background:`linear-gradient(135deg, ${t.color}20, ${t.color}10)`,border:`1px solid ${t.color}40`,color:t.color},children:[e.jsx(p,{size:14}),d.buttonLabel]}),o&&e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("label",{className:"text-xs font-medium",style:{color:"var(--text-muted)"},children:"Output"}),e.jsxs("button",{onClick:y,className:"flex items-center gap-1 text-xs transition-colors",style:{color:c?"var(--neon-green)":"var(--text-muted)"},children:[c?e.jsx(k,{size:12}):e.jsx(C,{size:12}),c?"Copied!":"Copy"]})]}),e.jsx("pre",{className:"terminal-body terminal text-xs whitespace-pre-wrap",style:{fontSize:"12px"},children:o})]})]})]})})}function D(){const[t,r]=a.useState(null);return e.jsxs("div",{className:"min-h-screen px-4 py-12",children:[e.jsxs("div",{className:"max-w-6xl mx-auto",children:[e.jsxs("div",{className:"text-center mb-14",children:[e.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6",style:{background:"rgba(176,68,255,0.08)",border:"1px solid rgba(176,68,255,0.2)",color:"var(--neon-purple)"},children:[e.jsx(p,{size:11}),"AI-Powered Tools"]}),e.jsx("h1",{className:"text-4xl font-bold mb-3 section-title gradient-text",children:"AI Tools"}),e.jsx("p",{className:"text-sm mt-8 max-w-xl mx-auto",style:{color:"var(--text-muted)"},children:"Specialized tools powered by AI to boost your productivity, learning, and security workflows."})]}),e.jsx("div",{className:"grid sm:grid-cols-2 lg:grid-cols-3 gap-6",children:T.map(s=>e.jsxs("button",{onClick:()=>r(s),className:"glass-card tool-card glow-border p-6 text-left group",children:[e.jsxs("div",{className:"flex items-start justify-between mb-4",children:[e.jsx("div",{className:"w-11 h-11 rounded-xl flex items-center justify-center",style:{background:`${s.color}12`,border:`1px solid ${s.color}25`,color:s.color},children:s.icon}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("span",{className:"text-xs px-2 py-0.5 rounded-full",style:{color:s.color,background:`${s.color}10`,border:`1px solid ${s.color}20`},children:s.badge})})]}),e.jsx("h3",{className:"font-semibold mb-2",style:{color:"var(--text-primary)"},children:s.title}),e.jsx("p",{className:"text-sm leading-relaxed mb-4",style:{color:"var(--text-muted)"},children:s.desc}),e.jsxs("div",{className:"flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity",style:{color:s.color},children:["Open Tool ",e.jsx(b,{size:12})]})]},s.id))}),e.jsxs("div",{className:"mt-12 p-5 rounded-xl text-sm text-center",style:{background:"rgba(0,245,255,0.03)",border:"1px solid rgba(0,245,255,0.1)",color:"var(--text-muted)"},children:[e.jsx(u,{size:14,className:"inline mr-2",style:{color:"var(--neon-cyan)"}}),"Tools use local processing now. Connect your AI API key for intelligent, context-aware results."]})]}),t&&e.jsx(P,{tool:t,onClose:()=>r(null)})]})}export{D as component};
