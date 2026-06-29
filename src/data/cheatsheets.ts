export interface CheatsheetItem {
  label: string;
  code: string;
  note?: string;
}

export interface CheatsheetSection {
  title: string;
  items: CheatsheetItem[];
}

export interface Cheatsheet {
  id: string;
  title: string;
  module: 'db' | 'ids' | 'both';
  sections: CheatsheetSection[];
}

export const cheatsheets: Cheatsheet[] = [
  {
    id: 'sql-basics',
    title: 'SQL Essentials',
    module: 'db',
    sections: [
      {
        title: 'Basic Query Structure',
        items: [
          { label: 'Full SELECT template', code: `SELECT col1, col2, AGG(col3)\nFROM TableA\n  JOIN TableB ON TableA.id = TableB.fk\nWHERE condition\nGROUP BY col1, col2\nHAVING agg_condition\nORDER BY col1 DESC;` },
          { label: 'Select all', code: 'SELECT * FROM Student;' },
          { label: 'Distinct values', code: 'SELECT DISTINCT dept FROM Student;' },
          { label: 'Alias', code: 'SELECT name AS student_name FROM Student s;' },
        ],
      },
      {
        title: 'Filtering',
        items: [
          { label: 'WHERE basics', code: "SELECT * FROM Student WHERE gpa > 3.5 AND dept = 'CS';" },
          { label: 'LIKE pattern', code: "SELECT * FROM Student WHERE name LIKE 'J%';" },
          { label: 'IN list', code: "SELECT * FROM Student WHERE dept IN ('CS', 'Maths', 'Physics');" },
          { label: 'BETWEEN', code: 'SELECT * FROM Student WHERE gpa BETWEEN 3.0 AND 4.0;' },
          { label: 'IS NULL', code: 'SELECT * FROM Student WHERE email IS NULL;' },
        ],
      },
      {
        title: 'Joins',
        items: [
          { label: 'INNER JOIN', code: 'SELECT s.name, e.cid\nFROM Student s\n  INNER JOIN Enrolled e ON s.sid = e.sid;' },
          { label: 'LEFT OUTER JOIN', code: 'SELECT s.name, e.cid\nFROM Student s\n  LEFT JOIN Enrolled e ON s.sid = e.sid;', note: 'Keeps all rows from left table' },
          { label: 'NATURAL JOIN', code: 'SELECT * FROM Student NATURAL JOIN Enrolled;', note: 'Joins on all common column names' },
          { label: 'Self join', code: 'SELECT A.name, B.name\nFROM Employee A\n  JOIN Employee B ON A.manager_id = B.eid;' },
        ],
      },
      {
        title: 'Aggregation',
        items: [
          { label: 'COUNT', code: 'SELECT COUNT(*) FROM Student;\nSELECT COUNT(DISTINCT dept) FROM Student;' },
          { label: 'SUM / AVG / MIN / MAX', code: 'SELECT dept, AVG(gpa), MAX(gpa), MIN(gpa)\nFROM Student\nGROUP BY dept;' },
          { label: 'HAVING', code: 'SELECT dept, COUNT(*) AS n\nFROM Student\nGROUP BY dept\nHAVING COUNT(*) > 5;', note: 'Filters groups, not rows' },
        ],
      },
      {
        title: 'Subqueries',
        items: [
          { label: 'Scalar subquery', code: 'SELECT name FROM Student\nWHERE gpa > (SELECT AVG(gpa) FROM Student);' },
          { label: 'IN subquery', code: "SELECT name FROM Student\nWHERE sid IN (SELECT sid FROM Enrolled WHERE cid = 'C101');" },
          { label: 'EXISTS', code: 'SELECT s.name FROM Student s\nWHERE EXISTS (\n  SELECT 1 FROM Enrolled e\n  WHERE e.sid = s.sid\n);' },
          { label: 'NOT EXISTS (division)', code: "SELECT s.sid FROM Student s\nWHERE NOT EXISTS (\n  SELECT c.cid FROM Course c\n  WHERE NOT EXISTS (\n    SELECT e.sid FROM Enrolled e\n    WHERE e.sid = s.sid AND e.cid = c.cid\n  )\n);", note: 'Finds students enrolled in ALL courses' },
          { label: 'Subquery in FROM', code: 'SELECT dept, avg_gpa\nFROM (\n  SELECT dept, AVG(gpa) AS avg_gpa\n  FROM Student\n  GROUP BY dept\n) AS dept_avgs\nWHERE avg_gpa > 3.5;' },
        ],
      },
    ],
  },
  {
    id: 'relational-algebra',
    title: 'Relational Algebra',
    module: 'db',
    sections: [
      {
        title: 'Core Operators',
        items: [
          { label: 'Selection σ', code: 'σ_{condition}(R)', note: 'Filters rows. SQL: WHERE clause' },
          { label: 'Projection π', code: 'π_{A1, A2, ...}(R)', note: 'Selects columns (removes duplicates). SQL: SELECT DISTINCT' },
          { label: 'Natural Join ⋈', code: 'R ⋈ S', note: 'Joins on all common attributes. SQL: NATURAL JOIN' },
          { label: 'Theta Join ⋈_θ', code: 'R ⋈_{R.A op S.B} S', note: 'Join with arbitrary condition' },
          { label: 'Rename ρ', code: 'ρ_{NewName}(R)  or  ρ_{NewName(A1,A2,...)}(R)', note: 'Renames relation or attributes' },
        ],
      },
      {
        title: 'Set Operators',
        items: [
          { label: 'Union R ∪ S', code: 'R ∪ S', note: 'All tuples in R or S (removes duplicates). Tables must be union-compatible.' },
          { label: 'Intersection R ∩ S', code: 'R ∩ S', note: 'Tuples in both R and S' },
          { label: 'Difference R − S', code: 'R − S', note: 'Tuples in R but not in S. SQL: EXCEPT' },
          { label: 'Cartesian Product R × S', code: 'R × S', note: 'All combinations. SQL: CROSS JOIN' },
        ],
      },
      {
        title: 'Aggregation Operator',
        items: [
          { label: 'Grouping & Aggregation γ', code: 'γ_{A; AGG(B)}(R)', note: 'Group by A, compute AGG on B. SQL: GROUP BY' },
          { label: 'Example', code: 'γ_{dept; AVG(gpa)→avg_gpa}(Student)', note: 'Average GPA per department' },
        ],
      },
      {
        title: 'Common Patterns',
        items: [
          { label: 'Find names of CS students with gpa > 3.5', code: "π_{name}(σ_{dept='CS' ∧ gpa>3.5}(Student))" },
          { label: 'Students enrolled in course C101', code: "π_{name}(Student ⋈ σ_{cid='C101'}(Enrolled))" },
          { label: 'Students NOT enrolled in any course', code: 'π_{sid}(Student) − π_{sid}(Enrolled)' },
        ],
      },
    ],
  },
  {
    id: 'normalisation',
    title: 'Normalisation & FDs',
    module: 'db',
    sections: [
      {
        title: 'Functional Dependencies',
        items: [
          { label: 'Definition', code: 'X → Y: if t1[X] = t2[X] then t1[Y] = t2[Y] for all tuples', note: 'X functionally determines Y' },
          { label: 'Armstrong\'s Axioms', code: 'Reflexivity: Y ⊆ X → X → Y\nAugmentation: X→Y → XZ→YZ\nTransitivity: X→Y, Y→Z → X→Z', note: 'Complete and sound' },
          { label: 'Attribute closure X+', code: 'result = X\nRepeat: if Y→Z ∈ F and Y ⊆ result: result = result ∪ Z\nUntil no change', note: 'X is superkey iff X+ = all attributes' },
        ],
      },
      {
        title: 'Normal Forms',
        items: [
          { label: '1NF', code: 'All attributes atomic (no lists/sets)\nEach row uniquely identifiable', note: 'No repeating groups' },
          { label: '2NF', code: '1NF + No partial dependencies\n(every non-prime attr fully depends on every CK)', note: 'Only an issue when CK is composite' },
          { label: '3NF', code: '2NF + No transitive dependencies\nFor X→A: X is superkey OR A is prime attribute', note: 'Less strict than BCNF; preserves dependencies' },
          { label: 'BCNF', code: 'For every non-trivial FD X→Y:\n  X must be a superkey', note: 'Eliminates all anomalies but may lose dependency preservation' },
        ],
      },
      {
        title: 'Decomposition Properties',
        items: [
          { label: 'Lossless decomposition test', code: 'R decomposed to R1, R2 is lossless if:\n  R1 ∩ R2 → R1  OR  R1 ∩ R2 → R2', note: 'Natural join of R1 and R2 must recover R' },
          { label: 'Dependency preservation', code: 'All FDs from F can be enforced\nusing only the decomposed relations\n(no joins needed to check FDs)', note: 'BCNF may sacrifice this; 3NF always preserves' },
        ],
      },
    ],
  },
  {
    id: 'r-dplyr',
    title: 'R & dplyr',
    module: 'ids',
    sections: [
      {
        title: 'R Basics',
        items: [
          { label: 'Assignment', code: 'x <- 42\ny = "hello"  # also works', note: '<- is preferred style' },
          { label: 'Vectors', code: 'v <- c(1, 2, 3, 4, 5)\nseq(1, 10, by=2)   # 1,3,5,7,9\nrep(0, times=5)    # 0,0,0,0,0' },
          { label: 'Indexing', code: 'v[2]           # 2nd element (R is 1-indexed!)\nv[c(1,3)]      # 1st and 3rd\nv[v > 3]       # logical indexing: 4,5\nv[-1]          # all except 1st' },
          { label: 'Data frame basics', code: 'df <- read.csv("data.csv")\nhead(df, 10)     # first 10 rows\nstr(df)          # structure\nsummary(df)      # summary stats\nnrow(df); ncol(df); dim(df)' },
          { label: 'Apply family', code: 'sapply(v, function(x) x^2)  # vector result\nlapply(list, fn)             # list result\napply(matrix, 1, sum)        # row sums' },
        ],
      },
      {
        title: 'dplyr Verbs',
        items: [
          { label: 'filter() — rows', code: "df %>% filter(age > 30, dept == 'CS')", note: 'Comma = AND' },
          { label: 'select() — columns', code: 'df %>% select(name, age, gpa)\ndf %>% select(-id)           # drop id\ndf %>% select(starts_with("score"))', note: 'Use - to exclude' },
          { label: 'mutate() — new columns', code: 'df %>% mutate(\n  age_sq = age^2,\n  z = (score - mean(score)) / sd(score)\n)' },
          { label: 'arrange() — sort', code: 'df %>% arrange(name)\ndf %>% arrange(desc(gpa), name)' },
          { label: 'group_by() + summarise()', code: 'df %>%\n  group_by(dept) %>%\n  summarise(\n    avg_gpa = mean(gpa, na.rm=TRUE),\n    n = n()\n  ) %>%\n  ungroup()' },
          { label: 'slice operations', code: 'df %>% slice_head(n=5)\ndf %>% slice_max(gpa, n=3)\ndf %>% slice_min(age, n=1)' },
          { label: 'Joins', code: 'left_join(x, y, by="id")\ninner_join(x, y, by=c("sid"="student_id"))\nanti_join(x, y, by="id")  # in x not in y' },
        ],
      },
      {
        title: 'Summary Statistics',
        items: [
          { label: 'Central tendency', code: 'mean(x, na.rm=TRUE)\nmedian(x, na.rm=TRUE)\nMode: names(sort(table(x), decreasing=TRUE))[1]' },
          { label: 'Spread', code: 'sd(x, na.rm=TRUE)    # standard deviation\nvar(x, na.rm=TRUE)   # variance\nIQR(x, na.rm=TRUE)   # interquartile range\nrange(x)             # min and max' },
          { label: 'Quantiles', code: 'quantile(x, 0.25)    # Q1\nquantile(x, 0.75)    # Q3\nquantile(x, c(0.1, 0.5, 0.9))' },
        ],
      },
    ],
  },
  {
    id: 'tidyr-reshape',
    title: 'tidyr & Reshaping',
    module: 'ids',
    sections: [
      {
        title: 'Pivoting',
        items: [
          { label: 'pivot_longer (wide → long)', code: `df %>%\n  pivot_longer(\n    cols = c(jan, feb, mar),   # or cols = -id\n    names_to = "month",\n    values_to = "revenue"\n  )` },
          { label: 'pivot_wider (long → wide)', code: `df %>%\n  pivot_wider(\n    names_from = "subject",\n    values_from = "score",\n    values_fill = 0      # fill NAs with 0\n  )` },
        ],
      },
      {
        title: 'Missing Values',
        items: [
          { label: 'Detect NAs', code: 'is.na(x)               # vector of TRUE/FALSE\nsum(is.na(df$col))     # count NAs\ncolSums(is.na(df))     # NAs per column' },
          { label: 'Remove NAs', code: 'drop_na(df)            # drop rows with ANY NA\ndrop_na(df, income)   # drop rows where income is NA\nna.omit(df)           # base R equivalent' },
          { label: 'Replace NAs', code: 'df %>% mutate(x = replace_na(x, 0))\ndf %>% replace_na(list(x=0, y="unknown"))\ndf %>% fill(x, .direction="down")  # forward fill' },
        ],
      },
      {
        title: 'Strings & Dates',
        items: [
          { label: 'stringr', code: 'str_detect(x, "pattern")      # TRUE/FALSE\nstr_replace(x, "old", "new")  # replace first\nstr_replace_all(x, "old", "new")\nstr_length(x)                  # length\nstr_to_upper / str_to_lower\nstr_trim(x)                   # remove whitespace' },
          { label: 'lubridate', code: 'ymd("2024-03-15"); dmy("15/03/2024")\nyear(d); month(d); day(d)\nwday(d, label=TRUE)           # day of week\nd + days(5); d + months(1)\ninterval(d1, d2) / days(1)   # days between' },
        ],
      },
    ],
  },
  {
    id: 'ggplot2',
    title: 'ggplot2 Visualisation',
    module: 'ids',
    sections: [
      {
        title: 'Core Structure',
        items: [
          { label: 'Template', code: `ggplot(data, aes(x=x, y=y, colour=grp)) +\n  geom_*() +\n  scale_*() +\n  labs(title=..., x=..., y=...) +\n  facet_wrap(~var) +\n  theme_minimal()` },
          { label: 'Common aesthetics', code: 'x, y          # position\ncolour/color  # line/point colour\nfill          # bar/area fill\nsize          # point/line size\nshape         # point shape\nlinetype      # line type\nalpha         # transparency 0-1' },
        ],
      },
      {
        title: 'Geometries',
        items: [
          { label: 'Scatter', code: 'geom_point(size=2, alpha=0.6)' },
          { label: 'Line', code: 'geom_line() + geom_smooth(method="lm")' },
          { label: 'Bar/Column', code: 'geom_bar(stat="count")     # counts\ngeom_col()                 # uses y values', note: 'Use fill= for colour' },
          { label: 'Histogram', code: 'geom_histogram(binwidth=5, fill="#3D0066", colour="white")' },
          { label: 'Boxplot', code: 'geom_boxplot(fill="#C8A951", outlier.colour="red")' },
          { label: 'Density', code: 'geom_density(fill="lightblue", alpha=0.5)' },
          { label: 'Text labels', code: 'geom_text(aes(label=name), vjust=-0.5)\ngeom_label(aes(label=val))' },
        ],
      },
      {
        title: 'Scales & Labels',
        items: [
          { label: 'Axis scales', code: 'scale_x_continuous(breaks=seq(0,100,10), limits=c(0,100))\nscale_y_log10()\nscale_x_date(date_labels="%b %Y")' },
          { label: 'Colour scales', code: 'scale_colour_manual(values=c("red","blue"))\nscale_fill_brewer(palette="Set2")\nscale_colour_viridis_c()   # continuous' },
          { label: 'Labels', code: 'labs(title="Title", subtitle="Sub",\n     x="X label", y="Y label",\n     colour="Legend title", caption="Source")' },
        ],
      },
      {
        title: 'Facets & Themes',
        items: [
          { label: 'Facets', code: 'facet_wrap(~ variable, ncol=2)\nfacet_grid(row_var ~ col_var)' },
          { label: 'Built-in themes', code: 'theme_minimal() # clean white\ntheme_classic() # axes only\ntheme_bw()      # black & white\ntheme_void()    # no axes' },
          { label: 'Custom theme elements', code: 'theme(\n  axis.text.x = element_text(angle=45, hjust=1),\n  plot.title = element_text(face="bold", size=14),\n  legend.position = "bottom",\n  panel.grid.minor = element_blank()\n)' },
        ],
      },
    ],
  },
];
