/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-light-gray": "rgb(235, 235, 242)",
        "custom-dark-gray": "rgb(223, 223, 231)",
        "custom-light-ogange": "rgb(255, 82, 0)",
        "custom-light-black": "rgb(40, 44, 63)",

      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".hide-scrollbar": {
          /* Hide scrollbar for Chrome, Safari, and Opera */
          "&::-webkit-scrollbar": {
            display: "none",
          },
          /* Hide scrollbar for IE, Edge, and Firefox */
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
      });
    },
  ],
};
