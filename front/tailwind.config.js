const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        colors: {
            "cool-blue": "#005581",
            "cool-blueClaire": "#72CDf4",
            "cool-yellow": "#FFE552",
            "cool-blanc": "FFFFFA",
        },
        fontFamily: {
            pop: ["Poppins", "sans-serif"],
        },
        extend: {},
    },
    darkMode: "selector",
    plugins: [],
});
