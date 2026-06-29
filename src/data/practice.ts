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
  // === DATABASE SYSTEMS ===
  {
    id: 'db-p-1',
    prompt: 'Write a SQL query to find the names and GPAs of students in the "CS" department who have a GPA above the average GPA of ALL students.',
    topic: 'Nested subqueries',
    module: 'db',
    difficulty: 'medium',
    modelAnswer: `SELECT name, gpa
FROM Student
WHERE dept = 'CS'
  AND gpa > (SELECT AVG(gpa) FROM Student);`,
    commonMistakes: [
      'Forgetting to alias the subquery when used in FROM',
      'Using HAVING instead of WHERE for the GPA condition (no GROUP BY here)',
      'Comparing gpa > AVG(gpa) directly without a subquery — this is invalid',
    ],
  },
  {
    id: 'db-p-2',
    prompt: 'Given relation R(A, B, C, D) with FDs: AB→C, C→D, D→A. Find all candidate keys.',
    topic: 'Candidate keys',
    module: 'db',
    difficulty: 'hard',
    modelAnswer: `Compute closures:
- (AB)+ = {A, B, C, D} ✓ → AB is a candidate key
- (BC)+ = {B, C, D, A} = {A,B,C,D} ✓ → BC is a candidate key
- (BD)+ = {B, D, A, C} = {A,B,C,D} ✓ → BD is a candidate key

Check no subset is a key:
- A+={A,D} ✗, B+={B} ✗, C+={C,D,A} ✗, D+={D,A} ✗

Candidate keys: {AB, BC, BD}`,
    commonMistakes: [
      'Stopping after finding the first candidate key',
      'Not verifying that no proper subset of the candidate key is itself a key',
      'Forgetting to apply transitivity (e.g. C→D→A)',
    ],
  },
  {
    id: 'db-p-3',
    prompt: 'Decompose relation R(A, B, C, D, E) with FDs: A→BC, CD→E, B→D, E→A into BCNF. Show each step.',
    topic: 'BCNF',
    module: 'db',
    difficulty: 'hard',
    modelAnswer: `Step 1: Find candidate key. A+={A,B,C,D,E} so A is a CK.
Check FDs for BCNF violations:
- B→D: B is not a superkey → BCNF violation!

Step 2: Decompose on B→D:
  R1 = (B, D) — key: B  [satisfies BCNF]
  R2 = (A, B, C, E) — project FDs onto {A,B,C,E}

Step 3: Check R2. FDs in R2: A→BC, E→A.
  A is CK of R2. E+={E,A,B,C} so E is also CK. No violations.

Final decomposition: R1(B,D), R2(A,B,C,E)`,
    commonMistakes: [
      'Not re-checking remaining fragments after each decomposition step',
      'Using the original FDs on a fragment instead of projecting the FDs',
      'Confusing BCNF (every determinant is superkey) with 3NF definition',
    ],
  },
  {
    id: 'db-p-4',
    prompt: 'Write a SQL query using EXISTS to find all students who are enrolled in at least one course.',
    topic: 'EXISTS / IN / NOT EXISTS',
    module: 'db',
    difficulty: 'easy',
    modelAnswer: `SELECT s.sid, s.name
FROM Student s
WHERE EXISTS (
  SELECT 1
  FROM Enrolled e
  WHERE e.sid = s.sid
);`,
    commonMistakes: [
      'Writing SELECT * instead of SELECT 1 in the EXISTS subquery (both work but SELECT 1 is conventional)',
      'Forgetting the correlation condition e.sid = s.sid',
      'Using IN when the question specifies EXISTS',
    ],
  },
  {
    id: 'db-p-5',
    prompt: 'Explain what a conflict-serialisable schedule is and draw the precedence graph for: T1: R(A), W(A); T2: R(A), W(A) interleaved as T1:R(A), T2:R(A), T1:W(A), T2:W(A).',
    topic: 'Serialisability',
    module: 'db',
    difficulty: 'hard',
    modelAnswer: `A schedule is conflict-serialisable if it is equivalent to some serial schedule via swapping non-conflicting operations.

Conflicts (same data item, at least one write, different transactions):
- T1:R(A) and T2:W(A) → T2 must come after T1? No — T1 reads first, T2 writes second → edge T1→T2
- T2:R(A) and T1:W(A) → T1 writes after T2 reads → edge T2→T1

Precedence graph: T1 → T2 AND T2 → T1 → CYCLE!

Conclusion: The schedule is NOT conflict-serialisable.`,
    commonMistakes: [
      'Only checking write-write conflicts, forgetting read-write conflicts',
      'Drawing edges in the wrong direction (edge goes from the EARLIER conflicting op\'s transaction to the LATER one)',
      'Concluding serialisable without checking for cycles',
    ],
  },
  {
    id: 'db-p-6',
    prompt: 'Write relational algebra expressions for: (a) names of students in CS dept; (b) names of students who take course C101.',
    topic: 'Relational Algebra σ π ⋈',
    module: 'db',
    difficulty: 'medium',
    modelAnswer: `(a) π_{name}(σ_{dept='CS'}(Student))

(b) π_{name}(Student ⋈_{Student.sid=Enrolled.sid} σ_{cid='C101'}(Enrolled))

Or equivalently for (b):
π_{name}(σ_{cid='C101'}(Student ⋈ Enrolled))`,
    commonMistakes: [
      'Applying π (projection) before σ (selection) when you still need the filtered attribute',
      'Forgetting to project — leaving extra columns in the result',
      'Using ⋈ without specifying the join condition when attribute names differ',
    ],
  },
  {
    id: 'db-p-7',
    prompt: 'A relation R(StudentID, CourseID, CourseName, Instructor, InstructorOffice) has FDs: StudentID,CourseID→CourseName,Instructor; Instructor→InstructorOffice. Is R in 3NF? In BCNF? Decompose to BCNF.',
    topic: '3NF',
    module: 'db',
    difficulty: 'hard',
    modelAnswer: `Candidate key: {StudentID, CourseID}

3NF check: For Instructor→InstructorOffice:
  - Instructor is not a superkey
  - InstructorOffice is not a prime attribute
  → Violates 3NF (and BCNF)

BCNF decomposition on Instructor→InstructorOffice:
  R1(Instructor, InstructorOffice) — key: Instructor
  R2(StudentID, CourseID, CourseName, Instructor) — key: {StudentID, CourseID}

Both R1 and R2 satisfy BCNF. Decomposition is lossless (Instructor is in both, Instructor→InstructorOffice).`,
    commonMistakes: [
      'Claiming 3NF is satisfied without checking all FDs',
      'Not verifying losslessness of the decomposition',
      'Confusing prime attribute (part of some CK) with primary key attribute',
    ],
  },
  {
    id: 'db-p-8',
    prompt: 'Write SQL to find the second-highest GPA in the Student table (without using LIMIT/OFFSET).',
    topic: 'SQL SELECT/FROM/WHERE',
    module: 'db',
    difficulty: 'hard',
    modelAnswer: `SELECT MAX(gpa) AS second_highest
FROM Student
WHERE gpa < (SELECT MAX(gpa) FROM Student);

-- Alternative using subquery in FROM:
SELECT gpa
FROM Student
WHERE gpa = (
  SELECT MAX(gpa) FROM Student
  WHERE gpa < (SELECT MAX(gpa) FROM Student)
);`,
    commonMistakes: [
      'Forgetting that multiple students may share the highest GPA',
      'Using nested NOT IN which can fail with NULLs',
      'Using LIMIT 1 OFFSET 1 when question says not to use LIMIT/OFFSET',
    ],
  },
  {
    id: 'db-p-9',
    prompt: 'Explain the difference between READ COMMITTED and REPEATABLE READ isolation levels. What anomalies does each prevent?',
    topic: 'Isolation levels',
    module: 'db',
    difficulty: 'medium',
    modelAnswer: `READ COMMITTED:
  - Prevents: dirty reads (reading uncommitted changes from another transaction)
  - Allows: non-repeatable reads (reading the same row twice can give different results if another transaction committed between reads)
  - Allows: phantom reads

REPEATABLE READ:
  - Prevents: dirty reads AND non-repeatable reads
  - Guarantees: if you read a row twice in a transaction, you get the same value
  - Allows: phantom reads (new rows inserted by another transaction can appear in range queries)`,
    commonMistakes: [
      'Confusing dirty read (uncommitted data) with non-repeatable read (committed but changed data)',
      'Thinking REPEATABLE READ prevents phantom reads — it does not in standard SQL',
      'Stating that higher isolation = better performance (it trades off concurrency for correctness)',
    ],
  },
  {
    id: 'db-p-10',
    prompt: 'Given ER diagram: STUDENT(sid, name) —takes— COURSE(cid, title) with a many-to-many "takes" relationship that has attribute "grade". Map this to a relational schema.',
    topic: 'ER-to-relational mapping',
    module: 'db',
    difficulty: 'medium',
    modelAnswer: `STUDENT(sid PK, name)
COURSE(cid PK, title)
TAKES(sid FK→STUDENT, cid FK→COURSE, grade)
  Primary key of TAKES: {sid, cid}

Explanation:
- Each entity type becomes a relation with its own PK
- The many-to-many relationship becomes a separate relation
- The relationship attribute 'grade' goes into the relationship relation
- Combined {sid, cid} is the PK of TAKES (assuming one grade per student per course)`,
    commonMistakes: [
      'Forgetting to include relationship attributes in the new relation',
      'Making only one of the foreign keys the PK instead of the combination',
      'Not declaring the foreign key constraints',
    ],
  },

  // === INTRO TO DATA SCIENCE ===
  {
    id: 'ids-p-1',
    prompt: 'You have a data frame `sales` with columns: product, region, revenue, date. Write dplyr code to find the top 3 products by total revenue in the "North" region.',
    topic: 'dplyr filter/select/mutate',
    module: 'ids',
    difficulty: 'medium',
    modelAnswer: `library(dplyr)

sales %>%
  filter(region == "North") %>%
  group_by(product) %>%
  summarise(total_revenue = sum(revenue, na.rm = TRUE)) %>%
  arrange(desc(total_revenue)) %>%
  slice_head(n = 3)`,
    commonMistakes: [
      'Forgetting na.rm = TRUE in sum(), which returns NA if any value is NA',
      'Using head() instead of slice_head() after group operations',
      'Applying filter() after group_by() instead of before',
    ],
  },
  {
    id: 'ids-p-2',
    prompt: 'Create a ggplot2 visualisation showing monthly average temperature over a year, with a trend line. The data frame `weather` has columns: month (1-12), temp, city.',
    topic: 'ggplot2 aes/geom',
    module: 'ids',
    difficulty: 'medium',
    modelAnswer: `library(ggplot2)

ggplot(weather, aes(x = month, y = temp, colour = city)) +
  geom_line() +
  geom_point() +
  geom_smooth(method = "lm", se = FALSE, linetype = "dashed") +
  scale_x_continuous(breaks = 1:12,
                     labels = month.abb) +
  labs(title = "Monthly Average Temperature",
       x = "Month", y = "Temperature (°C)",
       colour = "City") +
  theme_minimal()`,
    commonMistakes: [
      'Not specifying method="lm" in geom_smooth (default is loess for n < 1000)',
      'Forgetting to set colour aesthetic when plotting multiple cities',
      'Using geom_bar instead of geom_line for continuous time data',
    ],
  },
  {
    id: 'ids-p-3',
    prompt: 'A wide-format dataset `scores` has columns: student_id, maths, english, science. Reshape it to long format and compute the mean score per subject.',
    topic: 'pivot_longer',
    module: 'ids',
    difficulty: 'medium',
    modelAnswer: `library(tidyr)
library(dplyr)

scores %>%
  pivot_longer(
    cols = c(maths, english, science),
    names_to = "subject",
    values_to = "score"
  ) %>%
  group_by(subject) %>%
  summarise(
    mean_score = mean(score, na.rm = TRUE),
    n = n()
  )`,
    commonMistakes: [
      'Using gather() instead of pivot_longer() (deprecated)',
      'Not specifying cols correctly — can also use cols = -student_id',
      'Forgetting na.rm = TRUE when computing means',
    ],
  },
  {
    id: 'ids-p-4',
    prompt: 'Explain what makes a graph misleading. Give 3 concrete examples with how you would fix each.',
    topic: 'Misleading graphs',
    module: 'ids',
    difficulty: 'easy',
    modelAnswer: `1. Truncated Y-axis (not starting at 0):
   - Problem: Makes small differences look dramatic
   - Fix: Start y-axis at 0 for bar charts; annotate clearly if truncated for line charts

2. Dual y-axes with different scales:
   - Problem: Can make any two variables look correlated
   - Fix: Use separate plots, or standardise both variables to same scale

3. Cherry-picked time range:
   - Problem: Shows only the period that supports the desired narrative
   - Fix: Show the full available time series, annotate notable events

Bonus: 3D pie charts — distort area perception. Fix: Use 2D pie or bar chart.`,
    commonMistakes: [
      'Only naming the problem without explaining why it misleads',
      'Not providing a fix',
      'Confusing correlation with causation as a "graph" problem — that\'s an interpretation problem',
    ],
  },
  {
    id: 'ids-p-5',
    prompt: 'Calculate the mean, median, standard deviation, and IQR of: 2, 4, 4, 4, 5, 5, 7, 9. Interpret whether mean or median is more appropriate.',
    topic: 'Mean / median / SD',
    module: 'ids',
    difficulty: 'easy',
    modelAnswer: `Data: 2, 4, 4, 4, 5, 5, 7, 9 (sorted)
n = 8

Mean = (2+4+4+4+5+5+7+9) / 8 = 40 / 8 = 5.0
Median = average of 4th and 5th values = (4+5)/2 = 4.5
SD = √(variance) ≈ √(3.857) ≈ 1.96
Q1 = 4, Q3 = 6, IQR = Q3 - Q1 = 2

Interpretation: Mean (5.0) is slightly pulled up by the outlier-ish value 9.
The data is slightly right-skewed. Median (4.5) is more robust.
Both are reasonable here — data has no extreme outliers.`,
    commonMistakes: [
      'Computing median incorrectly for even n (must average middle two values)',
      'Using n instead of n-1 in sample SD formula',
      'Not interpreting which measure is more appropriate given the distribution',
    ],
  },
  {
    id: 'ids-p-6',
    prompt: 'Write R code using lubridate to: (a) parse "2024-03-15" as a date; (b) add 6 months; (c) compute days between two dates; (d) extract the weekday name.',
    topic: 'lubridate dates',
    module: 'ids',
    difficulty: 'medium',
    modelAnswer: `library(lubridate)

# (a) Parse date
d1 <- ymd("2024-03-15")

# (b) Add 6 months
d2 <- d1 + months(6)  # 2024-09-15

# (c) Days between two dates
d_end <- ymd("2024-12-31")
as.numeric(d_end - d1)        # days difference = 291
# or: interval(d1, d_end) / days(1)

# (d) Weekday name
wday(d1, label = TRUE, abbr = FALSE)  # "Friday"`,
    commonMistakes: [
      'Using d1 + 6 instead of d1 + months(6) — adds 6 days not 6 months',
      'Forgetting label=TRUE in wday() — without it returns a number',
      'Using as.Date() instead of ymd() — both work but ymd() is more readable',
    ],
  },
  {
    id: 'ids-p-7',
    prompt: 'Describe the difference between stratified sampling and simple random sampling. When would you use each?',
    topic: 'Sampling methods',
    module: 'ids',
    difficulty: 'easy',
    modelAnswer: `Simple Random Sampling (SRS):
  - Every individual has an equal probability of selection
  - No pre-grouping; select n units randomly from entire population
  - Use when: population is homogeneous, or you have no prior knowledge of subgroups

Stratified Sampling:
  - Divide population into non-overlapping strata (subgroups)
  - Sample separately from each stratum (proportionally or equally)
  - Guarantees representation of each subgroup
  - Use when: population has distinct subgroups that vary internally (e.g., gender, age bands, regions)
  - More precise estimates for the same sample size than SRS

Example: Studying student satisfaction across year groups — stratify by year 1, 2, 3 to ensure each year is represented.`,
    commonMistakes: [
      'Confusing stratified sampling with cluster sampling (clusters are selected, not individuals from each cluster)',
      'Not mentioning that stratified gives better precision for the same n',
      'Saying stratified is always better — it requires knowing the strata in advance',
    ],
  },
  {
    id: 'ids-p-8',
    prompt: 'You have `df` with an NA in column "income". Write R code to: (a) count NAs; (b) remove rows with NA in income; (c) replace NA with the median income.',
    topic: 'Missing values handling',
    module: 'ids',
    difficulty: 'easy',
    modelAnswer: `library(dplyr)
library(tidyr)

# (a) Count NAs in income
sum(is.na(df$income))

# (b) Remove rows where income is NA
df_clean <- df %>% drop_na(income)
# or: df_clean <- df[!is.na(df$income), ]

# (c) Replace NA with median income
median_income <- median(df$income, na.rm = TRUE)
df_imputed <- df %>%
  mutate(income = replace_na(income, median_income))
# or: df$income[is.na(df$income)] <- median_income`,
    commonMistakes: [
      'Using median(df$income) without na.rm=TRUE — returns NA if any NA present',
      'Using na.omit(df) which drops rows with ANY NA, not just in income column',
      'Mutating in place without assignment: df %>% mutate() without <- assignment',
    ],
  },
  {
    id: 'ids-p-9',
    prompt: 'Customise a ggplot2 bar chart: add a title, change axis labels, rotate x-axis text 45°, use a minimal theme, and set bar fill to Loughborough purple (#3D0066).',
    topic: 'Themes',
    module: 'ids',
    difficulty: 'medium',
    modelAnswer: `ggplot(df, aes(x = category, y = count)) +
  geom_col(fill = "#3D0066") +
  labs(
    title = "Count by Category",
    x = "Category",
    y = "Count"
  ) +
  theme_minimal() +
  theme(
    axis.text.x = element_text(angle = 45, hjust = 1),
    plot.title = element_text(face = "bold", size = 14)
  )`,
    commonMistakes: [
      'Setting colour instead of fill for bar charts (colour is the border)',
      'Forgetting hjust=1 with angle=45 — text hangs at wrong position',
      'Putting theme_minimal() AFTER theme() — it overrides your custom theme() calls',
    ],
  },
  {
    id: 'ids-p-10',
    prompt: 'Write R code to perform a left join between `students` (student_id, name) and `grades` (student_id, subject, grade), then compute each student\'s mean grade.',
    topic: 'joins',
    module: 'ids',
    difficulty: 'medium',
    modelAnswer: `library(dplyr)

result <- students %>%
  left_join(grades, by = "student_id") %>%
  group_by(student_id, name) %>%
  summarise(
    mean_grade = mean(grade, na.rm = TRUE),
    num_subjects = n(),
    .groups = "drop"
  ) %>%
  arrange(desc(mean_grade))`,
    commonMistakes: [
      'Using inner_join which drops students with no grades (left_join keeps all students)',
      'Forgetting .groups = "drop" causing grouped tibble in output',
      'Not specifying by = "student_id" — works if names match, but explicit is safer',
    ],
  },
];
