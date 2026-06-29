'use client';

import { useState } from 'react';
import { Video, ExternalLink, PlayCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'playlist' | 'video';
  youtubeId: string;
  topics: string[];
  afterWatching: string;
}

interface Section {
  label: string;
  resources: Resource[];
}

interface ModuleGroup {
  module: 'db' | 'ids';
  label: string;
  colour: string; // tailwind bg for section header
  sections: Section[];
}

const moduleGroups: ModuleGroup[] = [
  {
    module: 'db',
    label: 'Database Systems',
    colour: 'bg-[#3D0066]',
    sections: [
      {
        label: 'Theory',
        resources: [
          {
            id: 'db-relational-algebra',
            title: 'Relational Algebra — Full Playlist',
            description: 'Complete coverage of σ, π, ⋈, ρ, ∪, ∩, −, and γ. Weeks 1–3 lecture content.',
            type: 'playlist',
            youtubeId: 'PLBlnK6fEyqRiXuITH4oB-wk2mjEADVHwU',
            topics: ['σ selection', 'π projection', '⋈ natural join', 'θ theta join', 'ρ rename', '∪ ∩ − set ops', 'γ aggregation'],
            afterWatching: 'Do Lab week 1 and Lab week 2 relational algebra questions from memory. Check solutions only after.',
          },
          {
            id: 'db-er-diagrams',
            title: 'ER Diagrams & ER to Relational Mapping',
            description: 'Entity-relationship diagrams, cardinality, participation constraints, and the rules for converting an ER diagram to a relational schema.',
            type: 'video',
            youtubeId: 'LowjDtiNlk4',
            topics: ['Entities and attributes', 'Relationships and cardinality (1:1, 1:N, M:N)', 'Weak entities', 'ISA hierarchies', 'Entity → table', 'M:N → separate table with two FKs', '1:N → FK on N-side'],
            afterWatching: 'Do Lab week 5 (ER mapping). Convert the full ER diagram to tables without looking at the solution first.',
          },
          {
            id: 'db-attribute-closure',
            title: 'Functional Dependencies & Attribute Closure',
            description: 'Computing X⁺ step by step, finding candidate keys, and testing superkeys.',
            type: 'video',
            youtubeId: 'AGFUfLPFJ7w',
            topics: ['Functional dependencies X → Y', 'Attribute closure algorithm', 'Candidate keys vs superkeys', 'Armstrong\'s axioms'],
            afterWatching: 'Do the Tutorial on Functional Dependencies and Keys (Week 8 lab) from scratch without notes.',
          },
          {
            id: 'db-normalisation-1nf-3nf',
            title: '1NF, 2NF and 3NF — Worked Examples',
            description: 'Step-by-step normalisation from an unnormalised table through 1NF, 2NF and 3NF, identifying partial and transitive dependencies.',
            type: 'video',
            youtubeId: 'GFQaEYEc8_8',
            topics: ['1NF — atomic, no repeating groups', '2NF — remove partial dependencies', '3NF — remove transitive dependencies', 'Prime vs non-prime attributes'],
            afterWatching: 'Do Lab week 7 (2NF) and Lab week 8 (3NF/BCNF) from scratch.',
          },
          {
            id: 'db-bcnf',
            title: 'BCNF — Definition & Decomposition Algorithm',
            description: 'Boyce-Codd Normal Form: definition, how to identify violations, and the step-by-step decomposition algorithm. Distinct from 3NF — BCNF requires every non-trivial FD X→Y to have X as a superkey.',
            type: 'video',
            youtubeId: 'VWnKUKH4tLg',
            topics: ['BCNF definition: every non-trivial FD X→Y has X as superkey', 'Difference between 3NF and BCNF', 'Finding a BCNF violation', 'Decomposition algorithm — split on violating FD', 'Repeat until all relations in BCNF', 'BCNF may not preserve dependencies'],
            afterWatching: 'Do Lab week 8 BCNF questions. Decompose each relation by hand and verify losslessness.',
          },
          {
            id: 'db-lossless',
            title: 'Lossless Decomposition',
            description: 'Testing whether R → R1 ∪ R2 is lossless using the R1 ∩ R2 → R1 or R2 rule.',
            type: 'video',
            youtubeId: 'zb8ESEf36Zc',
            topics: ['Lossless join test', 'R1 ∩ R2 → R1 or R2', 'Why lossless matters for BCNF'],
            afterWatching: 'Pick any BCNF decomposition from your notes and prove it is lossless by hand.',
          },
          {
            id: 'db-dependency-preservation',
            title: 'Dependency Preservation',
            description: 'Why BCNF may lose functional dependencies and how 3NF synthesis guarantees preservation.',
            type: 'video',
            youtubeId: 'h_Va-DLQnBQ',
            topics: ['Dependency preservation definition', 'BCNF vs 3NF trade-off', 'Testing preservation after decomposition'],
            afterWatching: 'Write from memory: why BCNF can sacrifice dependency preservation but 3NF synthesis cannot.',
          },
          {
            id: 'db-acid',
            title: 'ACID Transactions',
            description: 'Atomicity, Consistency, Isolation, Durability — definitions and concrete failure scenarios each property prevents.',
            type: 'video',
            youtubeId: 'GAe5oB742dw',
            topics: ['Atomicity — all or nothing', 'Consistency — valid state to valid state', 'Isolation — no interference between concurrent transactions', 'Durability — committed changes survive failures'],
            afterWatching: 'Write each ACID property in one sentence. Then write one failure scenario that each property prevents.',
          },
          {
            id: 'db-isolation-levels',
            title: 'Isolation Levels',
            description: 'READ UNCOMMITTED through SERIALISABLE — which anomaly each level prevents and what it still allows.',
            type: 'video',
            youtubeId: '-gxyut1VLcs',
            topics: ['READ UNCOMMITTED — dirty reads allowed', 'READ COMMITTED — no dirty reads', 'REPEATABLE READ — no non-repeatable reads', 'SERIALISABLE — no phantom reads'],
            afterWatching: 'Fill in the 4×3 isolation level table from memory (4 levels, 3 anomalies). No notes.',
          },
          {
            id: 'db-serialisability',
            title: 'Conflict Serialisability & Precedence Graphs',
            description: 'Building a precedence graph, detecting cycles, and determining whether a schedule is conflict-serialisable.',
            type: 'video',
            youtubeId: 's8QlJoL1G6w',
            topics: ['What makes two ops conflict', 'Building the precedence graph', 'Cycle → not serialisable', 'Topological order → equivalent serial schedule'],
            afterWatching: 'Do Lab week 9 concurrency questions. Draw each precedence graph by hand.',
          },
        ],
      },
      {
        label: 'SQL & Code',
        resources: [
          {
            id: 'db-sql-main',
            title: 'SQL & Database Systems — Full Playlist',
            description: 'SQL SELECT, JOINs, aggregation, nested and correlated subqueries, EXISTS/NOT EXISTS, ER diagrams, normalisation overview.',
            type: 'playlist',
            youtubeId: 'PLNcg_FV9n7qZY_2eAtUzEUulNjTJREhQe',
            topics: ['SELECT / FROM / WHERE', 'INNER / LEFT / RIGHT / FULL JOIN', 'GROUP BY / HAVING', 'Nested subqueries (IN, NOT IN)', 'Correlated subqueries', 'EXISTS / NOT EXISTS'],
            afterWatching: 'Complete the corresponding lab worksheet. Redo every query from memory before checking your solution.',
          },
          {
            id: 'db-self-join',
            title: 'Self-Joins in SQL',
            description: 'Joining a table to itself using aliases — used to find pairs, hierarchies, and comparisons within the same relation.',
            type: 'video',
            youtubeId: 'XKUE1QFbhxs',
            topics: ['Self-join with table aliases (t1, t2)', 'Finding pairs: WHERE t1.id < t2.id', 'Hierarchical data (manager/employee)', 'Combining self-join with WHERE conditions'],
            afterWatching: 'Write from memory: a query to find all pairs of students enrolled in the same course. Use the academic system database schema.',
          },
          {
            id: 'db-cte',
            title: 'Common Table Expressions (WITH / CTEs)',
            description: 'Writing WITH clauses to break complex queries into readable steps. Used in the Week 8 Advanced SQL lab.',
            type: 'video',
            youtubeId: 'rIcB4zMYMas',
            topics: ['WITH cte AS (...) SELECT ...', 'Chaining multiple CTEs', 'When to use CTE vs subquery'],
            afterWatching: 'Rewrite a nested subquery from Lab week 6 as a CTE. Compare readability.',
          },
          {
            id: 'db-window',
            title: 'Window Functions — RANK, ROW_NUMBER, PARTITION BY',
            description: 'RANK(), DENSE_RANK(), ROW_NUMBER() and the OVER (PARTITION BY … ORDER BY …) syntax for ranking within groups.',
            type: 'video',
            youtubeId: 'LJC8277LONg',
            topics: ['RANK() vs DENSE_RANK() vs ROW_NUMBER()', 'OVER (PARTITION BY col ORDER BY col)', 'Ranking within groups', 'CASE WHEN in SELECT'],
            afterWatching: 'Do Lab week 6 advanced SQL questions. Write a query that ranks students by GPA within each department.',
          },
        ],
      },
    ],
  },

  {
    module: 'ids',
    label: 'Intro to Data Science',
    colour: 'bg-[#C8A951]',
    sections: [
      {
        label: 'Theory',
        resources: [
          {
            id: 'ids-sampling',
            title: 'Sampling Methods & Study Design',
            description: 'Population vs sample, simple random, stratified, and convenience sampling, sampling bias, and observational vs experimental studies.',
            type: 'video',
            youtubeId: '9PaR1TsvnJs',
            topics: ['Population vs sample', 'Simple random sampling', 'Stratified sampling', 'Convenience sampling and bias', 'Observational vs experimental study'],
            afterWatching: 'Write each sampling method in one sentence. Give one bias example per method. Read Week 3 lecture PDF.',
          },
          {
            id: 'ids-summary-stats',
            title: 'Summary Statistics',
            description: 'Mean, median, standard deviation, variance, quartiles, IQR, skewness, and how to compute them in R.',
            type: 'playlist',
            youtubeId: 'PLtL57Fdbwb_Chn-dNR0qBjH3esKS2MXY3',
            topics: ['Mean / median / mode', 'Variance and SD', 'Quartiles and IQR', 'Distribution shape', 'summary() and table()'],
            afterWatching: 'Do Practical 5 (summary statistics). Verify output matches solutions.',
          },
          {
            id: 'ids-tidy-data',
            title: 'Tidy Data',
            description: 'What makes data tidy, explicit vs implicit missingness, and how pivot_longer/pivot_wider reshape data into the correct format.',
            type: 'video',
            youtubeId: '1L0atkGWqvc',
            topics: ['One variable per column, one observation per row', 'Implicit vs explicit missingness', 'drop_na()', 'pivot_longer / pivot_wider'],
            afterWatching: 'Do Practical 6 Exercises 6.3–6.5 (market_cap.csv and cats-dogs). Reshape both ways from memory.',
          },
          {
            id: 'ids-ggplot2-advanced',
            title: 'ggplot2 Advanced & Figure Critique',
            description: 'Scales, coordinates, labels, annotations, themes, legends, and good vs bad visualisation principles.',
            type: 'playlist',
            youtubeId: 'PLtL57Fdbwb_D-iZXfWd2myjpYXSg_yi9G',
            topics: ['Scales and coordinates', 'labs() — title, subtitle, caption', 'Annotations', 'Custom themes', 'Good vs bad graphs', 'Figure critique checklist'],
            afterWatching: 'Review Week 10 Chapter on good vs bad graphs. Critique 3 real graphs from memory.',
          },
        ],
      },
      {
        label: 'R Code',
        resources: [
          {
            id: 'ids-r-foundations',
            title: 'R Foundations — Vectors, Lists, Data Frames',
            description: 'R and RStudio basics, data types, vectors, lists, matrices, data frames, and indexing.',
            type: 'playlist',
            youtubeId: 'PLtL57Fdbwb_AWmWWrFV_pLqq2uicpUIO9',
            topics: ['Variables and objects', 'Data types (double, integer, character, logical)', 'Vectors: c(), seq(), rep()', 'Lists and named access', 'Matrices: matrix(), cbind(), rbind()', 'Data frames and tibbles'],
            afterWatching: 'Do Practical 1 and Practical 2 fully in R Markdown.',
          },
          {
            id: 'ids-rmarkdown',
            title: 'R Markdown — Chunk Options and Document Structure',
            description: 'echo, eval, results, warning, message, results="hold" — the exact chunk options tested in Practical 1.',
            type: 'video',
            youtubeId: 'rs27coOzpHA',
            topics: ['echo=FALSE — hide code, run it', 'eval=FALSE — show code, do not run', 'results="hide" — run, hide output', 'results="hold" — all output after chunk', 'warning=FALSE / message=FALSE', 'knitr::opts_chunk$set() for global options'],
            afterWatching: 'Redo Practical 1 Exercises 1.2 and 1.3 entirely from memory. Write each chunk option from scratch.',
          },
          {
            id: 'ids-indexing',
            title: 'R Logical Indexing, %in% and which()',
            description: 'x[y > 10] logical indexing, the %in% operator, which(), and the trap that letters[27] returns NA not an error.',
            type: 'video',
            youtubeId: 'T6aSTrBYvCg',
            topics: ['Logical indexing: x[x > 10]', 'x[y > 10] — index with a different vector', '%in% — membership test', 'which() — positions of TRUE', 'letters[27] → NA not error', '"b" == letters vs "b" %in% letters'],
            afterWatching: 'Do Practical 2 Exercise 2.6 entirely without running code. Predict every output by hand.',
          },
          {
            id: 'ids-dplyr',
            title: 'Data Wrangling with dplyr',
            description: 'tidyverse, pipes, filter, select, mutate, arrange, group_by, summarise, joins, and advanced select helpers.',
            type: 'playlist',
            youtubeId: 'PLtL57Fdbwb_C6RS0JtBojTNOMVlgpeJkS',
            topics: ['Pipes %>%', 'filter() / select() / mutate()', 'arrange() / group_by() / summarise()', 'Joins: left_join, inner_join', 'contains() / where() / across()', 'na.rm=TRUE'],
            afterWatching: 'Do Practical 4 (starwars dplyr) in full from memory.',
          },
          {
            id: 'ids-read-csv',
            title: 'Reading & Parsing Data in R',
            description: 'read_csv() vs read_csv2(), read_delim(), parse_double() with locale, parse_datetime(), parse_number(), and clean_names().',
            type: 'video',
            youtubeId: 'c9okn6C0lkE',
            topics: ['read_csv() vs read_csv2() — comma vs semicolon', 'read_delim(delim=";")', 'parse_double(locale=locale(decimal_mark=","))', 'parse_datetime(format="%B %d, %Y %H:%M:%S")', 'parse_number() strips non-numeric', 'clean_names() from janitor'],
            afterWatching: 'Do Practical 6 Exercises 6.1–6.3 (ramen_ratings.csv and market_cap.csv) from scratch.',
          },
          {
            id: 'ids-dates-strings-factors',
            title: 'Dates, Strings & Factors',
            description: 'lubridate for date parsing, stringr for text manipulation, and factors with ordered levels.',
            type: 'playlist',
            youtubeId: 'PLtL57Fdbwb_AY2O3fqi5MuCTDJC-S6cbf',
            topics: ['lubridate: ymd(), dmy(), month(), year()', 'str_detect(), str_sub(), str_replace_all()', 'factor(x, levels=...)', 'month.abb and month.name', 'as.integer(factor(...))'],
            afterWatching: 'Do Practical 5 (factors and dates) and Practical 6 string exercises from memory.',
          },
          {
            id: 'ids-ggplot2-core',
            title: 'ggplot2 — Grammar of Graphics',
            description: 'Core ggplot2: data + aesthetics + geoms, scatter, line, bar, histogram, boxplot, and faceting.',
            type: 'playlist',
            youtubeId: 'PLtL57Fdbwb_B5v9p9vGVjdjrvWZL7peTy',
            topics: ['ggplot(data, aes()) + geom_*()', 'geom_point / geom_line / geom_col', 'geom_histogram / geom_boxplot', 'colour, fill, size, shape, alpha aesthetics', 'facet_wrap(~variable)', 'position_dodge / position_fill'],
            afterWatching: 'Do Practical 7 (gapminder ggplot2). Recreate every plot from memory without referring to notes.',
          },
        ],
      },
    ],
  },
];

export default function VideosPage() {
  const [moduleFilter, setModuleFilter] = useState<'all' | 'db' | 'ids'>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const visibleGroups = moduleGroups.filter(
    (g) => moduleFilter === 'all' || g.module === moduleFilter,
  );

  const embedUrl = (r: Resource) =>
    r.type === 'playlist'
      ? `https://www.youtube.com/embed/videoseries?list=${r.youtubeId}&rel=0&modestbranding=1`
      : `https://www.youtube.com/embed/${r.youtubeId}?rel=0&modestbranding=1`;

  const externalUrl = (r: Resource) =>
    r.type === 'playlist'
      ? `https://www.youtube.com/playlist?list=${r.youtubeId}`
      : `https://www.youtube.com/watch?v=${r.youtubeId}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Video size={28} className="text-[#3D0066]" />
        <div>
          <h1 className="text-2xl font-bold text-[#1A0033]">Video Support</h1>
          <p className="text-sm text-gray-500">
            Embedded playlists and videos for every topic across both modules. Watch to unblock a concept — then do the university practical immediately after.
          </p>
        </div>
      </div>

      {/* Module filter */}
      <div className="flex gap-2">
        {(['all', 'db', 'ids'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setModuleFilter(f)}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-semibold border transition-all',
              moduleFilter === f
                ? 'bg-[#3D0066] text-white border-[#3D0066]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#3D0066]/50 hover:text-[#3D0066]',
            )}
          >
            {f === 'all' ? 'All Modules' : f === 'db' ? 'Database Systems' : 'Intro to Data Science'}
          </button>
        ))}
      </div>

      {/* Module groups */}
      {visibleGroups.map((group) => (
        <div key={group.module} className="space-y-6">
          {/* Module header */}
          <div className={clsx('rounded-2xl px-6 py-4 text-white', group.colour)}>
            <h2 className="text-lg font-bold">{group.label}</h2>
            <p className="text-sm opacity-70 mt-0.5">
              {group.sections.reduce((n, s) => n + s.resources.length, 0)} resources
              · {group.sections.map((s) => s.label).join(' · ')}
            </p>
          </div>

          {/* Sections */}
          {group.sections.map((section) => (
            <div key={section.label} className="space-y-3">
              {/* Section label */}
              <div className="flex items-center gap-3">
                <span className={clsx(
                  'text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full',
                  section.label === 'Theory'
                    ? 'bg-purple-100 text-purple-700'
                    : section.label === 'SQL & Code' || section.label === 'R Code'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-100 text-gray-600',
                )}>
                  {section.label}
                </span>
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400">{section.resources.length} videos</span>
              </div>

              {/* Resource cards */}
              <div className="space-y-2">
                {section.resources.map((resource) => {
                  const isOpen = openId === resource.id;
                  return (
                    <div
                      key={resource.id}
                      className={clsx(
                        'bg-white rounded-xl border-2 transition-all overflow-hidden',
                        isOpen
                          ? group.module === 'db'
                            ? 'border-[#3D0066] shadow-md'
                            : 'border-[#C8A951] shadow-md'
                          : 'border-gray-100 hover:border-gray-300',
                      )}
                    >
                      {/* Card header */}
                      <button
                        className="w-full text-left px-5 py-4 flex items-center gap-4"
                        onClick={() => setOpenId(isOpen ? null : resource.id)}
                      >
                        <div className={clsx(
                          'p-2 rounded-lg shrink-0',
                          group.module === 'db' ? 'bg-[#3D0066]/10' : 'bg-[#C8A951]/15',
                        )}>
                          <PlayCircle size={18} className={group.module === 'db' ? 'text-[#3D0066]' : 'text-[#9A7820]'} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                              {resource.type === 'playlist' ? 'Playlist' : 'Video'}
                            </span>
                          </div>
                          <p className="font-semibold text-[#1A0033] text-sm leading-snug">{resource.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{resource.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {resource.topics.map((t) => (
                              <span key={t} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="shrink-0 text-gray-300">
                          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </button>

                      {/* Expanded */}
                      {isOpen && (
                        <div className="px-5 pb-5 space-y-3 border-t border-gray-100 pt-4">
                          <div className="rounded-xl overflow-hidden border border-gray-200" style={{ aspectRatio: '16/9' }}>
                            <iframe
                              src={embedUrl(resource)}
                              title={resource.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            />
                          </div>
                          <div className="flex items-start gap-3 flex-wrap">
                            <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex-1 min-w-0">
                              <p className="text-[10px] font-bold text-green-600 uppercase tracking-wide mb-1">After watching →</p>
                              <p className="text-sm text-green-900">{resource.afterWatching}</p>
                            </div>
                            <a
                              href={externalUrl(resource)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors shrink-0 self-start"
                            >
                              <ExternalLink size={13} />
                              YouTube
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}

      <p className="text-xs text-gray-400 text-center pt-2 border-t border-gray-100">
        Personal revision resource. Not affiliated with Loughborough University.
      </p>
    </div>
  );
}
