import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (db) return db;

  // Strip CRLF and surrounding quotes from env values (handles Windows .env files)
  const clean = (v: string | undefined) => v?.replace(/\r/g, '').replace(/^['"]|['"]$/g, '').trim();

  const uri = clean(process.env.MONGODB_URI);
  const dbName = clean(process.env.MONGODB_DB_NAME);

  if (!uri || !dbName) {
    throw new Error(
      'Missing MONGODB_URI or MONGODB_DB_NAME. ' +
      'Set them in Vercel project settings (Production) or in .env (local vercel dev).'
    );
  }

  if (uri.includes('localhost') || uri.includes('127.0.0.1')) {
    throw new Error(
      'MONGODB_URI points to localhost which is unreachable on Vercel. ' +
      'Use a MongoDB Atlas connection string: mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<db>'
    );
  }

  // Reset both so a failed connect() doesn't leave a dangling client
  client = null;
  db = null;

  const newClient = new MongoClient(uri, {
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 10000,
    tls: uri.startsWith('mongodb+srv') ? undefined : true,
  });
  try {
    await newClient.connect();
  } catch (err: any) {
    throw new Error(`MongoDB connection failed: ${err.message}`);
  }

  client = newClient;
  db = client.db(dbName);
  return db;
}

export async function closeDb(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}
