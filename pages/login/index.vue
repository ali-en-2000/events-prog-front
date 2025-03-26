<template>
  <div class="columns is-mobile is-vcentered is-centered is-gapless">
    <div
      class="column is-11-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-third-fullhd shadow-xl"
      :class="formValues.userNameError || formValues.PassError ? ' shadow-red-300' : ''">

      <form class="card p-5" @submit="handleSubmit">
        <h2 class="title is-4 mt-2">Sign Up</h2>
        <label for="userName">user name</label>
        <input type="text" placeholder="enter user name" class="input" v-model="formValues.userName" />
        <p class="error">{{ formValues.userNameError }}</p>
        <label for="password">password</label>
        <input type="password" placeholder="Password" class="input" v-model="formValues.password" />
        <p class="error">{{ formValues.PassError }}</p>

        <div class="flex gap-5">
          <button @click.prevent="handleSubmit" class="button ">
            SIGN IN
          </button>
          <button @click.prevent="navigateTo('/register')" class="button">
            SIGN UP
          </button>
        </div>
      </form>

    </div>
  </div>
</template>
<script setup>
import { useStore } from "~~/stores";
import { useToast } from "vue-toastification";

const axios = useNuxtApp().$axios
const router = useRouter();
const toast = useToast();

const formValues = reactive({
  userName: '',
  password: '',
  userNameError: '',
  PassError: '',
})

onMounted(() => {
    useStore().hideLayout()
})


async function handleSubmit() {
  var error = 0
  if (formValues.userName === "") {
    formValues.userNameError = "فیلد نام کاربری را پر کنید"
    error++
  } else {
    formValues.userNameError = ""
  }
  if (formValues.password === "") {
    formValues.PassError = "فیلد رمز عبور را پر کنید";
    error++
  } else if (formValues.password.length < 6) {
    formValues.PassError = "حداقل 6 کاراکتر وارد کنید";
    error++
  } else {
    formValues.PassError = "";
  }

  if (error == 0) {
    try {
      const res = await axios.post('User/Login', {
        name: formValues.userName,
        password: formValues.password
      });
      if (res.status === 200) {
        localStorage.setItem('token', res.data);
        useStore().changeIslogin(true)
        toast.success("successfully login!");
        router.push('/');

      } else {
        toast.error("An error occurred. Please try again!");
      }

    } catch (err) {
      toast.error("An error occurred. Please try again!");
    }
  }
}

</script>
  
<style scoped>
.columns {
  min-height: 100vh;
}

.button {
  transition: .2s;
  width: 100%;
  color: rgb(53, 53, 53);
  font-weight: 600;
  margin-top: 20px;
  padding: 8px 16px;
  border: 1px solid rgb(131, 131, 131);
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

}

.button:first-child {
  background-color: rgb(74 222 128);
}

.button:hover {
  background-color: rgb(34 197 94);
}

.input {
  border: 1px solid rgba(71, 70, 70, 0.384);
  margin-top: 8px;
  width: 100%;
  padding: 4px;
  outline: none;
  transition: .3s;
  box-shadow: none;
}

.input:focus {
  box-shadow: 0 5px 12px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.error {
  color: rgb(243, 70, 70);
  margin-bottom: 12px;
  margin-top: 5px;
  font-size: .8em;
}
</style>
  