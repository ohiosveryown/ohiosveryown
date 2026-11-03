-- The last song the site saw playing (see schema.sql). Run once against a
-- database from before it.
CREATE TABLE IF NOT EXISTS last_played (
  id     INTEGER PRIMARY KEY CHECK (id = 1),
  title  TEXT NOT NULL,
  artist TEXT NOT NULL,
  cover  TEXT,
  url    TEXT,
  at     INTEGER NOT NULL
);
