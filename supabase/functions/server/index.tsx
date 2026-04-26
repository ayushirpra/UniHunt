import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import Anthropic from "npm:@anthropic-ai/sdk";
import * as kv from "./kv_store.tsx";

const app = new Hono();
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);
const anthropic = new Anthropic({
  apiKey: Deno.env.get("ANTHROPIC_API_KEY") ?? "",
});

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-363c3823/health", (c) => {
  return c.json({ status: "ok" });
});

const verifyToken = async (c: any, next: () => Promise<void>) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

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

const extractJsonFromText = (text: string) => {
  const cleaned = text.trim();
  const fenced = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = fenced ? fenced[1] : cleaned;
  return JSON.parse(candidate);
};

const askClaudeForJson = async (prompt: string, maxTokens: number) => {
  const response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: maxTokens,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content
    .filter((c: any) => c.type === "text")
    .map((c: any) => c.text)
    .join("\n");

  return extractJsonFromText(text);
};

// Apply auth middleware to all protected routes.
app.use("/make-server-363c3823/protected/*", verifyToken);

// Example protected endpoint with injected user.
app.get("/make-server-363c3823/protected/me", (c: any) => {
  return c.json({ user: c.get("user") });
});

app.post("/make-server-363c3823/protected/api/recommend", async (c: any) => {
  try {
    const userInput = await c.req.json();
    const prompt = `Based on the following student profile, recommend the best universities.
Return JSON: { recommendations: [{ university, reason, match_score }] }
Profile: ${JSON.stringify(userInput)}`;

    const json = await askClaudeForJson(prompt, 800);
    return c.json(json);
  } catch (error: any) {
    return c.json({ error: "Failed to generate recommendations", details: error?.message ?? "Unknown error" }, 500);
  }
});

app.post("/make-server-363c3823/protected/api/sop/generate", async (c: any) => {
  try {
    const userInput = await c.req.json();
    const prompt = `Write a professional Statement of Purpose for a student applying to a university.
Return JSON: { sop: string }
Details: ${JSON.stringify(userInput)}`;

    const json = await askClaudeForJson(prompt, 1500);
    return c.json(json);
  } catch (error: any) {
    return c.json({ error: "Failed to generate SOP", details: error?.message ?? "Unknown error" }, 500);
  }
});

app.post("/make-server-363c3823/protected/api/resume/generate", async (c: any) => {
  try {
    const userInput = await c.req.json();
    const prompt = `Generate a professional resume.
Return JSON: { summary, experience: [], skills: [], education: [] }
Details: ${JSON.stringify(userInput)}`;

    const json = await askClaudeForJson(prompt, 1000);
    return c.json(json);
  } catch (error: any) {
    return c.json({ error: "Failed to generate resume", details: error?.message ?? "Unknown error" }, 500);
  }
});

Deno.serve(app.fetch);