import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Brain, ChevronDown, ChevronRight, Cpu, Network, Layers, Bot, Download, BookOpen } from 'lucide-react'

export const Route = createFileRoute('/learn')({
  component: LearnPage,
})

const modules = [
  {
    id: 'what-is-ai',
    icon: <Brain size={20} />,
    title: 'What is AI?',
    color: 'var(--neon-cyan)',
    summary: 'Artificial Intelligence enables machines to perform tasks that typically require human intelligence.',
    content: [
      {
        heading: 'Definition',
        text: 'Artificial Intelligence (AI) is the simulation of human intelligence processes by computer systems. These processes include learning (acquiring information and rules), reasoning (using rules to reach conclusions), and self-correction.',
      },
      {
        heading: 'Types of AI',
        text: 'Narrow AI (ANI): Designed for specific tasks (chess, image recognition). General AI (AGI): Human-like reasoning across domains — theoretical. Super AI (ASI): Surpasses human intelligence — hypothetical.',
      },
      {
        heading: 'Real-World Applications',
        text: '• Virtual assistants (Siri, Alexa)\n• Recommendation systems (Netflix, Spotify)\n• Fraud detection in banking\n• Medical diagnosis and drug discovery\n• Autonomous vehicles',
      },
    ],
    diagram: ['Input Data', '→', 'AI Model', '→', 'Prediction/Action'],
  },
  {
    id: 'ml-basics',
    icon: <Cpu size={20} />,
    title: 'Machine Learning Basics',
    color: 'var(--neon-purple)',
    summary: 'ML allows computers to learn from experience without being explicitly programmed for every scenario.',
    content: [
      {
        heading: 'Core Concept',
        text: 'Instead of writing rules manually, machine learning systems learn patterns from data. Given enough examples, the model generalizes to handle new, unseen cases.',
      },
      {
        heading: 'Learning Types',
        text: 'Supervised Learning: Learns from labeled data (input → output pairs)\nUnsupervised Learning: Finds hidden patterns in unlabeled data\nReinforcement Learning: Learns through trial and error with rewards',
      },
      {
        heading: 'Key Algorithms',
        text: '• Linear/Logistic Regression\n• Decision Trees & Random Forests\n• Support Vector Machines (SVM)\n• K-Means Clustering\n• Gradient Boosting (XGBoost)',
      },
    ],
    diagram: ['Training Data', '→', 'Algorithm', '→', 'Trained Model', '→', 'Predictions'],
  },
  {
    id: 'neural-networks',
    icon: <Network size={20} />,
    title: 'Neural Networks',
    color: 'var(--neon-green)',
    summary: 'Inspired by the human brain, neural networks use layers of interconnected nodes to process information.',
    content: [
      {
        heading: 'Architecture',
        text: 'A neural network consists of an input layer (receives data), hidden layers (process features), and an output layer (produces predictions). Each layer contains "neurons" connected by weighted edges.',
      },
      {
        heading: 'How Learning Works',
        text: 'Forward pass: Data flows through the network to produce a prediction.\nLoss calculation: Error between prediction and actual value is measured.\nBackpropagation: Gradients flow backward, adjusting weights to reduce error.\nOptimizer: Algorithms like Adam or SGD update the weights.',
      },
      {
        heading: 'Types of Networks',
        text: '• CNN (Convolutional): Images and spatial data\n• RNN/LSTM: Sequential data, text, time series\n• GAN: Generative models for creating content\n• Transformer: Modern NLP and multimodal AI',
      },
    ],
    diagram: ['Input', '→', '[Hidden L1]', '→', '[Hidden L2]', '→', 'Output'],
  },
  {
    id: 'transformers',
    icon: <Layers size={20} />,
    title: 'Transformers Explained',
    color: 'var(--neon-pink)',
    summary: 'The architecture behind GPT, BERT, and Claude. Transformers revolutionized NLP with the attention mechanism.',
    content: [
      {
        heading: 'The Attention Mechanism',
        text: '"Attention is All You Need" (2017) introduced transformers. Self-attention allows each token to attend to every other token in the sequence, capturing long-range dependencies that RNNs struggled with.',
      },
      {
        heading: 'Architecture',
        text: 'Encoder: Reads and understands input text (used in BERT)\nDecoder: Generates output tokens one by one (used in GPT)\nEncoder-Decoder: Full transformer for translation tasks (T5, BART)\n\nKey components: Multi-head attention, feed-forward networks, layer normalization, positional encoding.',
      },
      {
        heading: 'Why Transformers Won',
        text: '• Parallelizable training (unlike RNNs which are sequential)\n• Scale effectively to billions of parameters\n• Pre-train on massive data, fine-tune for specific tasks\n• Foundation for GPT-4, Claude, Gemini, and LLaMA',
      },
    ],
    diagram: ['Tokens', '→', 'Embeddings', '→', 'Attention Layers', '→', 'Output Logits'],
  },
  {
    id: 'ai-agents',
    icon: <Bot size={20} />,
    title: 'AI Agents',
    color: 'var(--neon-cyan)',
    summary: 'Autonomous AI systems that perceive their environment, make decisions, and take actions to achieve goals.',
    content: [
      {
        heading: 'What is an AI Agent?',
        text: 'An AI agent is an LLM augmented with tools and memory that can execute multi-step tasks autonomously. Instead of a single response, agents plan, use tools, observe results, and iterate toward a goal.',
      },
      {
        heading: 'Agent Architecture',
        text: 'Perception: Receives inputs (text, images, sensor data)\nMemory: Short-term (context window) + Long-term (vector DB)\nPlanning: ReAct, Chain-of-Thought, Tree of Thought\nTools: Web search, code execution, APIs, file systems\nAction: Executes the chosen action and observes the outcome',
      },
      {
        heading: 'Frameworks',
        text: '• LangChain / LangGraph: Python agent framework\n• AutoGPT / BabyAGI: Autonomous task decomposition\n• Claude + Tools: Anthropic\'s tool use API\n• TanStack AI: TypeScript-first agent framework (used here!)',
      },
    ],
    diagram: ['Goal', '→', 'Plan', '→', 'Tool Call', '→', 'Observe', '→', 'Next Action'],
  },
  {
    id: 'offline-ai',
    icon: <Download size={20} />,
    title: 'Offline AI Models',
    color: 'var(--neon-purple)',
    summary: 'Run powerful AI locally on your machine with privacy, no API costs, and full control.',
    content: [
      {
        heading: 'Why Run AI Locally?',
        text: 'Complete privacy (data never leaves your machine), no API costs, works offline, customizable, and you can fine-tune models for specific domains. Ideal for sensitive data and experimentation.',
      },
      {
        heading: 'Popular Local Models',
        text: 'LLaMA 3 (Meta): High quality, runs on consumer hardware\nMistral 7B: Efficient, strong performance for its size\nPhi-3 (Microsoft): Small but surprisingly capable\nDeepSeek Coder: Excellent for code tasks\nGemma (Google): Lightweight and fast',
      },
      {
        heading: 'Running with Ollama',
        text: '# Install Ollama\ncurl -fsSL https://ollama.com/install.sh | sh\n\n# Pull and run a model\nollama run mistral\nollama run llama3\nollama run phi3\n\n# List available models\nollama list\n\n# Use via API\ncurl http://localhost:11434/api/generate -d \'{"model":"mistral","prompt":"Hello"}\'',
      },
    ],
    diagram: ['Your Computer', '→', 'Ollama Runtime', '→', 'Local Model', '→', 'Response'],
  },
]

function DiagramBar({ items, color }: { items: string[]; color: string }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-4 p-3 rounded-lg"
      style={{ background: 'rgba(0,0,0,0.2)', border: `1px solid ${color}15` }}>
      {items.map((item, i) => (
        <span key={i} className="text-xs px-2 py-1 rounded font-mono"
          style={{
            background: item === '→' ? 'transparent' : `${color}12`,
            border: item === '→' ? 'none' : `1px solid ${color}25`,
            color: item === '→' ? 'var(--text-muted)' : color,
          }}>
          {item}
        </span>
      ))}
    </div>
  )
}

function LearnPage() {
  const [expanded, setExpanded] = useState<string | null>('what-is-ai')
  const [activeContent, setActiveContent] = useState<Record<string, number>>({})

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.2)', color: 'var(--neon-cyan)' }}>
            <BookOpen size={11} />
            Interactive Learning
          </div>
          <h1 className="text-4xl font-bold mb-3 section-title gradient-text">Learn AI</h1>
          <p className="text-sm mt-8 max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            From fundamentals to cutting-edge techniques. Expandable modules with visual diagrams and practical examples.
          </p>
        </div>

        {/* Progress tracker */}
        <div className="glass-card p-4 mb-8 flex items-center gap-4">
          <div className="flex-1 bg-gray-800 rounded-full h-2">
            <div className="h-2 rounded-full transition-all duration-500"
              style={{
                width: `${(Object.keys(activeContent).length / modules.length) * 100}%`,
                background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-purple))',
                boxShadow: '0 0 8px var(--neon-cyan)',
              }} />
          </div>
          <span className="text-xs whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
            {Object.keys(activeContent).length}/{modules.length} explored
          </span>
        </div>

        {/* Modules */}
        <div className="space-y-4">
          {modules.map((mod) => (
            <div key={mod.id} className="glass-card overflow-hidden">
              <button
                onClick={() => {
                  setExpanded(expanded === mod.id ? null : mod.id)
                  setActiveContent(prev => ({ ...prev, [mod.id]: 1 }))
                }}
                className="w-full p-5 flex items-center gap-4 text-left"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${mod.color}12`, border: `1px solid ${mod.color}25`, color: mod.color }}>
                  {mod.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>{mod.title}</h3>
                  <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{mod.summary}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {activeContent[mod.id] && (
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ color: 'var(--neon-green)', background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)' }}>
                      ✓
                    </span>
                  )}
                  {expanded === mod.id
                    ? <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />
                    : <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                  }
                </div>
              </button>

              {expanded === mod.id && (
                <div className="border-t px-5 pb-5" style={{ borderColor: `${mod.color}10` }}>
                  {/* Sub-tabs */}
                  <div className="flex gap-2 mt-4 mb-5 overflow-x-auto pb-1">
                    {mod.content.map((section, i) => (
                      <button
                        key={section.heading}
                        onClick={() => setActiveContent(prev => ({ ...prev, [`${mod.id}-tab`]: i }))}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
                        style={{
                          background: (activeContent[`${mod.id}-tab`] ?? 0) === i ? `${mod.color}18` : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${(activeContent[`${mod.id}-tab`] ?? 0) === i ? mod.color + '40' : 'rgba(255,255,255,0.06)'}`,
                          color: (activeContent[`${mod.id}-tab`] ?? 0) === i ? mod.color : 'var(--text-muted)',
                        }}
                      >
                        {section.heading}
                      </button>
                    ))}
                  </div>

                  {/* Content */}
                  {(() => {
                    const tabIdx = activeContent[`${mod.id}-tab`] ?? 0
                    const section = mod.content[tabIdx]
                    return (
                      <div className="fade-in-up">
                        <h4 className="text-sm font-semibold mb-3" style={{ color: mod.color }}>{section.heading}</h4>
                        <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-muted)' }}>
                          {section.text}
                        </p>
                      </div>
                    )
                  })()}

                  {/* Diagram */}
                  <DiagramBar items={mod.diagram} color={mod.color} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Resources */}
        <div className="mt-12 glass-card p-6">
          <h2 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            📚 Recommended Resources
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: 'fast.ai — Practical Deep Learning', url: '#', tag: 'Course' },
              { title: 'Andrej Karpathy — Neural Networks Zero to Hero', url: '#', tag: 'YouTube' },
              { title: 'Hugging Face NLP Course', url: '#', tag: 'Course' },
              { title: 'Papers With Code — ML Papers', url: '#', tag: 'Research' },
              { title: 'Ollama — Run LLMs Locally', url: '#', tag: 'Tool' },
              { title: 'Anthropic Claude Documentation', url: '#', tag: 'Docs' },
            ].map((r) => (
              <div key={r.title} className="flex items-center justify-between p-3 rounded-lg text-sm"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: 'var(--text-muted)' }}>{r.title}</span>
                <span className="text-xs px-2 py-0.5 rounded ml-2 flex-shrink-0"
                  style={{ color: 'var(--neon-cyan)', background: 'rgba(0,245,255,0.08)' }}>
                  {r.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
