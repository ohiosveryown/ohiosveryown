-- Sheets for the Post Office: marks made before this are all on the first.
-- Run once against a database whose marks table predates `page`
-- (schema.sql has it for new ones).
ALTER TABLE marks ADD COLUMN page INTEGER NOT NULL DEFAULT 0;
CREATE INDEX IF NOT EXISTS marks_page ON marks (page);
