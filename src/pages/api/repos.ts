import type { APIRoute } from "astro";
import { fetchRecentRepositories } from "@/lib/github";

export const GET: APIRoute = async () => {
  const repos = await fetchRecentRepositories();
  return new Response(JSON.stringify(repos), {
    headers: { "Content-Type": "application/json" },
  });
};
