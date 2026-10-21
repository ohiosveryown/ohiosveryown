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

-- Mallow's chat: one row per question, keyed by a salted SHA-256 of the
-- visitor's IP. Rows older than the window are cleared as it goes.
CREATE TABLE IF NOT EXISTS ask_hits (
  key TEXT NOT NULL,
  at  INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS ask_hits_key_at ON ask_hits (key, at);

-- What visitors ask Mallow, so Matt can read them. `visitor` is the same
-- salted IP hash as ask_hits (groups a conversation; no IP is stored).
-- Rows older than 90 days are cleared as it goes.
CREATE TABLE IF NOT EXISTS ask_questions (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  at       INTEGER NOT NULL,
  visitor  TEXT NOT NULL,
  question TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS ask_questions_at ON ask_questions (at);
