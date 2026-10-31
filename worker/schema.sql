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

-- The Post Office: one row per postmark a visitor stamps. The id is the
-- postmark's serial number. `page` is which sheet it's on (from 0; a new
-- one starts once a sheet is about covered), `size` how big it was
-- stamped (0.7–1.4 of the usual), `ink` its colour (0–1 along the ink
-- gradient; null for the type's own), `x`/`y` are where on it (0–1
-- of its width and height), `seed` sets its tilt and how unevenly it's
-- inked.
-- The place comes from Cloudflare's guess at the visitor's location; the
-- IP isn't kept, only `visitor`, the same salted hash as ask_hits (for the
-- rate limit, and later so an eraser can only take back your own).
CREATE TABLE IF NOT EXISTS marks (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  at      INTEGER NOT NULL,
  page    INTEGER NOT NULL DEFAULT 0,
  type    TEXT NOT NULL,
  size    REAL NOT NULL DEFAULT 1,
  ink     REAL,
  x       REAL NOT NULL,
  y       REAL NOT NULL,
  seed    INTEGER NOT NULL,
  city    TEXT,
  region  TEXT,
  country TEXT,
  visitor TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS marks_visitor_at ON marks (visitor, at);
CREATE INDEX IF NOT EXISTS marks_page ON marks (page);
