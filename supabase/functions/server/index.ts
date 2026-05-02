import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
const app = new Hono();

// Supabase client
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_ANON_KEY") ??
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ??
  ""
);

// Middleware
app.use("*", logger(console.log));

app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "OPTIONS"],
  })
);

// Health check
app.get("/make-server-363c3823/health", (c) => {
  return c.json({ status: "ok" });
});

// Auth middleware
const verifyToken = async (c: any, next: () => Promise<void>) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return c.json({ error: "Missing Bearer token" }, 401);
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return c.json({ error: "Invalid or expired token" }, 401);
  }

  c.set("user", data.user);
  await next();
};

// Protected routes
app.use("/make-server-363c3823/protected/*", verifyToken);

// Test route
app.get("/make-server-363c3823/protected/me", (c: any) => {
  return c.json({ user: c.get("user") });
});

// Start server
Deno.serve(app.fetch);