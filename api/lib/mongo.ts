import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (db) return db;

  // Diagnostic logging — visible in Vercel function logs
  console.log('[mongo] MONGODB_URI exists:', !!process.env.MONGODB_URI);
  console.log('[mongo] MONGODB_DB_NAME exists:', !!process.env.MONGODB_DB_NAME);
  console.log('[mongo] NODE_ENV:', process.env.NODE_ENV);

  // Strip CRLF and surrounding quotes from env values (handles Windows .env files)
  const clean = (v: string | undefined) => v?.replace(/\r/g, '').replace(/^['"]|['"]$/g, '').trim();

  const uri = clean(process.env.MONGODB_URI);
  const dbName = clean(process.env.MONGODB_DB_NAME) || 'unihunt';

  if (!uri) {
    throw new Error(
      'MONGODB_URI is not set. In Vercel dashboard: Settings → Environment Variables → ' +
      'ensure MONGODB_URI is checked for Production, Preview, AND Development environments.'
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
