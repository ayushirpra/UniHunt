import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

/**
 * Initialize and return a MongoDB client. The connection URI is read from the
 * `MONGODB_URI` environment variable. The database name is taken from
 * `MONGODB_DB_NAME`.
 */
export async function getDb(): Promise<Db> {
  if (db) return db;
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME;
  if (!uri || !dbName) {
    throw new Error('Missing MONGODB_URI or MONGODB_DB_NAME environment variables');
  }
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  return db;
}

/** Close the MongoDB connection (useful for scripts & tests). */
export async function closeDb(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}
