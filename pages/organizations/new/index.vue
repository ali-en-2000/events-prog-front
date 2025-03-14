<template>
    <div class="main">
        <p class="text-3xl mx-auto w-4/5 pt-5 px-2">Create a new organizer</p>

        <div class="flex w-4/5 mx-auto gap-5">
            <div class="w-full">

                <div class="w-full shadow-md mt-8 mb-5 px-5 py-2 border border-gray-100 ">
                    <p class="font-bold my-8 text-xl">Organizer detail</p>
                    <div class="flex flex-col">
                        <div class="flex items-start m-1">
                            <label for="name" class="pr-1 text-gray-700 text-sm">Name of the organizer</label>
                            <IconsStar />
                        </div>
                        <input type="text" id="name" placeholder="Enter your organizer's name" v-model="data.Name"
                            class="border border-gray-300 p-2 rounded-lg outline-none focus:border-emerald-200 focus:shadow-md duration-300">
                    </div>

                    <div class="flex flex-col my-5">
                        <div class="flex items-start m-1">
                            <label for="img" class="pr-1 text-gray-700 text-sm">Picture</label>
                            <IconsStar />
                        </div>
                        <div class="">
                            <label :class="data.ImagePreviw ? 'border-emerald-200 shadow-md shadow-emerald-200' : ''"
                                class="w-full sm:w-1/2 flex justify-center p-4 my-2 rounded-lg shadow-md tracking-wide uppercase border cursor-pointer hover:text-emerald-200 duration-300">
                                <img v-if="data.ImagePreviw" :src="data.ImagePreviw">
                                <div v-else>
                                    <svg class="w-full h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20">
                                        <path
                                            d="M10 4a4 4 0 00-4 4v6a4 4 0 008 0V8a4 4 0 00-4-4zm0 2a2 2 0 012 2v6a2 2 0 01-4 0V8a2 2 0 012-2zM4 8a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8z">
                                        </path>
                                    </svg>
                                    <span class="my-4 text-base leading-normal">Select a picture</span>
                                </div>
                                <input type='file' class="hidden" @change="previewImage" />
                            </label>
                        </div>

                    </div>

                    <div class="flex flex-col my-5">
                        <div class="flex items-start my-2 mx-1">
                            <label for="description" class="pr-1 text-gray-700 text-sm">Description of the organizer</label>
                        </div>
                        <textarea id="description" v-model="data.Description"
                            class="border border-gray-300 p-2 rounded-lg outline-none focus:border-emerald-200 focus:shadow-md duration-300"></textarea>
                    </div>

                    <div class="w-full  flex gap-2 justify-between sm:justify-end px-5 my-5">
                        <button type="button" @click="router.push('/organizations')"
                            class=" bg-red-600 text-white font-medium rounded hover:bg-red-700 focus:bg-red-800 p-2 px-4 focus:outline-none transition-colors duration-200">
                            <span class="text-white font-semibold">cancel</span>
                        </button>
                        <button type="button" @click="newOrgan()"
                            class=" bg-emerald-600 text-white font-medium rounded hover:bg-emerald-700 focus:bg-emerald-800 p-2 px-4 focus:outline-none transition-colors duration-200">
                            <span class="text-white font-semibold">submit</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  



<script setup lang="ts">
// Libraries
import { reactive } from 'vue';
import { useToast } from "vue-toastification";
const toast = useToast();

const axios = useNuxtApp().$axios

// Variables
const router = useRouter();
const data = reactive({
    Name: '',
    Description: '',
    Image: null,
    ImagePreviw: null,
})

// Functions
async function newOrgan() {
    const formData = new FormData();

    formData.append('Name', data.Name);
    formData.append('Description', data.Description);
    formData.append('Image', data.Image ? data.Image : '');

    if (
        !data.Name ||
        !data.Image

    ) {
        toast.error("Please complete the fields marked with an asterisk (*) first.", { timeout: 3000 });
    } else {
        try {
            const response = await axios.post('Organizer/AddOrganizer', formData, {
            });
            if (response.status === 200) {
                toast.success("successfully added!");
                router.push('/organizations');
            } else {
                toast.error("An error occurred. Please try again!");
            }
        } catch (error) {
            toast.error("Log in first!");

        }
    }
}

function previewImage(event: any) {
    const input = event.target;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            data.Image = input.files[0];
            data.ImagePreviw = e.target.result
        }
        reader.readAsDataURL(input.files[0]);
    }
}

</script>

<style>
.main {
    direction: ltr;
}
</style>


