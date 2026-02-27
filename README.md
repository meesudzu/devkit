# DevKit

A sleek collection of developer tools built with React + Vite. Runs entirely in-browser with no backend required.

## Features

| Tool | Description |
|------|-------------|
| **Debezium Diff** | Compare JSON before/after states with smart auto-extraction from Kafka/Debezium payloads |
| **JWT Debugger** | Decode and inspect JWT tokens with expiration status |
| **Epoch Converter** | Convert Unix timestamps with timezone support |
| **Base64 / URL** | Encode/decode Base64 and URL strings |
| **Word Counter** | Count characters, words, lines, and paragraphs |
| **Password Gen** | Generate secure random passwords with configurable options |
| **Hash Generator** | Generate MD5 and bcrypt hashes |
| **Basic Auth** | Generate HTTP headers and Nginx/Apache htpasswd entries |
| **Crontab Gen** | Generate, explain, and validate cron expressions with UTC time |
| **JSON to .env** | Convert JSON configurations to .env format securely |
| **.env to JSON** | Parse .env strings into JSON structures |
| **SMTP Checker** | Verify SMTP server connectivity and credentials |
| **JSON Beautifier** | Format and parse JSON payloads |
| **Code Beautifier/Minifier** | Format and minify JS, CSS, HTML, and YAML code |

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Lucide React** - Icons

## Deployment

Deployed automatically to GitHub Pages via GitHub Actions on push to `main`.

**Live:** https://meesudzu.github.io/

## License

MIT
