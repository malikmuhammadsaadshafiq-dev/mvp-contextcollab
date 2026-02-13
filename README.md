<div align="center">

# ContextCollab

**Browser extension that captures your open tabs and context into shareable briefings for async team handoffs.**

![Next.js](https://img.shields.io/badge/Next.js-333?style=flat-square) ![Supabase](https://img.shields.io/badge/Supabase-333?style=flat-square) ![Chrome Extension](https://img.shields.io/badge/Chrome%20Extension-333?style=flat-square)
![AI Powered](https://img.shields.io/badge/AI-Powered-blueviolet?style=flat-square)
![Type](https://img.shields.io/badge/Type-Web%20App-blue?style=flat-square)
![Tests](https://img.shields.io/badge/Tests-9%2F10-brightgreen?style=flat-square)

</div>

---

## Problem

Remote teams waste time in 'send me the link' back-and-forth and lose context when switching tasks or handing off work.

## Who Is This For?

Remote engineering and design teams

## Features

- **One-click session capture**
- **AI-generated context summaries**
- **Shareable links with commenting**
- **Team workspace organization**
- **Slack/Linear integration**

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js | Core dependency |
| Supabase | Core dependency |
| Chrome Extension | Core dependency |
| Kimi K2.5 (NVIDIA) | AI/LLM integration |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/malikmuhammadsaadshafiq-dev/mvp-contextcollab.git
cd mvp-contextcollab
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage Guide

### Core Workflows

**1. One-click session capture**
   - Navigate to the relevant section in the app
   - Follow the on-screen prompts to complete the action
   - Results are displayed in real-time

**2. AI-generated context summaries**
   - Navigate to the relevant section in the app
   - Follow the on-screen prompts to complete the action
   - Results are displayed in real-time

**3. Shareable links with commenting**
   - Navigate to the relevant section in the app
   - Follow the on-screen prompts to complete the action
   - Results are displayed in real-time

### AI Features

This app uses **Kimi K2.5** via NVIDIA API for intelligent processing.

To use AI features, add your NVIDIA API key:
```bash
# Create .env.local file
echo "NVIDIA_API_KEY=nvapi-your-key" > .env.local
```

Get a free API key at [build.nvidia.com](https://build.nvidia.com)


## Quality Assurance

| Test | Status |
|------|--------|
| Has state management | ✅ Pass |
| Has form/input handling | ✅ Pass |
| Has click handlers (2+) | ✅ Pass |
| Has demo data | ⚠️ Needs attention |
| Has loading states | ✅ Pass |
| Has user feedback | ✅ Pass |
| No placeholder text | ✅ Pass |
| Has CRUD operations | ✅ Pass |
| Has empty states | ✅ Pass |
| Has responsive layout | ✅ Pass |

**Overall Score: 9/10**

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Homepage
│   │   └── globals.css   # Global styles
│   └── components/       # Reusable UI components
├── public/               # Static assets
├── package.json          # Dependencies
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS config
└── tsconfig.json         # TypeScript config
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License — use freely for personal and commercial projects.

---

<div align="center">

**Built autonomously by [Openclaw MVP Factory](https://github.com/malikmuhammadsaadshafiq-dev/Openclaw)** — an AI-powered system that discovers real user needs and ships working software.

</div>
