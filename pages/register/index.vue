<template>
    <div class="columns is-mobile is-vcentered is-centered is-gapless">
        <div class="column is-11-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-third-fullhd shadow-xl"
            :class="formValues.EmailError || formValues.PassError || formValues.confirmError ? ' shadow-red-300' : ''">

            <form class="card p-5">
                <h2 class="title is-4 mt-2">Sign Up</h2>
                <label for="UserName">UserName</label>
                <input type="UserName" placeholder="your UserName" class="input" v-model="formValues.UserName" />
                <p class="error">{{ formValues.UserNameError }}</p>

                <label for="Email">Email</label>
                <input type="Email" placeholder="test@example.com" class="input" v-model="formValues.Email" />
                <p class="error">{{ formValues.EmailError }}</p>

                <label for="Password">Password</label>
                <input type="Password" placeholder="Password" class="input" v-model="formValues.Password" />
                <p class="error">{{ formValues.passError }}</p>

                <label for="confirm Password">confirm Password</label>
                <input type="Password" placeholder="Confirm Password" class="input" v-model="formValues.confirmPassword" />
                <p class="error">{{ formValues.confirmError }}</p>

                <div class="flex gap-5">
                    <button @click.prevent="navigateTo('/login')" class="button">
                        SIGN IN
                    </button>
                    <button @click.prevent="handleSubmit" class="button">
                        SIGN UP
                    </button>
                </div>
            </form>

        </div>
    </div>
</template>
<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();
const axios = useNuxtApp().$axios

const router = useRouter();
const formValues = reactive({
    UserName: '',
    Email: '',
    Password: '',
    confirmPassword: '',
    UserNameError: '',
    EmailError: '',
    passError: '',
    confirmError: '',
})

function handleSubmit() {
    if (checkForm()) {
        // navigateTo('/login')
    }
};

async function checkForm() {
    var error = 0
    if (formValues.UserName === "") {
        formValues.UserNameError = "فیلد نام را پر کنید"
        error++
    } else {
        formValues.UserNameError = ""
    }

    if (formValues.Email === "") {
        formValues.EmailError = "فیلد ایمیل را پر کنید"
        error++
    } else if (!validateEmail(formValues.Email)) {
        formValues.EmailError = "فیلد ایمیل به درستی وارد نشده است"
        error++
    } else {
        formValues.EmailError = ""
    }

    if (formValues.Password === "") {
        formValues.passError = "فیلد رمز عبور را پر کنید";
        error++
    } else if (formValues.Password.length < 6) {
        formValues.passError = "حداقل 6 کاراکتر وارد کنید";
        error++
    } else {
        formValues.passError = "";
    }

    if (formValues.confirmPassword === "") {
        formValues.confirmError = "فیلد تایید رمز عبور را پر کنید";
        error++
    } else if (formValues.confirmPassword !== formValues.Password) {
        formValues.confirmError = "عدم تطابق پسورد";
        error++
    } else {
        formValues.confirmError = "";
    }


    if (error == 0) {
        try {
            const response = await axios.post('User/Signup', {
                UserName: formValues.UserName,
                Email: formValues.Email,
                Password: formValues.Password,
            });
            if (response.status === 200) {
                toast.success("successfully sign up!");
                router.push('/login');
            } else {
                toast.error("An error occurred. Please try again!");

            }
        } catch (error) {
            toast.error("An error occurred. Please try again!");

        }
    } else {
        return false;

    }
}

function validateEmail(Email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(Email);
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

.button:last-child {
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
    