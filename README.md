# 🛠️ Text_tools

> A fast, lightweight React app for text manipulation — word counting, case conversion, space cleaning, and more.

---

## Overview

**Text_tools** is a client-side web application built with React that helps users quickly analyze and manipulate text. It provides instant statistics (word count, character count, estimated reading time) along with one-click transformations like case conversion, whitespace cleanup, and clipboard copy.

There is no backend, no login, and no data stored — everything runs entirely in the browser, making it privacy-friendly and instantly usable.

---

## Features

- 🔠 **Uppercase / Lowercase Conversion** — instantly transform the case of any text
- 🧹 **Remove Extra Spaces** — collapse multiple consecutive spaces into one
- 📋 **Copy to Clipboard** — copy the transformed text with a single click
- 🗑️ **Clear Text** — reset the textarea in one click
- 📊 **Live Text Summary** — real-time word count, character count, and estimated reading time
- 👁️ **Live Preview** — see formatted output as you type
- 🌙 **Dark Mode** — toggle a dark theme across all components
- 🟢 **Green Mode** — toggle a green-tinted theme as an alternative to dark mode
- 🔔 **Auto-dismissing Alerts** — brief success notifications after each action (auto-clear after 1.5s)
- 📱 **Responsive Navbar** — collapsible navigation with React Router–powered routing
- ℹ️ **About Page** — accordion-style FAQ describing the tool's purpose and browser compatibility

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 |
| **Routing** | React Router DOM v7 |
| **Styling** | Bootstrap 5.3 (CDN) |
| **Tooling** | Create React App (react-scripts 5) |
| **Testing** | React Testing Library, Jest |
| **Language** | JavaScript (ES6+) |
| **Runtime** | Browser-only (no backend / no database) |

---

## Project Structure

```
Text_tools-main/
├── public/
│   ├── index.html          # HTML shell; loads Bootstrap 5 via CDN
│   ├── manifest.json       # PWA manifest metadata
│   └── favicon.ico
│
├── src/
│   ├── App.js              # Root component — theme state, alert state, routing
│   ├── App.css             # Global styles
│   ├── index.js            # React DOM entry point
│   │
│   └── components/
│       ├── Navbar.js       # Responsive navbar with Dark Mode & Green Mode toggles
│       ├── TextForm.js     # Core feature — textarea + all text manipulation buttons + summary
│       ├── About.js        # Accordion-style about/FAQ page (theme-aware)
│       └── Alert.js        # Auto-dismissing alert banner
│
├── package.json            # Dependencies and npm scripts
└── .gitignore
```

### Key files explained

| File | Responsibility |
|---|---|
| `App.js` | Holds global state (`mode`, `modeGreen`, `alert`), theme toggle handlers, and the route tree |
| `TextForm.js` | All text operations (transform, copy, clear, stats); receives `showAlert`, `mode`, `modeGreen` as props |
| `Navbar.js` | Navigation links + two toggle switches (dark / green); uses PropTypes for validation |
| `Alert.js` | Renders a Bootstrap alert only when `props.alert` is non-null; capitalizes the type label |
| `About.js` | Static informational page with three Bootstrap accordion sections; fully theme-aware |

---

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- npm (bundled with Node.js)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/VimarshSrivastava/Text_tools.git
cd Text_tools

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app will open automatically at [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
```

The optimized output is placed in the `build/` folder, ready for static hosting (Netlify, Vercel, GitHub Pages, etc.).

### Run tests

```bash
npm test
```

---

## Usage

1. **Navigate to the home page** — a large textarea is displayed front and centre.
2. **Paste or type your text** into the textarea.
3. **Click any action button** to transform the text:
   - *Convert to Uppercase* / *Convert to Lowercase* — changes the case of all text.
   - *Remove Extra Spaces* — collapses consecutive whitespace to a single space.
   - *Copy Text* — copies the current textarea content to the clipboard.
   - *Clear Text* — empties the textarea.
4. **Check the summary panel** below the buttons for an instant word count, character count, and estimated reading time.
5. **Preview** the full text in the "Preview" section below the summary.
6. **Toggle themes** using the switches in the navbar (Dark Mode or Green Mode).
7. **Visit the About page** via the navbar for information about the tool.

> **Note:** All action buttons are disabled when the textarea is empty, preventing unnecessary operations.

---

## Screenshots / Demo

> 📸 Screenshots can be added here. Suggested placements:

| View | Screenshot |
|---|---|
| Light Mode — Home | *(insert screenshot)* |
| Dark Mode — Home | *(insert screenshot)* |
| Green Mode — Home | *(insert screenshot)* |
| About Page | *(insert screenshot)* |

To add screenshots, place image files in a `/screenshots` directory and reference them using:

```markdown
![Light Mode](./screenshots/light-mode.png)
```

---

## Architecture / Data Flow

Text_tools is a fully client-side single-page application. There is no API, no server, and no external data source.

```
User Input (textarea)
        │
        ▼
   TextForm.js  ──── text state (useState)
        │
        ├── Transformation handlers (toUpperCase, toLowerCase, split/join, etc.)
        │         │
        │         └── setState(newText)  +  showAlert(message, type)
        │
        ├── Summary Panel  ──── computed from text: word count, char count, read time
        │
        └── Preview Panel  ──── renders raw text value

App.js  ──── mode / modeGreen / alert state
        │
        ├── passes mode props down to Navbar, TextForm, About
        │
        └── Alert.js  ──── auto-clears via setTimeout(1500ms)

React Router  ──── "/"  → TextForm  |  "/about"  → About
```

**Theme system:** Three mutually exclusive visual states are managed in `App.js` — light (default), dark, and green. Enabling one automatically disables the other. Styles are passed down as props and applied via inline style objects so Bootstrap classes are not overridden unexpectedly.

---

## Challenges & Highlights

- **Mutual exclusion of themes** — Dark Mode and Green Mode are kept in separate state variables, but each toggle explicitly resets the other, ensuring no conflicting visual state.
- **Accurate word counting edge case** — `text.trim().split(/\s+/).filter(e => e.length !== 0)` correctly handles leading/trailing whitespace and multiple consecutive spaces that would otherwise produce phantom empty tokens.
- **Button guard** — all action buttons are conditionally `disabled` when the textarea is empty, which is a clean UX decision that avoids operating on blank input.
- **Prop-type validation** — `Navbar.js` uses `PropTypes` to document and validate the component's interface, including `isRequired` constraints and sensible `defaultProps`.

---

## Future Improvements

- **Sentence count** — add a sentence counter alongside word and character stats.
- **Reverse text** — a simple but frequently requested text utility.
- **Find & Replace** — inline search and replace within the textarea.
- **Download as .txt** — allow users to export the processed text as a file.
- **Character frequency analysis** — show which characters/letters appear most often.
- **Responsive layout improvements** — better button wrapping on small screens.
- **Persistent theme preference** — save the selected theme to `localStorage` so it persists across sessions.

---

## Author

**Vimarsh Srivastava**

- 🐙 GitHub: [github.com/VimarshSrivastava](https://github.com/VimarshSrivastava)

---

<p align="center">
  Made with ❤️ using React & Bootstrap
</p>
