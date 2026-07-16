# AGENTS.md — Java + DSA + LeetCode Interactive eBook

Instructions for any AI agent (Claude, Copilot, etc.) working in this repo.

## Project Summary

Frontend-only interactive learning platform for Java, Data Structures & Algorithms, and LeetCode prep. Sibling project to `C-DSA` (the C++ version) — same concept, same design system, ported per-concept to Java.

**Content generation rule:** the user gives a topic name only. The agent writes the full lesson content itself — explanations, analogies, code examples, common mistakes, interview Q&A, memory tricks — matching the established teaching style of prior lessons (beginner-first, explicitly flags concepts "not learned yet" rather than front-loading unintroduced syntax, one topic per lesson, DSA/interview-oriented). Practice questions and LeetCode problems are only added when the user explicitly asks or supplies them.

**Workflow rule (mandatory, per user instruction):**
1. Each subtopic (lesson) gets its own commit + push — no co-author trailer, immediately after writing/validating it. Never batch multiple lessons into one commit.
2. After ALL subtopics of the current module are done, STOP. Ask the user to review before starting the next module. Do not auto-continue.
3. Update this file's "Module Progress" section at that same module-completion checkpoint.

## Tech Stack (frontend-only, no backend)

- HTML5, CSS3, Vanilla JavaScript ES6+ (ESM, modular files — no framework)
- Monaco Editor — two editor modes: `createRetypeEditor` (paste-blocked, checked against a reference, for concept-lesson retype practice) and `createScratchEditor` (freeform, no paste-block, no reference-checking, for LeetCode "Try It Yourself")
- Prism.js (`prism-java`) — syntax highlighting for displayed code
- Lucide Icons
- JSON — all lesson content
- localStorage — all persistence (progress, notes, bookmarks, theme, LeetCode solved-state), namespaced `javadsa:*`
- Fonts: Inter (UI), JetBrains Mono (code)
- Deployable via GitHub Pages, zero build step

**Never add:** React/Vue/Angular/Next.js, Node/Express backend, any database, auth backend, real Java compilation/execution (no javac/JVM anywhere). Static frontend site only.

## File Structure

```
/
├── index.html
├── css/        style.css, layout.css, sidebar.css, lesson.css, code.css, practice.css, leetcode.css, responsive.css
├── js/         app.js, router.js, content-loader.js, sidebar.js, code-editor.js,
│               retype-checker.js, practice-checker.js, progress.js, storage.js,
│               search.js, bookmarks.js, notes.js, theme.js
├── data/       roadmap.json, lessons/*.json
└── assets/     images/, icons/
```

Keep JS modular — one concern per file. Reuse existing render functions in `app.js` instead of duplicating.

## Content Workflow (every time user gives a topic name)

1. Propose a short plan (sections/structure), wait for go-ahead if non-trivial.
2. Write the lesson content matching the depth/tone of prior lessons in `data/lessons/`.
3. Only treat concepts from earlier lessons as "known" — flag anything not-yet-taught with a `warning`/`note` section, same as existing lessons do.
4. Structure into the lesson JSON schema (see below).
5. Validate: `node -e "JSON.parse(require('fs').readFileSync('data/lessons/<file>.json'))"`.
6. Wire the new lesson into `data/roadmap.json` (correct module's `topics` array), validate roadmap.json too.
7. Commit + push (no co-author trailer) — one commit per lesson.
8. After the module's last lesson: update this file's Module Progress table, commit that too, then ask the user to review before the next module.

## Lesson JSON Schema

Lesson: `id, moduleId, title, description, objectives, sections, codeExamples, retypePractice, practiceQuestions, interviewQuestions, leetcode, completionRules`

Section content types used so far: `heading, paragraph, definition, note, warning, tip, realLifeExample, flow, keyPoints, memoryTrick, commonMistakes, table, code, interviewQuestions, quickCheck`. Reserved for later (per spec, not yet used): `predictOutput, syntax, output, dryRun, referenceVisualization (Java's pointer-viz equivalent), recursionVisualization, collectionsVisualization (Java's STL-viz equivalent), leetcode`.

`"leetcode"` section shape (not yet used — added only when user says "start adding LeetCode problems"): `{ type: "leetcode", id, number, title, difficulty, link, problemStatement, examples: [{input, output, explanation?}], constraints: [], hints: [], approaches: [{label: "Brute Force"|"Better"|"Optimal", explanation, code, output, timeComplexity, spaceComplexity}] }`.

## Practice/Checker Rules

- Frontend-only checker: keyword/pattern/output matching against JSON rules (`practice-checker.js`). **Never claim real Java compilation or hidden test execution.**
- Retype editor: paste disabled (Ctrl+V, context-menu paste, paste event blocked). Typing never blocked.
- Displayed learning code: copy-discouraged (selection/copy/context-menu disabled) but never claimed as un-copyable/secure.
- Hints are progressive — never reveal the full solution automatically.

## Design Direction

Premium modern SaaS/developer aesthetic. Light + dark mode. Rounded corners, soft shadows, subtle borders, strong type hierarchy, small purposeful animations. Desktop-first, fully responsive (sidebar collapses to menu on mobile).

## Git Workflow (mandatory)

- Every change committed AND pushed — never leave work uncommitted locally.
- Clear, concise commit messages (why > what).
- **No co-author trailer** — commits authored solely as the user, no `Co-Authored-By` line.
- Push to `origin main` after each commit unless told otherwise.
- Never force-push, never skip hooks, never amend existing commits — always new commits.
- One commit per lesson (subtopic). One commit per LeetCode problem, when that phase starts.

## Extending, Not Rebuilding

- Never rebuild from scratch for new content — extend the existing system.
- Reuse rendering functions; keep CSS/JS modular.
- No lorem ipsum, no fake/placeholder lessons, no fake LeetCode problems.
- Don't remove existing content unless explicitly told to.

## Module Progress

Legend: ✅ done · 🟡 in progress · ⬜ not started

| # | Module | Status | Lessons done |
|---|--------|--------|---------------|
| 1 | Java Fundamentals | ✅ done | Introduction to Java, Variables, Data Types, Operators, Type Casting, Input and Output, Comments |
| 2 | Control Flow | ✅ done | Conditional Statements (if/else if/else), switch Statement, Loops (overview), for Loop, Enhanced for Loop, while Loop, do-while Loop, break, continue, Labeled Loops |
| 3 | Methods | ✅ done | Method Declaration and Calling, Parameters and Arguments, Return Types, Method Overloading, Varargs, Recursion Basics, Static vs Instance Methods |
| 4 | Arrays & Strings | ✅ done | 1D Arrays, 2D Arrays, Strings and Immutability, Common String Methods, StringBuilder, Array vs ArrayList (Intro) |
| 5 | Object-Oriented Programming | ✅ done | Classes and Objects, Constructors, this Keyword, Encapsulation and Access Modifiers, Inheritance, Polymorphism, Abstract Classes, Interfaces, Packages |
| 6 | Advanced Java | ✅ done | Exception Handling, Generics, Enums, Autoboxing and Unboxing, Annotations Basics |
| 7 | Java Collections Framework | ✅ done | JCF Overview, List (ArrayList vs LinkedList), Set (HashSet/TreeSet/LinkedHashSet), Map (HashMap/TreeMap/LinkedHashMap), Queue/Deque (ArrayDeque/PriorityQueue), Iterator, Comparable vs Comparator, Collections Utility Class |
| 8 | DSA Foundations | ✅ done | Big-O Notation, Two Pointers, Sliding Window, Prefix Sum, Difference Array, Hashing, Binary Search, Sorting, Recursion in DSA, Backtracking |
| 9 | Linked List | ✅ done | Singly Linked List, Doubly Linked List, Circular Linked List |
| 10 | Stacks & Queues | ✅ done | Stack and Monotonic Stack, Circular Queue, Deque Deep Dive (Sliding Window Maximum) |
| 11 | Heap | ✅ done | PriorityQueue (Java's Built-In Heap), Manual Heap Implementation, Heap Sort |
| 12 | Trees | ⬜ | — |
| 13 | Graphs | ⬜ | — |
| 14 | Greedy & Dynamic Programming | ⬜ | — |

LeetCode integration: not started (begins only when user says "start adding LeetCode problems").
