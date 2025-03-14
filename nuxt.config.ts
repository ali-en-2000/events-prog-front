
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '~~/assets/css/tailwind.css',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  build:{
    transpile: ['vue-toastification'],
  },
  
  app: {
    head: {
      title: "ایونت تک",
      htmlAttrs: {
        lang: "fa",
        dir: "rtl",
      },
      meta: [
        { name: "everytime", content: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ" },
        {
          name: "everytime",
          content:
            "الّلهُمَّ صَلِّ عَلَی مُحَمَّدٍ وَ آلِ مُحَمَّدٍ و عَجّل فَرَجَهم",
        },
        { name: "everytime", content: "أستغفر الله و أتوب إلى الیه" },
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  
 },
 modules: [
  // ...
  '@pinia/nuxt',
  'vue3-carousel-nuxt'

],
pinia: {
  autoImports: [
    // automatically imports `defineStore`
    'defineStore', // import { defineStore } from 'pinia'
    ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
  ],
},
})