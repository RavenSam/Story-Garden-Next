/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         boxShadow: {
            6: "box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
            92: "box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;",
         },
      },
   },
   plugins: [],
}
