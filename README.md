# InfrastructureOS: Universal Shell MCP

InfrastructureOS is a world-class dashboard for managing multi-provider infrastructure through a unified Model Context Protocol (MCP) interface. It leverages **FastMCP**, **Apache Libcloud**, and **Blockchain Auditing** to provide a secure, autonomous, and immutable management layer for AI agents and human administrators.

## Core Features

- **Universal Shell:** A unified terminal interface for executing commands across AWS, GCP, and DigitalOcean without managing individual SSH configurations.
- **Agent Skills (Procedures):** On-demand Python-based skills that agents can load into their context window to perform specialized tasks (e.g., database integrity checks, log analysis).
- **Context Compaction:** Built-in support for context window optimization, allowing long-running agents to summarize history and maintain performance.
- **Blockchain Audit Trail:** Every command execution is hashed and logged to a blockchain (simulated Polygon Sepolia) for immutable forensics.
- **Secure Key Vault:** Just-in-time SSH key prompting and secure storage in the MCP vault.
- **Artifact Handoff:** Dedicated `/mnt/data` boundary for safe handoff of generated artifacts between agent turns.

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS 4.
- **Icons:** Lucide React.
- **Animations:** Motion (formerly Framer Motion).
- **Typography:** Inter (UI) and JetBrains Mono (Terminal/Code).

## Getting Started

1. **Infrastructure Tab:** Sync your configuration to load providers from environment variables or secrets managers.
2. **Universal Shell:** Run commands using the `manage_server(target, cmd)` syntax.
3. **Skills Tab:** Load specialized procedures into the agent's context window.
4. **Audit Tab:** Verify the execution history on the immutable ledger.
