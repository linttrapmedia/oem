TODO

- Animation is shitty, needs a trait I think
- Regen the website
- Make a prompt maker (page, feature, component)

- No workflow/sequencing instructions in the agent file — oem.md is a reference index, not an instruction manual. It tells the agent where docs are but never says how to work. It needs a "How to Build an App" section specifying the sequence: read/create BDD → define types → create states → create theme tokens → build templates → compose UI → wire up main.ts. This is the single biggest gap — it's what turns a knowledge base into an actionable agent.
- theme.md and theming.md overlap ~70% — Both document token naming, useThemeState/useTokenState architecture, and "search before creating" rules. An agent may read one and miss info in the other. Consolidate or add explicit scoping (conceptual architecture vs. file-structure rules).
- No import path guidance — Guides show import { ... } from '@linttrap/oem' but the www/ app uses '../src/registry'. An agent doesn't know which style to use.
- gen-agents.ts has bugs: Uses Bun.file(agentsDir) for a directory (should use directory APIs)
  Scans src/themes/tokens/\*.md which doesn't exist — the "Theme Library" section in llms.txt is always empty. Ready made tokens were removed from the codebase as a concept.
- No cross-references between related docs:
  Trait docs never link to paired traits (InputValue ↔ InputEvent, Style ↔ StyleOnEvent)
  Core docs don't link to their corresponding guides (state.md → states.md guide)
  Guides rarely link back to architecture.md
- No allowed-tools on the agent frontmatter — The agent file has only name and description. Adding explicit tool declarations would make the agent's capabilities clear.
- Add a "Quick Start" guide — a workflow-oriented walkthrough for building a minimal app end-to-end

DONE

- fix tests
- Add a section on writing prompts using gherkin and how that bdd file should be stored and maintained in a bdd file or folder.
- create a llms.txt file (see: https://llmstxt.org/)
- Add traits for: url, theme

IDEAS

- Add icon library?
