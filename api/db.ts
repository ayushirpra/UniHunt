import { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './lib/mongo.js';

const JOIN_MAP: Record<string, { foreignKey: string; joinTable: string }> = {
  wishlist: { foreignKey: 'university_id', joinTable: 'universities' },
  applications: { foreignKey: 'university_id', joinTable: 'universities' },
};

function setJsonHeaders(res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setJsonHeaders(res);

  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const db = await getDb();
    const { action, table, query, data, selectFields, single, orderField, orderAsc } = req.body;

    if (!table) return res.status(400).json({ success: false, error: 'Table name is required' });
    if (!action) return res.status(400).json({ success: false, error: 'Action is required' });

    const collection = db.collection(table);

    switch (action) {
      case 'select': {
        const mongoQuery: any = {};
        if (query) {
          for (const [k, v] of Object.entries(query)) mongoQuery[k] = v;
        }

        let cursor = collection.find(mongoQuery);
        if (orderField) cursor = cursor.sort({ [orderField]: orderAsc ? 1 : -1 });
        let result: any[] = await cursor.toArray();

        const joinInfo = JOIN_MAP[table];
        if (joinInfo && selectFields && selectFields.includes(joinInfo.joinTable)) {
          const joinCollection = db.collection(joinInfo.joinTable);
          const ids = result.map((r: any) => r[joinInfo.foreignKey]).filter(Boolean);
          const joined = await joinCollection.find({ id: { $in: ids } }).toArray();
          const joinMap = new Map(joined.map((j: any) => [j.id, j]));
          result = result.map((r: any) => ({
            ...r,
            [joinInfo.joinTable]: joinMap.get(r[joinInfo.foreignKey]) || null,
          }));
        }

        if (single) {
          return res.status(200).json({
            data: result[0] || null,
            error: result.length === 0 ? { message: 'No rows found' } : null,
          });
        }
        return res.status(200).json({ data: result, error: null });
      }

      case 'insert': {
        const docs = Array.isArray(data) ? data : [data];
        if (table === 'wishlist' || table === 'applications') {
          const existing = await collection.findOne({
            user_id: docs[0].user_id,
            university_id: docs[0].university_id,
          });
          if (existing) {
            return res.status(200).json({ data: null, error: { code: '23505', message: 'Duplicate entry' } });
          }
        }
        const result = await collection.insertMany(docs);
        const insertedData = Object.values(result.insertedIds).map((id, index) => ({
          _id: id,
          ...docs[index],
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
        return res.status(400).json({ success: false, error: `Unknown action: ${action}` });
    }
  } catch (err: any) {
    console.error('[api/db] Error:', err);
    // Always return JSON — never let Vercel's plain-text error page through
    return res.status(500).json({
      success: false,
      error: err?.message || 'Internal server error',
      data: null,
    });
  }
}
