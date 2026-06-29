export type ExamModule = 'db' | 'ids';
export type ExamDifficulty = 'Foundation' | 'Exam Standard' | 'Distinction Challenge';

export interface ExamSubQuestion {
  label: string;
  prompt: string;
  marks: number;
  topic: string;
  learningOutcome: string;
  modelAnswer: string;
  alternativeAnswers?: string[];
  commonMistakes: string[];
  examinerComment: string;
  highDistinction?: string;
  sourceMap: string;
}

export interface ExamQuestion {
  id: string;
  title: string;
  context: string;
  marks: number;
  subQuestions: ExamSubQuestion[];
}

export interface GeneratedExam {
  id: string;
  module: ExamModule;
  moduleTitle: string;
  code: string;
  title: string;
  difficulty: ExamDifficulty;
  duration: string;
  totalMarks: number;
  scenario: string;
  instructions: string[];
  questions: ExamQuestion[];
}

export interface ExaminerReport {
  title: string;
  points: string[];
}

const dbScenarios = [
  'clinical research trial allocation',
  'regional library reading-list service',
  'online grocery fulfilment',
  'university room-booking office',
  'sports centre membership platform',
  'museum exhibition loan system',
  'airport maintenance scheduling',
  'renewable energy grant portfolio',
  'student placement coordination',
  'concert venue ticketing',
  'local authority inspection records',
  'pharmacy stock control',
  'academic conference reviewing',
  'vehicle hire operations',
  'hospital ward staffing',
];

const idsScenarios = [
  'bike hire demand',
  'campus energy use',
  'library gate counts',
  'student wellbeing survey',
  'online course engagement',
  'restaurant hygiene visits',
  'public transport delays',
  'sports participation logs',
  'air quality monitoring',
  'retail basket summaries',
  'museum visitor feedback',
  'GP appointment waiting times',
  'weather and footfall',
  'graduate destinations',
  'city park usage',
];

const dbDifficulty = (index: number): ExamDifficulty =>
  index % 3 === 1 ? 'Foundation' : index % 3 === 2 ? 'Exam Standard' : 'Distinction Challenge';

const idsDifficulty = dbDifficulty;

function dbSchema(index: number) {
  const prefix = ['Trial', 'Book', 'Order', 'Room', 'Member', 'Object', 'Aircraft', 'Grant', 'Placement', 'Event', 'Inspection', 'Medicine', 'Paper', 'Vehicle', 'Ward'][index - 1];
  return {
    prefix,
    main: `${prefix}Item`,
    org: `${prefix}Unit`,
    person: `${prefix}Person`,
  };
}

function makeDbExam(index: number): GeneratedExam {
  const difficulty = dbDifficulty(index);
  const scenario = dbScenarios[index - 1];
  const names = dbSchema(index);
  const challenge = difficulty === 'Distinction Challenge';
  const totalMarks = challenge ? 100 : 90;

  return {
    id: `db-mock-${String(index).padStart(2, '0')}`,
    module: 'db',
    moduleTitle: 'Database Systems',
    code: '25COP502',
    title: `Database Systems Mock ${String(index).padStart(2, '0')}`,
    difficulty,
    duration: challenge ? '2 hours 15 minutes' : '2 hours',
    totalMarks,
    scenario,
    instructions: [
      'Answer all questions.',
      'State reasonable assumptions where the business rules are ambiguous.',
      'SQL answers may use standard SQL; minor dialect differences are acceptable if the intent is clear.',
    ],
    questions: [
      {
        id: 'q1',
        title: 'SQL querying and data modification',
        context: `A database is used for a ${scenario}. Consider the schema ${names.org}(unitID, unitName, region), ${names.main}(itemID, itemName, unitID, budget, status), ${names.person}(personID, name, role, hourlyRate), Assignment(personID, itemID, percentTime), Location(itemID, siteName, hoursAllocated). Primary keys are the first attributes unless a relationship table has an obvious composite key.`,
        marks: 30,
        subQuestions: [
          {
            label: 'a',
            prompt: `For each unit, return the unit name and the total budget of active ${names.main} records assigned to it. Units with no active records must appear with total budget 0.`,
            marks: 6,
            topic: 'SQL outer join, grouping, NULL handling',
            learningOutcome: 'Write SQL queries using joins, grouping and aggregate functions.',
            modelAnswer: `SELECT u.unitName, COALESCE(SUM(i.budget), 0) AS total_budget
FROM ${names.org} u
LEFT JOIN ${names.main} i
  ON i.unitID = u.unitID
 AND i.status = 'active'
GROUP BY u.unitID, u.unitName
ORDER BY u.unitName;`,
            alternativeAnswers: ['A CASE expression around SUM is acceptable if NULL totals become 0.'],
            commonMistakes: ['Putting i.status in WHERE, which turns the LEFT JOIN into an inner join.', 'Grouping only by unitName where unit names may not be unique.'],
            examinerComment: 'The key mark is preserving unmatched units while filtering active rows.',
            highDistinction: 'Explains why the active filter belongs in the join predicate.',
            sourceMap: 'Weeks 2-4 SQL joins, aggregate functions and HAVING/NULL handling.',
          },
          {
            label: 'b',
            prompt: `List people who are assigned to every ${names.main} item in their own unit.`,
            marks: 7,
            topic: 'Correlated subqueries and NOT EXISTS',
            learningOutcome: 'Express universal quantification in SQL.',
            modelAnswer: `SELECT p.personID, p.name
FROM ${names.person} p
WHERE NOT EXISTS (
  SELECT 1
  FROM ${names.main} i
  WHERE NOT EXISTS (
    SELECT 1
    FROM Assignment a
    WHERE a.personID = p.personID
      AND a.itemID = i.itemID
  )
);`,
            alternativeAnswers: ['A division-style GROUP BY/HAVING solution is valid if it correctly handles duplicate assignments.'],
            commonMistakes: ['Using IN when the question requires all items.', 'Forgetting the second NOT EXISTS.'],
            examinerComment: 'This tests the same pattern as relational division without relying on a division operator.',
            highDistinction: 'Mentions the empty-set edge case and states an assumption if relevant.',
            sourceMap: 'Weeks 5-6 nested subqueries, EXISTS and universal quantification.',
          },
          {
            label: 'c',
            prompt: `Increase the budget by 8 percent for all items whose status is 'approved' and whose current budget is below 75000.`,
            marks: 4,
            topic: 'SQL DML',
            learningOutcome: 'Write data modification statements safely.',
            modelAnswer: `UPDATE ${names.main}
SET budget = budget * 1.08
WHERE status = 'approved'
  AND budget < 75000;`,
            commonMistakes: ['Omitting the WHERE clause.', 'Adding 8 rather than multiplying by 1.08.'],
            examinerComment: 'A short DML question, but accuracy matters.',
            sourceMap: 'SQL practical sheets on update statements.',
          },
          {
            label: 'd',
            prompt: `Create a view named UnitWorkload showing unitID, unitName, number of assigned people and average percentTime for each unit.`,
            marks: 5,
            topic: 'SQL views and joins',
            learningOutcome: 'Define reusable SQL views over joined relations.',
            modelAnswer: `CREATE VIEW UnitWorkload AS
SELECT u.unitID, u.unitName,
       COUNT(DISTINCT a.personID) AS assigned_people,
       AVG(a.percentTime) AS avg_percent_time
FROM ${names.org} u
JOIN ${names.main} i ON i.unitID = u.unitID
LEFT JOIN Assignment a ON a.itemID = i.itemID
GROUP BY u.unitID, u.unitName;`,
            commonMistakes: ['Counting assignments rather than distinct people.', 'Missing GROUP BY attributes.'],
            examinerComment: 'Views are assessed through practical SQL rather than definition recall.',
            sourceMap: 'Advanced SQL lecture and SQL labs.',
          },
          {
            label: 'e',
            prompt: 'Explain in plain English what the query in part (b) achieves, avoiding a line-by-line translation.',
            marks: 3,
            topic: 'SQL interpretation',
            learningOutcome: 'Interpret SQL semantics in a business context.',
            modelAnswer: `It returns people for whom there is no item that lacks an assignment row for that person; in other words, people assigned to all items considered by the query.`,
            commonMistakes: ['Saying only that it checks whether a row exists.', 'Ignoring the double negative.'],
            examinerComment: 'The official mock uses this exact skill: meaningful interpretation, not syntax narration.',
            sourceMap: 'Official Database Systems mock question style.',
          },
          {
            label: 'f',
            prompt: 'State one index that would support the workload above and justify it.',
            marks: 5,
            topic: 'Indexes',
            learningOutcome: 'Recommend indexes for common query predicates and joins.',
            modelAnswer: `An index on Assignment(itemID, personID) supports joins from items to assignments and the NOT EXISTS lookup by itemID/personID. An index on ${names.main}(status, unitID) would also support filtering active or approved items before grouping by unit.`,
            alternativeAnswers: ['Other justified composite indexes receive credit if tied to a query predicate or join.'],
            commonMistakes: ['Suggesting an index on every column.', 'Not linking the index to a query pattern.'],
            examinerComment: 'Index answers must be workload-driven.',
            sourceMap: 'Performance discussion in SQL and transactions material.',
          },
        ],
      },
      {
        id: 'q2',
        title: 'ER modelling and relational design',
        context: `Design a database for the ${scenario}. The system records organisational units, staff, items of work, locations, and dated responsibility assignments. One staff member may support many items; each item must have exactly one lead staff member at any point in time.`,
        marks: 25,
        subQuestions: [
          {
            label: 'a',
            prompt: 'Describe an ER design with entities, relationships, cardinalities, participation constraints and assumptions.',
            marks: 12,
            topic: 'ER modelling',
            learningOutcome: 'Construct ER models from a natural-language specification.',
            modelAnswer: 'Entities: Unit, Staff, WorkItem, Site. Relationships: Unit owns WorkItem (1:N, total on WorkItem); Staff assigned to WorkItem (M:N with startDate, endDate, percentTime); Staff leads WorkItem (1:N over time, total on WorkItem, constrained so one active lead at a time); WorkItem uses Site (M:N with hoursAllocated). Assumptions should state how overlapping date ranges are prevented.',
            commonMistakes: ['Duplicating staff attributes in lead and support relationships.', 'Not modelling the date interval on responsibility relationships.', 'Missing total participation for each work item.'],
            examinerComment: 'The strongest answers separate staff from their roles and make time constraints explicit.',
            highDistinction: 'Identifies that one-active-lead-at-a-time usually requires an assertion or trigger, not just a foreign key.',
            sourceMap: 'Weeks 5 and 7 ER diagrams and ER-to-relational mapping.',
          },
          {
            label: 'b',
            prompt: 'Translate the design into relational schemas, naming primary keys, foreign keys, check constraints, indexes and triggers.',
            marks: 13,
            topic: 'ER to relational mapping',
            learningOutcome: 'Map ER models into relational schemas with integrity constraints.',
            modelAnswer: `Unit(unitID PK, unitName, region)
Staff(staffID PK, name, role, hourlyRate CHECK hourlyRate >= 0)
WorkItem(itemID PK, itemName, unitID FK Unit, budget CHECK budget >= 0, status)
Site(siteID PK, siteName, building)
Assignment(staffID FK Staff, itemID FK WorkItem, startDate, endDate, percentTime CHECK percentTime BETWEEN 0 AND 100, PK(staffID,itemID,startDate))
LeadAssignment(itemID FK WorkItem, staffID FK Staff, startDate, endDate, PK(itemID,startDate))
WorkItemSite(itemID FK WorkItem, siteID FK Site, hoursAllocated CHECK hoursAllocated >= 0, PK(itemID,siteID))
Indexes: Assignment(itemID), LeadAssignment(staffID,startDate,endDate), WorkItem(unitID,status). Trigger/assertion: no overlapping active lead per item and no staff member leading incompatible items if stated by the assumptions.`,
            commonMistakes: ['Using a single currentLead column and losing history.', 'Failing to create junction tables for M:N relationships.', 'Listing constraints without saying where they apply.'],
            examinerComment: 'Plain English constraints are acceptable where SQL syntax would be lengthy.',
            sourceMap: 'ER-to-relational lab and official mock Q2 style.',
          },
        ],
      },
      {
        id: 'q3',
        title: 'Functional dependencies and normalisation',
        context: `A flat table WorkRecord(itemID, itemName, unitID, unitName, staffID, staffName, role, siteName, building, leadStaffID) is proposed for the ${scenario}. Assume itemID -> itemName, unitID, leadStaffID; unitID -> unitName; staffID -> staffName, role; siteName -> building; and itemID, staffID -> siteName.`,
        marks: 25,
        subQuestions: [
          {
            label: 'a',
            prompt: 'Give two examples of redundancy and two possible update or delete anomalies in the proposed table.',
            marks: 6,
            topic: 'Redundancy and anomalies',
            learningOutcome: 'Explain anomalies caused by poor relational design.',
            modelAnswer: 'Redundancy: unitName repeats for every item in the same unit; staffName and role repeat for every staff assignment. Update anomaly: renaming a unit requires many rows to be changed. Delete anomaly: deleting the last assignment for a staff member may remove the only stored staff details. A site building change may also require many updates.',
            commonMistakes: ['Only saying "there is duplication" without a concrete attribute.', 'Confusing delete anomaly with accidental deletion by a user.'],
            examinerComment: 'Examples should use the actual attributes, as in the official mock.',
            sourceMap: 'Weeks 8-10 normalisation material.',
          },
          {
            label: 'b',
            prompt: 'Find a candidate key for WorkRecord and show the closure calculation.',
            marks: 6,
            topic: 'Attribute closure and candidate keys',
            learningOutcome: 'Use closure to identify keys.',
            modelAnswer: '{itemID, staffID}+ gives itemName, unitID, leadStaffID from itemID; unitName from unitID; staffName and role from staffID; siteName from itemID,staffID; building from siteName. Therefore it determines all attributes. Neither itemID nor staffID alone determines all attributes, so {itemID, staffID} is a candidate key.',
            commonMistakes: ['Forgetting derived attributes such as building.', 'Claiming itemID alone is a key despite multiple staff assignments.'],
            examinerComment: 'Closures must be explicit enough for the marker to follow.',
            sourceMap: 'Week 8 tutorial on functional dependencies and keys.',
          },
          {
            label: 'c',
            prompt: 'Is the relation in BCNF? If not, decompose it into BCNF and state why the decomposition is lossless.',
            marks: 10,
            topic: 'BCNF and lossless decomposition',
            learningOutcome: 'Decompose relations into BCNF using functional dependencies.',
            modelAnswer: `It is not in BCNF because determinants such as unitID, staffID and siteName are not superkeys. A valid BCNF decomposition is:
Item(itemID, itemName, unitID, leadStaffID)
Unit(unitID, unitName)
Staff(staffID, staffName, role)
Site(siteName, building)
ItemStaffSite(itemID, staffID, siteName)
Each step is lossless because the common attribute is a key for one decomposed relation: unitID -> unitName, staffID -> staffName role, siteName -> building, and itemID -> itemName unitID leadStaffID.`,
            commonMistakes: ['Producing 3NF only and not checking determinants.', 'Not giving any lossless-join argument.'],
            examinerComment: 'Several equivalent decompositions can earn full credit if they are BCNF and lossless.',
            highDistinction: 'Comments on dependency preservation as a separate property from losslessness.',
            sourceMap: 'Weeks 9-10 2NF, 3NF, BCNF and lossless decomposition.',
          },
          {
            label: 'd',
            prompt: 'State whether the decomposition preserves all listed dependencies.',
            marks: 3,
            topic: 'Dependency preservation',
            learningOutcome: 'Distinguish lossless join from dependency preservation.',
            modelAnswer: 'The listed dependencies are preserved because each FD appears within one of the decomposed relations: itemID dependencies in Item, unitID in Unit, staffID in Staff, siteName in Site, and itemID,staffID -> siteName in ItemStaffSite.',
            commonMistakes: ['Answering "yes because it is lossless".', 'Not checking each dependency.'],
            examinerComment: 'This short part separates two concepts often conflated by students.',
            sourceMap: 'Week 10 dependency preservation.',
          },
        ],
      },
      {
        id: 'q4',
        title: 'Transactions, isolation and serialisability',
        context: `Two clerks update records in the ${scenario} system. Consider schedule S: T1:R(A), T2:R(A), T1:W(A), T3:R(B), T2:W(A), T1:R(B), T3:W(B), T2:W(C).`,
        marks: challenge ? 20 : 10,
        subQuestions: [
          {
            label: 'a',
            prompt: 'Identify the conflicting operation pairs and draw the precedence graph.',
            marks: challenge ? 8 : 4,
            topic: 'Conflict serialisability',
            learningOutcome: 'Build precedence graphs from schedules.',
            modelAnswer: 'Conflicts on A: T2:R(A) before T1:W(A) gives T2 -> T1; T1:R(A) before T2:W(A) gives T1 -> T2; T1:W(A) before T2:W(A) gives T1 -> T2. Conflicts on B: T3:R(B) before T1:R(B) is not a conflict; T1:R(B) before T3:W(B) gives T1 -> T3. The graph contains T1 -> T2, T2 -> T1 and T1 -> T3.',
            commonMistakes: ['Treating read-read as a conflict.', 'Drawing an edge in the order transactions commit rather than operation order.'],
            examinerComment: 'Operation order is the basis of every edge.',
            sourceMap: 'Week 11 concurrency and precedence graph examples.',
          },
          {
            label: 'b',
            prompt: 'Is the schedule conflict-serialisable? Explain.',
            marks: challenge ? 4 : 2,
            topic: 'Serialisability',
            learningOutcome: 'Use graph cycles to determine conflict serialisability.',
            modelAnswer: 'No. The graph has a cycle T1 -> T2 -> T1, so there is no equivalent serial schedule under conflict serialisability.',
            commonMistakes: ['Providing a serial order despite a cycle.', 'Saying not serialisable without naming the cycle.'],
            examinerComment: 'The conclusion must follow from the graph.',
            sourceMap: 'Week 11 serialisability.',
          },
          {
            label: 'c',
            prompt: 'Name the ACID property most directly concerned with concurrent transactions not interfering, and distinguish it from atomicity.',
            marks: challenge ? 4 : 2,
            topic: 'ACID',
            learningOutcome: 'Explain transaction properties accurately.',
            modelAnswer: 'Isolation is concerned with concurrent transactions not interfering and appearing as if executed serially. Atomicity is all-or-nothing execution of a single transaction: either all its operations take effect or none do.',
            commonMistakes: ['Using consistency as a vague synonym for isolation.', 'Defining atomicity as durability.'],
            examinerComment: 'Precise definitions matter in short theory questions.',
            sourceMap: 'Week 10 transactions and ACID.',
          },
          {
            label: 'd',
            prompt: challenge ? 'Give one realistic deadlock pattern in this system and one recovery action.' : 'State the lowest isolation level that prevents dirty reads.',
            marks: challenge ? 4 : 2,
            topic: 'Isolation and recovery',
            learningOutcome: 'Connect isolation anomalies to DBMS controls.',
            modelAnswer: challenge
              ? 'Deadlock example: T1 locks item A then waits for item B, while T2 locks item B then waits for item A. A DBMS can detect the wait-for cycle, abort one victim transaction, roll it back, release its locks and allow the other transaction to proceed.'
              : 'READ COMMITTED prevents dirty reads because a transaction cannot read another transaction\'s uncommitted writes.',
            commonMistakes: ['Confusing dirty read with non-repeatable read.', 'Suggesting manual table editing as recovery.'],
            examinerComment: 'The answer should name the anomaly or lock pattern, not just say "use transactions".',
            sourceMap: 'Weeks 10-11 isolation levels, deadlocks and recovery.',
          },
        ],
      },
    ],
  };
}

function makeIdsExam(index: number): GeneratedExam {
  const difficulty = idsDifficulty(index);
  const scenario = idsScenarios[index - 1];
  const challenge = difficulty === 'Distinction Challenge';
  const dataset = ['trips', 'energy', 'visits', 'survey', 'engagement', 'inspections', 'delays', 'sessions', 'air', 'baskets', 'feedback', 'appointments', 'footfall', 'destinations', 'parks'][index - 1];

  return {
    id: `ids-mock-${String(index).padStart(2, '0')}`,
    module: 'ids',
    moduleTitle: 'Introduction to Data Science',
    code: '25MAP500',
    title: `Introduction to Data Science Mock ${String(index).padStart(2, '0')}`,
    difficulty,
    duration: challenge ? '1 hour 45 minutes' : '1.5 hours',
    totalMarks: challenge ? 80 : 70,
    scenario,
    instructions: [
      'Answer all questions.',
      'No calculator is required.',
      'Where R code is requested, tidyverse solutions are acceptable unless a base R function is explicitly requested.',
    ],
    questions: [
      {
        id: 'q1',
        title: 'Data science concepts, sampling and reproducibility',
        context: `A small research team is studying ${scenario}. The data frame is called ${dataset} and contains dated observations, categorical groups and numerical measurements.`,
        marks: 18,
        subQuestions: [
          {
            label: 'a',
            prompt: 'Explain why data science is interdisciplinary, using this study as an example.',
            marks: 4,
            topic: 'Data science workflow',
            learningOutcome: 'Describe the interdisciplinary nature of data science.',
            modelAnswer: `It combines statistical thinking to design and interpret the analysis, computing skills to clean and process the ${dataset} data, and domain knowledge about ${scenario} to ask useful questions and avoid misleading conclusions.`,
            commonMistakes: ['Listing disciplines without connecting them to the study.', 'Treating data science as only programming.'],
            examinerComment: 'The official mock rewards concise explanation tied to an example.',
            sourceMap: 'Week 1 what is data science.',
          },
          {
            label: 'b',
            prompt: 'State the difference between a population and a sample, and name three sampling methods.',
            marks: 5,
            topic: 'Sampling',
            learningOutcome: 'Explain sampling terminology and methods.',
            modelAnswer: 'The population is the complete group of interest; a sample is the subset actually observed. Valid examples include simple random sampling, systematic sampling, stratified sampling and cluster sampling.',
            commonMistakes: ['Calling the sample "the average".', 'Naming data collection tools rather than sampling methods.'],
            examinerComment: 'Definitions should be short and exact.',
            sourceMap: 'Week 3 data collection and sampling.',
          },
          {
            label: 'c',
            prompt: 'Why should a numerical variable normally be summarised with both a mean and a standard deviation?',
            marks: 4,
            topic: 'Summary statistics',
            learningOutcome: 'Interpret measures of centre and spread.',
            modelAnswer: 'The mean describes central tendency, while the standard deviation describes variability around that mean. Two groups can have similar means but very different spread, so the mean alone can hide important structure.',
            commonMistakes: ['Saying standard deviation is another average.', 'Ignoring variability.'],
            examinerComment: 'This mirrors the official mock but uses broader phrasing.',
            sourceMap: 'Week 5 summary statistics.',
          },
          {
            label: 'd',
            prompt: 'Describe a recommended R project folder structure for this study.',
            marks: 5,
            topic: 'Reproducibility',
            learningOutcome: 'Organise files for reproducible analysis.',
            modelAnswer: 'A sensible project has data/ for raw or processed data, scripts/ or R/ for analysis code, rmd/ or reports/ for R Markdown reports, figures/ for generated graphics, and a project file or README describing how to run the work.',
            commonMistakes: ['Saving all files in one folder.', 'Overwriting raw data without keeping a clean original.'],
            examinerComment: 'Folder names may vary; the purpose of each folder matters.',
            sourceMap: 'Weeks 1-2 RStudio projects and reproducibility.',
          },
        ],
      },
      {
        id: 'q2',
        title: 'R coding and data wrangling',
        context: `The data frame ${dataset} has columns id, date, group, value, score, status and notes. Dates are stored as character strings in the form "2026-02-14".`,
        marks: 22,
        subQuestions: [
          {
            label: 'a',
            prompt: `Write R code using dplyr to keep rows where status is "complete", select date, group and value, create value_per_score = value / score, and arrange by value_per_score descending.`,
            marks: 6,
            topic: 'dplyr filter/select/mutate/arrange',
            learningOutcome: 'Use core tidyverse verbs for data wrangling.',
            modelAnswer: `${dataset} %>%
  filter(status == "complete") %>%
  select(date, group, value, score) %>%
  mutate(value_per_score = value / score) %>%
  arrange(desc(value_per_score))`,
            alternativeAnswers: ['The native pipe |> is acceptable if the function calls are correct.'],
            commonMistakes: ['Using = instead of == inside filter().', 'Selecting away score before mutate() needs it.', 'Forgetting desc().'],
            examinerComment: 'Order matters because score is needed for the new column.',
            sourceMap: 'Week 4 dplyr practical.',
          },
          {
            label: 'b',
            prompt: `Write R code to compute the number of observations, mean value and standard deviation of value for each group.`,
            marks: 5,
            topic: 'group_by and summarise',
            learningOutcome: 'Calculate grouped summaries in R.',
            modelAnswer: `${dataset} %>%
  group_by(group) %>%
  summarise(
    n = n(),
    mean_value = mean(value, na.rm = TRUE),
    sd_value = sd(value, na.rm = TRUE),
    .groups = "drop"
  )`,
            commonMistakes: ['Omitting na.rm = TRUE when missing values are possible.', 'Using summary() when grouped output is required.'],
            examinerComment: 'Marks are for grouping, correct summaries and missing-value handling.',
            sourceMap: 'Weeks 4-5 dplyr and summary statistics.',
          },
          {
            label: 'c',
            prompt: `The data has columns morning_value, afternoon_value and evening_value. Reshape it to columns period and value.`,
            marks: 4,
            topic: 'pivot_longer',
            learningOutcome: 'Reshape data from wide to long format.',
            modelAnswer: `${dataset} %>%
  pivot_longer(
    cols = c(morning_value, afternoon_value, evening_value),
    names_to = "period",
    values_to = "value"
  )`,
            commonMistakes: ['Using pivot_wider() for a wide-to-long task.', 'Not naming both output columns.'],
            examinerComment: 'The official mock asks for the function and why; this version asks for usable code.',
            sourceMap: 'Weeks 6 and 9 tidyr pivoting.',
          },
          {
            label: 'd',
            prompt: `Parse the date column using lubridate and create a month column.`,
            marks: 4,
            topic: 'lubridate',
            learningOutcome: 'Parse and transform dates in R.',
            modelAnswer: `${dataset} %>%
  mutate(
    date = ymd(date),
    month = month(date, label = TRUE)
  )`,
            commonMistakes: ['Using dmy() for a year-month-day string.', 'Leaving date as character before extracting month.'],
            examinerComment: 'The parsing function must match the input format.',
            sourceMap: 'Week 6 dates with lubridate.',
          },
          {
            label: 'e',
            prompt: `Use stringr to identify rows where notes contains the word "urgent" regardless of case.`,
            marks: 3,
            topic: 'stringr',
            learningOutcome: 'Use string functions for text filtering.',
            modelAnswer: `${dataset} %>%
  filter(str_detect(notes, regex("urgent", ignore_case = TRUE)))`,
            commonMistakes: ['Using == "urgent", which misses longer notes.', 'Ignoring case sensitivity.'],
            examinerComment: 'This is a small but realistic text-cleaning task.',
            sourceMap: 'Week 6 stringr.',
          },
        ],
      },
      {
        id: 'q3',
        title: 'Visualisation and interpretation',
        context: `The team wants to communicate trends in ${scenario} over time and differences between groups.`,
        marks: 18,
        subQuestions: [
          {
            label: 'a',
            prompt: `Write ggplot2 code for a line chart of value against date, coloured by group, with clear axis labels and a title.`,
            marks: 6,
            topic: 'ggplot2 line charts',
            learningOutcome: 'Create suitable visualisations using ggplot2.',
            modelAnswer: `ggplot(${dataset}, aes(x = date, y = value, colour = group)) +
  geom_line() +
  labs(
    title = "${scenario.charAt(0).toUpperCase() + scenario.slice(1)} over time",
    x = "Date",
    y = "Value",
    colour = "Group"
  ) +
  theme_minimal()`,
            alternativeAnswers: ['geom_point() plus geom_line() is acceptable if the trend remains clear.'],
            commonMistakes: ['Putting colour outside aes() when mapping groups.', 'Missing labels.'],
            examinerComment: 'The plot type should match a temporal trend.',
            sourceMap: 'Weeks 7-8 ggplot2.',
          },
          {
            label: 'b',
            prompt: 'A chart uses a truncated y-axis and overlapping x-axis labels. Explain why this is problematic and give two improvements.',
            marks: 5,
            topic: 'Graph critique',
            learningOutcome: 'Critically evaluate visualisations.',
            modelAnswer: 'A truncated y-axis can exaggerate differences, while overlapping labels make categories hard to read. Improvements include starting the y-axis at a sensible baseline where appropriate, using coord_cartesian only when clearly signposted, rotating or shortening labels, changing to a line chart for time series, or using facets to reduce clutter.',
            commonMistakes: ['Saying only that it looks untidy.', 'Changing colours without addressing the misleading scale.'],
            examinerComment: 'Critique must connect design choices to interpretation.',
            sourceMap: 'Week 10 good vs bad graphs.',
          },
          {
            label: 'c',
            prompt: 'Choose a suitable plot for comparing the distribution of value across groups and justify your choice.',
            marks: 4,
            topic: 'Choosing charts',
            learningOutcome: 'Match chart types to analytical tasks.',
            modelAnswer: 'A boxplot is suitable because it compares medians, spread and possible outliers across groups. A violin plot or faceted histogram could also be justified if distribution shape is central to the question.',
            commonMistakes: ['Choosing a pie chart for a numerical distribution.', 'Giving no reason for the chart choice.'],
            examinerComment: 'The justification is worth marks, not only the chart name.',
            sourceMap: 'Weeks 7 and 10 visualisation.',
          },
          {
            label: 'd',
            prompt: challenge ? 'Explain when faceting would improve the chart and when it would not.' : 'Name the ggplot2 function used to split a plot into panels by group.',
            marks: 3,
            topic: 'Facets',
            learningOutcome: 'Use faceting appropriately.',
            modelAnswer: challenge
              ? 'Faceting helps when groups overlap heavily or have different patterns that need separate panels. It is less helpful when there are too many groups, when direct comparison on one shared axis is essential, or when each panel becomes sparse.'
              : 'facet_wrap(~ group) or facet_grid() can split a plot into panels by group.',
            commonMistakes: ['Using group_by() as if it changed the plot panels.', 'Faceting so many groups that the figure becomes unreadable.'],
            examinerComment: 'Faceting is a communication choice, not just syntax.',
            sourceMap: 'Week 7 facets and Week 8 advanced ggplot2.',
          },
        ],
      },
      {
        id: 'q4',
        title: 'Operationalisation, correlation and coding style',
        context: `The research question is: "Is there a relationship between environmental conditions and monthly ${scenario}?"`,
        marks: challenge ? 22 : 12,
        subQuestions: [
          {
            label: 'a',
            prompt: 'Explain how you would operationalise the research question using available data.',
            marks: challenge ? 7 : 4,
            topic: 'Operationalisation',
            learningOutcome: 'Translate a research question into measurable variables and analysis steps.',
            modelAnswer: 'Define the outcome as monthly total or mean activity from the observed records. Define environmental conditions using measured variables such as temperature, rainfall or air quality averaged by month. Join or summarise to one row per month, plot the relationship, calculate a suitable correlation for numerical variables, and interpret cautiously because association is not causation.',
            commonMistakes: ['Restating the question without measurable variables.', 'Ignoring the monthly aggregation.'],
            examinerComment: 'The official mock uses this exact skill: moving from research question to analysis plan.',
            sourceMap: 'Weeks 1, 3, 5 and 7.',
          },
          {
            label: 'b',
            prompt: 'Assuming two numerical variables have an approximately linear relationship, name the appropriate analysis and give the R function call.',
            marks: 4,
            topic: 'Correlation',
            learningOutcome: 'Use correlation for linear association.',
            modelAnswer: 'Use Pearson correlation. In R: cor(x, y, use = "complete.obs"). A positive value means the variables tend to increase together; a negative value means one tends to decrease as the other increases.',
            commonMistakes: ['Using mean(x, y).', 'Not interpreting the sign of the coefficient.'],
            examinerComment: 'The function call alone is not a complete answer.',
            sourceMap: 'Official mock Q1(c) and summary statistics material.',
          },
          {
            label: 'c',
            prompt: 'What is the recommended maximum line length in R code, and how should a long comment containing a URL be handled?',
            marks: 4,
            topic: 'R coding style',
            learningOutcome: 'Apply basic readable coding conventions.',
            modelAnswer: 'A common recommendation is 80 characters. Long code should be broken across lines at natural points. A long URL in a comment should usually be placed on its own line rather than split, because splitting can make it unusable.',
            commonMistakes: ['Splitting a URL across two comment lines.', 'Treating style as irrelevant to reproducibility.'],
            examinerComment: 'This is drawn directly from the coding-style part of the official mock.',
            sourceMap: 'R practicals and official mock Q4.',
          },
          {
            label: 'd',
            prompt: challenge ? 'Give two limitations of using correlation alone for the research question.' : 'How does R treat object names that differ only by case, such as Mark and mark?',
            marks: challenge ? 7 : 4,
            topic: challenge ? 'Interpretation and limitations' : 'R objects',
            learningOutcome: challenge ? 'Evaluate limitations of simple analysis.' : 'Understand R naming and case sensitivity.',
            modelAnswer: challenge
              ? 'Correlation does not establish causation and can be affected by confounding variables or seasonal patterns. It only measures linear association, so nonlinear relationships may be missed. Aggregating to months may also hide daily variation.'
              : 'R is case-sensitive, so Mark and mark are different objects. This can cause bugs if inconsistent naming is used.',
            commonMistakes: ['Claiming correlation proves cause.', 'Ignoring case sensitivity in R object names.'],
            examinerComment: 'The answer should be practical and tied to interpretation.',
            sourceMap: 'Weeks 2 and 5, official mock Q2(c).',
          },
        ],
      },
    ],
  };
}

export const generatedMockExams: GeneratedExam[] = [
  ...Array.from({ length: 15 }, (_, i) => makeDbExam(i + 1)),
  ...Array.from({ length: 15 }, (_, i) => makeIdsExam(i + 1)),
];

export const examinerReports: ExaminerReport[] = [
  {
    title: 'Exam Topic Frequency Analysis',
    points: [
      'Database Systems: SQL joins, grouping and nested subqueries recur heavily in lectures, labs and the official mock, so every generated paper includes practical SQL.',
      'Database Systems: ER modelling and relational schema translation are high-weight topics because the official mock devotes a full long question to this style.',
      'Database Systems: normalisation is repeatedly assessed through redundancy, anomalies, functional dependencies, candidate keys and BCNF decomposition.',
      'Database Systems: transactions and concurrency appear as shorter but conceptually demanding questions, especially conflict serialisability and isolation.',
      'Introduction to Data Science: the official mock uses short-answer conceptual questions plus small R code tasks; generated papers keep that balance.',
      'Introduction to Data Science: dplyr, tidyr, lubridate, ggplot2, sampling, reproducibility, summary statistics and visualisation critique are weighted most heavily.',
    ],
  },
  {
    title: 'Question Type Analysis',
    points: [
      'Command verbs are usually direct: explain, state, write code, describe, comment, determine and suggest.',
      'Database Systems questions often begin with a business scenario and expect assumptions where constraints cannot be represented by ordinary keys alone.',
      'SQL questions reward executable logic, not only approximate English intent.',
      'Data Science questions are compact and often ask for a function call plus a short interpretation.',
      'Visualisation questions assess chart choice, purpose, code and criticism rather than decorative styling.',
    ],
  },
  {
    title: 'Common Mistakes Guide',
    points: [
      'SQL: placing aggregate conditions in WHERE instead of HAVING.',
      'SQL: filtering the right table of a LEFT JOIN in WHERE and accidentally removing unmatched rows.',
      'SQL: using IN for questions that require every related row.',
      'Normalisation: finding one candidate key and stopping before checking minimality.',
      'Transactions: treating read-read pairs as conflicts or reversing graph edges.',
      'R: using = instead of == in filter conditions.',
      'R: using pivot_wider when the task asks for wide-to-long reshaping.',
      'Visualisation: naming a chart without explaining why it fits the analytical task.',
    ],
  },
  {
    title: 'Distinction Examiner Guide',
    points: [
      'Distinction answers state assumptions precisely and connect them to design consequences.',
      'They use the vocabulary of the module: total participation, composite key, lossless join, dependency preservation, dirty read, non-repeatable read and conflict graph.',
      'They include just enough working to make the reasoning auditable: closures, graph edges, grouping logic and code pipelines.',
      'For R and visualisation, they interpret results and limitations rather than stopping at syntax.',
    ],
  },
];

export function buildExamText(exam: GeneratedExam, includeAnswers: boolean) {
  const lines = [
    `${exam.moduleTitle}`,
    `${exam.code}`,
    `${exam.title} (${exam.difficulty})`,
    `Duration: ${exam.duration}`,
    `Total marks: ${exam.totalMarks}`,
    '',
    'Instructions',
    ...exam.instructions.map((item) => `- ${item}`),
    '',
  ];

  exam.questions.forEach((question, qIndex) => {
    lines.push(`Question ${qIndex + 1}: ${question.title} [${question.marks} marks]`);
    lines.push(question.context);
    question.subQuestions.forEach((part) => {
      lines.push('');
      lines.push(`(${part.label}) ${part.prompt} [${part.marks} marks]`);
      lines.push(`Topic: ${part.topic}`);
      lines.push(`Learning outcome: ${part.learningOutcome}`);
      if (includeAnswers) {
        lines.push('Model answer:');
        lines.push(part.modelAnswer);
        if (part.alternativeAnswers?.length) {
          lines.push(`Alternative valid answers: ${part.alternativeAnswers.join(' ')}`);
        }
        lines.push(`Common mistakes: ${part.commonMistakes.join(' ')}`);
        lines.push(`Examiner comment: ${part.examinerComment}`);
        if (part.highDistinction) lines.push(`High-distinction features: ${part.highDistinction}`);
      }
      lines.push(`Revision map: ${part.sourceMap}`);
    });
    lines.push('');
  });

  return lines.join('\n');
}
