# OEM

UI, on command.

## Overview

OEM is an agent-first UI framework engineered for seamless human-AI collaboration. It introduces a distinctive compositional syntax that declaratively unifies markup, styling, and behavior.

## Setup

**Install:**

Install the OEM package, you can use npm, pnpm, yarn, or bun:

```bash
npm install @linttrap/oem
```

**Claude:**

Copy the contents of ./specs into your .claude folder. Then prompt Claude with the following:

```bash
/oem <prompt>
```

_Note: configuration for specifying the oem agent may vary based on your specific setup. The above is a general example and may need to be adjusted to fit your particular implementation._

## Vibe Coding

The [oem.js.org](https://oem.js.org/) website includes a Prompt Wizard that allows you to visually design your UI and generate the corresponding OEM code.

## Documentation

- **Human Docs**: [https://oem.js.org/](https://oem.js.org/)
- **AI Docs**: [./skills/Skill.md](./skills/Skill.md)
