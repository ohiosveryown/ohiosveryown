-- Stamp sizes and inks for the Post Office: marks made before this are the
-- usual size, in their type's own ink. Run once against a database whose
-- marks table predates `size` and `ink` (schema.sql has them for new ones).
ALTER TABLE marks ADD COLUMN size REAL NOT NULL DEFAULT 1;
ALTER TABLE marks ADD COLUMN ink REAL;
