<template>
    <div>
        <div class="my-40 md:w-3/4 w-full mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-semibold mb-8">Change User Permission</h1>
            <div class="border px-5 py-5 md:py-10 shadow-md hover:shadow-lg duration-300 flex items-center">
                <form class="w-full flex justify-center text-sm md:text-base" @submit.prevent="changePermision()">
                    <input type="text" placeholder="Enter user name" v-model="username"
                        class="flex-grow px-2 py-3 border border-gray-300 rounded-lg outline-none duration-200 focus:outline-none text-gray-700" />
                    <button type="submit"
                        class="ml-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:bg-emerald-800 p-3 focus:outline-none transition-colors duration-200">
                        <span class="text-white font-semibold">Search</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "~~/stores";
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

const toast = useToast();

const router = useRouter();
const axios = useNuxtApp().$axios
const username = ref('')

onMounted(async () => {
    try {
        const response = await axios.get('User/HaveAdminRole')
        if (response.data == true) {
            useStore().chnagePermision = true

        } else {
            useStore().chnagePermision = false
            toast.error("Role modifications are restricted to admin privileges only.!");

            setTimeout(() => {
                router.push('/')
            }, 2500);
        }
    } catch (error) {
        toast.error("An error occurred. Please try again!");
    }

})

async function changePermision() {
    try {
        const response = await axios.post('User/UpdateUsrPermission?userName=' + username.value)
        if (response.status == 200) {
            toast.success('User ' + username.value + ' has been updated.');
            router.push('/')
        }
    } catch (error) {
        toast.error("An error occurred. Please try again!");

    }
}


</script>