export interface Flashcard {
  id: string;
  front: string;
  back: string;
  topic: string;
  module: 'db' | 'ids';
  difficulty: 'easy' | 'medium' | 'hard';
}

export const dbFlashcards: Flashcard[] = [
  // === EASY (12 cards) ===
  {
    id: 'db-fc-1',
    front: 'What does σ (sigma) do in relational algebra? Give notation and example.',
    back: 'Selection — filters rows. Notation: σ_{condition}(R).\nExample: σ_{grade = "A"}(Enrolment) returns only rows where grade is A.',
    topic: 'Relational Algebra',
    module: 'db',
    difficulty: 'easy',
  },
  {
    id: 'db-fc-2',
    front: 'What does π (pi) do in relational algebra? Give notation and example.',
    back: 'Projection — selects columns (and removes duplicates). Notation: π_{col1, col2}(R).\nExample: π_{name, dept}(Student) returns the name and dept columns only.',
    topic: 'Relational Algebra',
    module: 'db',
    difficulty: 'easy',
  },
  {
    id: 'db-fc-3',
    front: 'State the four ACID properties of transactions.',
    back: 'Atomicity — all operations commit or all roll back.\nConsistency — DB moves from one valid state to another.\nIsolation — concurrent transactions behave as if serial.\nDurability — committed changes survive system failures.',
    topic: 'Transactions/ACID',
    module: 'db',
    difficulty: 'easy',
  },
  {
    id: 'db-fc-4',
    front: 'What is the difference between COUNT(*) and COUNT(attr)?',
    back: 'COUNT(*) counts every row including those with NULLs.\nCOUNT(attr) counts only rows where attr is NOT NULL.\nExam trap: COUNT(grade) on a table with 3 NULL grades gives a lower number than COUNT(*).',
    topic: 'SQL Aggregates',
    module: 'db',
    difficulty: 'easy',
  },
  {
    id: 'db-fc-5',
    front: 'What is a functional dependency? Give an example.',
    back: 'X→Y means knowing X uniquely determines Y. For every pair of tuples with the same X value, they must also have the same Y value.\nExample: StudentID → Name, Dept (the student ID determines the student\'s name and department).',
    topic: 'Functional Dependencies',
    module: 'db',
    difficulty: 'easy',
  },
  {
    id: 'db-fc-6',
    front: 'What is a candidate key?',
    back: 'A minimal superkey — a set of attributes that uniquely identifies every tuple, with no redundant attributes. A relation can have multiple candidate keys. The chosen one is the primary key.',
    topic: 'Keys',
    module: 'db',
    difficulty: 'easy',
  },
  {
    id: 'db-fc-7',
    front: 'What is 1NF?',
    back: 'First Normal Form: every attribute must contain only atomic (indivisible) values — no lists, arrays, or repeating groups. Each row must be uniquely identifiable.',
    topic: 'Normalisation',
    module: 'db',
    difficulty: 'easy',
  },
  {
    id: 'db-fc-8',
    front: 'What is the difference between WHERE and HAVING in SQL?',
    back: 'WHERE filters individual rows BEFORE grouping.\nHAVING filters groups AFTER GROUP BY aggregation.\nYou cannot use aggregate functions (AVG, COUNT, etc.) in a WHERE clause.',
    topic: 'SQL GROUP BY / HAVING',
    module: 'db',
    difficulty: 'easy',
  },
  {
    id: 'db-fc-9',
    front: 'What does a LEFT JOIN do? When does it produce NULLs?',
    back: 'Returns all rows from the LEFT table, plus matching rows from the right table. Where there is no match in the right table, the right-side columns are NULL.\nUse case: find students who are NOT enrolled in any course (check for NULL on the right side).',
    topic: 'SQL Joins',
    module: 'db',
    difficulty: 'easy',
  },
  {
    id: 'db-fc-10',
    front: 'In an ER diagram, what is the difference between total and partial participation?',
    back: 'Total participation (double line): every entity in the set must participate in the relationship.\nPartial participation (single line): entities may or may not participate.\nExample: every Enrolment must reference a Student (total), but a Student need not be enrolled (partial).',
    topic: 'ER Diagrams',
    module: 'db',
    difficulty: 'easy',
  },
  {
    id: 'db-fc-11',
    front: 'How do you represent a M:N relationship when converting ER to relational schema?',
    back: 'Create a separate relation (table) containing the primary keys of both participating entities as foreign keys. These FKs together form the primary key of the new table.\nExample: Takes(StudentID, CourseID, Grade) for a M:N Student-Course relationship.',
    topic: 'ER to Relational',
    module: 'db',
    difficulty: 'easy',
  },
  {
    id: 'db-fc-12',
    front: 'What is a dirty read? Which isolation level prevents it?',
    back: 'A dirty read is when transaction T1 reads data written by T2 that has not yet committed — T2 may later roll back, leaving T1 with invalid data.\nPrevented by READ COMMITTED and higher isolation levels.',
    topic: 'Concurrency / Isolation',
    module: 'db',
    difficulty: 'easy',
  },

  // === MEDIUM (16 cards) ===
  {
    id: 'db-fc-13',
    front: 'What is 2NF? How does it differ from 1NF?',
    back: '2NF = 1NF + no partial dependency on any candidate key. A partial dependency exists when a non-key attribute depends on only PART of a composite candidate key.\nIf the candidate key is a single attribute, 2NF is automatically satisfied (there can be no partial dependencies).',
    topic: 'Normalisation',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-fc-14',
    front: 'What is 3NF? State the test.',
    back: '3NF = 2NF + no transitive dependency. A transitive dependency is A→B→C where B is not a candidate key and C is a non-key attribute.\nFormal test: For every non-trivial FD X→Y in F+, either X is a superkey OR Y is a prime attribute (part of some candidate key).',
    topic: 'Normalisation',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-fc-15',
    front: 'What is BCNF? How does it differ from 3NF?',
    back: 'BCNF: for every non-trivial FD X→Y, X must be a superkey. Stronger than 3NF — removes the allowance for prime attributes on the right-hand side.\nKey difference: BCNF may NOT preserve all functional dependencies; 3NF synthesis always preserves FDs.',
    topic: 'Normalisation',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-fc-16',
    front: 'State Armstrong\'s three axioms for functional dependencies.',
    back: '1. Reflexivity: if Y ⊆ X, then X→Y.\n2. Augmentation: if X→Y, then XZ→YZ (for any Z).\n3. Transitivity: if X→Y and Y→Z, then X→Z.\nThese three are sound and complete — all other FD rules (union, decomposition, pseudotransitivity) derive from them.',
    topic: 'Functional Dependencies',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-fc-17',
    front: 'How do you compute the attribute closure X+ for a set of FDs?',
    back: 'Algorithm:\n1. Start with result = X.\n2. Repeat: for each FD A→B in F, if A ⊆ result, add B to result.\n3. Stop when result does not change.\nUse: X is a superkey iff X+ = all attributes of R.',
    topic: 'Functional Dependencies',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-fc-18',
    front: 'What is the lossless decomposition test for splitting R into R1 and R2?',
    back: 'The decomposition R → {R1, R2} is lossless iff:\n  (R1 ∩ R2) → R1  OR  (R1 ∩ R2) → R2\nholds in F+.\nIn other words, the shared attributes must be a superkey of at least one of the two resulting relations.',
    topic: 'Normalisation',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-fc-19',
    front: 'Write a SQL query to list course IDs and the number of students enrolled in each, but only for courses with more than 10 students.',
    back: `SELECT courseID, COUNT(*) AS num_students
FROM Enrolment
GROUP BY courseID
HAVING COUNT(*) > 10;`,
    topic: 'SQL GROUP BY / HAVING',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-fc-20',
    front: 'Write a SQL correlated subquery to find all students whose GPA is above the average GPA of their own department.',
    back: `SELECT s1.name, s1.dept, s1.gpa
FROM Student s1
WHERE s1.gpa > (
  SELECT AVG(s2.gpa)
  FROM Student s2
  WHERE s2.dept = s1.dept
);`,
    topic: 'SQL Subqueries',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-fc-21',
    front: 'What is the difference between a correlated subquery and a non-correlated subquery?',
    back: 'Non-correlated: the inner query is independent and runs once. Example: WHERE gpa > (SELECT AVG(gpa) FROM Student).\nCorrelated: the inner query references the outer query\'s alias and re-runs for each outer row. Example: WHERE gpa > (SELECT AVG(gpa) FROM Student s2 WHERE s2.dept = s1.dept).',
    topic: 'SQL Subqueries',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-fc-22',
    front: 'What is a conflict in a concurrent schedule? When do two operations conflict?',
    back: 'Two operations conflict iff ALL three conditions hold:\n1. They belong to different transactions.\n2. They access the same data item.\n3. At least one of them is a WRITE.\nRead-read pairs never conflict. Write-write and read-write (in either order) do.',
    topic: 'Concurrency / Serialisability',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-fc-23',
    front: 'How do you test if a schedule is conflict-serialisable?',
    back: 'Build the precedence (conflict) graph:\n- One node per transaction.\n- Add edge Ti→Tj if Ti has an operation that conflicts with a later operation from Tj.\nThe schedule is conflict-serialisable iff the precedence graph has NO cycle.',
    topic: 'Concurrency / Serialisability',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-fc-24',
    front: 'What is the difference between READ COMMITTED and REPEATABLE READ isolation levels?',
    back: 'READ COMMITTED: prevents dirty reads (you only see committed data), but non-repeatable reads are possible — the same SELECT run twice can return different values.\nREPEATABLE READ: additionally prevents non-repeatable reads — re-reading a row returns the same value. But phantom reads (new rows appearing) are still possible.',
    topic: 'Concurrency / Isolation',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-fc-25',
    front: 'Write relational algebra to find names of students enrolled in course C101.',
    back: `π_{name}(σ_{courseID = 'C101'}(Student ⋈ Enrolment))

Steps:
1. Natural join Student ⋈ Enrolment (joins on shared studentID attribute)
2. σ filter to only C101 rows
3. π project out just the name column`,
    topic: 'Relational Algebra',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-fc-26',
    front: 'What is a weak entity? How is it represented in ER and in the relational schema?',
    back: 'A weak entity cannot be uniquely identified by its own attributes alone — it depends on an owner (strong) entity via an identifying relationship.\nER: double rectangle for entity, double diamond for identifying relationship.\nRelational: the weak entity\'s table includes the owner\'s PK as a FK; the PK of the weak table is (owner PK + discriminator).',
    topic: 'ER Diagrams',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-fc-27',
    front: 'Write SQL using EXISTS to find students who are enrolled in at least one course.',
    back: `SELECT s.name
FROM Student s
WHERE EXISTS (
  SELECT 1
  FROM Enrolment e
  WHERE e.studentID = s.studentID
);`,
    topic: 'SQL Subqueries',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-fc-28',
    front: 'What does the ρ (rho) operator do in relational algebra?',
    back: 'Rename — renames a relation and/or its attributes.\nNotation: ρ_{NewName(a1, a2, ...)}(R) renames relation R to NewName with new attribute names.\nUseful for self-joins where the same table appears twice and needs distinct names.',
    topic: 'Relational Algebra',
    module: 'db',
    difficulty: 'medium',
  },

  // === HARD (12 cards) ===
  {
    id: 'db-fc-29',
    front: 'Given R(A,B,C,D) with FDs: A→B, BC→D. Is R in 2NF? If not, decompose.',
    back: 'Candidate keys: first find AC+ = {A,B,C,D} (A→B, BC→D). Check AC is minimal: A+={A,B} ≠ all, C+={C} ≠ all. So AC is a candidate key.\nPartial dependency: A→B holds and A is a proper subset of candidate key AC. B is non-prime. So NOT in 2NF.\nDecompose: R1(A,B) — covers A→B; R2(A,C,D) — covers AC→D (BC→D rewritten). Now each non-key attr depends on the full key.',
    topic: 'Normalisation',
    module: 'db',
    difficulty: 'hard',
  },
  {
    id: 'db-fc-30',
    front: 'What is the 3NF synthesis algorithm? List all steps.',
    back: '1. Find a minimal cover (canonical cover) Fc of F.\n2. For each FD X→Y in Fc, create relation R_i(X ∪ Y).\n3. If no relation contains a candidate key of R, add a relation with the attributes of one candidate key.\n4. Remove any relation whose schema is a subset of another relation\'s schema.\nResult: lossless, dependency-preserving decomposition into 3NF.',
    topic: 'Normalisation',
    module: 'db',
    difficulty: 'hard',
  },
  {
    id: 'db-fc-31',
    front: 'TRAP: What is wrong with this SQL?\nSELECT dept, AVG(gpa)\nFROM Student\nWHERE AVG(gpa) > 3.0\nGROUP BY dept;',
    back: 'Error: you cannot use an aggregate function (AVG) in a WHERE clause. WHERE runs before GROUP BY, before aggregation exists.\nFix: move the condition to HAVING:\n\nSELECT dept, AVG(gpa)\nFROM Student\nGROUP BY dept\nHAVING AVG(gpa) > 3.0;',
    topic: 'SQL GROUP BY / HAVING',
    module: 'db',
    difficulty: 'hard',
  },
  {
    id: 'db-fc-32',
    front: 'Given a schedule: T1:R(A), T2:W(A), T1:W(A), T2:R(B), T1:R(B). Is it conflict-serialisable?',
    back: 'Conflicts:\n- T1:R(A) and T2:W(A): T1 reads A before T2 writes → edge T1→T2\n- T2:W(A) and T1:W(A): T2 writes A before T1 writes → edge T2→T1\nPrecedence graph: T1→T2 and T2→T1 → CYCLE.\nNot conflict-serialisable.',
    topic: 'Concurrency / Serialisability',
    module: 'db',
    difficulty: 'hard',
  },
  {
    id: 'db-fc-33',
    front: 'Write SQL to find courses that have NO students enrolled (using NOT EXISTS).',
    back: `SELECT c.courseID, c.title
FROM Course c
WHERE NOT EXISTS (
  SELECT 1
  FROM Enrolment e
  WHERE e.courseID = c.courseID
);`,
    topic: 'SQL Subqueries',
    module: 'db',
    difficulty: 'hard',
  },
  {
    id: 'db-fc-34',
    front: 'TRAP: Does BCNF decomposition always preserve functional dependencies? Explain.',
    back: 'No — BCNF decomposition may NOT preserve all FDs. When we split a relation to eliminate a BCNF violation, the FD that caused the violation may span the two resulting relations and can no longer be enforced by a single table constraint.\n3NF synthesis is used when dependency preservation is required.',
    topic: 'Normalisation',
    module: 'db',
    difficulty: 'hard',
  },
  {
    id: 'db-fc-35',
    front: 'Write relational algebra for: find names of students who are enrolled in ALL courses offered.',
    back: `Division (÷) captures "for all":\n\nπ_{studentID, courseID}(Enrolment) ÷ π_{courseID}(Course)\n\nThis gives studentIDs of students enrolled in every course. Then:\n\nπ_{name}(Student ⋈ (π_{studentID,courseID}(Enrolment) ÷ π_{courseID}(Course)))`,
    topic: 'Relational Algebra',
    module: 'db',
    difficulty: 'hard',
  },
  {
    id: 'db-fc-36',
    front: 'What phantom read anomaly is prevented only at SERIALISABLE isolation level?',
    back: 'A phantom read: T1 runs a query (e.g. SELECT WHERE gpa > 3.5) and gets a result set. T2 then inserts a new row matching that condition and commits. T1 re-runs the same query and sees extra rows — "phantoms".\nREPEATABLE READ prevents re-reading changed rows but not new rows. Only SERIALISABLE prevents phantoms.',
    topic: 'Concurrency / Isolation',
    module: 'db',
    difficulty: 'hard',
  },
  {
    id: 'db-fc-37',
    front: 'Given R(A,B,C) with FDs: A→B, B→C. Decompose into BCNF and test losslessness.',
    back: 'Candidate key: A+ = {A,B,C} → A is a candidate key.\nB→C violates BCNF (B is not a superkey).\nDecompose: R1(B,C) — covers B→C; R2(A,B) — covers A→B.\nLossless test: R1∩R2 = {B}. Does B→R1 i.e. B→BC? Yes (B→C holds). ✓ Lossless.\nNote: A→C (transitive) is now implied through R2⋈R1 but not stored in a single table.',
    topic: 'Normalisation',
    module: 'db',
    difficulty: 'hard',
  },
  {
    id: 'db-fc-38',
    front: 'Write SQL to find the department with the highest average GPA, returning the dept name and average.',
    back: `SELECT dept, AVG(gpa) AS avg_gpa
FROM Student
GROUP BY dept
ORDER BY avg_gpa DESC
LIMIT 1;

-- Or without LIMIT (portable):
SELECT dept, AVG(gpa) AS avg_gpa
FROM Student
GROUP BY dept
HAVING AVG(gpa) = (
  SELECT MAX(avg_g) FROM (
    SELECT AVG(gpa) AS avg_g FROM Student GROUP BY dept
  ) AS sub
);`,
    topic: 'SQL Aggregates',
    module: 'db',
    difficulty: 'hard',
  },
  {
    id: 'db-fc-39',
    front: 'TRAP: In an ISA hierarchy in ER, what are the two coverage constraints and what do they mean?',
    back: 'Covering constraint (total vs partial): total means every superclass entity must belong to at least one subclass; partial means it need not.\nOverlapping constraint (disjoint vs overlapping): disjoint means an entity can belong to at most one subclass; overlapping means it can belong to multiple.\nCombinations: {total, disjoint}, {total, overlapping}, {partial, disjoint}, {partial, overlapping}.',
    topic: 'ER Diagrams',
    module: 'db',
    difficulty: 'hard',
  },
  {
    id: 'db-fc-40',
    front: 'What is a non-repeatable read? How does it differ from a phantom read?',
    back: 'Non-repeatable read: T1 reads a row, T2 updates that same row and commits, T1 re-reads the row and sees different data. The SAME row changed.\nPhantom read: T1 runs a range query, T2 inserts NEW rows matching the range and commits, T1 re-runs the query and sees extra rows. NEW rows appeared.\nFix: non-repeatable → REPEATABLE READ; phantom → SERIALISABLE.',
    topic: 'Concurrency / Isolation',
    module: 'db',
    difficulty: 'hard',
  },

  // === NEW: ER-to-Relational Mapping (6 cards) ===
  {
    id: 'db-er-1',
    front: 'State the rule for converting a M:N relationship to a relational schema.',
    back: 'Create a separate relation (junction table) whose attributes are the primary keys of both participating entity sets (as foreign keys) plus any attributes of the relationship itself.\nThe primary key of the new table is the combination of the two foreign keys.\nExample: Enrols(studentID FK→Student, courseID FK→Course, grade). PK = (studentID, courseID).',
    topic: 'ER to Relational',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-er-2',
    front: 'State the rule for converting a weak entity set to a relational table.',
    back: 'Include all attributes of the weak entity set AND the primary key of its owner (identifying) entity set as a foreign key.\nThe primary key of the weak entity table is (owner PK + discriminator attribute).\nExample: Dependent(empID FK→Employee, depName, age). PK = (empID, depName).',
    topic: 'ER to Relational',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-er-3',
    front: 'How is a 1:N relationship represented in a relational schema?',
    back: 'Place the primary key of the "1" side as a foreign key in the table on the "N" side. No separate junction table is needed.\nExample: Department(deptID, name); Professor(profID, name, deptID FK→Department).\nThe FK (deptID) goes in Professor (the N side), not in Department (the 1 side).',
    topic: 'ER to Relational',
    module: 'db',
    difficulty: 'easy',
  },
  {
    id: 'db-er-4',
    front: 'What are the three options for mapping an ISA hierarchy to relational tables?',
    back: '1. Single table: one table with all superclass and subclass attributes; subclass-specific columns are NULL for non-members. Simple but many NULLs.\n2. Separate tables for subclasses only: each subclass table repeats the superclass PK and attributes. Subclass rows not stored in superclass table.\n3. Separate table per class: superclass table + one table per subclass containing only the subclass-specific attributes with the superclass PK as FK. Most normalised.',
    topic: 'ER to Relational',
    module: 'db',
    difficulty: 'hard',
  },
  {
    id: 'db-er-5',
    front: 'What is the difference between a strong and weak entity set?',
    back: 'Strong entity set: has enough attributes to form a primary key on its own — can be uniquely identified without reference to any other entity.\nWeak entity set: cannot be uniquely identified by its own attributes alone; depends on an owner (strong) entity via an identifying relationship. Its key is (owner PK + discriminator).\nIn ER diagrams: weak entity = double rectangle; identifying relationship = double diamond.',
    topic: 'ER to Relational',
    module: 'db',
    difficulty: 'easy',
  },
  {
    id: 'db-er-6',
    front: 'When converting an entity set to a table, which attributes become the primary key?',
    back: 'The underlined attributes in the ER diagram become the primary key of the corresponding relational table. These are the attributes that form the entity\'s key — a minimal set that uniquely identifies every entity in the set.\nFor a weak entity set, the PK is (owner entity\'s PK + discriminator attribute of the weak entity).',
    topic: 'ER to Relational',
    module: 'db',
    difficulty: 'easy',
  },

  // === NEW: Advanced SQL (4 cards) ===
  {
    id: 'db-adv-1',
    front: 'Write a CASE WHEN expression that labels salary as \'high\' if > 50000, else \'low\'.',
    back: `SELECT name,
       salary,
       CASE WHEN salary > 50000 THEN 'high'
            ELSE 'low'
       END AS salary_band
FROM Employee;

-- CASE WHEN evaluates conditions top-to-bottom; the first matching THEN is used.
-- ELSE is optional but recommended — without it, unmatched rows get NULL.`,
    topic: 'Advanced SQL',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-adv-2',
    front: 'Write a CTE (WITH clause) that computes average salary per department, then selects departments where avg > 40000.',
    back: `WITH dept_avg AS (
  SELECT dept,
         AVG(salary) AS avg_salary
  FROM Employee
  GROUP BY dept
)
SELECT dept, avg_salary
FROM dept_avg
WHERE avg_salary > 40000
ORDER BY avg_salary DESC;

-- CTEs (Common Table Expressions) improve readability.
-- The WITH block defines a named temporary result set reusable in the main query.`,
    topic: 'Advanced SQL',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-adv-3',
    front: 'What is the difference between RANK() and ROW_NUMBER()?',
    back: 'ROW_NUMBER(): assigns a unique sequential integer to every row within the partition. No ties — two rows with equal ORDER BY values still get different numbers.\nRANK(): assigns the same rank to tied rows, then skips the next ranks. E.g. two rows tied for rank 2 both get rank 2; the next row gets rank 4.\nDENSE_RANK(): like RANK() but does not skip — tied rows get the same rank and the next row gets rank 3 (not 4).',
    topic: 'Advanced SQL',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-adv-4',
    front: 'What is the difference between UNION and UNION ALL?',
    back: 'UNION: combines the result sets of two SELECT statements and removes duplicate rows. More expensive — requires a distinct/sort pass.\nUNION ALL: combines result sets and keeps all rows including duplicates. Faster.\nBoth require the same number of columns with compatible data types.\nUse UNION ALL when duplicates are acceptable or impossible — it is always faster.\nSee also: INTERSECT (rows in both), EXCEPT / MINUS (rows in first but not second).',
    topic: 'Advanced SQL',
    module: 'db',
    difficulty: 'medium',
  },
];

export const idsFlashcards: Flashcard[] = [
  // === EASY (12 cards) ===
  {
    id: 'ids-fc-1',
    front: 'What is the difference between l[1] and l[[1]] for a list l in R?',
    back: 'l[1] returns a LIST containing the first element — the "box" is preserved. Class is still "list".\nl[[1]] extracts the CONTENT of the first element — removes the box. Class is whatever the element is (e.g. numeric, character).\nExam trap: l[1] + 5 will error; l[[1]] + 5 works if the element is numeric.',
    topic: 'R Lists / Indexing',
    module: 'ids',
    difficulty: 'easy',
  },
  {
    id: 'ids-fc-2',
    front: 'What does geom_col() need that geom_bar() does not?',
    back: 'geom_col() requires both x and y aesthetics — y is the bar height you supply.\ngeom_bar() only needs x — it counts rows automatically (stat="count").\nExam trap: using geom_bar() with y= gives a "stat_count() must not be used with a y aesthetic" error.',
    topic: 'ggplot2',
    module: 'ids',
    difficulty: 'easy',
  },
  {
    id: 'ids-fc-3',
    front: 'Write the R code to compute the mean mass of starwars characters, ignoring NAs.',
    back: 'mean(starwars$mass, na.rm = TRUE)\n\nWithout na.rm = TRUE, the result is NA whenever any value is missing.',
    topic: 'dplyr / summarise',
    module: 'ids',
    difficulty: 'easy',
  },
  {
    id: 'ids-fc-4',
    front: 'What do the R Markdown chunk options echo and eval do?',
    back: 'echo = TRUE/FALSE — controls whether the source code is shown in the output.\neval = TRUE/FALSE — controls whether the code chunk is actually run.\necho=FALSE, eval=TRUE: code runs but is hidden (common for setup chunks).\necho=TRUE, eval=FALSE: code is shown but not run (useful for demonstrating syntax).',
    topic: 'R Markdown',
    module: 'ids',
    difficulty: 'easy',
  },
  {
    id: 'ids-fc-5',
    front: 'What does rep(x, times=3) produce vs rep(x, each=3) for x = c(1,2)?',
    back: 'rep(c(1,2), times=3) → 1 2 1 2 1 2  (repeats the whole vector 3 times)\nrep(c(1,2), each=3)  → 1 1 1 2 2 2  (repeats each element 3 times)',
    topic: 'R Vectors',
    module: 'ids',
    difficulty: 'easy',
  },
  {
    id: 'ids-fc-6',
    front: 'What does filter() do in dplyr? Write code to keep only human characters from starwars.',
    back: 'filter() selects ROWS that satisfy a condition (like SQL WHERE).\n\nstarwars |> filter(species == "Human")\n\nNote: use == not =. For NA filtering: filter(!is.na(species)).',
    topic: 'dplyr',
    module: 'ids',
    difficulty: 'easy',
  },
  {
    id: 'ids-fc-7',
    front: 'What does select() do in dplyr? Write code to keep only name and homeworld from starwars.',
    back: 'select() picks COLUMNS.\n\nstarwars |> select(name, homeworld)\n\nTo drop a column: select(-height)\nUseful helpers: contains("color"), starts_with("e"), where(is.numeric)',
    topic: 'dplyr',
    module: 'ids',
    difficulty: 'easy',
  },
  {
    id: 'ids-fc-8',
    front: 'What type does c(TRUE, 1.5) produce in R? What about c(TRUE, "a")?',
    back: 'c(TRUE, 1.5) → double vector: TRUE coerces to 1.0. Result: c(1.0, 1.5).\nc(TRUE, "a") → character vector: TRUE coerces to "TRUE". Result: c("TRUE", "a").\nCoercion hierarchy: logical < integer < double < complex < character.',
    topic: 'R Type Coercion',
    module: 'ids',
    difficulty: 'easy',
  },
  {
    id: 'ids-fc-9',
    front: 'Write the ggplot2 template for a scatter plot of height vs mass from starwars.',
    back: `ggplot(data = starwars, aes(x = height, y = mass)) +
  geom_point()

# With colour by species:
ggplot(starwars, aes(x = height, y = mass, colour = species)) +
  geom_point()`,
    topic: 'ggplot2',
    module: 'ids',
    difficulty: 'easy',
  },
  {
    id: 'ids-fc-10',
    front: 'What does mutate() do in dplyr? Write code to add a bmi column to starwars.',
    back: 'mutate() adds new columns or modifies existing ones, keeping all rows.\n\nstarwars |> mutate(bmi = mass / (height / 100)^2)\n\nTo overwrite a column: mutate(name = str_to_upper(name))',
    topic: 'dplyr',
    module: 'ids',
    difficulty: 'easy',
  },
  {
    id: 'ids-fc-11',
    front: 'What does pivot_longer() do? Write code to convert a wide data frame with columns "jan", "feb", "mar" into long format.',
    back: 'pivot_longer() converts wide format to long format — multiple columns become key-value pairs.\n\ndf |> pivot_longer(\n  cols = c(jan, feb, mar),\n  names_to = "month",\n  values_to = "value"\n)',
    topic: 'tidyr',
    module: 'ids',
    difficulty: 'easy',
  },
  {
    id: 'ids-fc-12',
    front: 'What is facet_wrap() used for in ggplot2? Write the code to facet a plot by continent.',
    back: 'facet_wrap() creates small multiples — one panel per level of a variable.\n\n+ facet_wrap(~continent)\n# or equivalently:\n+ facet_wrap(facets = vars(continent))\n\nUse ncol= or nrow= to control layout.',
    topic: 'ggplot2',
    module: 'ids',
    difficulty: 'easy',
  },

  // === MEDIUM (16 cards) ===
  {
    id: 'ids-fc-13',
    front: 'TRAP: What is wrong with this ggplot code?\nggplot(starwars, aes(x = name, y = height, shape = mass)) + geom_point()',
    back: 'shape can only be mapped to DISCRETE (categorical) variables. mass is continuous (numeric), so mapping it to shape throws an error: "A continuous variable can not be mapped to the shape aesthetic."\nFix: map a discrete variable to shape, or map mass to size or colour instead.',
    topic: 'ggplot2',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-fc-14',
    front: 'Write dplyr code to find the mean height per species in starwars, sorted descending, keeping only species with more than 1 character.',
    back: `starwars |>
  group_by(species) |>
  summarise(
    mean_height = mean(height, na.rm = TRUE),
    n = n()
  ) |>
  filter(n > 1) |>
  arrange(desc(mean_height))`,
    topic: 'dplyr',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-fc-15',
    front: 'What does across() do? Write code to convert all character columns except name to factor in starwars.',
    back: `across() applies a function to multiple columns selected with tidyselect helpers.

starwars |>
  mutate(across(where(is.character) & !name, as.factor))

# where(is.character) selects all character columns
# & !name excludes the name column
# as.factor is applied to each selected column`,
    topic: 'dplyr',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-fc-16',
    front: 'Explain the difference between left_join, inner_join, and anti_join.',
    back: 'left_join(x, y): all rows from x; matching rows from y; NULLs for non-matches.\ninner_join(x, y): only rows that have a match in BOTH x and y.\nanti_join(x, y): rows from x that have NO match in y — useful for "find characters not in dataset Y".\n\nAll use by = "key" argument.',
    topic: 'dplyr joins',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-fc-17',
    front: 'Write R code to create a factor for months using month.abb, ordered Jan–Dec, then display the levels.',
    back: `months_vec <- c("Mar", "Jan", "Dec", "Feb")
months_f <- factor(months_vec, levels = month.abb)
levels(months_f)
# [1] "Jan" "Feb" "Mar" "Apr" "May" "Jun" "Jul" "Aug" "Sep" "Oct" "Nov" "Dec"

# Without levels = month.abb, levels would be alphabetical`,
    topic: 'R Factors',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-fc-18',
    front: 'What does str_detect() return? Write code to filter starwars characters whose name contains "Sky".',
    back: `str_detect() returns a LOGICAL vector (TRUE/FALSE), not the matching strings.

starwars |> filter(str_detect(name, "Sky"))
# Returns Luke Skywalker, Anakin Skywalker, etc.

# For case-insensitive:
starwars |> filter(str_detect(name, regex("sky", ignore_case = TRUE)))`,
    topic: 'stringr',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-fc-19',
    front: 'Write R code using lubridate to parse "25/12/2024" as a date, then extract the month name.',
    back: `library(lubridate)
d <- dmy("25/12/2024")
month(d, label = TRUE, abbr = FALSE)
# [1] December
# Levels: January < February < ... < December

# month(d) alone returns the integer 12
# label = TRUE returns the factor with month name`,
    topic: 'lubridate',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-fc-20',
    front: 'What does reorder(x, y) do in ggplot2? Write code for a bar chart of starwars species counts, ordered by count.',
    back: `reorder(x, y) reorders the levels of factor x by the values of y — useful for sorting bars.

starwars |>
  count(species) |>
  filter(!is.na(species)) |>
  ggplot(aes(x = reorder(species, n), y = n)) +
  geom_col() +
  coord_flip()

# Without reorder(), bars appear in alphabetical order`,
    topic: 'ggplot2',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-fc-21',
    front: 'What does position_fill() do in ggplot2? When would you use it?',
    back: 'position_fill() stacks bars and normalises them to 100% — each bar has the same total height showing proportions rather than counts.\nUse when comparing the COMPOSITION of different groups.\n\nggplot(starwars, aes(x = sex, fill = gender)) +\n  geom_bar(position = position_fill()) +\n  labs(y = "proportion")\n\nContrast with position_stack() (stacks by count) and position_dodge() (side-by-side).',
    topic: 'ggplot2',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-fc-22',
    front: 'TRAP: What does results="hold" do in an R Markdown chunk?',
    back: 'results="hold" delays all output from a chunk until all code in the chunk has finished executing — output is shown together at the end instead of interleaved with each line.\nUseful when multiple expressions produce output and you want it grouped.\nDefault is results="markup" (output immediately after each expression).',
    topic: 'R Markdown',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-fc-23',
    front: 'Write code to create a matrix in R: rows are filled by row, 3 rows, 2 columns, values 1–6.',
    back: `matrix(1:6, nrow = 3, ncol = 2, byrow = TRUE)
#      [,1] [,2]
# [1,]    1    2
# [2,]    3    4
# [3,]    5    6

# Without byrow = TRUE (default fills by column):
#      [,1] [,2]
# [1,]    1    4
# [2,]    2    5
# [3,]    3    6`,
    topic: 'R Matrices',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-fc-24',
    front: 'How do you add a log scale to the x-axis in ggplot2? Write the code.',
    back: `# Option 1: scale transformation
+ scale_x_continuous(trans = "log")

# Option 2: log10 transformation
+ scale_x_log10()

# Option 3: transform the data in aes
ggplot(df, aes(x = log(gdpPercap), y = lifeExp))

# scale_x_log10() is most common for gapminder-style plots`,
    topic: 'ggplot2',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-fc-25',
    front: 'Write dplyr code using slice() to get the 3 tallest starwars characters.',
    back: `starwars |>
  arrange(desc(height)) |>
  slice(1:3)

# Or more idiomatically:
starwars |>
  slice_max(height, n = 3)

# slice_max handles ties with with_ties = FALSE`,
    topic: 'dplyr',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-fc-26',
    front: 'What is the difference between facet_wrap() and facet_grid()?',
    back: 'facet_wrap(~var): wraps panels for one variable into a rectangular layout. Use ncol/nrow to control shape.\nfacet_grid(rows=vars(x), cols=vars(y)): creates a strict grid with one variable on rows, another on columns. Shows all combinations, even empty ones.\n\nUse facet_grid when you have two categorical variables to cross; facet_wrap for one variable with many levels.',
    topic: 'ggplot2',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-fc-27',
    front: 'Write code using str_replace_all() to remove all punctuation from a character vector in R.',
    back: `library(stringr)
x <- c("Hello, World!", "foo-bar_baz.")
str_replace_all(x, "[[:punct:]]", "")
# [1] "Hello World"  "foobarbaz"

# [[:punct:]] is a POSIX character class matching all punctuation
# The replacement "" removes the matched characters`,
    topic: 'stringr',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-fc-28',
    front: 'How does a weighted mean differ from a regular mean? Write code for weighted.mean() in R.',
    back: `weighted.mean(x, w) computes sum(x * w) / sum(w).
Regular mean gives equal weight to each observation.
Weighted mean gives more influence to observations with higher weights.

# Example: average score weighted by number of students
weighted.mean(
  x = c(70, 80, 90),   # scores
  w = c(100, 50, 25)   # number of students
)
# (70*100 + 80*50 + 90*25) / (100+50+25) = 74.29`,
    topic: 'R Functions',
    module: 'ids',
    difficulty: 'medium',
  },

  // === HARD (12 cards) ===
  {
    id: 'ids-fc-29',
    front: 'TRAP: What does this R code produce? Explain the coercion.\nx <- TRUE\na <- 2.5\nresult <- c(a, x)',
    back: 'result is a DOUBLE vector: c(2.5, 1.0).\nTRUE coerces to 1L (integer) first, then since a is double, 1L is promoted to 1.0 (double).\nThe coercion hierarchy: logical → integer → double. The whole vector takes the "highest" type present.\nclass(result) is "numeric" (double).',
    topic: 'R Type Coercion',
    module: 'ids',
    difficulty: 'hard',
  },
  {
    id: 'ids-fc-30',
    front: 'Write the complete "grey background layer" ggplot trick to highlight one continent in gapminder.',
    back: `library(gapminder)
library(ggplot2)

# Remove continent column to create grey background data
bg <- gapminder |> select(-continent)

ggplot(gapminder |> filter(continent == "Europe"),
       aes(x = gdpPercap, y = lifeExp)) +
  geom_point(data = bg, colour = "grey80") +   # all data in grey
  geom_point(colour = "steelblue") +            # Europe highlighted
  scale_x_log10() +
  facet_wrap(~continent)`,
    topic: 'ggplot2',
    module: 'ids',
    difficulty: 'hard',
  },
  {
    id: 'ids-fc-31',
    front: 'TRAP: What happens when you run mean(c(1, 2, NA)) without na.rm? How do you fix it?',
    back: 'mean(c(1, 2, NA)) returns NA — the NA propagates.\nFix: mean(c(1, 2, NA), na.rm = TRUE) returns 1.5.\nSame applies to sum(), sd(), var(), median(). Always check for NAs before summarising.\nTo see how many NAs: sum(is.na(x)).',
    topic: 'R Missing Values',
    module: 'ids',
    difficulty: 'hard',
  },
  {
    id: 'ids-fc-32',
    front: 'Write code to convert the gapminder dataset from wide to long so that gdpPercap and lifeExp become key-value pairs.',
    back: `library(tidyr)
library(gapminder)

gapminder |>
  pivot_longer(
    cols = c(gdpPercap, lifeExp),
    names_to = "indicator",
    values_to = "value"
  )

# Result: each original row becomes 2 rows
# New columns: indicator ("gdpPercap" or "lifeExp") and value`,
    topic: 'tidyr',
    module: 'ids',
    difficulty: 'hard',
  },
  {
    id: 'ids-fc-33',
    front: 'Write code to create a stacked area chart of gapminder: total population by continent over time.',
    back: `library(gapminder)
library(dplyr)
library(ggplot2)

gapminder |>
  group_by(year, continent) |>
  summarise(total_pop = sum(pop), .groups = "drop") |>
  ggplot(aes(x = year, y = total_pop, fill = continent)) +
  geom_area() +
  scale_y_continuous(labels = scales::label_comma()) +
  labs(title = "World Population by Continent",
       x = "Year", y = "Total Population")`,
    topic: 'ggplot2',
    module: 'ids',
    difficulty: 'hard',
  },
  {
    id: 'ids-fc-34',
    front: 'TRAP: What is wrong with this list indexing?\nl <- list(a = 1:3, b = "hello")\nl["a"] + 5',
    back: 'l["a"] returns a LIST (a single-element list containing 1:3), not the vector 1:3.\nYou cannot do arithmetic on a list — this throws: "non-numeric argument to binary operator".\nFix: l[["a"]] + 5 or l$a + 5 — both extract the vector 1:3 and then add 5.',
    topic: 'R Lists / Indexing',
    module: 'ids',
    difficulty: 'hard',
  },
  {
    id: 'ids-fc-35',
    front: 'Write code to use geom_tile() to create a heat map of mean lifeExp for each continent-decade combination in gapminder.',
    back: `library(gapminder)
library(dplyr)
library(ggplot2)

gapminder |>
  mutate(decade = (year %/% 10) * 10) |>
  group_by(continent, decade) |>
  summarise(mean_life = mean(lifeExp), .groups = "drop") |>
  ggplot(aes(x = decade, y = continent, fill = mean_life)) +
  geom_tile() +
  scale_fill_gradient(low = "white", high = "darkblue") +
  labs(fill = "Mean Life Exp")`,
    topic: 'ggplot2',
    module: 'ids',
    difficulty: 'hard',
  },
  {
    id: 'ids-fc-36',
    front: 'What does as.integer(factor(c("b","a","c"))) return? Why?',
    back: `factor(c("b","a","c")) creates a factor with levels c("a","b","c") — sorted alphabetically by default.
as.integer() converts each element to its level index:
- "b" is level 2 → 2
- "a" is level 1 → 1
- "c" is level 3 → 3
Result: c(2, 1, 3)

To get a different ordering, specify levels= explicitly.`,
    topic: 'R Factors',
    module: 'ids',
    difficulty: 'hard',
  },
  {
    id: 'ids-fc-37',
    front: 'Write a complete dplyr pipeline to: (1) join starwars with a films_count data frame by "name", (2) keep only characters with films_count > 3, (3) compute mean height per species, (4) return the top 5 species.',
    back: `# Assume films_count has columns: name, n_films
starwars |>
  left_join(films_count, by = "name") |>
  filter(n_films > 3) |>
  group_by(species) |>
  summarise(
    mean_height = mean(height, na.rm = TRUE),
    n = n()
  ) |>
  slice_max(mean_height, n = 5)`,
    topic: 'dplyr joins',
    module: 'ids',
    difficulty: 'hard',
  },
  {
    id: 'ids-fc-38',
    front: 'How do you set chunk options globally in R Markdown? Write the code.',
    back: `In a setup chunk at the top of the document:

\`\`\`{r setup, include=FALSE}
knitr::opts_chunk$set(
  echo    = TRUE,
  warning = FALSE,
  message = FALSE,
  fig.width  = 7,
  fig.height = 5
)
\`\`\`

Individual chunks can still override these global defaults.`,
    topic: 'R Markdown',
    module: 'ids',
    difficulty: 'hard',
  },
  {
    id: 'ids-fc-39',
    front: 'TRAP: What is the difference between geom_histogram() and geom_bin2d()? When do you use each?',
    back: 'geom_histogram(): one continuous variable on x; counts observations per bin. Shows a 1D distribution.\ngeom_bin2d(): TWO continuous variables (x and y); counts observations in 2D bins. Shows joint distribution as a heat map of counts.\n\nggplot(diamonds, aes(x = carat, y = price)) + geom_bin2d()\n\nUse geom_bin2d() when a scatter plot is too overplotted (e.g. the diamonds dataset with 50k points).',
    topic: 'ggplot2',
    module: 'ids',
    difficulty: 'hard',
  },
  {
    id: 'ids-fc-40',
    front: 'Write code using str_sub() to extract the first 3 characters of each element in starwars$name.',
    back: `library(stringr)
str_sub(starwars$name, start = 1L, end = 3L)

# Returns first 3 characters of each name:
# [1] "Luk" "C-3" "R2-" "Dar" "Lei" ...

# To extract last 3 characters:
str_sub(starwars$name, start = -3L, end = -1L)`,
    topic: 'stringr',
    module: 'ids',
    difficulty: 'hard',
  },

  // === NEW: R Markdown chunk options (6 cards) ===
  {
    id: 'ids-rmd-1',
    front: 'What does `echo=FALSE` do in an R Markdown chunk?',
    back: 'echo=FALSE hides the source code from the rendered output but still runs the code and shows its output (plots, printed values, etc.).\nCommon use: setup chunks, loading libraries, or producing a plot without showing the code.\nContrast: eval=FALSE shows the code but does NOT run it.',
    topic: 'R Markdown',
    module: 'ids',
    difficulty: 'easy',
  },
  {
    id: 'ids-rmd-2',
    front: 'What is the difference between `results=\'hide\'` and `eval=FALSE`?',
    back: 'results=\'hide\': the code IS run (side effects like loading packages still happen), but any printed/text output is suppressed. Plots are still shown unless fig.show=\'hide\' is also set.\neval=FALSE: the code is NOT run at all — no side effects, no output. The code is shown (if echo=TRUE) but treated as inert.',
    topic: 'R Markdown',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-rmd-3',
    front: 'Write the setup chunk that globally sets results=\'hold\' and is hidden from the rendered output.',
    back: `\`\`\`{r setup, include=FALSE}
knitr::opts_chunk$set(results = "hold")
\`\`\`

Key points:
- include=FALSE hides both the code AND any output of this chunk.
- knitr::opts_chunk$set() applies defaults to ALL subsequent chunks.
- Individual chunks can override with their own options.`,
    topic: 'R Markdown',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-rmd-4',
    front: 'What chunk option suppresses warnings but still runs the code and shows output?',
    back: 'warning=FALSE suppresses warning messages from appearing in the rendered output. The code still runs and all normal output (printed values, plots) is still shown.\nSimilarly, message=FALSE suppresses informational messages (e.g. the "Attaching packages" message from library(tidyverse)).\nNeither warning=FALSE nor message=FALSE affects whether the code is run — they only control what appears in the output.',
    topic: 'R Markdown',
    module: 'ids',
    difficulty: 'easy',
  },
  {
    id: 'ids-rmd-5',
    front: 'What does `results=\'hold\'` do differently from default behaviour?',
    back: 'Default (results=\'markup\'): output is interleaved — each expression\'s output appears immediately after that line of code in the rendered document.\nresults=\'hold\': all output from the chunk is held and displayed together AFTER all the code has finished executing. The code block appears first, then all output below it.\nUseful when a chunk contains multiple expressions and you want output grouped at the bottom.',
    topic: 'R Markdown',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-rmd-6',
    front: 'Write the chunk option combination that shows the code but does not run it.',
    back: `\`\`\`{r, eval=FALSE, echo=TRUE}
# This code is displayed in the output but never executed.
mean(starwars$height, na.rm = TRUE)
\`\`\`

eval=FALSE — prevents execution.
echo=TRUE — shows the code (this is the default, so you can omit it).
Use case: demonstrating syntax or showing code that requires data not available at render time.`,
    topic: 'R Markdown',
    module: 'ids',
    difficulty: 'easy',
  },

  // === NEW: Data reading/parsing (5 cards) ===
  {
    id: 'ids-parse-1',
    front: 'Why does `read_csv2()` exist? When do you use it instead of `read_csv()`?',
    back: 'read_csv() assumes comma (,) as the field separator and period (.) as the decimal mark — the US/UK convention.\nread_csv2() assumes semicolon (;) as the field separator and comma (,) as the decimal mark — the European convention (countries where 1.234,56 is standard).\nUse read_csv2() when your CSV file comes from a European locale where numbers use a comma decimal mark and fields are separated by semicolons.',
    topic: 'Data Reading',
    module: 'ids',
    difficulty: 'easy',
  },
  {
    id: 'ids-parse-2',
    front: "What does `parse_double('1,5', locale=locale(decimal_mark=','))` return?",
    back: "parse_double('1,5', locale = locale(decimal_mark = ',')) returns the numeric value 1.5.\nWithout the locale argument, parse_double('1,5') would fail (return NA with a warning) because the default decimal mark is '.'.\nThe locale() function from readr lets you specify regional number formatting conventions.",
    topic: 'Data Reading',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-parse-3',
    front: 'Why might a numeric column be read as character by read_csv()?',
    back: 'read_csv() guesses column types by reading the first 1000 rows (by default). A column is read as character if:\n1. Non-numeric values appear (e.g. "N/A", "-", "—", or text mixed in).\n2. The decimal mark does not match the locale (e.g. "1,5" in a US locale).\n3. Thousands separators confuse the parser (e.g. "1,234").\nFix: use col_types to specify types explicitly, or use parse_number() / parse_double() with the correct locale after reading.',
    topic: 'Data Reading',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-parse-4',
    front: 'Write the R code to read the first 4 lines of a CSV file without loading the whole file.',
    back: `library(readr)

# Read only the first 4 lines (including header):
read_lines("data.csv", n_max = 4L)

# To parse those 4 lines as a data frame (3 data rows + header):
read_csv("data.csv", n_max = 3L)
# n_max controls the number of DATA rows read (not counting the header).

# Alternatively, for quick inspection without parsing:
read_lines("data.csv", n_max = 6L)  # see first 6 raw lines`,
    topic: 'Data Reading',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-parse-5',
    front: 'What does `clean_names()` from the janitor package do?',
    back: 'clean_names() converts column names to a consistent, snake_case format:\n- Converts to lowercase.\n- Replaces spaces and special characters with underscores.\n- Removes duplicate underscores.\n- Handles names that start with numbers by prepending "x".\n\nExample: "First Name" → "first_name", "Sales (£)" → "sales_gbp_".\n\nUsage: df |> janitor::clean_names()\n\nEssential when reading files with messy headers (e.g. Excel files).',
    topic: 'Data Reading',
    module: 'ids',
    difficulty: 'easy',
  },

  // === NEW: Logical indexing edge cases (4 cards) ===
  {
    id: 'ids-idx-1',
    front: 'What does `letters[27]` return and why?',
    back: 'letters[27] returns NA (not an error).\nletters has only 26 elements (a–z). Indexing beyond the length of a vector in R returns NA silently — R does not throw an out-of-bounds error.\nThis is a common exam trap: if you expect an error and instead get NA propagating through calculations, the result will be unexpected.\nContrast with lists: l[[27]] on a list of length 26 DOES throw a subscript out of bounds error.',
    topic: 'R Vectors / Indexing',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-idx-2',
    front: "What is the difference between `'b' == letters` and `'b' %in% letters`?",
    back: "'b' == letters returns a logical VECTOR of length 26: FALSE FALSE TRUE FALSE FALSE ... (TRUE only at position 2).\n'b' %in% letters returns a single logical value: TRUE.\n\nKey distinction:\n== compares element-by-element and returns a vector of the same length.\n%in% checks membership and always returns a single TRUE/FALSE (or one per element on the left-hand side).\n\nUse %in% when you want a simple yes/no membership test; use == when you need to know which positions match.",
    topic: 'R Vectors / Indexing',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-idx-3',
    front: "What does `x[y > 10] <- 'bla'` do when x and y are both length-26 vectors?",
    back: "This assigns the string 'bla' to every position in x where the corresponding element of y is greater than 10.\nCRITICAL TRAP: x is likely a numeric or logical vector. Assigning a character string to some elements forces the entire vector x to be coerced to character — all existing numeric values become character strings.\nResult: x is now a character vector. All elements not replaced by 'bla' have their original numeric values converted to character (e.g. 3 becomes '3').",
    topic: 'R Vectors / Indexing',
    module: 'ids',
    difficulty: 'hard',
  },
  {
    id: 'ids-idx-4',
    front: "What does `which(letters == 'c')` return?",
    back: "which() returns the INDICES (positions) of TRUE elements in a logical vector.\nletters == 'c' produces a length-26 logical vector: FALSE FALSE TRUE FALSE ...\nwhich(letters == 'c') returns 3 — the integer position where the condition is TRUE.\n\nContrast:\nletters == 'c'    → logical vector of length 26\nwhich(letters == 'c') → integer vector of positions: 3\n\nUseful for finding where something occurs without extracting the values themselves.",
    topic: 'R Vectors / Indexing',
    module: 'ids',
    difficulty: 'easy',
  },

  // === NEW: Tidy data / drop_na (3 cards) ===
  {
    id: 'ids-tidy-1',
    front: 'Define tidy data in one sentence.',
    back: 'Tidy data is a rectangular data structure where each variable has its own column, each observation has its own row, and each value has its own cell.\n(Wickham 2014 / R4DS definition)\nThe three rules:\n1. Each variable is a column.\n2. Each observation is a row.\n3. Each value is a cell.\nTidy data is the required input format for dplyr, ggplot2, and most tidyverse functions.',
    topic: 'Tidy Data',
    module: 'ids',
    difficulty: 'easy',
  },
  {
    id: 'ids-tidy-2',
    front: 'What is the difference between explicit and implicit missingness?',
    back: 'Explicit missingness: an NA value is present in the data — the cell exists but contains NA. You can see it.\nImplicit missingness: an entire row is absent from the data — the observation simply does not appear in the dataset. You cannot see it directly.\n\nExample (stock prices): if AAPL has no entry for 2023-12-25 (a holiday), that is implicit. If the row exists but price is NA, that is explicit.\n\nTo convert implicit to explicit: use tidyr::complete() or pivot_longer() which can surface missing combinations.',
    topic: 'Tidy Data',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'ids-tidy-3',
    front: 'Write the pivot_longer() call to reshape market_cap data from wide (company rows, date columns) to long format.',
    back: `# Wide format: company | 2020-Q1 | 2020-Q2 | 2020-Q3 ...
# Long format: company | date | market_capitalisation

df |>
  pivot_longer(
    cols      = !company,          # all columns except company
    names_to  = "date",
    values_to = "market_capitalisation"
  )

# !company selects every column that is NOT company.
# Equivalently: cols = -company or cols = starts_with("20")`,
    topic: 'Tidy Data',
    module: 'ids',
    difficulty: 'medium',
  },

  // === NEW: Sampling methods (2 cards) ===
  {
    id: 'ids-sample-1',
    front: 'What is the difference between a population and a sample?',
    back: 'Population: the complete set of all individuals/units of interest for a study. Studying the whole population gives exact (parameter) values but is usually impossible or impractical.\nSample: a subset of the population that is selected for study. Statistics computed from the sample (e.g. mean, proportion) are estimates of the true population parameters.\n\nKey types:\n- Simple random sample: every individual has an equal chance of selection.\n- Stratified sample: population divided into subgroups (strata); random sample taken from each.\n- Convenience sample: uses whoever is most available — prone to bias.',
    topic: 'Sampling',
    module: 'ids',
    difficulty: 'easy',
  },
  {
    id: 'ids-sample-2',
    front: 'Give one example of convenience sampling and explain why it introduces bias.',
    back: 'Example: surveying students in a single lecture hall to estimate average study hours for the whole university.\nBias introduced: students who attend lectures may study more than those who do not — the sample systematically over-represents one subgroup. The sample is not representative of the full student population.\n\nOther examples: online opt-in polls (only people with strong opinions respond — response bias), surveying friends (social circle may share similar demographics).\n\nConsequence: estimates from a convenience sample cannot be reliably generalised to the whole population.',
    topic: 'Sampling',
    module: 'ids',
    difficulty: 'medium',
  },
  {
    id: 'db-self-join-1',
    front: 'Write a SQL query to find all pairs of students enrolled in the same course. Each pair should appear only once (not both (A,B) and (B,A)).',
    back: `SELECT s1.name AS student1, s2.name AS student2, e1.courseID
FROM Enrolment e1
  JOIN Enrolment e2
    ON e1.courseID = e2.courseID
    AND e1.studentID < e2.studentID
  JOIN Student s1 ON e1.studentID = s1.studentID
  JOIN Student s2 ON e2.studentID = s2.studentID
ORDER BY e1.courseID, s1.name;

Key pattern: join the same table twice with different aliases (e1, e2).
Use < (not <>) to prevent duplicate pairs — < ensures each pair appears exactly once.
Then join back to Student to get names, since Enrolment stores IDs not names.`,
    topic: 'SQL Self Join',
    module: 'db',
    difficulty: 'medium',
  },
  {
    id: 'db-self-join-2',
    front: 'TRAP: Why does using <> instead of < in a self-join return duplicate pairs?',
    back: `Using <> (not equal) returns both (Alice, Bob) and (Bob, Alice) because:
- When e1=Alice and e2=Bob → <> condition is TRUE → row included
- When e1=Bob and e2=Alice → <> condition is TRUE → row included again

Using < (less than) returns each pair only once because:
- When e1.studentID=1 and e2.studentID=2 → 1 < 2 TRUE → included
- When e1.studentID=2 and e2.studentID=1 → 2 < 1 FALSE → excluded

Rule: always use t1.id < t2.id in a self-join to find unique pairs.`,
    topic: 'SQL Self Join',
    module: 'db',
    difficulty: 'easy',
  },
];
