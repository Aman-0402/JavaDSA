# Java + DSA + LeetCode Interactive eBook

**Live:** https://aman-0402.github.io/JavaDSA/

A frontend-only, interactive learning platform for Java, Data Structures & Algorithms, and LeetCode interview prep. 100% static — no backend, no build step, no framework.

## Features

- 14-module roadmap: Java Fundamentals → Control Flow → Methods → Arrays & Strings → OOP → Advanced Java → Java Collections Framework → DSA Foundations → Linked List → Stacks & Queues → Heap → Trees → Graphs → Greedy & Dynamic Programming
- 247 hand-verified LeetCode problems integrated directly into lessons, each with Brute Force + Optimal Java solutions, complexity analysis, hints, and examples
- Monaco Editor with two modes: paste-blocked retype practice (reinforces syntax memory) and a freeform scratchpad for trying problems yourself
- Prism.js syntax highlighting for Java
- Progress tracking, bookmarks, and personal notes — all saved to `localStorage`, no account needed
- Search across all lessons and topics
- Light/dark theme

## Tech Stack

- HTML5, CSS3, Vanilla ES6+ JavaScript (ES modules)
- Monaco Editor, Prism.js, Lucide icons
- JSON-driven lesson content (`data/lessons/*.json`, `data/roadmap.json`)
- `localStorage` for all persistence — no database, no server

## Running Locally

No build step required. Serve the folder with any static file server, e.g.:

```bash
npx serve .
```

Then open the printed local URL in a browser.

## Project Structure

```
index.html
css/            style, layout, sidebar, lesson, code, practice, leetcode, responsive
js/             app, router, content-loader, sidebar, code-editor, retype-checker,
                practice-checker, progress, storage, search, bookmarks, notes, theme
data/
  roadmap.json  module → topic → lesson map
  lessons/      one JSON file per topic
assets/         images/icons
```

See [AGENTS.md](AGENTS.md) for the full lesson schema, content workflow, and project conventions.

## Deployment

Deployed via GitHub Pages directly from this repository — no build artifacts, the static files are served as-is.
