export interface DailyBlock {
  day: string;
  block1: string;
  block2: string;
  block3: string;
  block4: string;
}

export interface StudyBlock {
  id: string;
  week: string;
  weekStart: string;
  dailyBlocks: DailyBlock[];
  weeklyGoals: string[];
}

export const studyPlan: StudyBlock[] = [
  {
    id: 'w1',
    week: 'Week 1',
    weekStart: '2026-06-29',
    weeklyGoals: [
      'Complete DB Week 1–2: Intro to databases, SQL SELECT/WHERE, Relational Algebra σ π ⋈',
      'Complete IDS Week 1–2: R basics, data types, vectors, indexing',
      'Set up error log — record any concepts you got wrong',
      'Complete Lab week 1 for DB Systems',
    ],
    dailyBlocks: [
      {
        day: 'Monday 29 Jun',
        block1: 'DB: Read slides — Introduction to Databases, Relational model',
        block2: 'IDS: Read Chapter 1 + What is Data Science PDF',
        block3: 'Active recall: Write from memory — what is a relation? what is a schema?',
        block4: 'Review flashcards: DB cards 1–5',
      },
      {
        day: 'Tuesday 30 Jun',
        block1: 'DB: SQL SELECT/FROM/WHERE — read slides, write 10 queries from scratch',
        block2: 'IDS: R & RStudio basics — work through Practical 1.docx',
        block3: 'Active recall: Relational algebra σ, π, ⋈ — write definitions and examples without notes',
        block4: 'Error log: Add any mistakes from today',
      },
      {
        day: 'Wednesday 1 Jul',
        block1: 'DB: Relational algebra — complete Lab week 1 (1).docx',
        block2: 'IDS: R data types, vectors — work through 02_practical.Rmd',
        block3: 'Active recall: Write SQL queries for: join two tables, filter, group by',
        block4: 'Review IDS flashcards 1–5',
      },
      {
        day: 'Thursday 2 Jul',
        block1: 'DB: SQL Joins — INNER, OUTER, NATURAL — read Week 2–3 slides',
        block2: 'IDS: Lists, matrices, indexing — Chapter 2 + practical',
        block3: 'Active recall: Draw the steps for relational algebra expressions',
        block4: 'Review DB flashcards 6–10',
      },
      {
        day: 'Friday 3 Jul',
        block1: 'DB: Lab extra questions (1).docx — complete without looking at solutions',
        block2: 'IDS: R Markdown — create a test .Rmd and knit it',
        block3: 'Active recall: Test yourself on all Week 1–2 topics',
        block4: 'Week 1 error log review — mark any fixed items',
      },
    ],
  },
  {
    id: 'w2',
    week: 'Week 2',
    weekStart: '2026-07-06',
    weeklyGoals: [
      'Complete DB Week 3–4: Joins, GROUP BY, HAVING, Aggregate functions',
      'Complete IDS Week 3–4: Data frames, sampling, dplyr wrangling',
      'Complete Lab week 2 and Lab week 3 for DB',
      'Complete Practical 3 & 4 for IDS',
    ],
    dailyBlocks: [
      {
        day: 'Monday 6 Jul',
        block1: 'DB: SQL Joins deep dive — INNER, LEFT, RIGHT, FULL OUTER, self-join',
        block2: 'IDS: Data frames — read.csv, str(), head(), summary()',
        block3: 'Active recall: Write all join types from memory with SQL syntax',
        block4: 'Flashcards: DB join cards + IDS data frame cards',
      },
      {
        day: 'Tuesday 7 Jul',
        block1: 'DB: GROUP BY and HAVING — Lab week 2 complete',
        block2: 'IDS: Sampling methods — simple random, stratified, cluster, systematic',
        block3: 'Active recall: Write GROUP BY vs HAVING distinction; write 5 aggregate queries',
        block4: 'Review error log from Week 1',
      },
      {
        day: 'Wednesday 8 Jul',
        block1: 'DB: Aggregate functions — COUNT, SUM, AVG, MIN, MAX — Lab week 3',
        block2: 'IDS: dplyr basics — filter(), select(), mutate() — Practical 4',
        block3: 'Active recall: Write relational algebra aggregation operator from memory',
        block4: 'IDS flashcards 6–10',
      },
      {
        day: 'Thursday 9 Jul',
        block1: 'DB: Lab week 3 solutions review — check and fix mistakes',
        block2: 'IDS: dplyr — group_by(), summarise(), arrange(), joins',
        block3: 'Active recall: Five dplyr pipeline questions from memory',
        block4: 'DB flashcards 11–15',
      },
      {
        day: 'Friday 10 Jul',
        block1: 'DB: Mixed practice — SQL + relational algebra combined questions',
        block2: 'IDS: dplyr joins — left_join, inner_join, anti_join — practice',
        block3: 'Active recall: Full mixed test — pick 5 random flashcards from each module',
        block4: 'Update error log; plan Week 3',
      },
    ],
  },
  {
    id: 'w3',
    week: 'Week 3',
    weekStart: '2026-07-13',
    weeklyGoals: [
      'Complete DB Week 5–6: Nested subqueries, EXISTS/NOT EXISTS, ER diagrams',
      'Complete IDS Week 5–6: Summary statistics, dates, strings, factors',
      'Complete Lab week 3 extended and Lab week 4 for DB',
      'Complete Practicals 5 & 6 for IDS',
    ],
    dailyBlocks: [
      {
        day: 'Monday 13 Jul',
        block1: 'DB: Nested subqueries — scalar, IN, EXISTS — read slides carefully',
        block2: 'IDS: Summary statistics — mean, median, SD, IQR in R',
        block3: 'Active recall: Write 3 subquery examples from memory',
        block4: 'Flashcards: Subquery + statistics cards',
      },
      {
        day: 'Tuesday 14 Jul',
        block1: 'DB: Correlated subqueries — Lab week 3 extended',
        block2: 'IDS: 05_practical — complete all summary statistics exercises',
        block3: 'Active recall: Calculate mean, median, SD, IQR by hand for a small dataset',
        block4: 'DB flashcards 16–20',
      },
      {
        day: 'Wednesday 15 Jul',
        block1: 'DB: EXISTS / IN / NOT EXISTS — Lab week 4 (first half)',
        block2: 'IDS: lubridate dates — parse, extract, compute intervals',
        block3: 'Active recall: Write the NOT EXISTS "relational division" pattern from scratch',
        block4: 'IDS flashcards 11–15',
      },
      {
        day: 'Thursday 16 Jul',
        block1: 'DB: ER diagrams — cardinality, participation, weak entities',
        block2: 'IDS: stringr — str_detect, str_replace, str_sub + factors',
        block3: 'Active recall: Draw 3 ER diagrams for given descriptions',
        block4: 'IDS flashcards 16–20',
      },
      {
        day: 'Friday 17 Jul',
        block1: 'DB: Lab week 4 complete + solutions review',
        block2: 'IDS: pivot_longer + missing values — 06_practical',
        block3: 'Active recall: Timed mini-test — 10 questions across all topics so far',
        block4: 'Update error log; review weakest topics',
      },
    ],
  },
  {
    id: 'w4',
    week: 'Week 4',
    weekStart: '2026-07-20',
    weeklyGoals: [
      'Complete DB Week 7–8: ER-to-relational mapping, Functional dependencies, candidate keys',
      'Complete IDS Week 7–8: ggplot2 fundamentals, advanced ggplot2',
      'Complete Lab week 5 and Lab week 6 for DB',
      'Complete Practicals 7 & 8 for IDS',
    ],
    dailyBlocks: [
      {
        day: 'Monday 20 Jul',
        block1: 'DB: ER-to-relational mapping — step by step algorithm, scan_covg.pdf',
        block2: 'IDS: Grammar of graphics — data, aes, geom layers',
        block3: 'Active recall: Map a given ER diagram to relations from scratch',
        block4: 'Review all DB flashcards (full deck)',
      },
      {
        day: 'Tuesday 21 Jul',
        block1: 'DB: Lab week 5 — ER mapping exercises (no solutions first)',
        block2: 'IDS: ggplot2 — geom_point, geom_line, geom_col, geom_histogram',
        block3: 'Active recall: Write 5 ggplot2 code snippets from memory',
        block4: 'Review all IDS flashcards (full deck)',
      },
      {
        day: 'Wednesday 22 Jul',
        block1: 'DB: Functional dependencies — definition, Armstrong\'s axioms, attribute closure',
        block2: 'IDS: ggplot2 — facets, scales, colour palettes',
        block3: 'Active recall: Compute 3 attribute closures X+ from scratch',
        block4: 'DB practice items 1–5',
      },
      {
        day: 'Thursday 23 Jul',
        block1: 'DB: Candidate keys — find all CKs for 3 practice relations',
        block2: 'IDS: Advanced ggplot2 — themes, labels, annotations — 08_practical',
        block3: 'Active recall: Advanced SQL practice items from the practice page',
        block4: 'IDS practice items 1–5',
      },
      {
        day: 'Friday 24 Jul',
        block1: 'DB: Lab week 6 complete — FD and keys exercises',
        block2: 'IDS: Create a complete visualisation from raw data (choose dataset)',
        block3: 'Active recall: Full flashcard deck — target any cards marked unknown',
        block4: 'Update error log; mark mastered topics',
      },
    ],
  },
  {
    id: 'w5',
    week: 'Week 5',
    weekStart: '2026-07-27',
    weeklyGoals: [
      'Complete DB Week 9–10: 1NF/2NF/3NF/BCNF normalisation, Transactions/ACID',
      'Complete IDS Week 9–10: tidyr reshaping, good vs bad visualisation',
      'Complete Labs 7 & 8 for DB, Practical 9 for IDS',
      'First full mock attempt: DB Systems mock exam',
    ],
    dailyBlocks: [
      {
        day: 'Monday 27 Jul',
        block1: 'DB: 1NF and 2NF — definition, partial dependencies, worked examples',
        block2: 'IDS: pivot_longer and pivot_wider — 09_practical',
        block3: 'Active recall: Identify 2NF violations in 3 relations',
        block4: 'DB practice items 6–10',
      },
      {
        day: 'Tuesday 28 Jul',
        block1: 'DB: 3NF and BCNF — definition, differences, decomposition algorithm',
        block2: 'IDS: Missing values — complete handling, drop_na, replace_na, fill',
        block3: 'Active recall: Decompose 2 relations to BCNF step by step',
        block4: 'IDS practice items 6–10',
      },
      {
        day: 'Wednesday 29 Jul',
        block1: 'DB: Lossless decomposition and dependency preservation tests',
        block2: 'IDS: Good vs bad visualisation — Chapter 10, lecture slides',
        block3: 'Active recall: Given a schema + FDs, test for BCNF, decompose if needed',
        block4: 'Full flashcard deck review',
      },
      {
        day: 'Thursday 30 Jul',
        block1: 'DB: Transactions and ACID — complete understanding',
        block2: 'IDS: Critique 5 example visualisations from notes',
        block3: 'Active recall: Write all ACID definitions from memory; list isolation levels',
        block4: 'DB cheatsheet review — normalisation section',
      },
      {
        day: 'Friday 31 Jul',
        block1: 'DB: ATTEMPT mock exam (timed, no notes) — record score in mock tracker',
        block2: 'IDS: ATTEMPT 25MAP500 Mock Exam (timed)',
        block3: 'Review mock answers vs solutions — add ALL mistakes to error log',
        block4: 'Plan Week 6 based on weakest areas from mock',
      },
    ],
  },
  {
    id: 'w6',
    week: 'Week 6',
    weekStart: '2026-08-03',
    weeklyGoals: [
      'Complete DB Week 11: Concurrency, serialisability, precedence graphs',
      'Target weakest IDS topics identified from mock',
      'Complete Lab week 9 for DB',
      'Error log intensive review — work through all unfixed entries',
    ],
    dailyBlocks: [
      {
        day: 'Monday 3 Aug',
        block1: 'DB: Concurrency — isolation levels, dirty reads, non-repeatable reads, phantoms',
        block2: 'IDS: Redo weakest topic from mock — spend full block on it',
        block3: 'Active recall: Draw a precedence graph for a given schedule',
        block4: 'Error log review — fix top 5 mistakes',
      },
      {
        day: 'Tuesday 4 Aug',
        block1: 'DB: Serialisability — conflict serialisable, view serialisable, precedence graphs',
        block2: 'IDS: ggplot2 advanced — practise any visualisation from mock that was weak',
        block3: 'Active recall: Determine conflict serialisability for 3 schedules',
        block4: 'DB cheatsheets review — transactions and concurrency',
      },
      {
        day: 'Wednesday 5 Aug',
        block1: 'DB: Two-phase locking (2PL) — growing phase, shrinking phase',
        block2: 'IDS: dplyr advanced — complex pipelines with join + pivot + summarise',
        block3: 'Active recall: Full timed practice — 20 questions in 40 minutes',
        block4: 'Update mastery status for all topics',
      },
      {
        day: 'Thursday 6 Aug',
        block1: 'DB: Lab week 9 complete — all concurrency exercises',
        block2: 'IDS: Practise writing R code from scratch without IDE hints',
        block3: 'Active recall: Full flashcard deck — remove mastered cards',
        block4: 'Error log — mark fixed, plan redo for unfixed',
      },
      {
        day: 'Friday 7 Aug',
        block1: 'DB: Full module review — all Tier 1 topics, write summary notes',
        block2: 'IDS: Full module review — all Tier 1 topics, write summary notes',
        block3: 'Timed mixed test across both modules — 30 questions',
        block4: 'Plan final 2 weeks — identify any remaining weak spots',
      },
    ],
  },
  {
    id: 'w7',
    week: 'Week 7',
    weekStart: '2026-08-10',
    weeklyGoals: [
      'Full revision pass — all Tier 1 topics both modules',
      'Second mock attempt for both modules — aim to beat first score',
      'Intensive error log work — everything in error log must be understood',
      'Practise writing SQL and R from memory (no autocomplete)',
    ],
    dailyBlocks: [
      {
        day: 'Monday 10 Aug',
        block1: 'DB: Full SQL revision — write 20 queries from memory (joins, subqueries, aggregates)',
        block2: 'IDS: Full dplyr revision — write 10 complete pipelines from memory',
        block3: 'Active recall: All normalisation rules + examples in 30 minutes',
        block4: 'IDS: All ggplot2 geoms from memory — no cheatsheet',
      },
      {
        day: 'Tuesday 11 Aug',
        block1: 'DB: Relational algebra — full set of practice expressions',
        block2: 'IDS: Statistics — compute stats, interpret distributions',
        block3: 'Active recall: ACID + isolation levels + serialisability in 20 min',
        block4: 'Both modules: target error log entries',
      },
      {
        day: 'Wednesday 12 Aug',
        block1: 'DB: SECOND mock attempt — timed, exam conditions',
        block2: 'IDS: SECOND mock attempt — 25MAP500 mock, timed',
        block3: 'Review answers and solutions — add new errors to log',
        block4: 'Compare scores with Week 5 attempt — celebrate improvements!',
      },
      {
        day: 'Thursday 13 Aug',
        block1: 'DB: Focus session on questions missed in second mock',
        block2: 'IDS: Focus session on questions missed in second mock',
        block3: 'Active recall: All error log items from both modules',
        block4: 'Full cheatsheet review — both modules',
      },
      {
        day: 'Friday 14 Aug',
        block1: 'DB: Teach-back — explain each Tier 1 topic out loud as if teaching',
        block2: 'IDS: Teach-back — explain each Tier 1 topic out loud',
        block3: 'Mixed timed test — 40 questions across both modules',
        block4: 'Update all mastery statuses; celebrate progress',
      },
    ],
  },
  {
    id: 'w8',
    week: 'Week 8 (Final Polish)',
    weekStart: '2026-08-17',
    weeklyGoals: [
      'Light revision — no cramming, consolidate what you know',
      'Final error log review — ensure all items marked fixed',
      'Re-do weakest practice items',
      'Prepare exam strategy: time management, which topics to tackle first',
    ],
    dailyBlocks: [
      {
        day: 'Monday 17 Aug',
        block1: 'DB: Cheatsheet walkthrough — read and recite all key definitions',
        block2: 'IDS: R syntax review — write key functions from memory',
        block3: 'Active recall: 15 random flashcards, target any marked unknown',
        block4: 'Error log final review — nothing should be "unfixed"',
      },
      {
        day: 'Tuesday 18 Aug',
        block1: 'DB: Normalisation quick drills — 5 decomposition problems',
        block2: 'IDS: ggplot2 + dplyr combined problem from practice page',
        block3: 'Light active recall — 10 cards maximum',
        block4: 'Rest and review exam logistics',
      },
      {
        day: 'Wednesday 19 Aug',
        block1: 'DB: Final review — precedence graphs and ACID only',
        block2: 'IDS: Final review — statistics interpretations and visualisation critique',
        block3: 'Walk through the 90%+ strategy: Tier 1 topics → lock them in',
        block4: 'Early night — no revision after 8pm',
      },
      {
        day: 'Thursday 20 Aug',
        block1: 'Light review — read your handwritten summary notes only',
        block2: 'Light review — IDS cheatsheet only',
        block3: 'Breathing exercises, exam preparation mindset',
        block4: 'Rest — you have done the work',
      },
      {
        day: 'Friday 21 Aug',
        block1: 'Exam day preparation — read exam tips, arrive early',
        block2: 'If exam not today: final light read of both cheatsheets',
        block3: 'Trust the preparation',
        block4: 'You are ready. 90%+ is the target. Go get it.',
      },
    ],
  },
];
