import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tsconfigPaths from "vite-tsconfig-paths"
import compression from "vite-plugin-compression"

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "react",
      tsDecorators: true,
      plugins: [["@swc/plugin-transform-react-jsx", { runtime: "automatic" }]],
    }),
    tsconfigPaths(),
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext", // Modern browsers only
    cssCodeSplit: true,
    minify: "terser", // Better compression than esbuild
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
  esbuild: {
    legalComments: "none",
    treeShaking: true,
    drop: ["console", "debugger"],
  },
})
