<template>
    <div class="main">
        <p v-if="user" class="text-3xl mx-auto w-4/5 pt-5 px-2 my-8">Hello, {{ user.userName }}</p>
        <p v-else class="text-center my-48 text-3xl mx-auto  pt-5 px-2">Loading user data...</p>
        <div v-if="user" class="flex justify-center w-4/5 full mx-auto gap-5">
            <div class="w-full">

                <div class="w-full shadow-md mt-8 mb-5 px-5 py-2 border border-gray-100 ">
                    <p class="font-bold my-8 text-xl">Change detalis</p>

                    <div class="flex flex-col">
                        <div class="flex items-start m-1">
                            <label for="name" class="pr-1 text-gray-700 text-sm">User name</label>
                            <IconsStar />
                        </div>
                        <input type="text" id="name" v-model="user!.userName" placeholder="Enter user name"
                            class="w-full mt-1 text-gray-500 p border border-gray-300 p-2 rounded-lg outline-none focus:border-emerald-200 focus:shadow-md duration-300">
                    </div>
                    <div class="flex my-5">
                        <div class="w-full m-1">
                            <div class="flex">
                                <label for="topic" class="pr-1 text-gray-700 text-sm">First name</label>
                                <IconsStar />
                            </div>
                            <input type="text" id="name" v-model="user!.userFirstName" placeholder="Enter first name"
                                class="w-full mt-1 text-gray-500 p border border-gray-300 p-2 rounded-lg outline-none focus:border-emerald-200 focus:shadow-md duration-300">
                        </div>
                        <div class="w-full m-1">
                            <div class="flex">
                                <label for="topic" class="pr-1 text-gray-700 text-sm">Last Name</label>
                                <IconsStar />
                            </div>
                            <input type="text" id="name" v-model="user!.userLastName" placeholder="Enter last name"
                                class="w-full mt-1 text-gray-500 p border border-gray-300 p-2 rounded-lg outline-none focus:border-emerald-200 focus:shadow-md duration-300">
                        </div>
                    </div>
                    <div class="flex flex-col my-5">
                        <div class="flex items-start m-1">
                            <label for="birthData" class="pr-1 text-gray-700 text-sm">Picture</label>
                            <IconsStar />
                        </div>
                        <div class="">
                            <label :class="imagePreviw ? 'border-emerald-200 shadow-md shadow-emerald-200' : ''"
                                class="w-full sm:w-1/2 flex justify-center p-4 my-2 rounded-lg shadow-md tracking-wide uppercase border cursor-pointer hover:text-emerald-200 duration-300">
                                <img v-if="imagePreviw" :src="imagePreviw">
                                <div v-else>
                                    <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20">
                                        <path
                                            d="M10 4a4 4 0 00-4 4v6a4 4 0 008 0V8a4 4 0 00-4-4zm0 2a2 2 0 012 2v6a2 2 0 01-4 0V8a2 2 0 012-2zM4 8a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8z">
                                        </path>
                                    </svg>
                                    <span class="mt-2 text-base leading-normal">Select a picture</span>
                                </div>
                                <input type='file' class="hidden" @change="previewImage" />
                            </label>
                        </div>

                    </div>

                    <div class="flex my-5">
                        <div class="w-full m-1">
                            <div class="flex">
                                <label for="topic" class="pr-1 text-gray-700 text-sm">Phone number</label>
                                <IconsStar />
                            </div>
                            <select class="mt-2 outline-none border border-gray-300 w-full rounded-sm text-gray-500 p-2"
                                v-model="user.gender">
                                <option value="" disabled>Gender</option>
                                <option value="Male">male</option>
                                <option value="Female">fmale</option>
                            </select>
                        </div>

                        <div class="w-full m-1">
                            <div class="flex">
                                <label for="topic" class="pr-1 text-gray-700 text-sm">Phone number</label>
                                <IconsStar />
                            </div>
                            <input type="text" id="name" v-model="user.phoneNumber" placeholder="Enter your phone number"
                                class="w-full mt-2 text-gray-500 p border border-gray-300 p-2 rounded-sm outline-none focus:border-emerald-200 focus:shadow-md duration-300">
                        </div>

                    </div>
                    <div class="flex flex-col">
                        <div class="flex items-start m-1">
                            <label for="email" class="pr-1 text-gray-700 text-sm">Email</label>
                            <IconsStar />
                        </div>
                        <input type="text" id="email" v-model="user!.email" placeholder="Enter user email"
                            class="w-full mt-1 text-gray-500 p border border-gray-300 p-2 rounded-lg outline-none focus:border-emerald-200 focus:shadow-md duration-300">
                    </div>
                </div>
                <div class="w-full text-end  my-5">
                    <button type="button" @click="updateUser()"
                        class=" bg-emerald-600 text-white font-medium rounded hover:bg-emerald-700 focus:bg-emerald-800 p-2 px-4 focus:outline-none transition-colors duration-200">
                        <span class="text-white font-semibold">submit</span>
                    </button>
                </div>
            </div>



        </div>
    </div>
</template>




<script setup lang="ts">
// Libraries
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import { useToast } from "vue-toastification";
const toast = useToast();


type UserType = {
    userName: string;
    userFirstName: string;
    userLastName: string;
    email: string;
    phoneNumber: string;
    image: string;
    gender: string;
};


const axios = useNuxtApp().$axios

// Variables
const user: UserType = reactive({
    userName: '',
    userFirstName: '',
    userLastName: '',
    email: '',
    phoneNumber: '',
    image: '',
    gender: '',
})

const imagePreviw = ref('')


onMounted(() => {
    GetUser();
});

// Functions
async function GetUser() {
    try {
        const res = await axios.get('User/GetUser');

        if (res.data) {
            user.userName = res.data.userName || '';
            user.userFirstName = res.data.userFirstName || '';
            user.userLastName = res.data.userLastName || '';
            user.email = res.data.email || '';
            user.phoneNumber = res.data.phoneNumber || '';
            user.image = res.data.image || '';
            user.gender = res.data.gender || 0;
        }

        imagePreviw.value = res.data.image

    } catch (error) {
        toast.error("An error occurred. Please try again!");
    }
}



async function updateUser() {

    const formData = new FormData();
    formData.append('UserName', user.userName)
    formData.append('FirstName', user.userFirstName)
    formData.append('LastName', user.userLastName)
    formData.append('Email', user.email)
    formData.append('PhoneNumber', user.phoneNumber)
    formData.append('Image', user.image)
    formData.append('Gender', user.gender)

    if (
        !user.userName ||
        !user.userFirstName ||
        !user.userLastName ||
        !user.email ||
        !user.phoneNumber ||
        !user.image ||
        !user.gender

    ) {
        toast.error("Please complete the fields marked with an asterisk (*) first.", { timeout: 4000 });
    } else {
        
        try {
            const res = await axios.post('User/UpdateUser', formData);
        if (res.status === 200) {
            toast.success("successfully updated!");
        } else {
            toast.error("An error occurred. Please try again.!");
            
        }
    } catch (error) {
        toast.error("An error occurred. Please try again.!");
    }
    
}
}


function previewImage(event: any) {
    const input = event.target;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            user.image = input.files[0];
            imagePreviw.value = e.target.result
        }
        reader.readAsDataURL(input.files[0]);
    }
}
</script>


<style >
.main {
    direction: ltr;
}
</style>


