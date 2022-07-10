const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "colorPirate",
      fileName: (format) => `colorPirate.${format}.js`,
    },
    rollupOptions: {},
  },
});
