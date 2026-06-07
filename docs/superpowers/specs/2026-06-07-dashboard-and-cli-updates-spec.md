# IndexFast Updates Spec

## 1. Dashboard Text (Minimalist & Intuitive)
- **Stats Cards**: Rename to "Sites", "URLs", "Submissions", "Alerts".
- **Sections**: Rename "Monitored Domains" to "Domains".
- **Descriptions**: Simplify copy across the dashboard to be more direct.

## 2. API Keys Page
- Add a prominent link or banner to the new MCP dashboard page (`/dashboard/mcp`) so users discover it easily.

## 3. MCP Page & CLI Installation
- **Install CLI**: Emphasize `npx indexfast` as the modern, zero-install way to run commands.
- Update the code blocks to reflect this:
  ```bash
  npx indexfast login --api-key YOUR_API_KEY
  npx indexfast mcp install
  ```

## 4. Install Script (`public/install.sh`)
- Update the text to remind users they can also use `npx indexfast` directly.
- Maintain the `npm install -g` logic for users who prefer global installation.

## 5. SKILL.md Expansion
- Add more robust examples and edge cases for Agentic SEO.
- Switch the CLI examples to use `npx indexfast` to align with the new preferred method.
- Add sections for CI/CD usage and advanced MCP configuration.

## 6. CLI Package Publishing (Scaffolding)
- Since the CLI source isn't explicitly defined in the Next.js app, we will create a minimal `cli/package.json` setup that can be published to npm under the name `indexfast`. This sets the foundation for the `npx` commands to work.