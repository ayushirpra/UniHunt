import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = publicAnonKey;

// Real supabase client for Auth only
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Minimal Supabase‑like wrapper that routes data operations to MongoDB via our Serverless API,
 * and delegates authentication to the real Supabase client.
 */
export const supabase = {
  auth: supabaseClient.auth,

  from: (table: string) => {
    return {
      select: async (query?: any) => {
        const response = await fetch('/api/db', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'select', table, query })
        });
        return response.json();
      },
      insert: async (data: any) => {
        const response = await fetch('/api/db', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'insert', table, data })
        });
        return response.json();
      },
      update: async (data: any) => {
        return {
          eq: async (field: string, value: any) => {
            const response = await fetch('/api/db', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action: 'update', table, data, query: { [field]: value } })
            });
            return response.json();
          }
        };
      },
      delete: async () => {
        return {
          eq: async (field: string, value: any) => {
            const response = await fetch('/api/db', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action: 'delete', table, query: { [field]: value } })
            });
            return response.json();
          }
        };
      },
    };
  }
};
