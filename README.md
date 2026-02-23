# OEM

UI, on command → [https://oem.js.org/](https://oem.js.org/)

## Overview

OEM is an agent-first UI framework engineered for seamless human-AI collaboration. It introduces a distinctive compositional syntax that declaratively unifies markup, styling, and behavior.

## Setup

### Installation

Install the OEM package, you can use npm, pnpm, yarn, or bun:

```bash
npm install @linttrap/oem
```

### Agent setup

#### For Claude

An oem agent definition and a set of skill definitions are available here in the [/specs](./specs) directory. Right now these must be installed manually using the claude `agent` and `skill` commands, but we plan to automate this in the near future.

- or -

You can try this:

```bash
# From the root of this repo:
mkdir -p .claude/{agents,skills} &&
curl -L -o .claude/agents/oem.md \
https://raw.githubusercontent.com/linttrap/oem/main/specs/agents/oem.md &&
for s in templates traits states theming patterns examples; do
  curl -L -o ".claude/skills/oem-$s.md" \
  "https://raw.githubusercontent.com/linttrap/oem/main/specs/skills/oem-$s/Skill.md"
done
```
