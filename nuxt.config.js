const envPath = `./.config/.env.${process.env.NODE_ENV || "local"}`;
require("dotenv").config({ path: envPath });
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt-todo",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/composition-api",
    { src: "@/plugins/amplify.js", ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxtjs/vuetify",
    "@nuxtjs/composition-api/module",
    "@nuxtjs/dotenv"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  dotenv: { filename: envPath },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
