# OEM Documentation

This is an interactive documentation site built with OEM itself!

## Running the Documentation

To view the documentation:

```bash
# Open dev.html in a browser with Bun
bun --hot dev.html
```

Or simply open `dev.html` directly in your browser (requires a local server for module imports).

## Structure

- **dev.html** - Entry point HTML file
- **app.ts** - Main application with routing
- **config.ts** - Shared configuration (template, state, traits)
- **pages/** - Documentation pages as OEM components
  - Introduction.ts
  - GettingStarted.ts
  - StatePage.ts
  - TemplatePage.ts
  - StoragePage.ts
  - TraitsPage.ts
  - ExamplesPage.ts
  - ApiPage.ts
- **parts/** - Reusable UI components
  - Page.ts
  - Section.ts
  - Box.ts
  - Code.ts
  - Menu.ts
  - Nav.ts

## Features

- 📱 Responsive design (mobile/tablet/desktop)
- ⌨️ Keyboard navigation (Arrow Left/Right)
- 🎨 Syntax highlighting for code examples
- 🔄 Reactive UI updates
- 📖 Single Page Application built with OEM

## Markdown Backup

The original markdown documentation files are preserved in `markdown-backup/` for reference.
