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