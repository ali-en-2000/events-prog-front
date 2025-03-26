import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "store",

  state: () => ({
    Layout: false,
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
    checkAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    },
    logout() {
      localStorage.removeItem('token')
      this.isLogin = false
    }
  },
});
