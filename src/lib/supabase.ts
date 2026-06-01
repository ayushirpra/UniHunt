import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = publicAnonKey;

// Real supabase client for Auth only
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

const FETCH_TIMEOUT_MS = 10_000;
const MAX_RETRIES = 2;

// Resolve the correct API base for the current environment.
// - Production (Vercel): same origin, /api prefix is fine.
// - Dev with `vercel dev`: Vite proxies /api → localhost:3000 (see vite.config.ts).
// - Override via VITE_API_BASE env var if needed.
const API_BASE: string = (() => {
  const override = import.meta.env?.VITE_API_BASE as string | undefined;
  if (override) return override.replace(/\/$/, '');
  return ''; // relative — works for both Vite proxy and production
})();

// HTTP status codes that should never be retried
const NO_RETRY_STATUSES = new Set([400, 401, 403, 404, 405, 422]);

async function fetchWithRetry(path: string, options: RequestInit): Promise<{ data: any; error: any }> {
  const url = `${API_BASE}${path}`;
  let lastError: any;

  for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timer);

      // Read raw text first so we can log it before attempting to parse
      const rawText = await res.text();
      console.debug(`[api/db] attempt=${attempt} status=${res.status} url=${url} body=${rawText.slice(0, 500)}`);

      // Guard: 404 — route not found, give a clear actionable message
      if (res.status === 404) {
        const msg = `API route not found (404): ${url}. In dev run "vercel dev" instead of "vite", or check vite.config.ts proxy target.`;
        console.error('[api/db]', msg);
        return { data: null, error: { message: msg } };
      }

      // Guard: other non-retryable HTTP errors
      if (NO_RETRY_STATUSES.has(res.status)) {
        const errMsg = rawText.trim() || `HTTP ${res.status}`;
        console.error(`[api/db] non-retryable HTTP ${res.status}:`, errMsg);
        return { data: null, error: { message: `Server error (HTTP ${res.status}): ${errMsg.slice(0, 200)}` } };
      }

      // Guard: empty body
      if (!rawText || !rawText.trim()) {
        throw new Error(`Empty response from server (HTTP ${res.status})`);
      }

      // Guard: non-JSON content-type (e.g. HTML error page)
      const ct = res.headers.get('content-type') || '';
      if (!ct.includes('application/json') && !rawText.trimStart().startsWith('{') && !rawText.trimStart().startsWith('[')) {
        throw new Error(`Non-JSON response (HTTP ${res.status}): ${rawText.slice(0, 200)}`);
      }

      // Safe parse
      let parsed: any;
      try {
        parsed = JSON.parse(rawText);
      } catch (parseErr: any) {
        throw new Error(`Malformed JSON (HTTP ${res.status}): ${parseErr.message} — raw: ${rawText.slice(0, 200)}`);
      }

      // HTTP-level errors that returned a JSON body (5xx etc.)
      if (!res.ok) {
        return { data: null, error: { message: parsed?.error || `HTTP ${res.status}` } };
      }

      return parsed;
    } catch (err: any) {
      clearTimeout(timer);
      lastError = err;

      const isRetryable = err.name === 'AbortError' || err.message?.includes('fetch');
      if (!isRetryable || attempt > MAX_RETRIES) break;

      const backoff = attempt * 800;
      console.warn(`[api/db] attempt ${attempt} failed (${err.message}), retrying in ${backoff}ms…`);
      await new Promise(r => setTimeout(r, backoff));
    }
  }

  console.error('[api/db] all attempts failed:', lastError);
  return { data: null, error: { message: lastError?.message || 'Network error' } };
}

function createChain(table: string, action: string, data?: any) {
  const query: any = {};
  let selectFields = '*';
  let isSingle = false;
  let orderField: string | null = null;
  let orderAsc = true;

  const chain: any = {
    eq: (field: string, value: any) => {
      query[field] = value;
      return chain;
    },
    order: (field: string, opts?: { ascending?: boolean }) => {
      orderField = field;
      orderAsc = opts?.ascending !== false;
      return chain;
    },
    single: () => {
      isSingle = true;
      return chain;
    },
    select: (fields?: string) => {
      if (fields) selectFields = fields;
      return chain;
    },
    then: (onfulfilled?: any, onrejected?: any) => {
      const body = { action, table, query, data, selectFields, single: isSingle, orderField, orderAsc };
      return fetchWithRetry('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then(onfulfilled, onrejected);
    }
  };
  return chain;
}

export const supabase = {
  auth: {
    ...supabaseClient.auth,
    getUser: async (token?: string) => {
      const mockSessionStr = localStorage.getItem("unihunt_mock_session");
      if (mockSessionStr) {
        try {
          const mockSession = JSON.parse(mockSessionStr);
          return { data: { user: mockSession.user }, error: null };
        } catch (e) {
          localStorage.removeItem("unihunt_mock_session");
        }
      }
      return supabaseClient.auth.getUser(token);
    },
    getSession: async () => {
      const mockSessionStr = localStorage.getItem("unihunt_mock_session");
      if (mockSessionStr) {
        try {
          const mockSession = JSON.parse(mockSessionStr);
          return { data: { session: mockSession }, error: null };
        } catch (e) {
          localStorage.removeItem("unihunt_mock_session");
        }
      }
      return supabaseClient.auth.getSession();
    },
    signOut: async () => {
      localStorage.removeItem("unihunt_mock_session");
      return supabaseClient.auth.signOut();
    },
    onAuthStateChange: (callback: any) => {
      const mockSessionStr = localStorage.getItem("unihunt_mock_session");
      if (mockSessionStr) {
        try {
          const mockSession = JSON.parse(mockSessionStr);
          setTimeout(() => {
            callback("SIGNED_IN", mockSession);
          }, 0);
          return {
            data: {
              subscription: {
                unsubscribe: () => {}
              }
            }
          };
        } catch (e) {
          localStorage.removeItem("unihunt_mock_session");
        }
      }
      return supabaseClient.auth.onAuthStateChange(callback);
    }
  },

  from: (table: string) => {
    return {
      select: (fields?: string) => {
        const chain = createChain(table, 'select');
        if (fields) chain.select(fields);
        return chain;
      },
      insert: (data: any) => {
        return createChain(table, 'insert', data);
      },
      update: (data: any) => {
        return createChain(table, 'update', data);
      },
      delete: () => {
        return createChain(table, 'delete');
      }
    };
  }
};
