1 all-reframe - 句子 + 3001-id
CREATE TABLE IF NOT EXISTS old_reframe_count (
id text PRIMARY KEY,
count integer,
chinese text,
sentence text
);

CREATE TABLE IF NOT EXISTS "memory-app".cloud_all_reframe_count (
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