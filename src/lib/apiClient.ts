import { supabase } from "@/lib/supabase";
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
