/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/components/navbar.tsx",
    "./src/components/footer.tsx",
    "./src/components/faq.tsx",
    "./src/components/protectedNavbar.tsx",
    "./src/App.tsx",
    "./src/components/linechart.tsx",
    "./src/components/areachart.tsx",
    "./src/routes/home.tsx",
    "./src/routes/example.tsx",
    "./src/routes/dashboard.tsx",
    "./src/routes/signup.tsx",
    "./src/routes/signin.tsx",
    "./src/routes/resetpassword.tsx",
    "./src/components/Notification.tsx"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60a5fa', 
          DEFAULT: '#3b82f6', 
          dark: '#1e40af',   
        },
        
        secondary: {
          light: '#fb7185', 
          DEFAULT: '#f87171', 
          dark: '#9b1c1c', 
        },

        accent: {
          light: '#4f75b0',  
          DEFAULT: '#1e3a8a', 
          dark: '#0d1b2a',   
        },

        background: {
          light: '#f0f9ff',  
          DEFAULT: '#ffffff',
          dark: '#fff',
        },

        text: {
          light: '#1e3a8a', 
          semiLight: "#000",
          DEFAULT: '#333333',  
          dark: '#ffffff', 
        },
      },
    },
  },
  plugins: [],
}

