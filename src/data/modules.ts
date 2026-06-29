export type MasteryStatus = 'not-started' | 'read' | 'practised' | 'redone' | 'mock-tested' | 'mastered';
export type Tier = 1 | 2 | 3;

export interface Topic {
  id: string;
  title: string;
  tier: Tier;
  status: MasteryStatus;
  description: string;
}

export interface WeekFile {
  name: string;
  type: 'pdf' | 'pptx' | 'docx' | 'rmd' | 'csv' | 'sql' | 'zip' | 'txt';
  role: 'lecture' | 'lab' | 'solution' | 'data' | 'mock';
  path: string;
}

export interface Week {
  week: number;
  title: string;
  topics: Topic[];
  files: WeekFile[];
}

export interface Module {
  id: string;
  title: string;
  code: string;
  color: string;
  weeks: Week[];
}

export const databaseSystemsModule: Module = {
  id: 'database-systems',
  title: 'Database Systems',
  code: '25COP502',
  color: '#3D0066',
  weeks: [
    {
      week: 1,
      title: 'Introduction to Databases & Relational Algebra Basics',
      topics: [
        { id: 'db-w1-t1', title: 'Intro to databases', tier: 1, status: 'not-started', description: 'Overview of database concepts, DBMS, relational model fundamentals' },
        { id: 'db-w1-t2', title: 'Relational model basics', tier: 1, status: 'not-started', description: 'Relations, attributes, tuples, schemas, keys' },
      ],
      files: [
        { name: 'introduction to DB (1).pptx', type: 'pptx', role: 'lecture', path: 'Database Systems/Week 1/introduction to DB (1).pptx' },
        { name: 'Relational algebra Select Project join short (4).pptx', type: 'pptx', role: 'lecture', path: 'Database Systems/Week 1/Relational algebra Select Project join short (4).pptx' },
      ],
    },
    {
      week: 2,
      title: 'SQL SELECT/FROM/WHERE, Relational Algebra',
      topics: [
        { id: 'db-w2-t1', title: 'SQL SELECT/FROM/WHERE', tier: 1, status: 'not-started', description: 'Basic SQL queries, filtering with WHERE, string patterns' },
        { id: 'db-w2-t2', title: 'SQL Joins', tier: 1, status: 'not-started', description: 'INNER JOIN, NATURAL JOIN, CROSS JOIN syntax and semantics' },
        { id: 'db-w2-t3', title: 'Relational Algebra σ π ⋈', tier: 1, status: 'not-started', description: 'Selection, Projection, Join operators in relational algebra' },
      ],
      files: [
        { name: 'SQL select project join (6).pptx', type: 'pptx', role: 'lecture', path: 'Database Systems/Week 2/SQL select project join (6).pptx' },
        { name: 'Relational algebra Select Project join short (4).pptx', type: 'pptx', role: 'lecture', path: 'Database Systems/Week 2/Relational algebra Select Project join short (4).pptx' },
        { name: 'Lab week 1 (1).docx', type: 'docx', role: 'lab', path: 'Database Systems/Week 2/Lab week 1 (1).docx' },
        { name: 'Lab week 1 - solutions (2).docx', type: 'docx', role: 'solution', path: 'Database Systems/Week 2/Lab week 1 - solutions (2).docx' },
        { name: 'Lab extra questions (1).docx', type: 'docx', role: 'lab', path: 'Database Systems/Week 2/Lab extra questions (1).docx' },
        { name: 'academic system data.zip', type: 'zip', role: 'data', path: 'Database Systems/Week 2/academic system data.zip' },
      ],
    },
    {
      week: 3,
      title: 'SQL Joins & Relational Algebra GROUP BY',
      topics: [
        { id: 'db-w3-t1', title: 'SQL Joins', tier: 1, status: 'not-started', description: 'INNER, OUTER (LEFT/RIGHT/FULL) joins, self-joins' },
        { id: 'db-w3-t2', title: 'Relational Algebra aggregation', tier: 2, status: 'not-started', description: 'Generalised projection, aggregation operator γ' },
        { id: 'db-w3-t3', title: 'GROUP BY', tier: 1, status: 'not-started', description: 'Grouping rows in SQL, interaction with SELECT list' },
      ],
      files: [
        { name: 'SQL select project join (6).pptx', type: 'pptx', role: 'lecture', path: 'Database Systems/Week 3/SQL select project join (6).pptx' },
        { name: 'Relational Algebra groupby aggregation (4).pptx', type: 'pptx', role: 'lecture', path: 'Database Systems/Week 3/Relational Algebra groupby aggregation (4).pptx' },
        { name: 'Lab week 2.docx', type: 'docx', role: 'lab', path: 'Database Systems/Week 3/Lab week 2.docx' },
        { name: 'Lab week 2 solutions (3).docx', type: 'docx', role: 'solution', path: 'Database Systems/Week 3/Lab week 2 solutions (3).docx' },
        { name: 'academic system data.zip', type: 'zip', role: 'data', path: 'Database Systems/Week 3/academic system data.zip' },
      ],
    },
    {
      week: 4,
      title: 'SQL Aggregate Functions',
      topics: [
        { id: 'db-w4-t1', title: 'Aggregate functions', tier: 1, status: 'not-started', description: 'COUNT, SUM, AVG, MIN, MAX with and without GROUP BY' },
        { id: 'db-w4-t2', title: 'GROUP BY / HAVING', tier: 1, status: 'not-started', description: 'Filtering groups with HAVING, difference between WHERE and HAVING' },
      ],
      files: [
        { name: 'SQL Aggregate Functions (2).pptx', type: 'pptx', role: 'lecture', path: 'Database Systems/Week 4/SQL Aggregate Functions (2).pptx' },
        { name: 'Lab week 3.docx', type: 'docx', role: 'lab', path: 'Database Systems/Week 4/Lab week 3.docx' },
        { name: 'Lab week 3 - solutions (3).docx', type: 'docx', role: 'solution', path: 'Database Systems/Week 4/Lab week 3 - solutions (3).docx' },
        { name: 'academic system data.zip', type: 'zip', role: 'data', path: 'Database Systems/Week 4/academic system data.zip' },
      ],
    },
    {
      week: 5,
      title: 'SQL Nested Subqueries & ER Diagrams',
      topics: [
        { id: 'db-w5-t1', title: 'Nested subqueries', tier: 1, status: 'not-started', description: 'Subqueries in WHERE, FROM, SELECT; scalar vs table subqueries' },
        { id: 'db-w5-t2', title: 'Correlated subqueries', tier: 1, status: 'not-started', description: 'Subqueries referencing outer query columns, EXISTS pattern' },
        { id: 'db-w5-t3', title: 'ER diagrams', tier: 1, status: 'not-started', description: 'Entity-relationship diagrams, cardinality, participation constraints' },
      ],
      files: [
        { name: 'SQL Nested Subqueries (4).pptx', type: 'pptx', role: 'lecture', path: 'Database Systems/Week 5/SQL Nested Subqueries (4).pptx' },
        { name: 'ER diagrams short (2).pptx', type: 'pptx', role: 'lecture', path: 'Database Systems/Week 5/ER diagrams short (2).pptx' },
        { name: 'Lab week 3 extended.docx', type: 'docx', role: 'lab', path: 'Database Systems/Week 5/Lab week 3 extended.docx' },
        { name: 'Lab week 3 extended - solutions (2).docx', type: 'docx', role: 'solution', path: 'Database Systems/Week 5/Lab week 3 extended - solutions (2).docx' },
        { name: 'academic system data.zip', type: 'zip', role: 'data', path: 'Database Systems/Week 5/academic system data.zip' },
      ],
    },
    {
      week: 6,
      title: 'SQL Nested Subqueries Deep Dive',
      topics: [
        { id: 'db-w6-t1', title: 'EXISTS / IN / NOT EXISTS', tier: 1, status: 'not-started', description: 'Set membership operators, existential quantification in SQL' },
        { id: 'db-w6-t2', title: 'Subquery patterns', tier: 1, status: 'not-started', description: 'Common subquery patterns: division, universal quantification workaround' },
      ],
      files: [
        { name: 'SQL Nested Subqueries (4).pptx', type: 'pptx', role: 'lecture', path: 'Database Systems/Week 6/SQL Nested Subqueries (4).pptx' },
        { name: 'Lab week 4.docx', type: 'docx', role: 'lab', path: 'Database Systems/Week 6/Lab week 4.docx' },
        { name: 'Lab week 4 - Solutions (2).docx', type: 'docx', role: 'solution', path: 'Database Systems/Week 6/Lab week 4 - Solutions (2).docx' },
        { name: 'academic system data.zip', type: 'zip', role: 'data', path: 'Database Systems/Week 6/academic system data.zip' },
      ],
    },
    {
      week: 7,
      title: 'ER to Relational Mapping',
      topics: [
        { id: 'db-w7-t1', title: 'ER-to-relational mapping', tier: 1, status: 'not-started', description: 'Converting ER diagrams to relational schemas, step-by-step algorithm' },
        { id: 'db-w7-t2', title: 'Entity sets and relationship sets', tier: 2, status: 'not-started', description: 'Weak entities, identifying relationships, multi-valued attributes' },
      ],
      files: [
        { name: 'scan_covg.pdf', type: 'pdf', role: 'lecture', path: 'Database Systems/Week 7/scan_covg.pdf' },
        { name: 'Lab week 5 (1).docx', type: 'docx', role: 'lab', path: 'Database Systems/Week 7/Lab week 5 (1).docx' },
        { name: 'Lab week 5 - Solutions (1).docx', type: 'docx', role: 'solution', path: 'Database Systems/Week 7/Lab week 5 - Solutions (1).docx' },
      ],
    },
    {
      week: 8,
      title: 'Functional Dependencies & Advanced SQL',
      topics: [
        { id: 'db-w8-t1', title: 'Functional dependencies', tier: 1, status: 'not-started', description: 'Definition of FDs, Armstrong\'s axioms, minimal cover' },
        { id: 'db-w8-t2', title: 'Candidate keys', tier: 1, status: 'not-started', description: 'Finding candidate keys using attribute closure' },
        { id: 'db-w8-t3', title: 'Attribute closure', tier: 1, status: 'not-started', description: 'Computing X+ under a set of FDs' },
        { id: 'db-w8-t4', title: 'Advanced SQL', tier: 2, status: 'not-started', description: 'Window functions, CTEs, recursive queries' },
      ],
      files: [
        { name: 'Advanced SQL short (1).pptx', type: 'pptx', role: 'lecture', path: 'Database Systems/Week 8/Advanced SQL short (1).pptx' },
        { name: 'normalization navathe short.pdf', type: 'pdf', role: 'lecture', path: 'Database Systems/Week 8/normalization navathe short.pdf' },
        { name: 'Tutorial on Functional Dependencies and Keys.docx', type: 'docx', role: 'lab', path: 'Database Systems/Week 8/Tutorial on Functional Dependencies and Keys.docx' },
        { name: 'Lab week 6 (1).docx', type: 'docx', role: 'lab', path: 'Database Systems/Week 8/Lab week 6 (1).docx' },
        { name: 'Lab week 6 - Solutions (1).docx', type: 'docx', role: 'solution', path: 'Database Systems/Week 8/Lab week 6 - Solutions (1).docx' },
      ],
    },
    {
      week: 9,
      title: '2NF Normalisation',
      topics: [
        { id: 'db-w9-t1', title: '1NF', tier: 1, status: 'not-started', description: 'First Normal Form: atomic values, no repeating groups' },
        { id: 'db-w9-t2', title: '2NF', tier: 1, status: 'not-started', description: 'Second Normal Form: no partial dependencies on candidate key' },
        { id: 'db-w9-t3', title: 'Partial dependencies', tier: 1, status: 'not-started', description: 'Identifying and eliminating partial functional dependencies' },
      ],
      files: [
        { name: '2NF normalization.pdf', type: 'pdf', role: 'lecture', path: 'Database Systems/Week 9/2NF normalization.pdf' },
        { name: 'Lab week 7.docx', type: 'docx', role: 'lab', path: 'Database Systems/Week 9/Lab week 7.docx' },
        { name: 'Lab 7 solutions (1).zip', type: 'zip', role: 'solution', path: 'Database Systems/Week 9/Lab 7 solutions (1).zip' },
      ],
    },
    {
      week: 10,
      title: '3NF, BCNF, Transactions',
      topics: [
        { id: 'db-w10-t1', title: '3NF', tier: 1, status: 'not-started', description: 'Third Normal Form: no transitive dependencies on non-prime attributes' },
        { id: 'db-w10-t2', title: 'BCNF', tier: 1, status: 'not-started', description: 'Boyce-Codd Normal Form: every determinant is a superkey' },
        { id: 'db-w10-t3', title: 'Lossless decomposition', tier: 1, status: 'not-started', description: 'Ensuring natural join of decomposition returns the original relation' },
        { id: 'db-w10-t4', title: 'Dependency preservation', tier: 1, status: 'not-started', description: 'Checking that all FDs can be enforced in the decomposed schema' },
        { id: 'db-w10-t5', title: 'Transactions/ACID', tier: 1, status: 'not-started', description: 'Atomicity, Consistency, Isolation, Durability properties' },
      ],
      files: [
        { name: 'breaking up table (1).pptx', type: 'pptx', role: 'lecture', path: 'Database Systems/Week 10/breaking up table (1).pptx' },
        { name: 'gunturi 3NF.pdf', type: 'pdf', role: 'lecture', path: 'Database Systems/Week 10/gunturi 3NF.pdf' },
        { name: 'transactions-and-isolation levels.pdf', type: 'pdf', role: 'lecture', path: 'Database Systems/Week 10/transactions-and-isolation levels.pdf' },
        { name: 'Lab week 8.docx', type: 'docx', role: 'lab', path: 'Database Systems/Week 10/Lab week 8.docx' },
        { name: 'Lab week 8 - Solutions (2).docx', type: 'docx', role: 'solution', path: 'Database Systems/Week 10/Lab week 8 - Solutions (2).docx' },
      ],
    },
    {
      week: 11,
      title: 'Concurrency & Transactions',
      topics: [
        { id: 'db-w11-t1', title: 'Isolation levels', tier: 1, status: 'not-started', description: 'READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE' },
        { id: 'db-w11-t2', title: 'Serialisability', tier: 1, status: 'not-started', description: 'Conflict serialisability, view serialisability definitions' },
        { id: 'db-w11-t3', title: 'Precedence graphs', tier: 1, status: 'not-started', description: 'Building conflict graphs to test conflict serialisability' },
        { id: 'db-w11-t4', title: 'Concurrency control', tier: 1, status: 'not-started', description: 'Two-phase locking, timestamp ordering protocols' },
      ],
      files: [
        { name: 'example of concurrency (1).pptx', type: 'pptx', role: 'lecture', path: 'Database Systems/Week 11/example of concurrency (1).pptx' },
        { name: 'transactions-and-isolation levels_removed.pdf', type: 'pdf', role: 'lecture', path: 'Database Systems/Week 11/transactions-and-isolation levels_removed.pdf' },
        { name: 'Lab week 9 (2).docx', type: 'docx', role: 'lab', path: 'Database Systems/Week 11/Lab week 9 (2).docx' },
        { name: 'Lab week 9 - Solutions (2).docx', type: 'docx', role: 'solution', path: 'Database Systems/Week 11/Lab week 9 - Solutions (2).docx' },
      ],
    },
  ],
};

export const introDataScienceModule: Module = {
  id: 'intro-data-science',
  title: 'Introduction to Data Science',
  code: '25MAP500',
  color: '#C8A951',
  weeks: [
    {
      week: 1,
      title: 'What is Data Science & R Introduction',
      topics: [
        { id: 'ids-w1-t1', title: 'What is data science', tier: 3, status: 'not-started', description: 'Overview of data science field, key roles, typical workflow' },
        { id: 'ids-w1-t2', title: 'R & RStudio basics', tier: 1, status: 'not-started', description: 'Console, scripts, environment, basic arithmetic in R' },
        { id: 'ids-w1-t3', title: 'R Markdown', tier: 2, status: 'not-started', description: 'Creating reproducible reports with Rmd, chunks, YAML header' },
      ],
      files: [
        { name: '1_what_is_data_science.pdf', type: 'pdf', role: 'lecture', path: 'Intro to Data Science/Week 1/1_what_is_data_science.pdf' },
        { name: '00_general_info.pdf', type: 'pdf', role: 'lecture', path: 'Intro to Data Science/Week 1/00_general_info.pdf' },
        { name: 'Chapter 1.docx', type: 'docx', role: 'lecture', path: 'Intro to Data Science/Week 1/Chapter 1.docx' },
        { name: 'Practical 1.docx', type: 'docx', role: 'lab', path: 'Intro to Data Science/Week 1/Practical 1.docx' },
        { name: '01_practical (4).Rmd', type: 'rmd', role: 'lab', path: 'Intro to Data Science/Week 1/01_practical (4).Rmd' },
      ],
    },
    {
      week: 2,
      title: 'R Data Types & Objects',
      topics: [
        { id: 'ids-w2-t1', title: 'Variables and objects', tier: 1, status: 'not-started', description: 'Assignment with <- and =, naming conventions, ls()' },
        { id: 'ids-w2-t2', title: 'Data types', tier: 1, status: 'not-started', description: 'numeric, integer, character, logical, complex, class()' },
        { id: 'ids-w2-t3', title: 'Vectors', tier: 1, status: 'not-started', description: 'Creating with c(), seq(), rep(), vector arithmetic, recycling' },
        { id: 'ids-w2-t4', title: 'Lists', tier: 1, status: 'not-started', description: 'Heterogeneous containers, list(), [[]] indexing, named elements' },
        { id: 'ids-w2-t5', title: 'Matrices', tier: 2, status: 'not-started', description: 'matrix(), dim, nrow, ncol, matrix operations' },
        { id: 'ids-w2-t6', title: 'Indexing', tier: 1, status: 'not-started', description: 'Subsetting with [], [[]], $, logical indexing, negative indexing' },
      ],
      files: [
        { name: '2_questions.pdf', type: 'pdf', role: 'lecture', path: 'Intro to Data Science/Week 2/2_questions.pdf' },
        { name: 'Chapter 2.docx', type: 'docx', role: 'lecture', path: 'Intro to Data Science/Week 2/Chapter 2.docx' },
        { name: 'Practical 2.docx', type: 'docx', role: 'lab', path: 'Intro to Data Science/Week 2/Practical 2.docx' },
        { name: '02_practical (1).Rmd', type: 'rmd', role: 'lab', path: 'Intro to Data Science/Week 2/02_practical (1).Rmd' },
      ],
    },
    {
      week: 3,
      title: 'Data Collection & Sampling',
      topics: [
        { id: 'ids-w3-t1', title: 'Population vs sample', tier: 2, status: 'not-started', description: 'Parameters vs statistics, representative samples, bias' },
        { id: 'ids-w3-t2', title: 'Sampling methods', tier: 2, status: 'not-started', description: 'Simple random, stratified, cluster, systematic sampling' },
        { id: 'ids-w3-t3', title: 'Data frames', tier: 1, status: 'not-started', description: 'data.frame(), read.csv(), head(), str(), summary(), nrow(), ncol()' },
      ],
      files: [
        { name: '3_data_collection_and_sampling.pdf', type: 'pdf', role: 'lecture', path: 'Intro to Data Science/Week 3/3_data_collection_and_sampling.pdf' },
        { name: 'Chapter 3.docx', type: 'docx', role: 'lecture', path: 'Intro to Data Science/Week 3/Chapter 3.docx' },
        { name: 'Practical 3.docx', type: 'docx', role: 'lab', path: 'Intro to Data Science/Week 3/Practical 3.docx' },
        { name: '03_practical (1).Rmd', type: 'rmd', role: 'lab', path: 'Intro to Data Science/Week 3/03_practical (1).Rmd' },
      ],
    },
    {
      week: 4,
      title: 'Data Wrangling with dplyr',
      topics: [
        { id: 'ids-w4-t1', title: 'tidyverse & pipes', tier: 1, status: 'not-started', description: 'Loading tidyverse, %>% pipe operator, |> native pipe' },
        { id: 'ids-w4-t2', title: 'dplyr filter/select/mutate', tier: 1, status: 'not-started', description: 'filter() rows, select() columns, mutate() new variables' },
        { id: 'ids-w4-t3', title: 'arrange/group_by/summarise', tier: 1, status: 'not-started', description: 'Sorting, grouped summaries, n(), across()' },
        { id: 'ids-w4-t4', title: 'joins', tier: 1, status: 'not-started', description: 'left_join, right_join, inner_join, full_join, anti_join' },
      ],
      files: [
        { name: 'Chapter 4.docx', type: 'docx', role: 'lecture', path: 'Intro to Data Science/Week 4/Chapter 4.docx' },
        { name: 'Practical 4.docx', type: 'docx', role: 'lab', path: 'Intro to Data Science/Week 4/Practical 4.docx' },
        { name: '04_practical (1).Rmd', type: 'rmd', role: 'lab', path: 'Intro to Data Science/Week 4/04_practical (1).Rmd' },
      ],
    },
    {
      week: 5,
      title: 'Summary Statistics',
      topics: [
        { id: 'ids-w5-t1', title: 'Mean / median / SD', tier: 1, status: 'not-started', description: 'Measures of central tendency and spread, when to use each' },
        { id: 'ids-w5-t2', title: 'Summary statistics in R', tier: 1, status: 'not-started', description: 'mean(), median(), sd(), var(), IQR(), quantile(), summary()' },
        { id: 'ids-w5-t3', title: 'Distribution shape', tier: 2, status: 'not-started', description: 'Skewness, kurtosis, symmetric vs skewed distributions' },
      ],
      files: [
        { name: '5_summary_statistics.pdf', type: 'pdf', role: 'lecture', path: 'Intro to Data Science/Week 5/5_summary_statistics.pdf' },
        { name: 'Chapter 5.docx', type: 'docx', role: 'lecture', path: 'Intro to Data Science/Week 5/Chapter 5.docx' },
        { name: 'Practical 5.docx', type: 'docx', role: 'lab', path: 'Intro to Data Science/Week 5/Practical 5.docx' },
        { name: '05_practical.Rmd.txt', type: 'txt', role: 'lab', path: 'Intro to Data Science/Week 5/05_practical.Rmd.txt' },
      ],
    },
    {
      week: 6,
      title: 'Dates, Strings & Factors',
      topics: [
        { id: 'ids-w6-t1', title: 'lubridate dates', tier: 2, status: 'not-started', description: 'Parsing dates with ymd/dmy/mdy, extracting year/month/day' },
        { id: 'ids-w6-t2', title: 'stringr', tier: 2, status: 'not-started', description: 'str_detect, str_replace, str_sub, str_split, str_length' },
        { id: 'ids-w6-t3', title: 'factors', tier: 2, status: 'not-started', description: 'Creating factors, setting levels, forcats package basics' },
        { id: 'ids-w6-t4', title: 'tidyr pivot', tier: 1, status: 'not-started', description: 'pivot_longer(), pivot_wider(), reshaping data' },
        { id: 'ids-w6-t5', title: 'missing values', tier: 1, status: 'not-started', description: 'NA handling, is.na(), na.omit(), drop_na(), replace_na()' },
      ],
      files: [
        { name: 'Chapter 6.docx', type: 'docx', role: 'lecture', path: 'Intro to Data Science/Week 6/Chapter 6.docx' },
        { name: 'Practical 6.docx', type: 'docx', role: 'lab', path: 'Intro to Data Science/Week 6/Practical 6.docx' },
        { name: '06_practical.Rmd.txt', type: 'txt', role: 'lab', path: 'Intro to Data Science/Week 6/06_practical.Rmd.txt' },
        { name: 'lotr_characters (2).csv', type: 'csv', role: 'data', path: 'Intro to Data Science/Week 6/lotr_characters (2).csv' },
      ],
    },
    {
      week: 7,
      title: 'Data Visualisation with ggplot2',
      topics: [
        { id: 'ids-w7-t1', title: 'Grammar of graphics', tier: 1, status: 'not-started', description: 'Layered framework: data, aesthetics, geometries, statistics, scales' },
        { id: 'ids-w7-t2', title: 'ggplot2 aes/geom', tier: 1, status: 'not-started', description: 'ggplot(), aes(), adding layers with +, common geoms' },
        { id: 'ids-w7-t3', title: 'scatter/line/bar/histogram/boxplot', tier: 1, status: 'not-started', description: 'geom_point, geom_line, geom_col, geom_histogram, geom_boxplot' },
        { id: 'ids-w7-t4', title: 'facets', tier: 2, status: 'not-started', description: 'facet_wrap(), facet_grid() for small multiples' },
      ],
      files: [
        { name: '7_some_plot_types.pdf', type: 'pdf', role: 'lecture', path: 'Intro to Data Science/Week 7/7_some_plot_types.pdf' },
        { name: 'Chapter 7.docx', type: 'docx', role: 'lecture', path: 'Intro to Data Science/Week 7/Chapter 7.docx' },
        { name: 'Practical 7.docx', type: 'docx', role: 'lab', path: 'Intro to Data Science/Week 7/Practical 7.docx' },
        { name: '07_practical (2).Rmd', type: 'rmd', role: 'lab', path: 'Intro to Data Science/Week 7/07_practical (2).Rmd' },
      ],
    },
    {
      week: 8,
      title: 'Advanced ggplot2',
      topics: [
        { id: 'ids-w8-t1', title: 'Scales and coordinates', tier: 2, status: 'not-started', description: 'scale_x_*, scale_colour_*, coord_flip(), coord_cartesian()' },
        { id: 'ids-w8-t2', title: 'Labels and annotations', tier: 2, status: 'not-started', description: 'labs(), annotate(), geom_text(), geom_label()' },
        { id: 'ids-w8-t3', title: 'Themes', tier: 2, status: 'not-started', description: 'theme_minimal(), theme_classic(), theme() customisation' },
        { id: 'ids-w8-t4', title: 'Legends', tier: 2, status: 'not-started', description: 'Controlling legend position, title, keys, guides()' },
      ],
      files: [
        { name: 'Chapter 8.docx', type: 'docx', role: 'lecture', path: 'Intro to Data Science/Week 8/Chapter 8.docx' },
        { name: 'Practical 8.docx', type: 'docx', role: 'lab', path: 'Intro to Data Science/Week 8/Practical 8.docx' },
        { name: '08_practical (1).Rmd', type: 'rmd', role: 'lab', path: 'Intro to Data Science/Week 8/08_practical (1).Rmd' },
      ],
    },
    {
      week: 9,
      title: 'tidyr & Data Reshaping',
      topics: [
        { id: 'ids-w9-t1', title: 'pivot_longer', tier: 1, status: 'not-started', description: 'Wide to long: pivot_longer(cols, names_to, values_to)' },
        { id: 'ids-w9-t2', title: 'pivot_wider', tier: 1, status: 'not-started', description: 'Long to wide: pivot_wider(names_from, values_from)' },
        { id: 'ids-w9-t3', title: 'Missing values handling', tier: 1, status: 'not-started', description: 'Complete cases, fill(), replace_na(), values_fill in pivot_wider' },
      ],
      files: [
        { name: 'Chapter 9.docx', type: 'docx', role: 'lecture', path: 'Intro to Data Science/Week 9/Chapter 9.docx' },
        { name: 'Practical 9.docx', type: 'docx', role: 'lab', path: 'Intro to Data Science/Week 9/Practical 9.docx' },
        { name: '09_practical (1).Rmd', type: 'rmd', role: 'lab', path: 'Intro to Data Science/Week 9/09_practical (1).Rmd' },
      ],
    },
    {
      week: 10,
      title: 'Good vs Bad Visualisation',
      topics: [
        { id: 'ids-w10-t1', title: 'Figure critique', tier: 1, status: 'not-started', description: 'Framework for evaluating data visualisations critically' },
        { id: 'ids-w10-t2', title: 'Good vs bad visualisation principles', tier: 1, status: 'not-started', description: 'Data-ink ratio, chartjunk, Tufte\'s principles, clarity vs complexity' },
        { id: 'ids-w10-t3', title: 'Misleading graphs', tier: 1, status: 'not-started', description: 'Truncated axes, dual axes, cherry-picked scales, area distortion' },
      ],
      files: [
        { name: '10_good_vs_bad_graphs.pdf', type: 'pdf', role: 'lecture', path: 'Intro to Data Science/Week 10/10_good_vs_bad_graphs.pdf' },
        { name: 'Chapter 10.docx', type: 'docx', role: 'lecture', path: 'Intro to Data Science/Week 10/Chapter 10.docx' },
      ],
    },
  ],
};
