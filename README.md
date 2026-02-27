# OEM

UI, on command.

## Overview

OEM is an agent-first UI framework engineered for seamless human-AI collaboration. It introduces a distinctive compositional syntax that declaratively unifies markup, styling, and behavior. Rather than shipping pre-built components, OEM provides a design-token-driven engine and a set of composable traits that let AI agents generate any UI from a natural-language prompt.

## Install

```bash
npm install @linttrap/oem   # or pnpm / yarn / bun
```

## Agent Setup

OEM ships agent specs in the package. Copy them into whatever "config" folder applies to your setup. For Claude, this would be:

```bash
cp -r node_modules/@linttrap/oem/specs/ .claude/
```

Now use the agent, in claude this would be:

```
/oem <prompt>
```

## Vibe Coding

The [oem.js.org](https://oem.js.org/) website includes a Prompt Wizard that lets you visually design a UI and generate the corresponding OEM code.

## Documentation

- **Human Docs** — [oem.js.org](https://oem.js.org/)
- **Agent Specs** — [specs/agents/oem.md](./specs/agents/oem.md)

## License

MIT
