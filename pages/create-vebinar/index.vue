<template>
    <div class="main">
        <p class="text-3xl mx-auto lg:w-4/5 w-11/12 pt-5 px-2">create events</p>

        <div class="flex flex-col md:flex-row w-11/12 lg:w-4/5 mx-auto gap-5">
            <div class="w-full md:w-2/3">

                <div class="w-full shadow-md mt-8 mb-5 px-5 py-2 border border-gray-100 ">
                    <p class="font-bold my-8 text-xl">Vebinar's Detail</p>
                    <div class="flex flex-col">
                        <div class="flex items-start m-1">
                            <label for="name" class="pr-1 text-gray-700 text-sm">vebinar's name</label>
                            <IconsStar />
                        </div>
                        <input type="text" id="name" v-model="vebinarObject.Title" placeholder="Enter your vebinar's name"
                            class="border border-gray-300 p-2 rounded-lg outline-none focus:border-emerald-200 focus:shadow-md duration-300">
                    </div>

                    <div class="flex gap-5 my-5">
                        <div class="w-full">

                            <div class="flex items-start m-1">
                                <label for="topic" class="pr-1 text-gray-700 text-sm">Category</label>
                                <IconsStar />
                            </div>
                            <select class="outline-none border border-gray-300 w-full rounded-lg text-gray-500 p-2"
                                v-model="vebinarObject.CategoryId">
                                <option value="" disabled>select category</option>
                                <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                            </select>
                        </div>
                        <div class="w-full">

                            <div class="flex items-start m-1">
                                <label for="topic" class="pr-1 text-gray-700 text-sm">Campany</label>
                                <IconsStar />
                            </div>
                            <select class="outline-none border border-gray-300 w-full rounded-lg text-gray-500 p-2"
                                v-model="vebinarObject.CompanyId">
                                <option value="" disabled>select campany</option>
                                <option v-for="campany in campanis" :value="campany.id">{{ campany.name }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex flex-col my-5">
                        <div class="flex items-start m-1">
                            <label for="img" class="pr-1 text-gray-700 text-sm">Picture</label>
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

                    <div class="flex flex-col my-5">
                        <label for="tags" class="pr-1 text-gray-700 text-sm mb-2">Tags</label>
                        <vue3-tags-input :tags="tags" @on-tags-changed="handleChangeTag" />
                    </div>


                </div>

                <div class="w-full shadow-md my-8 px-5 py-2 border border-gray-100 ">
                    <p class="font-bold my-8 text-xl">Vebinar's information</p>

                    <div class="flex flex-col mt-10">
                        <div class="flex items-start ">
                            <label class="pr-1 text-gray-700 text-sm">Eventech vebinar system</label>
                            <IconsStar />
                        </div>

                        <div class="flex mt-1">
                            <div class="flex items-center mr-4 mb-4" @click="vebinarObject.IsOnline = 1">
                                <input id="radio1" type="radio" name="radio" class="hidden" checked />
                                <label for="radio1" class="flex items-center cursor-pointer">
                                    <span class="w-4 h-4 inline-block mr-1 border border-grey"></span>
                                    Ofline vebinar system</label>
                            </div>

                            <div class="flex items-center mr-4 mb-4" @click="vebinarObject.IsOnline = 0">
                                <input id="radio2" type="radio" name="radio" class="hidden" />
                                <label for="radio2" class="flex items-center cursor-pointer">
                                    <span class="w-4 h-4 inline-block mr-1 border border-grey"></span>
                                    Online vebinar system</label>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-7 my-4">
                        <div class="w-full">
                            <div class="flex items-start m-1">
                                <label for="startDate" class="pr-1 text-gray-700 text-sm">Start date</label>
                                <IconsStar />
                            </div>
                            <VueCtkDateTimePicker color="#6efcba" id="startDate" :overlay="true" label="Start"
                                v-model="vebinarObject.StartDate" />
                        </div>
                        <div class="w-full">
                            <div class="flex items-start m-1">
                                <label for="startDate" class="pr-1 text-gray-700 text-sm">End date</label>
                                <IconsStar />
                            </div>
                            <VueCtkDateTimePicker color="#6efcba" id="startDate" :overlay="true" label="End"
                                v-model="vebinarObject.FinishDate" />
                        </div>
                    </div>

                    <div class="flex gap-7 my-4" v-if="vebinarObject.IsOnline">
                        <div class="w-full">
                            <div class="flex items-start m-1">
                                <label for="startDate" class="pr-1 text-gray-700 text-sm">Address</label>
                                <IconsStar />
                            </div>
                            <input type="text" id="startDate" placeholder="Qom, IAU" v-model="vebinarObject.Address"
                                class="w-full border border-gray-300 p-2 rounded-md outline-none focus:border-emerald-200 focus:shadow-md duration-300">
                        </div>
                        <div class="w-full">
                            <div class="flex items-start m-1">
                                <label for="endDate" class="pr-1 text-gray-700 text-sm">Room capacity</label>
                                <IconsStar />
                            </div>
                            <input type="number" id="endDate" placeholder="number of people"
                                v-model="vebinarObject.Capacity"
                                class="w-full border border-gray-300 p-2 rounded-md outline-none focus:border-emerald-200 focus:shadow-md duration-300">

                        </div>
                    </div>
                    <div v-if="!vebinarObject.IsOnline">
                        <div class="flex gap-7 my-4">
                            <div class="w-full">
                                <div class="flex items-start m-1">
                                    <label for="typeLink" class="pr-1 text-gray-700 text-sm">Webinar holding
                                        service</label>
                                    <IconsStar />
                                </div>
                                <select name="typeLink"
                                    class="outline-none border border-gray-300 w-full rounded-md text-gray-500 p-2">
                                    <option selected>chose from blew list</option>
                                    <option value="1">adobi</option>
                                    <option value="2">skyroom</option>
                                    <option value="3">telegram</option>
                                    <option value="4">other</option>
                                </select>
                            </div>
                            <div class="w-full">
                                <div class="flex items-start m-1">
                                    <label for="capacity" class="pr-1 text-gray-700 text-sm">Room capacity</label>
                                    <IconsStar />
                                </div>
                                <input type="number" id="capacity" placeholder="number of people"
                                    v-model="vebinarObject.Capacity"
                                    class="w-full border border-gray-300 p-2 rounded-md outline-none focus:border-emerald-200 focus:shadow-md duration-300">

                            </div>
                        </div>
                        <div class="my-8">
                            <div class="flex m-1">
                                <label for="link" class="pr-1 text-gray-700 text-sm">Entrance link</label>
                                <IconsStar />
                            </div>
                            <input type="url" id="link" placeholder="Enter your vebinar's link"
                                v-model="vebinarObject.Address"
                                class="w-full border border-gray-300 p-2 rounded-lg outline-none focus:border-emerald-200 focus:shadow-md duration-300">
                        </div>
                    </div>
                    <div class="my-8">
                        <div class="flex m-1">
                            <label for="description" class="pr-1 text-gray-700 text-sm">Description</label>
                            <IconsStar />
                        </div>
                        <textarea id="description" v-model="vebinarObject.Description"
                            class="w-full border border-gray-300 p-2 rounded-lg outline-none focus:border-emerald-200 focus:shadow-md duration-300"></textarea>

                    </div>

                </div>
                <div class="w-full text-end  my-5">
                    <button type="button" @click.prevent="newEvent()"
                        class=" bg-emerald-600 text-white font-medium rounded hover:bg-emerald-700 focus:bg-emerald-800 p-2 px-4 focus:outline-none transition-colors duration-200">
                        <span class="text-white font-semibold">submit</span>
                    </button>
                </div>
            </div>

            <div class="mt-5 hidden md:inline md:w-1/3 md:mt-0">
                <div class="shadow-md px-5 py-2 my-2 border border-gray-100 text-center">
                    <p class="text-xl text-emerald-200 my-3">Total Amount</p>
                    <p class="my-1">{{ vebinarObject.Capacity ? vebinarObject.Capacity * 10 : 0 }} $</p>
                    <p>Considering all the specifications</p>
                    <button @click="$router.push('/not-found')"
                        class="border-2 border-emerald-200 px-3 py-2 rounded-sm my-2 hover:bg-emerald-200 duration-300 hover:text-white ">Tariff
                        and calculation method</button>
                </div>
                <div class="shadow-md px-5 py-2 my-2 border border-gray-100 text-center">
                    <p class="text-xl text-emerald-200 my-3">Need help? Call</p>
                    <p class="my-1">05-(4340)-7788</p>
                    <p>Response from 8 am to 8 pm</p>
                </div>
            </div>

        </div>
    </div>
</template>
  



<script setup lang="ts">
// Libraries
import Vue3TagsInput from 'vue3-tags-input';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import { watch } from 'vue';
import { useToast } from "vue-toastification";
const toast = useToast();

type Category = {
    id: number;
    name: string;
};
type Campanis = {
    id: number;
    name: string;
};
type VebinarObjectType = {
    [key: string]: any;
    Title: string;
    Capacity: number | null;
    Price: number;
    IsOnline: number;
    CategoryId: string;
    CompanyId: string;
    Image: string;
    StartDate: string;
    FinishDate: string;
    Description: string;
    Address: string;
}

const axios = useNuxtApp().$axios

// Variables
const imagePreviw = ref('')
const categories = ref<Category[]>([]);
const campanis = ref<Campanis[]>([]);
const tags = ref([])
const vebinarObject: VebinarObjectType = reactive({
    Title: '',
    Capacity: null,
    Price: 0,
    IsOnline: 1,
    CategoryId: '',
    CompanyId: '',
    Image: '',
    StartDate: '',
    FinishDate: '',
    Description: '',
    Address: '',

})

onMounted(() => {
    GetAllCategory();
    GetAllcampanis()
});
watch(() => vebinarObject.Capacity, (newCapacity) => {
    if (newCapacity !== null) {
        vebinarObject.Price = newCapacity * 100;
    }
}, { immediate: true });

// Functions
async function GetAllCategory() {
    try {
        const res = await axios.get('Category/GetAllCategory');
        categories.value = res.data
    } catch (error) {
        navigateTo('/login')
    }
}
async function GetAllcampanis() {
    try {
        const res = await axios.get('Organizer/GetAllUSerOrganizers');
        campanis.value = res.data

    } catch (error) {
        navigateTo('/login')
    }

}


async function newEvent() {

    const formData = new FormData();
    formData.append('Title', vebinarObject.Title)
    formData.append('Capacity', String(vebinarObject.Capacity))
    formData.append('Price', String(vebinarObject.Price))
    formData.append('IsOnline', String(vebinarObject.IsOnline))
    formData.append('CategoryId', vebinarObject.CategoryId)
    formData.append('CompanyId', vebinarObject.CompanyId)
    formData.append('Image', vebinarObject.Image)
    formData.append('StartDate', vebinarObject.StartDate)
    formData.append('FinishDate', vebinarObject.FinishDate)
    formData.append('Description', vebinarObject.Description)
    formData.append('Address', vebinarObject.Address)
    
    if (
        !vebinarObject.Title ||
        !vebinarObject.Capacity ||
        !vebinarObject.Price ||
        !vebinarObject.CategoryId ||
        !vebinarObject.CompanyId ||
        !vebinarObject.Image ||
        !vebinarObject.StartDate ||
        !vebinarObject.FinishDate ||
        !vebinarObject.Description ||
        !vebinarObject.Address
    ) {
        toast.error("Please complete the fields marked with an asterisk (*) first.", { timeout: 5000 });

    } else {
        try {
            const res = await axios.post('Event/AddEvent', formData);
            if (res.status === 200) {
                toast.success("created successfully!");
                navigateTo('/')
            } else {
                toast.error("An error occurred. Please try again!");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again!");
        }
    }

}





function handleChangeTag(tag: any) {
    tags.value = tag;
}


function previewImage(event: any) {
    const input = event.target;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            vebinarObject.Image = input.files[0];
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


/* time picker style  */
.v3ti {
    border: 1.5px solid rgba(150, 150, 150, 0.67);
    transition: .3s;
    padding: 3px;

}

.v3ti--focus {
    outline: none;
    box-shadow: 0 0 0 0;
    transition: .3s;
}

.v3ti--focus {
    outline: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border: 1px solid #78f7bc;
    transition: .3s;
}

.v3ti .v3ti-tag {
    background: #a7f3d0;
    color: rgb(0, 0, 0)
}

.v3ti .v3ti-tag .v3ti-remove-tag {
    color: #47991b;
    transition: color .3s;
    outline: none;
}


/* radio inputs style */
input[type="radio"]+label span {
    transition: background .2s,
        transform .2s;
}

input[type="radio"]+label span:hover,
input[type="radio"]+label:hover span {
    transform: scale(1.2);
}

input[type="radio"]:checked+label span {
    background-color: #78f7bc;
    box-shadow: 0px 0px 0px 2px white inset;
}

input[type="radio"]:checked+label {
    color: #78f7bc;
}
</style>


