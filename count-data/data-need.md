1 all-reframe - 句子 + 3001-id

CREATE TABLE IF NOT EXISTS old_reframe_2 (
id text PRIMARY KEY,
count integer,
chinese text,
sentence text
);

CREATE TABLE IF NOT EXISTS all_reframe_2 (
id text PRIMARY KEY,
count integer NOT NULL,
chinese text NOT NULL,
sentence text NOT NULL,
chapter text NOT NULL,
keyword text NOT NULL,
idx integer NOT NULL
);

Join by sentence:
SELECT
c.sentence,
c.keyword,
c.count AS cloud_count,
o.count AS old_count
FROM cloud_all_reframe_count c
LEFT JOIN old_reframe_count o
ON c.sentence = o.sentence;

Inner join (only matching sentences):

SELECT
c.sentence,
c.keyword,
c.count AS cloud_count,
o.count AS old_count
FROM cloud_all_reframe_count c
INNER JOIN old_reframe_count o
ON c.sentence = o.sentence;

适合：旧表同一句子多条都应合并来看。
SQL:
WITH o AS (
SELECT
TRIM(REPLACE(sentence, '\r','')) AS sentence_norm,
SUM(count) AS old_count
FROM old_reframe_count
GROUP BY TRIM(REPLACE(sentence, '\r',''))
)
SELECT
c.id,
c.sentence,
c.keyword,
c.count AS cloud_count,
o.old_count
FROM (
SELECT
TRIM(REPLACE(sentence, '\r','')) AS sentence_norm,
id, sentence, keyword, count
FROM cloud_all_reframe_count
) c
INNER JOIN o
ON c.sentence_norm = o.sentence_norm;


----
## 去重后联查


WITH o AS (
  SELECT sentence, SUM(count) AS old_count
  FROM old_reframe_2
  GROUP BY sentence
)
SELECT 
  c.id, 
  c.sentence, 
  c.keyword, 
  c.count AS cloud_count, 
  COALESCE(o.old_count, 0) AS old_count,
  c.count + COALESCE(o.old_count, 0) AS sum, 
  c.chinese, 
  c.idx
FROM all_reframe_2 c
LEFT JOIN o ON c.sentence = o.sentence;