# MSc Exam Mastery Platform

A personal revision dashboard for MSc Data Science students at Loughborough University, built to achieve **90%+ exam performance** across:

- **Database Systems**
- **Introduction to Data Science**

> Personal revision dashboard based on module materials. Not an official Loughborough University product.

---

## What it does

| Feature | Description |
|---|---|
| **Dashboard** | Progress overview, exam-readiness score, today's study blocks, weakest topics |
| **Module pages** | Week-by-week topic map with mastery tracking for all 21 weeks |
| **Downloadable files** | Slides, lab worksheets, and solutions served directly in the browser |
| **Flashcards** | 40 flip-cards covering SQL, R, normalisation, ggplot2, and more |
| **Practice engine** | 20 exam-style questions with model answers and common mistakes |
| **Cheat sheets** | SQL, Relational Algebra, Normalisation, R/dplyr, tidyr, ggplot2 |
| **Video support** | Curated YouTube search terms for every topic |
| **Error log** | Track mistakes, correct rules, and redo dates — stored locally |
| **Revision planner** | Day-by-day study blocks from now through August |
| **Mock exam tracker** | Log attempt scores and notes for both modules |

Progress is saved in your browser's **localStorage** — no database, no account needed.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)
- [Git](https://git-scm.com/)

Check your versions:

```bash
node -v   # should be 18+
npm -v
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/rayhanpatel88/msc-exam-mastery.git
cd msc-exam-mastery
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your module files (optional but recommended)

The app shows clickable download links for slides, lab worksheets, and solutions. To make these work, place your university files into `public/files/` following this structure:

```
public/
└── files/
    ├── Database Systems/
    │   ├── Week 1/
    │   │   ├── introduction to DB (1).pptx
    │   │   └── Relational algebra Select Project join short (4).pptx
    │   ├── Week 2/
    │   │   ├── SQL select project join (6).pptx
    │   │   ├── Lab week 1 (1).docx
    │   │   ├── Lab week 1 - solutions (2).docx
    │   │   └── academic system data.zip
    │   ├── Week 3/ ... (continue for all weeks through Week 11)
    │   └── Mocks/
    │       ├── mock exam.pdf
    │       └── mock exam - solutions (1).docx
    └── Intro to Data Science/
        ├── Week 1/
        │   ├── 1_what_is_data_science.pdf
        │   ├── Chapter 1.docx
        │   ├── Practical 1.docx
        │   └── 01_practical (4).Rmd
        ├── Week 2/ ... (continue for all weeks through Week 10)
        └── Mock Exam (only Style of Questions not supplementary to Content)/
            ├── 25MAP500 Mock Exam.pdf
            └── 25MAP500 Mock Exam Solutions.pdf
```

File names must match exactly (they are mapped in `src/data/modules.ts`). If you skip this step, the app still works fully — download links simply won't resolve.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Pages

| URL | Page |
|---|---|
| `/` | Dashboard |
| `/modules` | All modules |
| `/modules/database-systems` | Database Systems overview |
| `/modules/database-systems/week/[1-11]` | Week detail |
| `/modules/intro-data-science` | Intro to Data Science overview |
| `/modules/intro-data-science/week/[1-10]` | Week detail |
| `/flashcards` | Flashcard deck |
| `/practice` | Practice engine |
| `/cheatsheets` | Reference sheets |
| `/videos` | Video support |
| `/error-log` | Mistake tracker |
| `/planner` | Revision planner |
| `/mock-exams` | Mock exam tracker |
| `/settings` | Theme and data reset |

---

## 90%+ Revision Strategy

Follow this sequence for every topic:

1. **Read** the lecture slides or chapter
2. **Do the practical** — do not skip to the solution
3. **Check the solution** — log every mistake in the error log
4. **Redo from memory** — close notes and attempt again
5. **Review flashcards** for the topic
6. **Attempt an exam-style question** from the practice page
7. **Clear your error log** for this topic

A topic is only marked **Mastered** when all 7 steps are complete.

### Recommended daily structure

| Block | Focus |
|---|---|
| Block 1 | Database Systems — new topic or revision |
| Block 2 | Intro to Data Science — new topic or revision |
| Block 3 | Active recall — flashcards and practice questions |
| Block 4 | Error log — redo every unfixed mistake |

### Topic tier priorities

- **Tier 1** (red) — Must master. Almost certain to appear in the exam.
- **Tier 2** (orange) — Important. Likely to appear.
- **Tier 3** (green) — Lower priority. Tackle after Tier 1 and 2 are solid.

---

## Customising content

All content lives in `src/data/`:

| File | What it controls |
|---|---|
| `modules.ts` | Week topics, files, tier ratings |
| `flashcards.ts` | All flashcard content |
| `practice.ts` | Practice questions and model answers |
| `cheatsheets.ts` | Cheat sheet sections and code snippets |
| `videos.ts` | Video search terms and guidance |
| `planner.ts` | Weekly study blocks |

Edit these TypeScript files to add topics, adjust tier ratings, or add your own flashcards and practice questions.

---

## Production build

```bash
npm run build
npm start
```

---

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide React](https://lucide.dev/) icons
- localStorage for all user data (no database required)

---

## Data privacy

All progress, error log entries, and mock attempt scores are stored in your browser's **localStorage**. Nothing is sent to any server. Clearing your browser data will reset your progress — use the Settings page to export or reset your data.

---

## Disclaimer

This is a personal revision tool. It is not affiliated with, endorsed by, or an official product of Loughborough University. All university module materials remain the intellectual property of Loughborough University and their respective authors.
