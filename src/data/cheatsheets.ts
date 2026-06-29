export interface CheatsheetSection {
  title: string;
  items: { label: string; code: string; note?: string }[];
}

export interface Cheatsheet {
  id: string;
  title: string;
  module: 'db' | 'ids' | 'both';
  sections: CheatsheetSection[];
}

export const cheatsheets: Cheatsheet[] = [
  // ============================================================
  // 1. SQL BASICS
  // ============================================================
  {
    id: 'sql-basics',
    title: 'SQL Essentials',
    module: 'db',
    sections: [
      {
        title: 'Full Query Template',
        items: [
          {
            label: 'Canonical SELECT structure',
            code: `SELECT col1, col2, AGG(col3) AS alias
FROM TableA  [AS a]
  [JOIN TableB ON a.id = TableB.fk]
WHERE row_condition          -- runs BEFORE GROUP BY
GROUP BY col1, col2
HAVING agg_condition         -- runs AFTER GROUP BY
ORDER BY alias DESC
[LIMIT n];`,
            note: 'WHERE cannot use aggregate functions. HAVING can.',
          },
        ],
      },
      {
        title: 'SELECT / WHERE',
        items: [
          { label: 'Select all', code: 'SELECT * FROM Student;' },
          { label: 'Distinct', code: 'SELECT DISTINCT dept FROM Student;' },
          { label: 'Alias column', code: "SELECT name AS student_name, gpa * 100 AS pct FROM Student;" },
          { label: 'Comparison', code: "SELECT * FROM Student WHERE gpa >= 3.5 AND dept = 'CS';" },
          { label: 'LIKE pattern', code: "SELECT * FROM Student WHERE name LIKE 'J%';", note: "% = any chars; _ = one char" },
          { label: 'IN list', code: "SELECT * FROM Student WHERE dept IN ('CS','Maths','Physics');" },
          { label: 'BETWEEN', code: 'SELECT * FROM Student WHERE gpa BETWEEN 3.0 AND 4.0;', note: 'Inclusive on both ends' },
          { label: 'NULL check', code: 'SELECT * FROM Student WHERE email IS NULL;', note: 'Never use = NULL' },
          { label: 'NOT NULL', code: 'SELECT * FROM Student WHERE grade IS NOT NULL;' },
        ],
      },
      {
        title: 'Joins',
        items: [
          {
            label: 'INNER JOIN',
            code: `SELECT s.name, e.courseID
FROM Student s
  INNER JOIN Enrolment e ON s.studentID = e.studentID;`,
            note: 'Returns only rows with a match in BOTH tables',
          },
          {
            label: 'LEFT JOIN',
            code: `SELECT s.name, e.courseID
FROM Student s
  LEFT JOIN Enrolment e ON s.studentID = e.studentID;`,
            note: 'All rows from Student; NULL on right side if no match',
          },
          {
            label: 'Find unmatched (LEFT + IS NULL)',
            code: `SELECT s.name
FROM Student s
  LEFT JOIN Enrolment e ON s.studentID = e.studentID
WHERE e.studentID IS NULL;`,
            note: 'Students with no enrolment',
          },
          {
            label: 'Self join',
            code: `SELECT a.name AS student, b.name AS same_dept_peer
FROM Student a
  JOIN Student b ON a.dept = b.dept AND a.studentID < b.studentID;`,
          },
          {
            label: 'Three-table join',
            code: `SELECT s.name, c.title, e.grade
FROM Student s
  JOIN Enrolment e ON s.studentID = e.studentID
  JOIN Course c    ON e.courseID  = c.courseID;`,
          },
        ],
      },
      {
        title: 'Aggregates',
        items: [
          { label: 'COUNT rows', code: 'SELECT COUNT(*) FROM Enrolment;', note: 'Counts every row including NULLs' },
          { label: 'COUNT non-NULL', code: 'SELECT COUNT(grade) FROM Enrolment;', note: 'Excludes rows where grade IS NULL' },
          { label: 'SUM / AVG / MAX / MIN', code: 'SELECT SUM(pop), AVG(gdp), MAX(lifeExp), MIN(year) FROM gapminder;' },
          {
            label: 'GROUP BY with HAVING',
            code: `SELECT dept, COUNT(*) AS n, AVG(gpa) AS avg_gpa
FROM Student
GROUP BY dept
HAVING COUNT(*) >= 5 AND AVG(gpa) > 3.2
ORDER BY avg_gpa DESC;`,
          },
        ],
      },
      {
        title: 'Subqueries',
        items: [
          {
            label: 'Scalar subquery (non-correlated)',
            code: `SELECT name, gpa
FROM Student
WHERE gpa > (SELECT AVG(gpa) FROM Student);`,
            note: 'Inner query runs once',
          },
          {
            label: 'IN subquery',
            code: `SELECT name FROM Student
WHERE studentID IN (
  SELECT studentID FROM Enrolment WHERE courseID = 'CS101'
);`,
          },
          {
            label: 'NOT IN subquery',
            code: `SELECT name FROM Student
WHERE studentID NOT IN (
  SELECT studentID FROM Enrolment
);`,
            note: 'CAUTION: if the subquery returns any NULL, NOT IN returns empty — use NOT EXISTS instead',
          },
          {
            label: 'EXISTS (correlated)',
            code: `SELECT s.name
FROM Student s
WHERE EXISTS (
  SELECT 1 FROM Enrolment e
  WHERE e.studentID = s.studentID
);`,
            note: 'Correlated — re-evaluated for each row of outer query',
          },
          {
            label: 'NOT EXISTS',
            code: `SELECT s.name
FROM Student s
WHERE NOT EXISTS (
  SELECT 1 FROM Enrolment e
  WHERE e.studentID = s.studentID
);`,
            note: 'Safer than NOT IN when NULLs may be present',
          },
          {
            label: 'Correlated subquery (per-group avg)',
            code: `SELECT s1.name, s1.dept, s1.gpa
FROM Student s1
WHERE s1.gpa > (
  SELECT AVG(s2.gpa)
  FROM Student s2
  WHERE s2.dept = s1.dept   -- references outer alias
);`,
          },
          {
            label: 'Subquery in FROM (derived table)',
            code: `SELECT dept, avg_gpa
FROM (
  SELECT dept, AVG(gpa) AS avg_gpa
  FROM Student
  GROUP BY dept
) AS dept_avgs
WHERE avg_gpa > 3.5;`,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 2. RELATIONAL ALGEBRA
  // ============================================================
  {
    id: 'relational-algebra',
    title: 'Relational Algebra',
    module: 'db',
    sections: [
      {
        title: 'Core Operators',
        items: [
          {
            label: 'σ Selection (filter rows)',
            code: "σ_{condition}(R)\n\nExample: σ_{gpa > 3.5}(Student)\n→ returns rows where gpa > 3.5",
            note: 'Equivalent to SQL WHERE',
          },
          {
            label: 'π Projection (select columns)',
            code: "π_{col1, col2}(R)\n\nExample: π_{name, dept}(Student)\n→ returns only name and dept columns (duplicates removed)",
            note: 'Equivalent to SQL SELECT DISTINCT',
          },
          {
            label: 'ρ Rename',
            code: "ρ_{NewName(a1,a2,...)}(R)\n\nExample: ρ_{Emp(empID, empName)}(Employee)\n→ renames relation to Emp with new attribute names",
            note: 'Required for self-joins where same table appears twice',
          },
          {
            label: '⋈ Natural Join',
            code: "R ⋈ S\n\nExample: Student ⋈ Enrolment\n→ joins on all common attribute names; common columns appear once",
            note: 'Requires common attribute names to match semantically',
          },
          {
            label: '⋈_θ Theta Join',
            code: "R ⋈_{condition} S\n\nExample: Student ⋈_{Student.studentID = Enrolment.sid} Enrolment\n→ joins on explicit condition; all columns retained",
          },
          {
            label: '× Cartesian Product',
            code: "R × S\n\nReturns every combination of rows from R and S.\n|R × S| = |R| × |S|\n\nθ-join = σ_{condition}(R × S)",
          },
          {
            label: '∪ Union',
            code: "R ∪ S\n\nExample: π_{studentID}(Enrolled_CS) ∪ π_{studentID}(Enrolled_Maths)\n→ all student IDs in either set (duplicates removed)\n\nRequirement: R and S must be union-compatible (same arity and attribute types)",
          },
          {
            label: '∩ Intersection',
            code: "R ∩ S\n\nExample: π_{studentID}(Enrolled_CS) ∩ π_{studentID}(Enrolled_Maths)\n→ student IDs enrolled in BOTH CS and Maths",
          },
          {
            label: '− Set Difference',
            code: "R − S\n\nExample: π_{studentID}(Student) − π_{studentID}(Enrolment)\n→ students with NO enrolment\n\nEquivalent to SQL: WHERE studentID NOT IN (SELECT studentID FROM Enrolment)",
          },
          {
            label: '÷ Division (for all)',
            code: `R ÷ S\n\nR(A,B) ÷ S(B) returns values of A in R that are paired with EVERY value of B in S.\n\nExample:\n  Enrolled(studentID, courseID) ÷ π_{courseID}(Course)\n  → student IDs enrolled in ALL courses`,
            note: 'SQL equivalent: double NOT EXISTS (no native ÷ in SQL)',
          },
          {
            label: 'γ Grouping & Aggregation',
            code: "γ_{groupAttrs; AGG(attr)}(R)\n\nExample: γ_{dept; AVG(gpa)}(Student)\n→ one row per department with average GPA\n\nEquivalent to SQL GROUP BY",
          },
        ],
      },
      {
        title: 'Multi-step Examples',
        items: [
          {
            label: 'Students enrolled in CS101',
            code: "π_{name}(σ_{courseID='CS101'}(Student ⋈ Enrolment))",
          },
          {
            label: 'Students NOT in any course',
            code: "π_{name}(Student) − π_{name}(Student ⋈ Enrolment)",
          },
          {
            label: 'Students in CS101 AND MATH201',
            code: `Let A = π_{studentID}(σ_{courseID='CS101'}(Enrolment))
Let B = π_{studentID}(σ_{courseID='MATH201'}(Enrolment))
π_{name}(Student ⋈ (A ∩ B))`,
          },
          {
            label: 'Students in ALL courses (division)',
            code: "π_{name}(Student ⋈ (π_{studentID,courseID}(Enrolment) ÷ π_{courseID}(Course)))",
          },
        ],
      },
    ],
  },

  // ============================================================
  // 3. NORMALISATION
  // ============================================================
  {
    id: 'normalisation',
    title: 'Normalisation & Functional Dependencies',
    module: 'db',
    sections: [
      {
        title: 'Functional Dependencies',
        items: [
          {
            label: 'Definition',
            code: "X → Y  means: for any two tuples t1, t2 in R,\nif t1[X] = t2[X]  then  t1[Y] = t2[Y]\n\nX determines Y; knowing X uniquely identifies Y.",
          },
          {
            label: "Armstrong's Axioms (sound & complete)",
            code: `1. Reflexivity:   if Y ⊆ X, then X→Y
2. Augmentation:  if X→Y, then XZ→YZ  (for any Z)
3. Transitivity:  if X→Y and Y→Z, then X→Z

Derived rules:
4. Union:         X→Y and X→Z  ⟹  X→YZ
5. Decomposition: X→YZ  ⟹  X→Y and X→Z
6. Pseudotransitivity: X→Y and WY→Z  ⟹  WX→Z`,
          },
          {
            label: 'Attribute Closure Algorithm (X+)',
            code: `Input: set of attributes X, set of FDs F
Output: X+ = all attributes determined by X

result ← X
repeat
  for each FD  A→B  in F:
    if A ⊆ result:
      result ← result ∪ B
until result does not change

X is a superkey iff X+ = all attributes of R`,
          },
          {
            label: 'Attribute closure example',
            code: `R(A,B,C,D,E), FDs: A→B, BC→D, D→E
Find {A,C}+:

Start: {A,C}
A→B:  A⊆{A,C} → add B → {A,B,C}
BC→D: {B,C}⊆{A,B,C} → add D → {A,B,C,D}
D→E:  D⊆{A,B,C,D} → add E → {A,B,C,D,E} = all ✓

{A,C}+ = {A,B,C,D,E} → AC is a superkey
Check minimality: A+={A,B}, C+={C} — neither alone is superkey
→ AC is a CANDIDATE KEY`,
          },
        ],
      },
      {
        title: 'Normal Forms',
        items: [
          {
            label: '1NF',
            code: `Requirement: all attribute values are ATOMIC (indivisible).
No lists, sets, or repeating groups in any cell.
Each row uniquely identifiable.

Violation example:
  Student(id, name, courses)  where courses = "CS101, MATH201"
Fix: split into separate rows or a junction table.`,
          },
          {
            label: '2NF',
            code: `Requirement: 1NF + no PARTIAL DEPENDENCY.
A partial dependency: non-prime attribute Y depends on a PROPER SUBSET of a candidate key.

Only relevant when a candidate key is COMPOSITE.
If all candidate keys are single attributes → automatically in 2NF.

Violation example:
  R(StudentID, CourseID, StudentName, Grade)
  FDs: StudentID→StudentName (partial), {StudentID,CourseID}→Grade
  StudentName depends on StudentID alone (part of PK).
Fix: decompose into R1(StudentID,StudentName) and R2(StudentID,CourseID,Grade).`,
          },
          {
            label: '3NF',
            code: `Requirement: 2NF + no TRANSITIVE DEPENDENCY.
A transitive dependency: X→Y→Z where Y is not a candidate key and Z is non-prime.

Formal test: for every non-trivial FD X→Y in F+,
  EITHER X is a superkey  OR  Y is a prime attribute (part of some CK).

Violation example:
  R(StudentID, Dept, DeptHead)
  FDs: StudentID→Dept, Dept→DeptHead
  DeptHead transitively depends on StudentID via Dept.
Fix: R1(StudentID,Dept), R2(Dept,DeptHead).`,
          },
          {
            label: 'BCNF',
            code: `Requirement: for every non-trivial FD X→Y, X must be a SUPERKEY.
Stronger than 3NF — removes the "Y is prime" escape clause.

Advantage: eliminates all redundancy from FDs.
Disadvantage: may NOT preserve all functional dependencies.

Test: find all non-trivial FDs X→Y where X is not a superkey → BCNF violation.

Violation example:
  R(StudentID, CourseID, Instructor)
  FD: Instructor→CourseID (instructor teaches one course)
  Instructor is not a superkey.
Fix: R1(Instructor,CourseID), R2(StudentID,Instructor).`,
          },
        ],
      },
      {
        title: 'Decomposition Tests',
        items: [
          {
            label: 'Lossless Decomposition Test',
            code: `For R → {R1, R2}:
LOSSLESS iff  (R1 ∩ R2) → R1  OR  (R1 ∩ R2) → R2

i.e. the shared attributes must be a superkey of at least one piece.

Example:
  R(A,B,C), FDs: A→B, B→C
  Decompose into R1(A,B) and R2(B,C)
  R1 ∩ R2 = {B}
  Does B → R1 (i.e. B→AB)? B→C (yes) but B→A? Not given. B+={B,C}. No.
  Does B → R2 (i.e. B→BC)? B→C holds, so B+⊇{B,C}=R2. ✓ YES.
  → LOSSLESS`,
          },
          {
            label: 'Dependency Preservation Test',
            code: `A decomposition preserves FD X→Y iff X→Y can be derived from
the FDs that hold within the individual sub-relations alone
(without needing to join them).

BCNF may lose FDs; 3NF synthesis always preserves them.

Check: for each FD X→Y in F, verify that X→Y is implied
by the FDs projected onto the sub-relation containing X∪Y.`,
          },
          {
            label: '3NF Synthesis Algorithm',
            code: `Input: relation R, set of FDs F
Output: lossless, dependency-preserving 3NF decomposition

Step 1: Find minimal cover Fc (canonical cover) of F.
  a. Simplify RHS: split A→BC into A→B and A→C.
  b. Remove extraneous attributes from LHS.
  c. Remove redundant FDs (those derivable from remaining).

Step 2: For each FD X→Y in Fc, create relation Ri(X ∪ Y).

Step 3: If no Ri contains a candidate key of R, add a relation
        containing the attributes of one candidate key.

Step 4: Remove any Ri whose attributes are a subset of another Rj.`,
          },
          {
            label: 'BCNF Decomposition Algorithm',
            code: `Input: relation R, FDs F
Output: lossless BCNF decomposition (may not preserve all FDs)

result ← {R}
while any relation Ri in result violates BCNF:
  find FD X→Y in Ri where X is not a superkey of Ri
  replace Ri with:
    R1 = X ∪ Y          (covers the violating FD)
    R2 = Ri − Y + X     (remaining attributes, keep X as FK)
  verify losslessness: Ri∩R2 = X, and X→R1 ✓`,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 4. R BASICS
  // ============================================================
  {
    id: 'r-basics',
    title: 'R Basics — Vectors, Lists, Matrices',
    module: 'ids',
    sections: [
      {
        title: 'Vectors',
        items: [
          { label: 'Create with c()', code: 'x <- c(1, 2, 3, 4, 5)' },
          { label: 'Integer sequence', code: '1:5           # c(1,2,3,4,5)\n5:1           # c(5,4,3,2,1)' },
          { label: 'seq() — by step', code: 'seq(from = 0, to = 1, by = 0.25)    # 0.00 0.25 0.50 0.75 1.00' },
          { label: 'seq() — by length', code: 'seq(from = 0, to = 1, length = 5)   # same result' },
          {
            label: 'rep() — times vs each',
            code: 'rep(c(1,2), times = 3)  # 1 2 1 2 1 2\nrep(c(1,2), each  = 3)  # 1 1 1 2 2 2',
            note: 'times repeats the whole vector; each repeats each element',
          },
          { label: 'Vector length', code: 'length(x)   # number of elements\nnchar("hello")  # number of characters in a string' },
          {
            label: 'Indexing',
            code: 'x[2]          # 2nd element\nx[c(1,3)]     # 1st and 3rd\nx[-2]         # all except 2nd\nx[x > 3]      # logical indexing: 4, 5',
          },
        ],
      },
      {
        title: 'Type Coercion (EXAM TRAP)',
        items: [
          {
            label: 'Coercion hierarchy',
            code: 'logical  <  integer  <  double  <  complex  <  character\n\nWhen types are mixed, all values coerce UP to the highest type present.',
          },
          {
            label: 'Examples',
            code: 'c(TRUE, 1.5)       # double:    c(1.0, 1.5)\nc(TRUE, 1L)        # integer:   c(1L, 1L)\nc(TRUE, "a")       # character: c("TRUE", "a")\nc(1L, 2.5)         # double:    c(1.0, 2.5)\n\nTRUE  + 5L         # 6L  (integer)\nTRUE  + 5.0        # 6.0 (double)\npaste(1, TRUE)     # "1 TRUE" (paste always → character)',
          },
          {
            label: 'Checking types',
            code: 'class(x)      # "numeric", "integer", "logical", "character", "list"\ntypeof(x)     # lower-level: "double", "integer", ...\nis.numeric(x), is.character(x), is.logical(x)',
          },
        ],
      },
      {
        title: 'Lists',
        items: [
          { label: 'Create a list', code: 'l <- list(nums = 1:3, word = "hello", flag = TRUE)' },
          {
            label: 'Access — CRITICAL DIFFERENCE',
            code: 'l["nums"]      # returns a LIST (box preserved) — class: "list"\nl[["nums"]]    # returns the CONTENT (1:3) — class: "integer"\nl$nums         # same as l[["nums"]]',
            note: 'l["x"] + 5 → ERROR. l[["x"]] + 5 → works if numeric.',
          },
          { label: 'Modify / add element', code: 'l$new_element <- 42\nl[["nums"]] <- c(10, 20, 30)' },
          { label: 'Names of a list', code: 'names(l)   # character vector of element names' },
          { label: 'Length of list', code: 'length(l)  # number of elements' },
        ],
      },
      {
        title: 'Matrices',
        items: [
          {
            label: 'Create matrix (by column — default)',
            code: 'matrix(1:6, nrow = 2, ncol = 3)\n#      [,1] [,2] [,3]\n# [1,]    1    3    5\n# [2,]    2    4    6',
          },
          {
            label: 'Create matrix (by row)',
            code: 'matrix(1:6, nrow = 2, ncol = 3, byrow = TRUE)\n#      [,1] [,2] [,3]\n# [1,]    1    2    3\n# [2,]    4    5    6',
          },
          { label: 'cbind / rbind', code: 'cbind(c(1,2), c(3,4))  # binds as columns → 2×2 matrix\nrbind(c(1,2), c(3,4))  # binds as rows    → 2×2 matrix' },
          { label: 'Matrix indexing', code: 'm[1, ]    # first row\nm[ ,2]    # second column\nm[1, 2]   # element at row 1, col 2\nt(m)      # transpose' },
        ],
      },
      {
        title: 'Factors',
        items: [
          {
            label: 'Create factor (default: alphabetical levels)',
            code: 'f <- factor(c("b","a","c","a"))\nlevels(f)     # "a" "b" "c"\ntable(f)      # counts per level',
          },
          {
            label: 'Ordered factor with custom levels',
            code: 'months_f <- factor(c("Mar","Jan"), levels = month.abb)\n# Levels: Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec\n\nsort(months_f)   # sorts by level order, not alphabetically',
          },
          {
            label: 'as.integer() on factor',
            code: 'as.integer(factor(c("b","a","c")))\n# a=1, b=2, c=3 (alphabetical)\n# Result: c(2, 1, 3)',
            note: 'Integer codes = position in levels vector',
          },
          {
            label: 'Change levels',
            code: 'f <- factor(c("low","high","med"),\n            levels = c("low","med","high"))\nlevels(f) <- c("L","M","H")  # rename levels in place',
          },
        ],
      },
      {
        title: 'R Markdown Chunk Options',
        items: [
          {
            label: 'Key options',
            code: '```{r label, echo=TRUE, eval=TRUE, warning=FALSE,\n         message=FALSE, results="hold"}\n```\n\necho    = show/hide source code\neval    = run/skip the chunk\nwarning = show/suppress warnings\nmessage = show/suppress messages\nresults = "markup" (default) | "hold" | "hide" | "asis"',
          },
          {
            label: 'Global options',
            code: '```{r setup, include=FALSE}\nknitr::opts_chunk$set(\n  echo    = TRUE,\n  warning = FALSE,\n  message = FALSE\n)\n```',
          },
        ],
      },
    ],
  },

  // ============================================================
  // 5. DPLYR + TIDYR
  // ============================================================
  {
    id: 'dplyr-tidyr',
    title: 'dplyr + tidyr — Data Wrangling',
    module: 'ids',
    sections: [
      {
        title: 'Core dplyr Verbs',
        items: [
          {
            label: 'filter() — keep rows',
            code: `starwars |> filter(species == "Human")
starwars |> filter(height > 180, !is.na(mass))
starwars |> filter(species %in% c("Human","Droid"))`,
            note: 'Use == not =. Use !is.na() for NA filtering.',
          },
          {
            label: 'select() — keep/drop columns',
            code: `starwars |> select(name, height, mass)
starwars |> select(-films, -vehicles, -starships)   # drop list columns
starwars |> select(name | contains("color"))         # contains() helper
starwars |> select(where(is.numeric))                # all numeric cols`,
          },
          {
            label: 'mutate() — add/modify columns',
            code: `starwars |> mutate(bmi = mass / (height/100)^2)
starwars |> mutate(name = str_to_upper(name))        # overwrite
starwars |> mutate(across(where(is.character) & !name, as.factor))`,
          },
          {
            label: 'arrange() — sort rows',
            code: `starwars |> arrange(height)           # ascending
starwars |> arrange(desc(height))      # descending
starwars |> arrange(species, desc(mass))  # multi-column`,
          },
          {
            label: 'summarise() — aggregate',
            code: `starwars |>
  summarise(
    mean_height = mean(height, na.rm = TRUE),
    n           = n(),
    n_missing   = sum(is.na(height))
  )`,
            note: 'Always use na.rm=TRUE for mean/sum/sd on real data',
          },
          {
            label: 'group_by() + summarise()',
            code: `starwars |>
  group_by(species) |>
  summarise(
    mean_height = mean(height, na.rm = TRUE),
    n = n()
  ) |>
  filter(n > 1) |>
  arrange(desc(mean_height))`,
          },
          {
            label: 'count()',
            code: `starwars |> count(species)                  # count per species
starwars |> count(species, sort = TRUE)     # sorted descending
# Equivalent to: group_by(species) |> summarise(n = n())`,
          },
          {
            label: 'slice() variants',
            code: `starwars |> slice(1:5)                # rows 1–5
starwars |> slice_max(height, n = 3)  # 3 tallest
starwars |> slice_min(mass, n = 3)    # 3 lightest
starwars |> slice_sample(n = 10)      # random sample`,
          },
          {
            label: 'pull() — extract a column as vector',
            code: `starwars |> pull(name)        # returns character vector
starwars |> pull(height)      # returns numeric vector
# Different from select(name) which returns a tibble`,
          },
        ],
      },
      {
        title: 'across() — Apply to Multiple Columns',
        items: [
          {
            label: 'across() syntax',
            code: `# Apply function to selected columns
df |> mutate(across(where(is.numeric), round, digits = 2))

# across with named output
df |> summarise(across(where(is.numeric),
                        list(mean = mean, sd = sd),
                        na.rm = TRUE))

# Exclude a column: & !col_name
starwars |> mutate(across(where(is.character) & !name, as.factor))`,
          },
        ],
      },
      {
        title: 'Joins',
        items: [
          {
            label: 'Join types',
            code: `left_join(x, y, by = "key")    # all x rows; NULLs for non-matches
inner_join(x, y, by = "key")   # only matched rows
full_join(x, y, by = "key")    # all rows from both
anti_join(x, y, by = "key")    # x rows with NO match in y
semi_join(x, y, by = "key")    # x rows WITH a match in y (no y cols)`,
          },
          {
            label: 'Join with different key names',
            code: `left_join(orders, customers,
          by = c("customer_id" = "id"))`,
          },
        ],
      },
      {
        title: 'Missing Values',
        items: [
          {
            label: 'Detect and count NAs',
            code: `is.na(x)              # logical vector
sum(is.na(x))         # count NAs
colSums(is.na(df))    # count NAs per column`,
          },
          {
            label: 'Remove NA rows',
            code: `drop_na(df)               # removes rows with ANY NA
drop_na(df, height, mass)  # removes rows with NA in those columns
filter(df, !is.na(height)) # equivalent single-column version`,
          },
          {
            label: 'Aggregate ignoring NAs',
            code: `mean(x, na.rm = TRUE)
sum(x,  na.rm = TRUE)
sd(x,   na.rm = TRUE)
weighted.mean(x, w)   # no na.rm — remove NAs before calling`,
          },
        ],
      },
      {
        title: 'tidyr — Reshaping',
        items: [
          {
            label: 'pivot_longer() — wide to long',
            code: `df |> pivot_longer(
  cols      = c(jan, feb, mar),   # columns to pivot
  names_to  = "month",            # new column for old col names
  values_to = "value"             # new column for old col values
)`,
          },
          {
            label: 'pivot_wider() — long to wide',
            code: `df |> pivot_wider(
  names_from  = "month",   # column whose values become new col names
  values_from = "value"    # column whose values fill the new cols
)`,
          },
          {
            label: 'Complete workflow example',
            code: `gapminder |>
  pivot_longer(
    cols      = c(gdpPercap, lifeExp, pop),
    names_to  = "indicator",
    values_to = "value"
  ) |>
  group_by(continent, indicator) |>
  summarise(mean_val = mean(value), .groups = "drop")`,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 6. GGPLOT2
  // ============================================================
  {
    id: 'ggplot2',
    title: 'ggplot2 — Grammar of Graphics',
    module: 'ids',
    sections: [
      {
        title: 'Grammar Template',
        items: [
          {
            label: 'Full template',
            code: `ggplot(data = <DATA>, aes(<MAPPINGS>)) +
  <GEOM>(aes(<LOCAL_MAPPINGS>), <FIXED_PARAMS>) +
  <SCALE>() +
  <FACET>() +
  <COORD>() +
  labs(title=, subtitle=, x=, y=, colour=, fill=, caption=) +
  theme_<NAME>() +
  theme(<OVERRIDES>)`,
            note: 'Layers are added with +, not |>',
          },
        ],
      },
      {
        title: 'Geoms',
        items: [
          { label: 'Scatter plot', code: 'geom_point(aes(x=height, y=mass, colour=species, size=mass), alpha=0.7)' },
          { label: 'Line chart', code: 'geom_line(aes(x=year, y=lifeExp, group=country, colour=continent))' },
          {
            label: 'Bar chart (counts automatically)',
            code: `geom_bar(aes(x=species))
# Requires only x; counts rows. stat="count" by default`,
          },
          {
            label: 'Column chart (you supply y)',
            code: `geom_col(aes(x=species, y=n))
# Requires both x AND y. Use after count() or summarise().`,
          },
          { label: 'Histogram', code: 'geom_histogram(aes(x=price), bins=30, fill="steelblue", colour="white")' },
          { label: 'Boxplot', code: 'geom_boxplot(aes(x=cut, y=price, fill=cut))' },
          { label: '2D bin heatmap (dense scatter)', code: 'geom_bin2d(aes(x=carat, y=price))', note: 'Use when scatter is overplotted (e.g. diamonds dataset)' },
          { label: 'Tile heatmap', code: 'geom_tile(aes(x=var1, y=var2, fill=correlation))' },
          { label: 'Area / stacked area', code: 'geom_area(aes(x=year, y=total_pop, fill=continent))' },
          { label: 'Add smooth trend line', code: 'geom_smooth(method="lm")    # linear\ngeom_smooth(method="loess")  # non-parametric' },
        ],
      },
      {
        title: 'Aesthetics — Mapped vs Fixed',
        items: [
          {
            label: 'Mapped (inside aes())',
            code: `aes(colour = continent)   # colour varies by data value
aes(size   = pop)         # size varies by data value
aes(shape  = cut)         # shape varies by data value — DISCRETE ONLY`,
            note: 'TRAP: shape cannot be mapped to a continuous variable',
          },
          {
            label: 'Fixed (outside aes())',
            code: `geom_point(colour = "red")      # every point is red
geom_point(size   = 3)          # every point is size 3
geom_point(alpha  = 0.5)        # 50% transparent
geom_point(shape  = 16)         # filled circle`,
          },
          {
            label: 'Common aesthetics',
            code: `x, y          — position
colour/color  — line/point colour (border of filled geoms)
fill          — interior fill colour
size          — point size / line thickness
shape         — point shape (0–25; use named shapes too)
alpha         — opacity (0=transparent, 1=opaque)
linetype      — solid, dashed, dotted, etc.
group         — grouping without visual mapping (e.g. for lines)`,
          },
        ],
      },
      {
        title: 'Scales',
        items: [
          { label: 'Log x-axis', code: 'scale_x_log10()    # preferred: keeps original labels\nscale_x_continuous(trans = "log")' },
          { label: 'Reverse axis', code: 'scale_y_reverse()' },
          { label: 'Manual colour', code: 'scale_colour_manual(values = c("red","blue","green"))' },
          { label: 'Manual fill', code: 'scale_fill_manual(values = c(...), guide = "none")   # guide="none" removes legend' },
          { label: 'Diverging gradient', code: 'scale_fill_gradient2(low="red", mid="white", high="blue", midpoint=0)' },
          { label: 'Sequential gradient', code: 'scale_fill_gradient(low="white", high="darkblue")' },
          { label: 'Remove a legend', code: 'scale_colour_discrete(guide = "none")\n# or for any scale:\nscale_size(guide = "none")' },
          { label: 'Format axis labels', code: 'scale_y_continuous(labels = scales::label_comma())\nscale_x_continuous(labels = scales::label_percent())' },
        ],
      },
      {
        title: 'Facets',
        items: [
          {
            label: 'facet_wrap() — one variable',
            code: `+ facet_wrap(~continent)
+ facet_wrap(facets = vars(continent))
+ facet_wrap(~continent, ncol = 2, scales = "free_y")`,
            note: 'scales="free_y" lets each panel have its own y-axis range',
          },
          {
            label: 'facet_grid() — two variables',
            code: `+ facet_grid(rows = vars(continent), cols = vars(year))
# Creates a grid: each row = one continent, each col = one year`,
            note: 'Shows all combinations including empty cells',
          },
        ],
      },
      {
        title: 'Position Adjustments',
        items: [
          { label: 'Stacked bars (default)', code: 'geom_bar(position = "stack")' },
          { label: 'Proportional (100%) bars', code: 'geom_bar(position = position_fill())', note: 'Y-axis becomes proportion 0–1' },
          { label: 'Side-by-side bars', code: 'geom_bar(position = position_dodge())' },
        ],
      },
      {
        title: 'Ordering, Labels, Themes',
        items: [
          {
            label: 'Reorder bars by value',
            code: `starwars |>
  count(species) |>
  ggplot(aes(x = reorder(species, n), y = n)) +
  geom_col() + coord_flip()`,
            note: 'reorder(factor, value) sorts factor levels by a numeric vector',
          },
          {
            label: 'labs()',
            code: `labs(title    = "My Chart",
     subtitle = "Data from 2024",
     x        = "GDP per Capita (USD)",
     y        = "Life Expectancy (years)",
     colour   = "Continent",
     caption  = "Source: Gapminder")`,
          },
          { label: 'Built-in themes', code: 'theme_minimal()   # no background, subtle grid\ntheme_classic()   # white background, axis lines only\ntheme_bw()        # white background with grid\ntheme_void()      # completely blank' },
          { label: 'Rotate x-axis labels', code: 'theme(axis.text.x = element_text(angle = 45, hjust = 1))' },
          { label: 'coord_flip()', code: '+ coord_flip()   # swaps x and y axes; useful for horizontal bar charts' },
        ],
      },
      {
        title: 'Common Mistakes (Exam Traps)',
        items: [
          {
            label: 'shape mapped to continuous',
            code: `# ERROR:
ggplot(df, aes(x=x, y=y, shape=mass)) + geom_point()
# "A continuous variable can not be mapped to the shape aesthetic"
# Fix: use colour or size for continuous variables`,
          },
          {
            label: 'geom_bar() with y aesthetic',
            code: `# ERROR:
geom_bar(aes(x=species, y=n))
# "stat_count() must not be used with a y aesthetic"
# Fix: use geom_col(aes(x=species, y=n)) instead`,
          },
          {
            label: 'Filter in background layer not removing facet',
            code: `# Grey background trick — MUST remove the facet column:
bg <- gapminder |> select(-continent)   # ← key step
ggplot(gapminder |> filter(continent=="Europe"),
       aes(x=gdpPercap, y=lifeExp)) +
  geom_point(data=bg, colour="grey80", inherit.aes=FALSE) +
  geom_point() +
  facet_wrap(~continent)`,
            note: 'Without select(-continent), the grey points are still faceted and only appear in their own panel',
          },
          {
            label: 'Using + instead of |> and vice versa',
            code: `# CORRECT: dplyr uses |>
df |> filter(x > 0) |> mutate(y = x^2)

# CORRECT: ggplot layers use +
ggplot(df, aes(x=x)) + geom_histogram() + theme_minimal()

# WRONG:
ggplot(df, aes(x=x)) |> geom_histogram()   # error`,
          },
        ],
      },
    ],
  },
];
