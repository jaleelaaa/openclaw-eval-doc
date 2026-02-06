# OpenClaw Documentation

Official documentation for OpenClaw - a self-hosted AI Agent Gateway that connects AI agents to messaging platforms.

## Live Site

**Production:** https://openclaw-docs.netlify.app

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Documentation:** Fumadocs
- **Styling:** Tailwind CSS v4
- **Content:** MDX
- **Deployment:** Netlify

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/jaleelaaa/openclaw-eval-doc.git
cd openclaw-eval-doc

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at http://localhost:3000

### Build

```bash
npm run build
npm start
```

## Project Structure

```
Doc-Pre/
├── app/                    # Next.js app router
│   ├── docs/              # Documentation pages
│   ├── layout.tsx         # Root layout
│   └── global.css         # Global styles
├── content/
│   └── docs/
│       └── openclaw/      # Documentation content (MDX)
│           ├── introduction/
│           ├── installation/
│           ├── configuration/
│           ├── concepts/
│           ├── channels/
│           ├── plugins/
│           ├── operations/
│           └── reference/
├── public/
│   └── diagrams/          # SVG diagrams
│       ├── skills/        # Skill-specific diagrams
│       └── *.svg          # Architecture diagrams
├── components/            # React components
├── lib/                   # Utility functions
├── netlify.toml          # Netlify configuration
└── render.yaml           # Render configuration
```

## Documentation Sections

- **Getting Started** - Introduction, architecture, quick start guide
- **Installation** - Docker, native, and source installation methods
- **Configuration** - Settings, environment variables, workspace setup
- **Concepts** - Gateway, agents, sessions, message flow
- **Channels** - WhatsApp, Telegram, Discord, Slack integration
- **Plugins & Skills** - Built-in skills, additional skills, SDK reference
- **Operations** - Health monitoring, logging, security, troubleshooting
- **Reference** - CLI commands, API reference, glossary

## Diagrams

All diagrams are professional SVG files located in `public/diagrams/`:

- `openclaw-architecture.svg` - System architecture overview
- `openclaw-sequence.svg` - Message processing sequence
- `openclaw-dataflow.svg` - Configuration data flow
- `gateway-architecture.svg` - Gateway process architecture
- `agent-architecture.svg` - Agent runtime architecture
- `session-lifecycle.svg` - Session management flow
- `websocket-protocol.svg` - WebSocket communication protocol
- `component-communication.svg` - Docker compose stack

## Deployment

### Netlify (Current)

Automatic deployment on push to `main` branch. Configuration in `netlify.toml`.

### Render (Alternative)

Configuration available in `render.yaml` for Render deployment.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License

## Links

- **Documentation:** https://openclaw-docs.netlify.app
- **GitHub:** https://github.com/jaleelaaa/openclaw-eval-doc
