export interface PracticeItem {
  id: string;
  prompt: string;
  topic: string;
  module: 'db' | 'ids';
  difficulty: 'easy' | 'medium' | 'hard';
  modelAnswer: string;
  commonMistakes: string[];
}

export const practiceItems: PracticeItem[] = [
  // ===========================
  // DATABASE SYSTEMS (15 items)
  // ===========================
  {
    id: 'db-p-1',
    prompt: `Write a SQL query to list the name and GPA of every student in the "Computer Science" department who has a GPA strictly above the average GPA of all students across all departments.`,
    topic: 'SQL Subqueries',
    module: 'db',
    difficulty: 'easy',
    modelAnswer: `SELECT name, gpa
FROM Student
WHERE dept = 'Computer Science'
  AND gpa > (SELECT AVG(gpa) FROM Student);`,
    commonMistakes: [
      "Using HAVING instead of WHERE — there is no GROUP BY here, so HAVING is syntactically invalid",
      "Writing AVG(gpa) > 3.5 directly in WHERE — aggregate functions cannot appear in WHERE without a subquery",
      "Forgetting single quotes around 'Computer Science' (string literals need quotes in SQL)",
    ],
  },
  {
    id: 'db-p-2',
    prompt: `Given the relation R(A, B, C, D) with functional dependencies: A→B, BC→D, D→A.
(a) Find all candidate keys of R.
(b) Is R in BCNF? If not, decompose R into BCNF and verify losslessness.`,
    topic: 'Candidate Keys / BCNF',
    module: 'db',
    difficulty: 'hard',
    modelAnswer: `(a) Find candidate keys by computing closures:

Try AC: (AC)+ → add B (A→B) → {A,B,C} → add D (BC→D) → {A,B,C,D} ✓
  Is AC minimal? A+={A,B,D} (A→B→? — no, A→B but B alone can't give C). A+={A,B} without C, doesn't cover D unless we use BC→D which needs C. Actually A+: A→B, so A+={A,B}. Not all of R. C+={C}. So AC is minimal. ✓ AC is a candidate key.

Try DC: (DC)+ → D→A, so add A → {D,C,A} → A→B → {A,B,C,D} ✓
  Is DC minimal? D+={D,A,B}, C+={C}. Neither alone gives all. ✓ DC is a candidate key.

Try BC: (BC)+ → BC→D → {B,C,D} → D→A → {A,B,C,D} ✓
  B+={B}, C+={C}. ✓ BC is a candidate key.

Candidate keys: {AC, BC, DC}

(b) BCNF check: for every non-trivial FD X→Y, X must be a superkey.
- A→B: A+ = {A,B}. A is not a superkey. ✗ BCNF violated.

Decompose on A→B:
  R1(A, B)  — covers A→B
  R2(A, C, D)  — remaining attributes with A

Lossless test: R1 ∩ R2 = {A}. Does A→R1 (i.e. A→AB)? A→B holds, so yes. ✓ Lossless.

Check R2(A,C,D) for BCNF with projected FDs:
  D→A holds (from original). D+={D,A,B} but in R2 only A,C,D so D+={D,A}. D is not a superkey of R2 (D+ ≠ {A,C,D}). ✗ BCNF violated.

Decompose R2 on D→A:
  R2a(D, A) — covers D→A
  R2b(D, C) — remaining

Lossless: R2a ∩ R2b = {D}. D→D,A → D→R2a. ✓

Final BCNF decomposition: R1(A,B), R2a(A,D), R2b(C,D)`,
    commonMistakes: [
      "Only finding one candidate key and stopping — always check all minimal superkeys",
      "Forgetting to project functional dependencies onto sub-relations when checking sub-relations for BCNF",
      "Skipping the lossless decomposition test — always verify R1 ∩ R2 is a superkey of R1 or R2",
      "Confusing 'D→A violates BCNF' with 'D→A is bad' — BCNF just requires D to be a superkey, which it is not",
    ],
  },
  {
    id: 'db-p-3',
    prompt: `Write a SQL query to find the names of students who are enrolled in EVERY course that student "S001" is enrolled in. (Do not return S001 themselves.)`,
    topic: 'SQL Subqueries / NOT EXISTS',
    module: 'db',
    difficulty: 'hard',
    modelAnswer: `SELECT DISTINCT s.name
FROM Student s
WHERE s.studentID <> 'S001'
  AND NOT EXISTS (
    -- A course S001 is in that s is NOT in
    SELECT e1.courseID
    FROM Enrolment e1
    WHERE e1.studentID = 'S001'
      AND NOT EXISTS (
        SELECT 1
        FROM Enrolment e2
        WHERE e2.studentID = s.studentID
          AND e2.courseID = e1.courseID
      )
  );`,
    commonMistakes: [
      "Trying to use division directly in SQL — SQL has no ÷ operator; division must be expressed with double NOT EXISTS",
      "Forgetting to exclude S001 from the results with s.studentID <> 'S001'",
      "Correlating the subqueries incorrectly — the inner NOT EXISTS must reference both the outer student alias s and the middle course alias e1",
    ],
  },
  {
    id: 'db-p-4',
    prompt: `Consider the schedule: T1:R(X), T2:R(X), T1:W(X), T2:W(X), T1:R(Y), T2:W(Y).
(a) Identify all conflicting pairs.
(b) Draw the precedence graph.
(c) Is the schedule conflict-serialisable? If yes, give a serial order.`,
    topic: 'Concurrency / Serialisability',
    module: 'db',
    difficulty: 'hard',
    modelAnswer: `(a) Conflicting pairs (same item, different transactions, ≥1 write):
- T1:R(X) and T2:W(X): same item X, T2 writes → conflict. T1 before T2 → edge T1→T2
- T2:R(X) and T1:W(X): same item X, T1 writes → conflict. T2 before T1 → edge T2→T1
- T1:W(X) and T2:W(X): same item X, both write → conflict. T1 before T2 → edge T1→T2
- T1:R(Y) and T2:W(Y): same item Y, T2 writes → conflict. T1 before T2 → edge T1→T2

(b) Precedence graph:
  T1 → T2  (from T1:R(X) before T2:W(X) and T1:W(X) before T2:W(X) and T1:R(Y) before T2:W(Y))
  T2 → T1  (from T2:R(X) before T1:W(X))

(c) Graph has cycle T1→T2→T1. NOT conflict-serialisable.`,
    commonMistakes: [
      "Forgetting that read-read pairs on the same item do NOT conflict — only write-read, read-write, and write-write conflict",
      "Drawing edges in the wrong direction — the edge goes from the transaction whose operation comes FIRST in the schedule",
      "Concluding serialisable just because there is a serial ordering T1,T2 possible — must test via the graph, not by assumption",
    ],
  },
  {
    id: 'db-p-5',
    prompt: `For relation R(CourseID, StudentID, Instructor, Room, TimeSlot) with FDs:
  CourseID → Instructor
  CourseID, TimeSlot → Room
  StudentID, TimeSlot → CourseID

(a) Find a candidate key.
(b) State whether R is in 3NF. Justify with reference to each FD.
(c) If not in 3NF, decompose into 3NF using the synthesis algorithm.`,
    topic: 'Normalisation — 3NF Synthesis',
    module: 'db',
    difficulty: 'hard',
    modelAnswer: `(a) Try {StudentID, TimeSlot}:
(StudentID, TimeSlot)+ → CourseID (FD3) → Instructor (FD1) → Room (FD2, via CourseID,TimeSlot) → {StudentID, TimeSlot, CourseID, Instructor, Room} = all ✓
No proper subset works alone. Candidate key: {StudentID, TimeSlot}

(b) 3NF test — for each FD X→Y, either X is a superkey or Y is a prime attribute.
Prime attributes (in some candidate key): StudentID, TimeSlot.
- CourseID → Instructor: CourseID is NOT a superkey; Instructor is NOT prime. ✗ Violates 3NF.
- CourseID,TimeSlot → Room: {CourseID,TimeSlot} is NOT a superkey (can't determine StudentID); Room is NOT prime. ✗ Violates 3NF.
- StudentID,TimeSlot → CourseID: {StudentID,TimeSlot} IS a superkey. ✓ OK.
R is NOT in 3NF.

(c) 3NF Synthesis:
Minimal cover Fc (already minimal as given):
  FD1: CourseID → Instructor
  FD2: CourseID,TimeSlot → Room
  FD3: StudentID,TimeSlot → CourseID

Step 2 — one relation per FD:
  R1(CourseID, Instructor)
  R2(CourseID, TimeSlot, Room)
  R3(StudentID, TimeSlot, CourseID)

Step 3 — does any relation contain a candidate key? R3 contains {StudentID,TimeSlot} ✓

Step 4 — no relation is a subset of another. Final decomposition:
  R1(CourseID, Instructor)
  R2(CourseID, TimeSlot, Room)
  R3(StudentID, TimeSlot, CourseID)`,
    commonMistakes: [
      "Forgetting step 3 of synthesis — if no relation contains a candidate key, you must add one",
      "Checking 2NF rather than 3NF — 3NF also bans transitive dependencies from non-key attributes to non-key attributes",
      "Saying 'CourseID,TimeSlot → Room violates 3NF' without checking whether Room is prime — always check both conditions",
    ],
  },
  {
    id: 'db-p-6',
    prompt: `Write a SQL query to find, for each department, the number of students and the average GPA. Only return departments where the average GPA is above 3.2 AND there are at least 5 students. Order results by average GPA descending.`,
    topic: 'SQL GROUP BY / HAVING',
    module: 'db',
    difficulty: 'medium',
    modelAnswer: `SELECT dept,
       COUNT(*)    AS num_students,
       AVG(gpa)    AS avg_gpa
FROM Student
GROUP BY dept
HAVING AVG(gpa) > 3.2
   AND COUNT(*) >= 5
ORDER BY avg_gpa DESC;`,
    commonMistakes: [
      "Putting AVG(gpa) > 3.2 in WHERE instead of HAVING — WHERE runs before GROUP BY and cannot see aggregate results",
      "Using COUNT(gpa) instead of COUNT(*) — if any student has NULL gpa, COUNT(gpa) will be lower than the true student count",
      "Forgetting ORDER BY or ordering by AVG(gpa) ASC — the question asks descending",
    ],
  },
  {
    id: 'db-p-7',
    prompt: `Draw (or describe in text) an ER diagram for the following scenario, then write the full relational schema:
"A university has Departments and Professors. Each Professor belongs to exactly one Department. A Department can have many Professors. Each Professor can teach many Courses; each Course is taught by exactly one Professor. A Course can have many Students enrolled; a Student can enrol in many Courses. The enrolment records the grade achieved."`,
    topic: 'ER Diagrams / ER to Relational',
    module: 'db',
    difficulty: 'medium',
    modelAnswer: `ER Diagram Description:
- Entities: Department, Professor, Course, Student
- Relationships:
  BelongsTo: Professor —(N)— BelongsTo —(1)— Department (total participation for Professor)
  Teaches: Professor —(1)— Teaches —(N)— Course (total participation for Course)
  Enrols: Student —(M)— Enrols —(N)— Course; Enrols has attribute Grade

Relational Schema:
  Department(deptID [PK], name, building)
  Professor(profID [PK], name, deptID [FK → Department])
  Course(courseID [PK], title, credits, profID [FK → Professor])
  Student(studentID [PK], name, email)
  Enrolment(studentID [FK → Student], courseID [FK → Course], grade)
             PK: (studentID, courseID)`,
    commonMistakes: [
      "Forgetting the grade attribute on Enrolment — attributes on M:N relationships go in the junction table",
      "Placing the FK on the wrong side for 1:N — the FK (deptID) goes in the Professor table, not Department",
      "Making Enrolment's PK just studentID or courseID — it needs both as a composite PK",
    ],
  },
  {
    id: 'db-p-8',
    prompt: `Write relational algebra expressions for:
(a) Names of students enrolled in course "CS101".
(b) Names of students NOT enrolled in any course.
(c) Names of students enrolled in both "CS101" and "MATH201".`,
    topic: 'Relational Algebra',
    module: 'db',
    difficulty: 'medium',
    modelAnswer: `(a) π_{name}(σ_{courseID='CS101'}(Student ⋈ Enrolment))

(b) π_{name}(Student) − π_{name}(Student ⋈ Enrolment)
    (Set difference: students minus those with any enrolment)

(c) Let E1 = σ_{courseID='CS101'}(Enrolment)
    Let E2 = σ_{courseID='MATH201'}(Enrolment)
    π_{name}(Student ⋈ (π_{studentID}(E1) ∩ π_{studentID}(E2)))
    (Intersection of studentIDs in both courses, then join to get names)`,
    commonMistakes: [
      "For (b), trying to use σ with NOT EXISTS — set difference (−) is the relational algebra operator for 'not in'",
      "For (c), using natural join E1 ⋈ E2 directly — this would try to join on ALL common attributes including courseID, returning nothing since the courseIDs differ",
      "Forgetting to project to studentID before taking intersection in (c)",
    ],
  },
  {
    id: 'db-p-9',
    prompt: `For the following transaction schedule, determine which isolation level (READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALISABLE) is the lowest level that prevents the anomaly described:

(a) T1 reads account balance (£500). T2 updates it to £600 but has not committed. T1 reads again and sees £600. T2 then rolls back.
(b) T1 reads student record for ID 42 (GPA = 3.5). T2 updates that record to GPA = 3.8 and commits. T1 reads the same record again and sees 3.8.
(c) T1 counts students with GPA > 3.5 (gets 10). T2 inserts a new student with GPA = 3.9 and commits. T1 counts again and gets 11.`,
    topic: 'Concurrency / Isolation Levels',
    module: 'db',
    difficulty: 'medium',
    modelAnswer: `(a) Dirty read — T1 sees T2's uncommitted data that later rolls back.
    Prevented by: READ COMMITTED (and higher).

(b) Non-repeatable read — T1 reads the same row twice and gets different values because T2 committed an update in between.
    Prevented by: REPEATABLE READ (and higher).

(c) Phantom read — T1 re-runs a range query and sees a new row inserted by T2.
    Prevented by: SERIALISABLE only.`,
    commonMistakes: [
      "Confusing dirty read with non-repeatable read — dirty read involves UNCOMMITTED data; non-repeatable read involves COMMITTED updates",
      "Saying REPEATABLE READ prevents phantom reads — it does not; only SERIALISABLE prevents phantoms",
      "Saying READ COMMITTED prevents non-repeatable reads — it does not; READ COMMITTED only prevents dirty reads",
    ],
  },
  {
    id: 'db-p-10',
    prompt: `Write SQL to find pairs of students (no duplicates, no self-pairs) who are enrolled in the same course. Return student1_name, student2_name, courseID.`,
    topic: 'SQL Self Join',
    module: 'db',
    difficulty: 'medium',
    modelAnswer: `SELECT s1.name AS student1_name,
       s2.name AS student2_name,
       e1.courseID
FROM Enrolment e1
  JOIN Enrolment e2
    ON e1.courseID = e2.courseID
    AND e1.studentID < e2.studentID
  JOIN Student s1 ON e1.studentID = s1.studentID
  JOIN Student s2 ON e2.studentID = s2.studentID
ORDER BY e1.courseID, s1.name;`,
    commonMistakes: [
      "Using e1.studentID <> e2.studentID instead of e1.studentID < e2.studentID — the <> condition gives every pair twice (A,B and B,A); < ensures each pair appears once",
      "Forgetting to join back to Student to get names — Enrolment usually only stores studentID",
      "Alias confusion when joining Enrolment to itself — must use two distinct aliases (e1, e2)",
    ],
  },
  {
    id: 'db-p-11',
    prompt: `Compute the attribute closure of {A, C} given FDs: A→B, B→D, CD→E, E→F.
Then determine whether {A, C} is a candidate key of R(A, B, C, D, E, F).`,
    topic: 'Functional Dependencies / Attribute Closure',
    module: 'db',
    difficulty: 'easy',
    modelAnswer: `Algorithm — start with result = {A, C}:

Round 1:
  A→B: A ⊆ {A,C} → add B. result = {A,B,C}
  B→D: B ⊆ {A,B,C} → add D. result = {A,B,C,D}
  CD→E: {C,D} ⊆ {A,B,C,D} → add E. result = {A,B,C,D,E}
  E→F: E ⊆ {A,B,C,D,E} → add F. result = {A,B,C,D,E,F}

Round 2: no new attributes added.

{A,C}+ = {A,B,C,D,E,F} = all attributes ✓

{A,C} is a superkey. Now check minimality:
  A+ = {A,B,D} — does not include C,E,F. Not a superkey.
  C+ = {C} — not a superkey.
Neither proper subset is a superkey, so {A,C} is a CANDIDATE KEY.`,
    commonMistakes: [
      "Stopping after one round before all FDs have been applied — always iterate until no change",
      "Applying an FD whose left-hand side is NOT yet in the result — only apply FDs where LHS ⊆ current result",
      "Declaring candidate key without verifying minimality — must check that removing any attribute breaks the superkey property",
    ],
  },
  {
    id: 'db-p-12',
    prompt: `Write SQL to show, for each course, its courseID, title, and the number of students who achieved a grade of 'A'. Include courses with zero 'A' grades. Order by count descending.`,
    topic: 'SQL Joins / Aggregates',
    module: 'db',
    difficulty: 'medium',
    modelAnswer: `SELECT c.courseID,
       c.title,
       COUNT(e.studentID) AS num_A_grades
FROM Course c
  LEFT JOIN Enrolment e
    ON c.courseID = e.courseID
    AND e.grade = 'A'
GROUP BY c.courseID, c.title
ORDER BY num_A_grades DESC;`,
    commonMistakes: [
      "Putting e.grade = 'A' in the WHERE clause — this turns the LEFT JOIN into an INNER JOIN, excluding courses with no A grades",
      "Using COUNT(*) instead of COUNT(e.studentID) — COUNT(*) counts NULL rows from the LEFT JOIN as 1, inflating the count for courses with no As",
      "Forgetting c.title in GROUP BY — every non-aggregated column in SELECT must appear in GROUP BY",
    ],
  },
  {
    id: 'db-p-13',
    prompt: `Prove or disprove: the decomposition of R(A,B,C,D) into R1(A,B,C) and R2(A,D) is lossless, given FDs: A→BCD.`,
    topic: 'Normalisation / Lossless Decomposition',
    module: 'db',
    difficulty: 'easy',
    modelAnswer: `Lossless decomposition test:
  R1 ∩ R2 = {A}

Does {A} → R1 (i.e. A→ABC)?
  A→BCD is given. A→B, A→C are implied by decomposition of A→BCD. So A→{A,B,C}=R1. ✓

Since R1 ∩ R2 is a superkey of R1, the decomposition is LOSSLESS.

Intuition: A is the PK of R1 (since A→BCD means A determines everything). Joining R1⋈R2 on A will never produce spurious tuples.`,
    commonMistakes: [
      "Checking R1 ∩ R2 → R2 instead of R1 — either condition suffices; just make sure to check both if the first fails",
      "Confusing lossless with dependency-preserving — lossless means no spurious tuples on re-join; dependency-preserving means all FDs can be checked locally",
      "Forgetting that R1 ∩ R2 must be a superkey of R1 OR R2 — it does not need to be a superkey of both",
    ],
  },
  {
    id: 'db-p-14',
    prompt: `Write SQL using a window function (or subquery) to rank students within each department by GPA descending. Return name, dept, gpa, and their rank within the department. Only return the top 2 students per department.`,
    topic: 'SQL Advanced / Window Functions',
    module: 'db',
    difficulty: 'hard',
    modelAnswer: `-- Using ROW_NUMBER (or RANK) window function:
SELECT name, dept, gpa, dept_rank
FROM (
  SELECT name,
         dept,
         gpa,
         ROW_NUMBER() OVER (PARTITION BY dept ORDER BY gpa DESC) AS dept_rank
  FROM Student
) ranked
WHERE dept_rank <= 2
ORDER BY dept, dept_rank;

-- Alternative without window functions:
SELECT s1.name, s1.dept, s1.gpa
FROM Student s1
WHERE (
  SELECT COUNT(*)
  FROM Student s2
  WHERE s2.dept = s1.dept AND s2.gpa > s1.gpa
) < 2
ORDER BY s1.dept, s1.gpa DESC;`,
    commonMistakes: [
      "Trying to use WHERE dept_rank <= 2 in the same SELECT that defines dept_rank — window function aliases are not visible in the WHERE of the same query; must wrap in a subquery",
      "Using RANK() instead of ROW_NUMBER() — RANK() gives ties the same rank, so you might get more than 2 per department if there are tied GPAs",
      "Forgetting PARTITION BY — without it, the ranking is global across all departments",
    ],
  },
  {
    id: 'db-p-15',
    prompt: `Explain what a non-repeatable read is and write a concrete transaction interleaving that demonstrates it. Then state which isolation level prevents it and why.`,
    topic: 'Concurrency / Isolation Levels',
    module: 'db',
    difficulty: 'medium',
    modelAnswer: `Definition: A non-repeatable read occurs when transaction T1 reads a row, transaction T2 then modifies and commits that row, and T1 re-reads the same row to find different data.

Concrete interleaving:
  T1: BEGIN
  T1: SELECT gpa FROM Student WHERE studentID = 42;  -- reads 3.5
  T2: BEGIN
  T2: UPDATE Student SET gpa = 3.8 WHERE studentID = 42;
  T2: COMMIT
  T1: SELECT gpa FROM Student WHERE studentID = 42;  -- reads 3.8 (!!)
  T1: COMMIT

T1 sees two different values for the same row within a single transaction — the read is non-repeatable.

Prevention: REPEATABLE READ isolation level.
  Under REPEATABLE READ, the DB guarantees that if T1 reads a row, no other transaction can modify that row until T1 commits. T1 will always see 3.5 on its second read.

Note: READ COMMITTED does NOT prevent this — it only prevents reading uncommitted data.`,
    commonMistakes: [
      "Confusing with a dirty read — in a dirty read T2 never commits; in a non-repeatable read T2 COMMITS before T1's second read",
      "Saying READ COMMITTED prevents non-repeatable reads — it does not",
      "Confusing non-repeatable reads with phantom reads — non-repeatable is about the SAME row changing; phantoms are about NEW rows appearing",
    ],
  },

  // ===========================
  // INTRO TO DATA SCIENCE (15 items)
  // ===========================
  {
    id: 'ids-p-1',
    prompt: `Using the starwars dataset from the dplyr package, write a complete R pipeline to:
1. Remove characters with missing height or mass values.
2. Add a column bmi = mass / (height/100)^2.
3. Find the mean BMI per species.
4. Return only species with more than 1 character, sorted by mean BMI descending.`,
    topic: 'dplyr pipeline',
    module: 'ids',
    difficulty: 'medium',
    modelAnswer: `library(dplyr)

starwars |>
  filter(!is.na(height), !is.na(mass)) |>
  mutate(bmi = mass / (height / 100)^2) |>
  group_by(species) |>
  summarise(
    mean_bmi = mean(bmi),
    n = n()
  ) |>
  filter(n > 1) |>
  arrange(desc(mean_bmi))`,
    commonMistakes: [
      "Using drop_na() without specifying columns — drop_na() with no arguments removes rows with ANY NA across all columns, which may remove valid rows",
      "Writing height/100^2 instead of (height/100)^2 — operator precedence: ^2 binds tighter than /, so height/100^2 = height/10000, not (height/100)^2",
      "Forgetting na.rm=TRUE in mean(bmi) — even after filtering, if any BMI is NA the mean will be NA",
    ],
  },
  {
    id: 'ids-p-2',
    prompt: `Using ggplot2 and the gapminder dataset, reproduce the famous Hans Rosling bubble chart for the year 2007:
- x = log scale GDP per capita
- y = life expectancy
- bubble size = population
- colour = continent
- Add a title, axis labels, and remove the size legend while keeping the colour legend.`,
    topic: 'ggplot2 — scatter/bubble chart',
    module: 'ids',
    difficulty: 'medium',
    modelAnswer: `library(gapminder)
library(ggplot2)

gapminder |>
  filter(year == 2007) |>
  ggplot(aes(x = gdpPercap, y = lifeExp,
             size = pop, colour = continent)) +
  geom_point(alpha = 0.7) +
  scale_x_log10() +
  scale_size(guide = "none") +
  labs(
    title  = "Wealth and Health of Nations (2007)",
    x      = "GDP per Capita (log scale, USD)",
    y      = "Life Expectancy (years)",
    colour = "Continent"
  ) +
  theme_minimal()`,
    commonMistakes: [
      "Using scale_size_continuous(guide = FALSE) — guide='none' is the modern syntax; guide=FALSE is deprecated in recent ggplot2",
      "Applying log scale with log(gdpPercap) in aes() — this works but axis labels show log values; scale_x_log10() is preferred as it keeps original scale labels",
      "Forgetting alpha — without alpha, overlapping bubbles obscure patterns in dense regions",
    ],
  },
  {
    id: 'ids-p-3',
    prompt: `Explain what the following R code does, step by step, and give the output:

x <- c(TRUE, FALSE, TRUE, TRUE)
sum(x)
mean(x)
as.integer(x)`,
    topic: 'R Type Coercion',
    module: 'ids',
    difficulty: 'easy',
    modelAnswer: `x <- c(TRUE, FALSE, TRUE, TRUE)
# Creates a logical vector: TRUE TRUE TRUE FALSE → wait, order is T,F,T,T

sum(x)
# TRUE coerces to 1, FALSE to 0. Sum = 1+0+1+1 = 3

mean(x)
# mean of c(1,0,1,1) = 3/4 = 0.75
# This is a useful trick: mean() of a logical vector = proportion of TRUEs

as.integer(x)
# [1] 1 0 1 1
# Converts each logical to integer: TRUE→1L, FALSE→0L`,
    commonMistakes: [
      "Forgetting that TRUE coerces to 1 (not 2 or any other value) and FALSE to 0",
      "Not recognising that mean(logical_vector) is a proportion — this is commonly tested",
      "Confusing as.integer() output with as.numeric() — both give 1/0 but as.integer gives integer type (1L) vs as.numeric gives double (1.0)",
    ],
  },
  {
    id: 'ids-p-4',
    prompt: `Write an R Markdown code chunk that:
1. Has the chunk label "analysis"
2. Shows the code in the output
3. Suppresses warnings and messages
4. Holds all output until the end of the chunk
Then write the code inside the chunk: load dplyr, compute mean height of starwars characters, and print the result.`,
    topic: 'R Markdown',
    module: 'ids',
    difficulty: 'easy',
    modelAnswer: `\`\`\`{r analysis, echo=TRUE, warning=FALSE, message=FALSE, results="hold"}
library(dplyr)

mean_height <- starwars |>
  summarise(mean_h = mean(height, na.rm = TRUE)) |>
  pull(mean_h)

print(mean_height)
\`\`\``,
    commonMistakes: [
      "Writing results='hide' instead of results='hold' — hide suppresses all output; hold delays it to the end",
      "Forgetting na.rm=TRUE — starwars has missing height values; without na.rm the mean returns NA",
      "Using echo=FALSE when the question says to show the code — read the question carefully about which options to set",
    ],
  },
  {
    id: 'ids-p-5',
    prompt: `Using the diamonds dataset from ggplot2, write code to create a faceted plot showing the distribution of price for each cut quality (Fair, Good, Very Good, Premium, Ideal). Use a histogram with 30 bins. Apply a log10 scale to the x-axis. Use theme_classic().`,
    topic: 'ggplot2 — histogram / facets',
    module: 'ids',
    difficulty: 'medium',
    modelAnswer: `library(ggplot2)

ggplot(diamonds, aes(x = price)) +
  geom_histogram(bins = 30, fill = "steelblue", colour = "white") +
  scale_x_log10() +
  facet_wrap(~cut) +
  labs(
    title = "Diamond Price Distribution by Cut",
    x     = "Price (log10 scale, USD)",
    y     = "Count"
  ) +
  theme_classic()`,
    commonMistakes: [
      "Using binwidth instead of bins — bins=30 sets the number of bins; binwidth sets the width of each bin. They are different arguments",
      "Mapping fill to cut inside aes() — this creates a legend and coloured bars, which is unnecessary when already faceted by cut",
      "Using facet_grid(~cut) — facet_grid is for two-variable grids; facet_wrap is more appropriate for a single variable",
    ],
  },
  {
    id: 'ids-p-6',
    prompt: `Write R code to:
1. Create a list with three elements: a numeric vector 1:5, the string "hello", and the logical TRUE.
2. Name the elements "nums", "word", "flag".
3. Access the numeric vector by name and add 10 to every element.
4. Show two ways to access the "word" element.`,
    topic: 'R Lists / Indexing',
    module: 'ids',
    difficulty: 'easy',
    modelAnswer: `# 1 & 2: Create and name the list
l <- list(nums = 1:5, word = "hello", flag = TRUE)

# 3: Access numeric vector and add 10
l[["nums"]] + 10   # returns c(11, 12, 13, 14, 15)
# or equivalently:
l$nums + 10

# 4: Two ways to access "word"
l[["word"]]  # returns "hello" (character vector)
l$word       # same result

# WRONG way (returns a list, not the string):
l["word"]    # class is "list", cannot use as a string directly`,
    commonMistakes: [
      "Using l['nums'] + 10 — l['nums'] returns a list, not a numeric vector; arithmetic on a list throws an error",
      "Confusing l$word with l$'word' — the $ operator does not need quotes for valid R names, but l[['word']] always requires quotes",
    ],
  },
  {
    id: 'ids-p-7',
    prompt: `Using dplyr and tidyr, transform the following wide-format data frame into long format, then compute the mean value per indicator:

df <- data.frame(
  country = c("UK", "France", "Germany"),
  gdp     = c(3.1, 2.8, 4.2),
  pop     = c(67, 68, 83)
)`,
    topic: 'tidyr pivot_longer',
    module: 'ids',
    difficulty: 'medium',
    modelAnswer: `library(tidyr)
library(dplyr)

df_long <- df |>
  pivot_longer(
    cols      = c(gdp, pop),
    names_to  = "indicator",
    values_to = "value"
  )

# df_long:
# country  indicator  value
# UK       gdp        3.1
# UK       pop        67.0
# France   gdp        2.8
# ...

df_long |>
  group_by(indicator) |>
  summarise(mean_value = mean(value))`,
    commonMistakes: [
      "Using cols = -country or cols = everything() — both work but cols = c(gdp, pop) is most explicit and clearest",
      "Swapping names_to and values_to — names_to receives the column NAMES (gdp/pop become a single column); values_to receives the VALUES",
      "Forgetting to assign the result — pivot_longer returns a new data frame; it does not modify df in place",
    ],
  },
  {
    id: 'ids-p-8',
    prompt: `Create an animated-style plot (or equivalent static version) in ggplot2 showing life expectancy vs GDP per capita for all years in gapminder, faceted by continent, with continent-coloured points and a log x scale. Add a grey background layer showing all other continents' data in each panel.`,
    topic: 'ggplot2 — grey background layer trick',
    module: 'ids',
    difficulty: 'hard',
    modelAnswer: `library(gapminder)
library(dplyr)
library(ggplot2)

# Create background data by removing the continent column
bg <- gapminder |> select(-continent)

ggplot(gapminder, aes(x = gdpPercap, y = lifeExp, colour = continent)) +
  # grey layer: all data without the continent grouping
  geom_point(data = bg, aes(x = gdpPercap, y = lifeExp),
             colour = "grey80", alpha = 0.3, inherit.aes = FALSE) +
  geom_point(alpha = 0.6) +
  scale_x_log10() +
  facet_wrap(~continent) +
  scale_colour_discrete(guide = "none") +
  labs(title = "GDP vs Life Expectancy by Continent",
       x = "GDP per Capita (log scale)", y = "Life Expectancy") +
  theme_minimal()`,
    commonMistakes: [
      "Forgetting select(-continent) for the background layer — without removing the continent column, ggplot still facets the grey points, so each grey point only appears in its own continent panel",
      "Not using inherit.aes = FALSE for the grey layer — if the inherited colour aesthetic maps to continent, the grey points get continent colours instead of grey",
      "Mapping colour to continent in the grey layer's aes() — the grey layer must have a fixed colour ('grey80'), not a mapped aesthetic",
    ],
  },
  {
    id: 'ids-p-9',
    prompt: `Write R code to:
1. Create a vector of month abbreviations: "Mar", "Jan", "Nov", "Jul".
2. Convert it to a factor with levels in calendar order (Jan, Feb, ..., Dec).
3. Sort the vector according to the factor levels.
4. Show what as.integer() gives on the factor.`,
    topic: 'R Factors',
    module: 'ids',
    difficulty: 'medium',
    modelAnswer: `# 1: character vector
months_vec <- c("Mar", "Jan", "Nov", "Jul")

# 2: factor with calendar order
months_f <- factor(months_vec, levels = month.abb)
# month.abb is the built-in vector: "Jan","Feb","Mar",...,"Dec"

# 3: sort by factor levels
sort(months_f)
# [1] Jan Mar Jul Nov
# Levels: Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec

# 4: integer codes
as.integer(months_f)
# [1]  3  1 11  7   (calendar position of Mar, Jan, Nov, Jul)`,
    commonMistakes: [
      "Using sort(months_vec) on the character vector — this sorts alphabetically (Jan, Jul, Mar, Nov), not calendar order",
      "Forgetting levels = month.abb — without it, factor() sets levels alphabetically, so as.integer gives wrong calendar positions",
      "Confusing month.abb (abbreviated: Jan) with month.name (full: January)",
    ],
  },
  {
    id: 'ids-p-10',
    prompt: `Write a dplyr pipeline using the starwars dataset to find, for each homeworld, the character with the maximum height. Return homeworld, name, and height. Exclude characters with missing homeworld.`,
    topic: 'dplyr — group_by / slice_max',
    module: 'ids',
    difficulty: 'medium',
    modelAnswer: `library(dplyr)

starwars |>
  filter(!is.na(homeworld)) |>
  group_by(homeworld) |>
  slice_max(height, n = 1, with_ties = FALSE) |>
  select(homeworld, name, height) |>
  arrange(homeworld)`,
    commonMistakes: [
      "Using filter(height == max(height)) inside a group — this works but requires na.rm=TRUE for max() and is less readable than slice_max()",
      "Forgetting with_ties = FALSE — if two characters on the same homeworld have the same maximum height, slice_max returns both by default, which may not be desired",
      "Not filtering NA homeworld before grouping — NA forms its own group, which is usually unwanted",
    ],
  },
  {
    id: 'ids-p-11',
    prompt: `Explain the type coercion that occurs in each of the following R expressions and give the result:

(a) TRUE + 5L
(b) c(1.5, TRUE, FALSE)
(c) paste(1, TRUE, "hello")
(d) c("a", 1, TRUE)`,
    topic: 'R Type Coercion',
    module: 'ids',
    difficulty: 'medium',
    modelAnswer: `(a) TRUE + 5L
  TRUE coerces to 1L (integer). 1L + 5L = 6L (integer).
  Result: 6  (type: integer)

(b) c(1.5, TRUE, FALSE)
  TRUE→1.0, FALSE→0.0 (logical→double because 1.5 is double).
  Result: c(1.5, 1.0, 0.0)  (type: double/numeric)

(c) paste(1, TRUE, "hello")
  paste() converts all arguments to character: "1", "TRUE", "hello".
  Result: "1 TRUE hello"  (type: character)
  Note: paste() does NOT use the coercion hierarchy — it explicitly converts everything to character.

(d) c("a", 1, TRUE)
  character is highest in coercion hierarchy. 1→"1", TRUE→"TRUE".
  Result: c("a", "1", "TRUE")  (type: character)`,
    commonMistakes: [
      "Thinking paste() follows the same coercion hierarchy as c() — paste() always converts to character regardless",
      "Forgetting that TRUE→1L (integer) not 1.0 (double) in arithmetic; the result type depends on the other operand",
      "Thinking c('a', 1) gives an error — R silently coerces, never errors on c() with mixed types",
    ],
  },
  {
    id: 'ids-p-12',
    prompt: `Using lubridate, write R code to:
1. Parse the string "2024-03-15 14:30:00" as a datetime object.
2. Compute how many days have elapsed since then (assume today is 2026-06-29).
3. Extract the hour component.
4. Add 2 hours and 30 minutes to the datetime.`,
    topic: 'lubridate',
    module: 'ids',
    difficulty: 'medium',
    modelAnswer: `library(lubridate)

# 1: Parse datetime
dt <- as_datetime("2024-03-15 14:30:00")
# or: ymd_hms("2024-03-15 14:30:00")

# 2: Days elapsed (as of 2026-06-29)
today <- ymd("2026-06-29")
elapsed <- as.duration(today - dt)
elapsed / ddays(1)   # convert to days: ≈ 836 days
# or simply: as.numeric(today - as.Date(dt), units = "days")

# 3: Extract hour
hour(dt)   # returns 14

# 4: Add 2 hours 30 minutes
dt + hours(2) + minutes(30)
# or: dt + duration(hours = 2, minutes = 30)
# Result: "2024-03-15 17:00:00 UTC"`,
    commonMistakes: [
      "Using as.Date() instead of as_datetime() — as.Date() drops the time component",
      "Writing + 2*60*60 + 30*60 to add time in seconds — lubridate's hours() and minutes() helpers are cleaner and less error-prone",
      "Using Sys.time() instead of a fixed date — in exam answers, always use a specific date for reproducibility",
    ],
  },
  {
    id: 'ids-p-13',
    prompt: `Write ggplot2 code to create a heatmap of the correlation between the numeric columns of the mtcars dataset. Steps:
1. Compute the correlation matrix.
2. Convert to long format.
3. Plot with geom_tile(), colour mapped to correlation value.
4. Use a diverging colour scale from red (-1) to blue (+1) through white (0).`,
    topic: 'ggplot2 — geom_tile / heatmap',
    module: 'ids',
    difficulty: 'hard',
    modelAnswer: `library(ggplot2)
library(tidyr)
library(dplyr)

# 1: Compute correlation matrix
cor_mat <- cor(mtcars)

# 2: Convert to long format
cor_long <- as.data.frame(cor_mat) |>
  tibble::rownames_to_column("var1") |>
  pivot_longer(-var1, names_to = "var2", values_to = "correlation")

# 3 & 4: Plot
ggplot(cor_long, aes(x = var1, y = var2, fill = correlation)) +
  geom_tile() +
  scale_fill_gradient2(
    low  = "red",
    mid  = "white",
    high = "blue",
    midpoint = 0,
    limits = c(-1, 1)
  ) +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1)) +
  labs(title = "Correlation Matrix — mtcars",
       x = NULL, y = NULL)`,
    commonMistakes: [
      "Using scale_fill_gradient() instead of scale_fill_gradient2() — gradient() only has two endpoints (low/high); gradient2() adds a midpoint for diverging palettes",
      "Forgetting rownames_to_column() — cor() returns a matrix with row names that are lost when converting to data.frame without this step",
      "Not setting limits = c(-1, 1) in the scale — without this, the midpoint (white) maps to the mean of the data, not to 0",
    ],
  },
  {
    id: 'ids-p-14',
    prompt: `Using stringr and dplyr with starwars, write code to:
1. Filter characters whose name starts with a letter from "L" onwards (alphabetically).
2. Create a new column initial containing the first letter of each name.
3. Count how many characters share each initial.
4. Display only initials that appear more than once.`,
    topic: 'stringr / dplyr',
    module: 'ids',
    difficulty: 'medium',
    modelAnswer: `library(dplyr)
library(stringr)

starwars |>
  filter(str_sub(name, 1L, 1L) >= "L") |>
  mutate(initial = str_sub(name, start = 1L, end = 1L)) |>
  count(initial) |>
  filter(n > 1) |>
  arrange(desc(n))`,
    commonMistakes: [
      "Using str_detect(name, '^[L-Z]') — this works but is more complex; str_sub(name,1,1) >= 'L' is cleaner for this comparison",
      "Using str_sub(name, 1, 1) without 1L — while R will coerce, the documented signature of str_sub uses integer positions; using 1L is more explicit",
      "Forgetting that count(initial) is equivalent to group_by(initial) |> summarise(n = n()) — either works, but count() is more concise",
    ],
  },
  {
    id: 'ids-p-15',
    prompt: `Write a ggplot2 plot showing, side-by-side, the distribution of carat for each cut quality in the diamonds dataset using a boxplot. Reorder cut levels from worst to best: Fair, Good, Very Good, Premium, Ideal. Colour each box by cut (no legend). Flip the coordinates so cut is on the y-axis.`,
    topic: 'ggplot2 — boxplot / factors / coord_flip',
    module: 'ids',
    difficulty: 'hard',
    modelAnswer: `library(ggplot2)
library(dplyr)

diamonds |>
  mutate(cut = factor(cut,
    levels = c("Fair", "Good", "Very Good", "Premium", "Ideal"))) |>
  ggplot(aes(x = cut, y = carat, fill = cut)) +
  geom_boxplot() +
  scale_fill_discrete(guide = "none") +
  coord_flip() +
  labs(
    title = "Carat Distribution by Cut Quality",
    x     = "Cut",
    y     = "Carat"
  ) +
  theme_minimal()`,
    commonMistakes: [
      "Forgetting that diamonds$cut is already an ordered factor — refactoring with factor() is necessary to change the order to the requested sequence",
      "Using scale_fill_manual(guide='none') when scale_fill_discrete(guide='none') suffices — manual requires specifying values too",
      "After coord_flip(), forgetting that x and y labels are swapped in the rendered output — x label appears on y-axis visually and vice versa",
    ],
  },
];
