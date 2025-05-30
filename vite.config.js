import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "child_process";

// Get git info for build
function getGitInfo() {
  try {
    const commitHash = execSync("git rev-parse --short HEAD").toString().trim();
    const gitBranch = execSync("git rev-parse --abbrev-ref HEAD")
      .toString()
      .trim();
    return { commitHash, gitBranch };
  } catch (e) {
    console.error("Failed to get git info:", e);
    return { commitHash: "unknown", gitBranch: "unknown" };
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/book4yearold/", // GitHub repository name

  // Define build-time environment variables
  define: {
    "window.__BUILD_INFO__": JSON.stringify({
      buildTime: new Date().toISOString(),
      ...getGitInfo(),
      nodeVersion: process.version,
      buildBy: process.env.USER || "unknown",
    }),
  },
});
