import { supabase, supabaseUrl } from "@/lib/supabase";
import { getAccessToken, setAccessToken } from "@/lib/authToken";

async function getLatestToken() {
  const cachedToken = getAccessToken();
  if (cachedToken) return cachedToken;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token ?? null;
  setAccessToken(token);
  return token;
}

export async function authFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const token = await getLatestToken();
  const headers = new Headers(init.headers ?? {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(input, {
    ...init,
    headers,
  });
}

const protectedApiBase = `${supabaseUrl}/functions/v1/server/make-server-363c3823/protected/api`;

export async function postProtectedApi<TResponse>(path: string, body: unknown): Promise<TResponse> {
  const response = await authFetch(`${protectedApiBase}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const errorMessage = data?.details || data?.error || "Request failed. Please try again.";
    throw new Error(errorMessage);
  }

  return response.json() as Promise<TResponse>;
}
