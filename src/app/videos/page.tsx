'use client';

import { useState } from 'react';
import { Video, ExternalLink, PlayCircle, ChevronDown, ChevronUp, AlertTriangle, Search } from 'lucide-react';
import { clsx } from 'clsx';

type ResourceType = 'playlist' | 'video' | 'search';

interface VideoResource {
  id: string;
  title: string;
  description: string;
  module: 'db' | 'ids';
  type: ResourceType;
  youtubeId: string; // playlistId, videoId, or search query string
  topics: string[];
  afterWatching: string;
  isGapFiller?: boolean;
  isNewGap?: boolean; // second-pass gaps found after initial review
}

const resources: VideoResource[] = [
  // ── DB Systems: main playlist ────────────────────────────────────────────
  {
    id: 'db-sql',
    title: 'SQL & Database Systems',
    description: 'SQL SELECT, JOINs, aggregation, subqueries, ER diagrams, normalisation, and transactions.',
    module: 'db',
    type: 'playlist',
    youtubeId: 'PLNcg_FV9n7qZY_2eAtUzEUulNjTJREhQe',
    topics: ['SQL SELECT / FROM / WHERE', 'JOINs', 'GROUP BY / HAVING', 'Nested & correlated subqueries', 'ER diagrams', 'Normalisation overview', 'Transactions & ACID'],
    afterWatching: 'Complete the corresponding lab worksheet and redo every query from memory without running it first.',
  },

  // ── DB Systems: gap fillers ──────────────────────────────────────────────
  {
    id: 'db-relational-algebra',
    title: 'Relational Algebra — Full Playlist',
    description: 'Complete coverage of σ (select), π (project), ⋈ (join), ρ (rename), ∪, ∩, −, and γ (aggregation). This entire topic is absent from the main SQL playlist.',
    module: 'db',
    type: 'playlist',
    youtubeId: 'PLBlnK6fEyqRiXuITH4oB-wk2mjEADVHwU',
    topics: ['σ selection', 'π projection', '⋈ natural join', 'θ theta join', 'ρ rename', '∪ ∩ − set operations', 'γ group by / aggregation'],
    afterWatching: 'Do Lab week 1 and Lab week 2 relational algebra questions from memory. Check against solutions.',
    isGapFiller: true,
  },
  {
    id: 'db-attribute-closure',
    title: 'Attribute Closure & Functional Dependencies',
    description: 'Step-by-step attribute closure algorithm — how to compute X⁺ and use it to find candidate keys.',
    module: 'db',
    type: 'video',
    youtubeId: 'AGFUfLPFJ7w',
    topics: ['Functional dependencies', 'Attribute closure X⁺ algorithm', 'Finding candidate keys', 'Superkeys vs candidate keys'],
    afterWatching: 'Do the Tutorial on Functional Dependencies and Keys (Week 8 lab) from scratch without notes.',
    isGapFiller: true,
  },
  {
    id: 'db-lossless',
    title: 'Lossless Decomposition',
    description: 'How to test whether a decomposition of R into R1 and R2 is lossless using the R1 ∩ R2 → R1 or R2 rule.',
    module: 'db',
    type: 'video',
    youtubeId: 'zb8ESEf36Zc',
    topics: ['Lossless join decomposition', 'R1 ∩ R2 → R1 or R2 test', 'Why lossless matters for BCNF'],
    afterWatching: 'Pick any BCNF decomposition from your normalisation notes and prove it is lossless by hand.',
    isGapFiller: true,
  },
  {
    id: 'db-dependency-preservation',
    title: 'Dependency Preservation',
    description: 'Why BCNF decompositions can lose FDs, and how to verify dependency preservation. The key trade-off between BCNF and 3NF.',
    module: 'db',
    type: 'video',
    youtubeId: 'h_Va-DLQnBQ',
    topics: ['Dependency preservation definition', 'BCNF vs 3NF trade-off', 'Testing whether FDs are preserved after decomposition'],
    afterWatching: 'Write out from memory: why 3NF synthesis guarantees dependency preservation but BCNF decomposition does not.',
    isGapFiller: true,
  },
  {
    id: 'db-normalisation-1nf-3nf',
    title: '1NF, 2NF and 3NF — Worked Examples',
    description: 'Step-by-step normalisation from an unnormalised table through 1NF, 2NF and into 3NF. Worked examples with partial and transitive dependencies identified.',
    module: 'db',
    type: 'video',
    youtubeId: 'GFQaEYEc8_8',
    topics: ['1NF — atomic values, no repeating groups', '2NF — remove partial dependencies', '3NF — remove transitive dependencies', 'Identifying prime vs non-prime attributes'],
    afterWatching: 'Do Lab week 7 (2NF) and Lab week 8 (3NF/BCNF) normalisation questions from scratch.',
    isGapFiller: true,
  },
  {
    id: 'db-acid',
    title: 'ACID Properties — Transactions',
    description: 'Atomicity, Consistency, Isolation, Durability — what each property means and why it matters, with concrete failure scenarios.',
    module: 'db',
    type: 'video',
    youtubeId: 'GAe5oB742dw',
    topics: ['Atomicity — all or nothing', 'Consistency — valid state to valid state', 'Isolation — concurrent transactions do not interfere', 'Durability — committed changes survive failures'],
    afterWatching: 'Write the definition of each ACID property in one sentence from memory. Then write one failure scenario each property prevents.',
    isGapFiller: true,
  },
  {
    id: 'db-isolation-levels',
    title: 'Isolation Levels — Dirty / Phantom / Non-Repeatable Reads',
    description: 'READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, and SERIALISABLE — what anomaly each level prevents and what it still allows.',
    module: 'db',
    type: 'video',
    youtubeId: '-gxyut1VLcs',
    topics: ['READ UNCOMMITTED — dirty reads allowed', 'READ COMMITTED — prevents dirty reads', 'REPEATABLE READ — prevents non-repeatable reads', 'SERIALISABLE — prevents phantom reads'],
    afterWatching: 'Fill in the isolation level table from memory: 4 levels × 3 anomalies (dirty / non-repeatable / phantom) — which are prevented at each level.',
    isGapFiller: true,
  },
  {
    id: 'db-serialisability',
    title: 'Conflict Serialisability & Precedence Graphs',
    description: 'How to build a precedence (conflict) graph and determine whether a schedule is conflict-serialisable. Includes cycle detection.',
    module: 'db',
    type: 'video',
    youtubeId: 's8QlJoL1G6w',
    topics: ['What makes two operations conflict', 'Building the precedence graph', 'Cycle detection → not serialisable', 'Topological order → equivalent serial schedule'],
    afterWatching: 'Do Lab week 9 concurrency questions. Draw the precedence graph by hand for each schedule.',
    isGapFiller: true,
  },

  // ── Intro to Data Science playlists ─────────────────────────────────────
  {
    id: 'ids-r1',
    title: 'R Programming — Foundations',
    description: 'R, RStudio, data types, vectors, lists, matrices, data frames, and indexing.',
    module: 'ids',
    type: 'playlist',
    youtubeId: 'PLtL57Fdbwb_AWmWWrFV_pLqq2uicpUIO9',
    topics: ['R & RStudio setup', 'Variables and objects', 'Data types', 'Vectors', 'Lists', 'Matrices', 'Data frames', 'Indexing'],
    afterWatching: 'Do Practical 1 and Practical 2 in R Markdown.',
  },
  {
    id: 'ids-r2',
    title: 'R Programming — Data Wrangling',
    description: 'tidyverse, dplyr verbs, pipes, joins, and data manipulation.',
    module: 'ids',
    type: 'playlist',
    youtubeId: 'PLtL57Fdbwb_C6RS0JtBojTNOMVlgpeJkS',
    topics: ['tidyverse & pipes (%>%)', 'filter / select / mutate', 'arrange / group_by / summarise', 'Joins (left, inner, full)', 'Practical data cleaning'],
    afterWatching: 'Do Practical 4 (dplyr) in full from memory.',
  },
  {
    id: 'ids-r3',
    title: 'R Programming — Dates, Strings & Factors',
    description: 'lubridate for dates, stringr for text, factors, tidyr pivoting, and missing values.',
    module: 'ids',
    type: 'playlist',
    youtubeId: 'PLtL57Fdbwb_AY2O3fqi5MuCTDJC-S6cbf',
    topics: ['lubridate: ymd(), dmy(), month(), year()', 'stringr: str_detect(), str_replace()', 'Factors and levels', 'pivot_longer / pivot_wider', 'Handling NA values'],
    afterWatching: 'Do Practical 6 using the lotr_characters dataset.',
  },
  {
    id: 'ids-r4',
    title: 'Summary Statistics in R',
    description: 'Mean, median, standard deviation, distributions, quartiles, and summary() in R.',
    module: 'ids',
    type: 'playlist',
    youtubeId: 'PLtL57Fdbwb_Chn-dNR0qBjH3esKS2MXY3',
    topics: ['Mean, median, mode', 'Variance and standard deviation', 'Quartiles and IQR', 'Distribution shape: skewness', 'summary() and table()'],
    afterWatching: 'Do Practical 5 (summary statistics) and verify with the model solutions.',
  },
  {
    id: 'ids-r5',
    title: 'ggplot2 — Data Visualisation',
    description: 'Grammar of graphics, core geoms, scatter plots, bar charts, histograms, and boxplots.',
    module: 'ids',
    type: 'playlist',
    youtubeId: 'PLtL57Fdbwb_B5v9p9vGVjdjrvWZL7peTy',
    topics: ['Grammar of graphics (data + aes + geom)', 'geom_point, geom_line, geom_bar', 'geom_histogram, geom_boxplot', 'Facets: facet_wrap / facet_grid', 'Scales, labels, and themes'],
    afterWatching: 'Do Practical 7 and recreate every plot from memory.',
  },
  {
    id: 'ids-r6',
    title: 'ggplot2 — Advanced & Figure Critique',
    description: 'Advanced ggplot2 customisation, annotations, themes, and good vs bad visualisation principles.',
    module: 'ids',
    type: 'playlist',
    youtubeId: 'PLtL57Fdbwb_D-iZXfWd2myjpYXSg_yi9G',
    topics: ['Scales and coordinates', 'Labels and annotations', 'Custom themes', 'Legends and colour palettes', 'Good vs bad graphs', 'Figure critique checklist'],
    afterWatching: 'Review Week 10 Chapter on good vs bad graphs. Critique 3 real graphs.',
  },

  // ── DB second-pass gaps ──────────────────────────────────────────────────
  {
    id: 'db-er-to-relational',
    title: 'ER Diagram to Relational Schema — Mapping Rules',
    description: 'How to convert an ER diagram to a set of relational tables: entities, 1:N, M:N relationships, weak entities, and ISA hierarchies. Week 7 lecture content with no video equivalent until now.',
    module: 'db',
    type: 'search',
    youtubeId: 'ER diagram to relational schema mapping rules database',
    topics: ['Entity set → table', 'M:N relationship → separate table with two FKs', '1:N → FK on the N-side', 'Weak entity → include owner PK', 'ISA hierarchy — options'],
    afterWatching: 'Do Lab week 5 (ER mapping) from memory. Convert the ER diagram to tables without looking at the solution.',
    isGapFiller: true,
    isNewGap: true,
  },
  {
    id: 'db-advanced-sql',
    title: 'Advanced SQL — CASE, CTEs, Window Functions',
    description: 'CASE WHEN expressions, WITH (common table expressions), RANK() and ROW_NUMBER() window functions, UNION / INTERSECT / EXCEPT. Covers the Week 8 Advanced SQL lecture slide content.',
    module: 'db',
    type: 'search',
    youtubeId: 'advanced SQL CASE WHEN WITH CTE window functions RANK ROW_NUMBER',
    topics: ['CASE WHEN THEN ELSE END', 'WITH cte AS (...) SELECT ...', 'RANK() OVER (PARTITION BY ... ORDER BY ...)', 'ROW_NUMBER()', 'UNION vs UNION ALL', 'INTERSECT / EXCEPT'],
    afterWatching: 'Do Lab week 6 (advanced SQL) and attempt every query from memory before checking the solution.',
    isGapFiller: true,
    isNewGap: true,
  },

  // ── IDS second-pass gaps ─────────────────────────────────────────────────
  {
    id: 'ids-rmarkdown',
    title: 'R Markdown — Chunk Options and Document Structure',
    description: 'echo, eval, results, warning, message, results="hold" — the exact chunk options tested in Practical 1 Exercises 1.2 and 1.3. None of the six R playlists cover R Markdown at all. This is a direct exam topic.',
    module: 'ids',
    type: 'search',
    youtubeId: 'R Markdown chunk options echo eval results hold hide knitr tutorial',
    topics: ['echo=FALSE — hide code, run it', 'eval=FALSE — show code, do not run', 'results="hide" — run, hide output', 'results="hold" — show all output after chunk', 'warning=FALSE / message=FALSE', 'Global chunk options with knitr::opts_chunk$set()'],
    afterWatching: 'Redo Practical 1 Exercises 1.2 and 1.3 entirely from memory. Write each chunk option and its effect without looking at notes.',
    isGapFiller: true,
    isNewGap: true,
  },
  {
    id: 'ids-data-reading',
    title: 'Reading and Parsing Data in R',
    description: 'read_csv() vs read_csv2(), read_delim(), read_lines(), parse_double(), parse_datetime(), parse_number() with locale(), and clean_names() from the janitor package. All tested in Practical 6.',
    module: 'ids',
    type: 'search',
    youtubeId: 'read_csv read_csv2 parse_double locale readr R tutorial',
    topics: ['read_csv() vs read_csv2() — comma vs semicolon delimiter', 'read_delim(delim=";")', 'parse_double(locale=locale(decimal_mark=","))', 'parse_datetime(format="%B %d, %Y %H:%M:%S")', 'parse_number() — strips non-numeric characters', 'clean_names() from janitor package'],
    afterWatching: 'Do Practical 6 Exercises 6.1–6.3 (ramen_ratings.csv and market_cap.csv) from scratch.',
    isGapFiller: true,
    isNewGap: true,
  },
  {
    id: 'ids-logical-indexing',
    title: 'R Logical Indexing, %in% and which()',
    description: 'x[y > 10] logical indexing, the %in% operator, which(), and the trap that letters[27] returns NA not an error. Practical 2 Exercise 2.6 tests these at exam depth.',
    module: 'ids',
    type: 'search',
    youtubeId: 'R logical indexing vector subsetting %in% which() tutorial',
    topics: ['Logical indexing: x[x > 10]', 'x[y > 10] — index with a different vector', '%in% — membership test', 'which() — returns positions of TRUE', 'Out-of-bounds indexing returns NA not error', '"b" == letters vs "b" %in% letters'],
    afterWatching: 'Do Practical 2 Exercise 2.6 entirely without running any code first. Predict every output by hand.',
    isGapFiller: true,
    isNewGap: true,
  },
  {
    id: 'ids-tidy-data',
    title: 'Tidy Data, drop_na() and Implicit vs Explicit Missingness',
    description: 'What makes data tidy, explicit vs implicit missing values, drop_na(), and the full pivot_longer workflow with real data including locale parsing. Practical 6 Exercises 6.3–6.5.',
    module: 'ids',
    type: 'search',
    youtubeId: 'tidy data R tidyr pivot_longer drop_na missing values implicit explicit',
    topics: ['Tidy data: one variable per column, one observation per row', 'Implicit missingness — row simply absent', 'Explicit missingness — NA present in cell', 'drop_na() — converts explicit to implicit', 'pivot_longer() full workflow with names_to / values_to', 'pivot_wider() to reverse'],
    afterWatching: 'Do Practical 6 Exercises 6.3–6.5 (market_cap.csv and cats-dogs tidy/wide). Reshape both ways from memory.',
    isGapFiller: true,
    isNewGap: true,
  },
  {
    id: 'ids-sampling',
    title: 'Sampling Methods and Study Design',
    description: 'Population vs sample, random sampling, stratified sampling, convenience sampling, sampling bias, observational vs experimental studies. Week 3 lecture content (3_data_collection_and_sampling.pdf).',
    module: 'ids',
    type: 'search',
    youtubeId: 'population vs sample random stratified sampling bias statistics explained',
    topics: ['Population vs sample', 'Simple random sampling', 'Stratified sampling', 'Convenience sampling and bias', 'Observational vs experimental study', 'Why sampling method affects conclusions'],
    afterWatching: 'Write from memory: define each sampling method in one sentence. Give one example of sampling bias for each.',
    isGapFiller: true,
    isNewGap: true,
  },
];

export default function VideosPage() {
  const [moduleFilter, setModuleFilter] = useState<'all' | 'db' | 'ids'>('all');
  const [activeResource, setActiveResource] = useState<string | null>('db-sql');

  const filtered = resources.filter((r) => moduleFilter === 'all' || r.module === moduleFilter);
  const gapFillers = filtered.filter((r) => r.isGapFiller && !r.isNewGap);
  const newGaps = filtered.filter((r) => r.isNewGap);
  const mainResources = filtered.filter((r) => !r.isGapFiller && !r.isNewGap);

  const embedUrl = (r: VideoResource) =>
    r.type === 'playlist'
      ? `https://www.youtube.com/embed/videoseries?list=${r.youtubeId}&rel=0&modestbranding=1`
      : `https://www.youtube.com/embed/${r.youtubeId}?rel=0&modestbranding=1`;

  const externalUrl = (r: VideoResource) =>
    r.type === 'playlist'
      ? `https://www.youtube.com/playlist?list=${r.youtubeId}`
      : r.type === 'search'
      ? `https://www.youtube.com/results?search_query=${encodeURIComponent(r.youtubeId)}`
      : `https://www.youtube.com/watch?v=${r.youtubeId}`;

  const ResourceCard = ({ resource }: { resource: VideoResource }) => {
    const isOpen = activeResource === resource.id;
    return (
      <div className={clsx(
        'bg-white rounded-2xl border-2 transition-all overflow-hidden',
        isOpen ? 'border-[#3D0066] shadow-lg' : 'border-gray-200 hover:border-[#3D0066]/40',
        resource.isGapFiller && !isOpen && 'border-amber-200 hover:border-amber-400',
        resource.isGapFiller && isOpen && 'border-amber-500 shadow-lg',
      )}>
        <button
          className="w-full text-left p-5 flex items-start gap-4"
          onClick={() => setActiveResource(isOpen ? null : resource.id)}
        >
          <div className={clsx(
            'mt-0.5 p-2 rounded-lg shrink-0',
            resource.isGapFiller ? 'bg-amber-100' : resource.module === 'db' ? 'bg-[#3D0066]/10' : 'bg-amber-100',
          )}>
            <PlayCircle size={20} className={clsx(
              resource.isGapFiller ? 'text-amber-600' : resource.module === 'db' ? 'text-[#3D0066]' : 'text-amber-600',
            )} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={clsx(
                'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded',
                resource.module === 'db' ? 'bg-[#3D0066]/10 text-[#3D0066]' : 'bg-amber-100 text-amber-700',
              )}>
                {resource.module === 'db' ? 'Database Systems' : 'Intro to Data Science'}
              </span>
              <span className="text-[10px] font-medium text-gray-400 uppercase">
                {resource.type === 'playlist' ? 'Playlist' : resource.type === 'search' ? 'Search' : 'Video'}
              </span>
              {resource.isNewGap && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-500 text-white">
                  Gap Filler
                </span>
              )}
              {resource.isGapFiller && !resource.isNewGap && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500 text-white">
                  Gap Filler
                </span>
              )}
            </div>
            <h3 className="font-bold text-[#1A0033] text-base">{resource.title}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{resource.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {resource.topics.map((t) => (
                <span key={t} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
          </div>

          <div className="shrink-0 text-gray-400 mt-1">
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </button>

        {isOpen && (
          <div className="px-5 pb-5 space-y-4">
            {resource.type === 'search' ? (
              <div className="rounded-xl border-2 border-dashed border-red-200 bg-red-50 p-6 flex flex-col items-center gap-3 text-center">
                <Search size={28} className="text-red-500" />
                <p className="text-sm font-semibold text-red-800">No specific video pinned for this topic yet.</p>
                <p className="text-xs text-red-600 font-mono bg-white border border-red-200 rounded-lg px-3 py-2 max-w-full break-words">
                  &ldquo;{resource.youtubeId}&rdquo;
                </p>
                <p className="text-xs text-red-700">Click below to search YouTube with this term. Pick the clearest, most concise video (under 20 min). Watch, then do the practical.</p>
                <a
                  href={externalUrl(resource)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors"
                >
                  <Search size={15} />
                  Search YouTube
                </a>
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden border border-gray-200" style={{ aspectRatio: '16/9' }}>
                <iframe
                  src={embedUrl(resource)}
                  title={resource.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className={clsx(
                'border rounded-xl p-4 flex-1 min-w-0',
                resource.isNewGap ? 'bg-red-50 border-red-200' : resource.isGapFiller ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200',
              )}>
                <p className={clsx(
                  'text-[10px] font-bold uppercase tracking-wide mb-1',
                  resource.isNewGap ? 'text-red-600' : resource.isGapFiller ? 'text-amber-600' : 'text-green-600',
                )}>After watching →</p>
                <p className={clsx('text-sm', resource.isNewGap ? 'text-red-900' : resource.isGapFiller ? 'text-amber-900' : 'text-green-800')}>
                  {resource.afterWatching}
                </p>
              </div>
              {resource.type !== 'search' && (
                <a
                  href={externalUrl(resource)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors shrink-0 self-start"
                >
                  <ExternalLink size={15} />
                  Open in YouTube
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Video size={28} className="text-[#3D0066]" />
        <div>
          <h1 className="text-2xl font-bold text-[#1A0033]">Video Support</h1>
          <p className="text-sm text-gray-500">
            Embedded playlists and targeted videos for every topic. Watch to unblock a concept, then immediately do the university practical.
          </p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
        <p className="font-semibold mb-1">How to use</p>
        <p>University materials are the source of truth. Use videos only when a concept blocks you. After each video, do the listed practical from memory — that is what builds exam performance.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        {(['all', 'db', 'ids'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setModuleFilter(f)}
            className={clsx(
              'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
              moduleFilter === f
                ? 'bg-[#3D0066] text-white border-[#3D0066]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#3D0066] hover:text-[#3D0066]',
            )}
          >
            {f === 'all' ? 'All' : f === 'db' ? 'Database Systems' : 'Intro to Data Science'}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-400">{filtered.length} resources</span>
      </div>

      {/* Main resources */}
      {mainResources.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Main Playlists</h2>
          {mainResources.map((r) => <ResourceCard key={r.id} resource={r} />)}
        </div>
      )}

      {/* Gap fillers — pass 1 (DB theory) */}
      {gapFillers.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-500" />
            <h2 className="text-sm font-bold text-amber-700 uppercase tracking-wide">
              DB Gap Fillers — Theory topics missing from the main playlist
            </h2>
          </div>
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
            Relational algebra, FD theory, lossless decomposition, and concurrency — likely 30–40% of the Database Systems exam. All embedded and ready to watch.
          </p>
          {gapFillers.map((r) => <ResourceCard key={r.id} resource={r} />)}
        </div>
      )}

      {/* Gap fillers — pass 2 (deeper gaps found after review) */}
      {newGaps.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-500" />
            <h2 className="text-sm font-bold text-red-700 uppercase tracking-wide">
              Deeper Gaps — Found after comparing videos to university practicals
            </h2>
          </div>
          <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            These topics appear directly in the university labs and mock exams but were not covered by any playlist. No specific video is pinned yet — use the search button to find the best one, then do the practical immediately after.
          </p>
          {newGaps.map((r) => <ResourceCard key={r.id} resource={r} />)}
        </div>
      )}
    </div>
  );
}
