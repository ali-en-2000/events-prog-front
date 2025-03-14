<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="p-6 bg-white shadow-md rounded-lg w-96">
            <input class="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                v-model="newBaseUrl" placeholder="Enter new Base URL">
            <button
                class="mt-4 w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                @click="changeBaseUrl">Change Base URL</button>
        </div>
    </div>
</template>
  

<script setup>

const axios = useNuxtApp().$axios
const newBaseUrl = ref('http://192.168.1./api/')
const router = useRouter();

function changeBaseUrl() {
    if (typeof window !== 'undefined') {
        localStorage.setItem('baseURL', newBaseUrl.value);
    }
    axios.defaults.baseURL = newBaseUrl.value;
    console.log(`Base URL changed to ${newBaseUrl.value}`);
    router.push('/')
}
</script>



