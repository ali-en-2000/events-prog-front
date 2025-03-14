// toast.js
import Toast,{ POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(Toast, {
        hideProgressBar : false,
        timeout: 3000,
        position: POSITION.TOP_LEFT 
    });
  })
