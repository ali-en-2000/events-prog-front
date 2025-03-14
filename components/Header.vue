<template>
    <header class="relative text-xs lg:text-sm px-10 lg:px-28 shadow-md z-10">
        <div class="flexbase w-full mx-auto">
            <nav class="hidden md:block">
                <ul class="flexbase gap-4">
                    <li v-show="useStore().isLogin">
                        <div class="relative mr-3 w-10 h-10">
                            <p class="flex  items-center absolute top-0 cursor-pointer hover:text-gray-600 transition-colors duration-300"
                                @click="useStore().showPopup = !useStore().showPopup">
                                <IconsUser />
                                <svg class="w-4 h-4 mt-1 " fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </p>
                            <div class="absolute mt-12 w-48 p-4 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300"
                                :class="useStore().showPopup ? 'inline' : 'hidden'">
                                <NuxtLink to="/user" @click="useStore().showPopup = false"
                                    class="block px-4 py-2 m-0 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer border-b border-gray-200">
                                    User info
                                </NuxtLink>
                                <NuxtLink to="/user/carts" @click="useStore().showPopup = false"
                                    class="block px-4 py-2 m-0 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer border-b border-gray-200">
                                    Carts
                                </NuxtLink>
                                <NuxtLink to="/user/changePermision" @click="useStore().showPopup = false"
                                    class="block px-4 py-2 m-0 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer border-b border-gray-200"
                                    >
                                    change permision
                                </NuxtLink>

                                <div class="flex justify-between items-center hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                                    @click="() => { useStore().showPopup = false; logout() }">
                                    <p class="px-4 py-2 text-sm text-gray-700">
                                        Log out
                                    </p>
                                    <div class="px-4 py-2">
                                        <IconsLogout />
                                    </div>
                                </div>
                            </div>
                        </div>




                    </li>
                    <li v-show="!useStore().isLogin">
                        <NuxtLink to="/login" class="text-gray-800">Login</NuxtLink>
                    </li>
                    <li v-show="!useStore().isLogin">
                        <NuxtLink to="/register" class="text-gray-800">Sign up</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/create-vebinar"
                            class="text-gray-800 border border-gray-800 p-2 hover:bg-slate-700 hover:text-gray-50 duration-200">
                            <span>Create event</span>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/" class="text-gray-800">Events</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/organizations" class="text-gray-800">Organizers</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/help" class="text-gray-800">Help</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/about" class="text-gray-800">About us</NuxtLink>
                    </li>
                </ul>
            </nav>

            <svg xmlns="http://www.w3.org/2000/svg" class="text-white md:hidden w-6" @click="$emit('sideShow')"
                viewBox="0 0 30 30" fill="none">
                <svg xmlns="http://www.w3.org/2000/svg" class="text-white md:hidden w-6" @click="$emit('sideShow')"
                    viewBox="0 0 30 30" fill="none">
                    <path
                        d="M6 3C6 4.65685 4.65686 6 3 6C1.34314 6 0 4.65685 0 3C0 1.34315 1.34314 0 3 0C4.65686 0 6 1.34315 6 3Z"
                        fill="#333"></path>
                    <path
                        d="M6 15C6 16.6569 4.65686 18 3 18C1.34314 18 0 16.6569 0 15C0 13.3431 1.34314 12 3 12C4.65686 12 6 13.3431 6 15Z"
                        fill="#333"></path>
                    <path
                        d="M3 30C4.65686 30 6 28.6569 6 27C6 25.3431 4.65686 24 3 24C1.34314 24 0 25.3431 0 27C0 28.6569 1.34314 30 3 30Z"
                        fill="#333"></path>
                    <path
                        d="M18 3C18 4.65685 16.6569 6 15 6C13.3431 6 12 4.65685 12 3C12 1.34315 13.3431 0 15 0C16.6569 0 18 1.34315 18 3Z"
                        fill="#333"></path>
                    <path
                        d="M15 18C16.6569 18 18 16.6569 18 15C18 13.3431 16.6569 12 15 12C13.3431 12 12 13.3431 12 15C12 16.6569 13.3431 18 15 18Z"
                        fill="#333"></path>
                    <path
                        d="M18 27C18 28.6569 16.6569 30 15 30C13.3431 30 12 28.6569 12 27C12 25.3431 13.3431 24 15 24C16.6569 24 18 25.3431 18 27Z"
                        fill="#333"></path>
                    <path
                        d="M27 6C28.6569 6 30 4.65685 30 3C30 1.34315 28.6569 0 27 0C25.3431 0 24 1.34315 24 3C24 4.65685 25.3431 6 27 6Z"
                        fill="#333"></path>
                    <path
                        d="M30 15C30 16.6569 28.6569 18 27 18C25.3431 18 24 16.6569 24 15C24 13.3431 25.3431 12 27 12C28.6569 12 30 13.3431 30 15Z"
                        fill="#333"></path>
                    <path
                        d="M27 30C28.6569 30 30 28.6569 30 27C30 25.3431 28.6569 24 27 24C25.3431 24 24 25.3431 24 27C24 28.6569 25.3431 30 27 30Z"
                        fill="#333"></path>
                </svg> </svg>

            <div class="flexbase h-16">
                <div class="lg:flex lg:justify-between hidden border-l border-r border-slate-300 py-1 duration-500"
                    :class="bgColor == true ? 'bg-gray-100' : ''">
                    <IconsSearch class="cursor-pointer" />
                    <input type="text" class="w-40 outline-none py-4 px-2 font-normal duration-500 placeholder:text-xs"
                        :class="bgColor == true ? 'bg-gray-100 w-56' : ''" @focus="bgColor = !bgColor"
                        @blur="bgColor = !bgColor" @keyup.enter="handelSearch" :value="search"
                        @input="search = $event.target.value" placeholder="Search" />
                </div>
                <IconsBrand @click="navigateTo('/')" />
            </div>
        </div>
    </header>
</template>
  
<script setup>
const axios = useNuxtApp().$axios
import { useStore } from "~~/stores";

const search = ref('')
var bgColor = ref(false)
var showmodal = ref(false)

onMounted(() => {
    showmodal.value = false
})

async function logout() {
    localStorage.removeItem('token');
    await navigateTo('/login')
}

async function handelSearch() {
    useStore().searchValue = search.value
}
</script>
  
<style scoped>
.flexbase {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>