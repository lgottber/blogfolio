import process from "node:process";

// Set NEXT_PUBLIC_SITE_URL in your Deno Deploy environment variables
// e.g. https://your-project.deno.dev or your custom domain
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
