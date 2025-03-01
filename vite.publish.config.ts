import { defineConfig } from "vite";

defineConfig({
  base: process.env.REPO_NAME ? `/${process.env.REPO_NAME}/` : "/",
  build: {
    rollupOptions: {
      input: "index.html",
      output: {
        dir: "dist",
      },
    },
  },
});
