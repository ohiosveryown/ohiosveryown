-- One row per case study, keyed by its Craft item ID (so renaming a slug
-- keeps its count).
CREATE TABLE IF NOT EXISTS views (
  id    TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0
);

-- Rate limit: one counted open per visitor per case study per minute.
-- `key` is a salted SHA-256 of IP + ID; the IP itself is never stored.
CREATE TABLE IF NOT EXISTS recent_hits (
  key TEXT PRIMARY KEY,
  at  INTEGER NOT NULL
);
