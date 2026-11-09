import fs from 'fs';
import path from 'path';
import { DatabaseSchema, initialData } from '../data/initialData';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

// Memory cache for super fast reads
let memoryCache: DatabaseSchema | null = null;

function ensureDbFile(): void {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    memoryCache = JSON.parse(JSON.stringify(initialData));
  }
}

export function getDatabase(): DatabaseSchema {
  if (memoryCache) {
    return memoryCache;
  }
  ensureDbFile();
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    memoryCache = JSON.parse(raw);
    return memoryCache!;
  } catch (err) {
    console.error('Error reading db.json, falling back to initialData', err);
    return initialData;
  }
}

export function saveDatabase(data: DatabaseSchema): void {
  ensureDbFile();
  memoryCache = data;
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving db.json', err);
  }
}

export function logAudit(user: string, action: string, detail: string): void {
  const db = getDatabase();
  const newLog = {
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    user,
    action,
    detail,
  };
  db.auditLogs = [newLog, ...(db.auditLogs || [])].slice(0, 100);
  saveDatabase(db);
}
