'use client';

import Link from 'next/link';
import {
  Bot,
  MessageSquare,
  Zap,
  Shield,
  Code2,
  Terminal,
  Cpu,
  Globe,
  ArrowRight,
  Sparkles,
  GitBranch,
  Settings,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Animated typing effect component
function TypeWriter({ words, className }: { words: string[], className?: string }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(word.substring(0, currentText.length + 1));
        if (currentText === word) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(word.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// Channel icon component
function ChannelIcon({ name, color, delay }: { name: string; color: string; delay: number }) {
  return (
    <div
      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-fd-card border border-fd-border hover:border-fd-primary/50 hover:shadow-lg hover:shadow-fd-primary/10 transition-all duration-300 hover:-translate-y-1 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg transition-transform group-hover:scale-110"
        style={{ backgroundColor: color }}
      >
        {name.charAt(0)}
      </div>
      <span className="text-sm font-medium text-fd-muted-foreground group-hover:text-fd-foreground transition-colors">
        {name}
      </span>
    </div>
  );
}

// Feature card component
function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient
}: {
  icon: typeof Bot;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="group relative p-6 rounded-2xl bg-fd-card border border-fd-border hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${gradient}`} />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-fd-primary/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
          <Icon className="w-6 h-6 text-fd-primary group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">{title}</h3>
        <p className="text-fd-muted-foreground group-hover:text-white/80 transition-colors text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

// Stats component
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-6">
      <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
        {value}
      </div>
      <div className="text-sm text-fd-muted-foreground">{label}</div>
    </div>
  );
}

// Code preview component
function CodePreview() {
  const [activeTab, setActiveTab] = useState('config');

  const codeSnippets = {
    config: `{
  "channels": {
    "discord": {
      "enabled": true,
      "token": "YOUR_BOT_TOKEN"
    },
    "whatsapp": { "enabled": true },
    "telegram": { "enabled": true }
  },
  "agents": {
    "defaults": {
      "model": { "primary": "google/gemini-3-flash" }
    }
  }
}`,
    docker: `# Start OpenClaw with Docker
docker compose up -d openclaw-gateway

# Check status
docker logs openclaw-gateway --tail 20

# Access Control UI
open http://localhost:18789`,
    usage: `# Send a message to your AI agent
@openclaw What's the weather in Tokyo?

# Write code
@openclaw Create a Python script for sorting

# Manage tasks
@openclaw Add "Review PR" to my Trello board`
  };

  return (
    <div className="rounded-2xl border border-fd-border overflow-hidden bg-fd-card shadow-xl">
      <div className="flex border-b border-fd-border bg-fd-muted/30">
        {Object.keys(codeSnippets).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'text-fd-primary border-b-2 border-fd-primary bg-fd-card'
                : 'text-fd-muted-foreground hover:text-fd-foreground'
            }`}
          >
            {tab === 'config' ? 'Configuration' : tab === 'docker' ? 'Docker' : 'Usage'}
          </button>
        ))}
      </div>
      <div className="p-4 bg-[#1e1e1e] overflow-x-auto">
        <pre className="text-sm text-gray-300 font-mono">
          <code>{codeSnippets[activeTab as keyof typeof codeSnippets]}</code>
        </pre>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const channels = [
    { name: 'Discord', color: '#5865F2' },
    { name: 'WhatsApp', color: '#25D366' },
    { name: 'Telegram', color: '#0088cc' },
    { name: 'Slack', color: '#4A154B' },
    { name: 'Signal', color: '#3A76F0' },
    { name: 'Teams', color: '#6264A7' },
  ];

  const features = [
    {
      icon: MessageSquare,
      title: 'Multi-Channel Support',
      description: 'Connect to WhatsApp, Telegram, Discord, Slack, Signal, Teams, and more through a unified gateway.',
      gradient: 'bg-gradient-to-br from-blue-500/90 to-cyan-500/90',
    },
    {
      icon: Cpu,
      title: 'Multiple AI Providers',
      description: 'Use Google Gemini, Claude, GPT, or local models via Ollama. Switch providers with automatic failover.',
      gradient: 'bg-gradient-to-br from-purple-500/90 to-pink-500/90',
    },
    {
      icon: Code2,
      title: 'Coding Agent',
      description: 'AI-powered code writing, debugging, and execution. Support for Python, JavaScript, Go, Rust, and more.',
      gradient: 'bg-gradient-to-br from-green-500/90 to-emerald-500/90',
    },
    {
      icon: Zap,
      title: '50+ Skills',
      description: 'Weather, GitHub, Notion, Trello, smart home control, media, and many more built-in capabilities.',
      gradient: 'bg-gradient-to-br from-orange-500/90 to-yellow-500/90',
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Multi-layer authentication, sender allowlists, pairing protocol, and sandbox isolation for tools.',
      gradient: 'bg-gradient-to-br from-red-500/90 to-rose-500/90',
    },
    {
      icon: Settings,
      title: 'Self-Hosted',
      description: 'Run on your own infrastructure. Your data stays private. Docker, native install, or cloud deployment.',
      gradient: 'bg-gradient-to-br from-indigo-500/90 to-violet-500/90',
    },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-24 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {mounted && [...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-500/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Logo */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 blur-3xl bg-blue-500/20 rounded-full scale-150" />
            <div className="relative w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/25">
              <Bot className="w-14 h-14 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-fd-foreground via-fd-foreground to-fd-muted-foreground bg-clip-text">
            OpenClaw
          </h1>

          {/* Subtitle with typing effect */}
          <p className="text-xl md:text-2xl text-fd-muted-foreground mb-4">
            Self-hosted AI Agent Gateway
          </p>

          <div className="text-lg md:text-xl mb-8 h-8">
            <span className="text-fd-muted-foreground">Connect your AI to </span>
            {mounted && (
              <TypeWriter
                words={['Discord', 'WhatsApp', 'Telegram', 'Slack', 'Signal', 'Teams']}
                className="text-fd-primary font-semibold"
              />
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/docs/openclaw"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-fd-primary text-fd-primary-foreground font-semibold text-lg hover:shadow-lg hover:shadow-fd-primary/25 transition-all hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/docs/openclaw/introduction/quickstart"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-fd-border bg-fd-card font-semibold text-lg hover:border-fd-primary/50 hover:bg-fd-muted/50 transition-all"
            >
              <Terminal className="w-5 h-5" />
              Quick Start
            </Link>
          </div>

          {/* Supported Channels */}
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {channels.map((channel, i) => (
              <ChannelIcon key={channel.name} {...channel} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-fd-border bg-fd-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value="15+" label="Messaging Platforms" />
            <StatCard value="50+" label="Built-in Skills" />
            <StatCard value="5+" label="AI Providers" />
            <StatCard value="100%" label="Self-Hosted" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need for AI-powered messaging
            </h2>
            <p className="text-lg text-fd-muted-foreground max-w-2xl mx-auto">
              OpenClaw provides a complete platform for connecting your AI agents to any messaging service with powerful tools and skills.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="py-24 px-4 bg-fd-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple to configure, powerful to use
            </h2>
            <p className="text-lg text-fd-muted-foreground max-w-2xl mx-auto">
              Get started with a single JSON file. Run with Docker or natively. Use from any messaging platform.
            </p>
          </div>

          <CodePreview />
        </div>
      </section>

      {/* Architecture Preview */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Gateway-centric architecture
              </h2>
              <p className="text-lg text-fd-muted-foreground mb-6">
                All messaging platforms connect through a unified WebSocket-based control plane. This enables consistent message handling, centralized configuration, and easy extensibility.
              </p>
              <ul className="space-y-4">
                {[
                  'Single gateway for all channels',
                  'Real-time WebSocket communication',
                  'Plugin-based extensibility',
                  'Hot-reload configuration',
                  'Multi-agent routing',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-green-500" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/docs/openclaw/introduction/architecture"
                className="inline-flex items-center gap-2 mt-8 text-fd-primary font-medium hover:gap-3 transition-all"
              >
                Learn about architecture
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-3xl" />
              <img
                src="/diagrams/openclaw-architecture.svg"
                alt="OpenClaw Architecture"
                className="relative rounded-2xl border border-fd-border shadow-2xl bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
            <div className="relative bg-fd-card border border-fd-border rounded-3xl p-12">
              <Sparkles className="w-12 h-12 text-fd-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to get started?
              </h2>
              <p className="text-lg text-fd-muted-foreground mb-8 max-w-xl mx-auto">
                Deploy OpenClaw in minutes with Docker and connect your first messaging channel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/docs/openclaw/installation/docker"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-fd-primary text-fd-primary-foreground font-semibold hover:shadow-lg hover:shadow-fd-primary/25 transition-all"
                >
                  Install with Docker
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/docs/openclaw/channels/discord"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-fd-border bg-fd-card font-semibold hover:border-fd-primary/50 transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  Connect Discord
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-fd-border py-8 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-fd-primary" />
            <span className="font-semibold">OpenClaw</span>
            <span className="text-fd-muted-foreground">v2026.2.1</span>
          </div>
          <div className="flex gap-6 text-sm text-fd-muted-foreground">
            <Link href="/docs/openclaw" className="hover:text-fd-foreground transition-colors">Documentation</Link>
            <Link href="/docs/openclaw/reference/quickref" className="hover:text-fd-foreground transition-colors">Quick Reference</Link>
            <a href="https://github.com/openclaw/openclaw" className="hover:text-fd-foreground transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
