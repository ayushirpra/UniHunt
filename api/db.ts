import { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './lib/mongo';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const db = await getDb();
    const { action, table, query, data } = req.body;
    
    if (!table) return res.status(400).json({ error: 'Table name is required' });

    const collection = db.collection(table);
    
    switch (action) {
      case 'select': {
        const result = await collection.find(query || {}).toArray();
        return res.status(200).json({ data: result, error: null });
      }
      case 'insert': {
        const result = await collection.insertMany(Array.isArray(data) ? data : [data]);
        const insertedData = Object.values(result.insertedIds).map((id, index) => ({
          _id: id,
          ...(Array.isArray(data) ? data[index] : data)
        }));
        return res.status(200).json({ data: insertedData, error: null });
      }
      case 'update': {
        const result = await collection.updateMany(query, { $set: data });
        return res.status(200).json({ data: result, error: null });
      }
      case 'delete': {
        const result = await collection.deleteMany(query);
        return res.status(200).json({ data: result, error: null });
      }
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (err: any) {
    console.error('API Error:', err);
    return res.status(500).json({ error: err.message, data: null });
  }
}
