import { defineConfig } from "cypress";

export default defineConfig({
    component: {
        devServer: {
            framework: "react",
            bundler: "vite",
        },
    },

    e2e: {
        viewportHeight: 800,
        viewportWidth: 400,
        baseUrl: "http://localhost:5173",
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        video: true,
    },
});
