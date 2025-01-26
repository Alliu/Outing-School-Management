import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // Configuration des événements si nécessaire
        },
    },
    // component: {
    //     devServer: {
    //         framework: "react",
    //         bundler: "vite",
    //     },
    // },
});
