import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "store",

  state: () => ({
    Layout: true,
    isLogin: false,
    showPopup: false,
    chnagePermision: false,
    searchValue: '',
  }),
  actions: {
    hideLayout() {
      this.Layout = false;
    },
    showLayout() {
      this.Layout = true;
    },
    changeIslogin(loginstatus: boolean) {      
      this.isLogin = loginstatus;
    },
  },
});
