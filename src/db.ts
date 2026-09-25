import Database from "better-sqlite3";
import process from "node:process";
import type { Database as DatabaseType } from "better-sqlite3";

const db: DatabaseType = new Database("app.db");

// Make sure foreign keys are enabled
db.pragma("foreign_keys = ON");

db.exec(`
CREATE TABLE IF NOT EXISTS clubs (
  name TEXT PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL,
  club TEXT NOT NULL,
  FOREIGN KEY (club) REFERENCES clubs(name) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  created_on TEXT NOT NULL,
  due_date TEXT NOT NULL,
  club TEXT NOT NULL,
  FOREIGN KEY (club) REFERENCES clubs(name) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS annoucements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  FOREIGN KEY (author) REFERENCES users(name)
);
`);

// Let's insert a few default clubs
const clubs: string[] = [
  "Web and App Programming",
  "Culinary and Arts",
  "Design Tech",
  "Football",
];
for (const club of clubs) {
  db.prepare("INSERT OR IGNORE INTO clubs (name) VALUES (?)").run(club);
}

// Let's insert one default admin user
try {
  db.prepare(
    `
    INSERT OR IGNORE INTO users (name, email, password, role, club)
    VALUES (?, ?, ?, ?, ?)
  `,
  ).run(
    "admin",
    "admin@admin.com",
    "changeme",
    "admin",
    "Web and App Programming",
  );
} catch (error) {
  console.error(error);
  process.exit(1);
}

export { db };
