<template>
    <div>
        <div class="head relative">
            <img :src="data.value?.image" :alt="data.value?.title" class="absolute w-full h-full object-cover">
            <div class="bg_blur w-full h-full relative backdrop-blur-md  ">
                <div class="base_width relative w-full sm:w-4/5  md:w-3/4 h-9/10  mx-auto flex flex-wrap">
                    <img :src="data.value?.image" :alt="data.value?.title" class="head_image1 w-full sm:w-2/3 object-cover">
                    <div class="head_main  w-full md:w-1/3 bg-white p-5 flex flex-col justify-between">
                        <div>
                            <img :src="data.value?.image" :alt="data.value?.title"
                                class="head_image2 hidden w-full h-64 object-cover">

                            <p class="head_date text-sm">{{ data.value?.startDate }}</p>
                            <p class="head_title text-base lg:text-xl font-bold mt-2">{{ data.value?.title }}</p>
                        </div>

                        <div class="head_detail text-xs lg:text-sm sm:mt-0">
                            <p><i class="fa fa-tag" aria-hidden="true"></i> {{ data.value?.price == 0 ? "free" :
                                data.value?.price + ' $' }} </p>
                            <p><i class="fa fa-map-marker" aria-hidden="true"></i> {{ data.value?.isOnline == 1 ? 'online' :
                                data.value?.isOnline }}</p>
                            <p><i class="fa fa-th-large" aria-hidden="true"></i> {{ data.value?.startDate }}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="flex flex-col md:flex-row w-11/12 md:w-5/6 mx-auto my-10">
            <div class="w-full md:w-2/3 shadow-md px-4   py-2 border border-gray-100 mb-4 md:mb-0 md:mr-4">
                <div class="border-b border-gray-200 mb-4 pb-2">
                    <h2 class="text-2xl font-semibold">{{ data.value?.description }}</h2>
                </div>
                <div class="mb-4">
                    <p class="text-gray-600 flex items-center mb-2">
                        <i class="fas fa-calendar-alt text-gray-500 mr-2"></i>June 12, 2023 | 6:00 PM
                    </p>
                </div>
                <div class="mb-4">
                    <h3 class="text-lg font-semibold mb-2">About the Event</h3>
                    <p class="text-gray-600">Join us for an unforgettable evening filled with insights, networking, and
                        entertainment. This event is the culmination of industry leaders and enthusiasts coming together
                        for a shared passion.</p>
                </div>
                <div class="mb-4">
                    <p class="text-gray-600 flex items-center mb-2">
                        Address: {{ data.value?.eventAddress }}
                    </p>
                    <p class="text-gray-600 flex items-center mb-2">
                        Organized by: {{ data.value?.organizer }}
                    </p>
                    <p class="flex items-center mb-2"
                        :class="data.value?.remainingCapacity > 0 ? 'text-emerald-400' : 'text-red-400'">
                        Seats left: {{  data.value?.remainingCapacity }} </p>
                </div>
                <div class="mb-4">
                    <p class="text-gray-600 text-lg font-bold flex items-center mb-2">
                        Ticket Price: {{ data.value?.price == 0 ? "free" :
                            data.value?.price / 10 + ' $' }}
                    </p>
                </div>
                <div class="mt-4  text-end">
                    <a href="#" @click="getTicket"
                        class=" inline-block border text-xs px-4 py-2 rounded text-gray-800 border-gray-800 hover:bg-gray-800 hover:text-white transition duration-200">
                        Get Ticket
                    </a>
                </div>

            </div>

            <div class="w-full md:w-1/3">
                <div class="shadow-md px-2 md:px-5 py-2 my-2 border border-gray-100 ">

                    <div class="content_start_date"><i class="fa fa-clock mr-2" aria-hidden="true"></i>start :
                        {{ data.value?.startDate }}
                    </div>
                    <div class="content_end_date"><i class="fa fa-clock mr-2" aria-hidden="true"></i>end : {{
                        data.value?.finishDate }}
                    </div>
                </div>
                <div class="shadow-md px-2 md:px-5 py-2 my-4 border border-gray-100">
                    <p>share event :</p>
                    <div class="flex gap-4 mt-3">
                        <i class="fa fa-telegram cursor-pointer" aria-hidden="true"></i>
                        <i class="fa fa-linkedin cursor-pointer" aria-hidden="true"></i>
                        <i class="fa fa-whatsapp cursor-pointer" aria-hidden="true"></i>
                    </div>
                    <div class="flex flex-col space-y-2 sm:space-y-0  mt-4">
                        <input type="text" class="text-sm bg-gray-50 w-full sm:w-auto flex-1 py-2 my-1.5 border" disabled
                            :value="currentUrl">
                        <button @click="copyLink"
                            class="btn_copy w-full relative border text-xs sm:text-sm  sm:px-4 py-1 sm:py-2 text-gray-800 border-gray-800 hover:bg-slate-700 hover:text-gray-50 duration-200 sm:w-auto">
                            copy link
                            <span
                                class="absolute -top-6 sm:-top-7  p-2 rounded-lg bg-gray-800 text-gray-50 duration-500"
                                :class="copied ? '' : 'hidden'">copied</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();
const axios = useNuxtApp().$axios

const route = useRoute()
onMounted(async () => {
    const id = route.params.id
    getData(id)

})



var data = reactive({})

const currentUrl = ref(typeof window !== 'undefined' ? window.location.href : '')
const copied = ref(false)

async function getData(id) {
    try {
        data.value = (await axios.get('Event/GetEventById?eventId=' + id)).data;
    } catch (error) {
        console.error(error);
    }
}


async function getTicket() {
    const token = localStorage.getItem("token");
    if (!token) {
        toast.error("Please first login then try again.");

    } else {

        try {
            const res = (await axios.post('Ticket/TicketSales?eventId=' + route.params.id)).data;
            toast.success('Your ticket has been successfully purchased. We look forward to meeting you at the event!');
            navigateTo('/')
        } catch (error) {
            console.error(error);
        }
    }
}
function copyLink() {
    copied.value = true;
    navigator.clipboard.writeText(currentUrl.value)
    setTimeout(() => {
        copied.value = false;
    }, 1000);
}
</script>

  
<style scoped>
.bg_blur {
    backdrop-filter: blur(80px);
    background-color: rgba(255, 255, 255, 0.2);
    padding-top: 5vh;
}

.base_width {
    position: relative;
    width: 80%;
    height: 90%;
    margin: auto;
}

.head {
    position: relative;
    height: 70vh;
}

.head_main {
    direction: ltr;
    font-family: sans-serif;
    height: 65vh;

}

.head_image1 {
    height: 65vh;
}

@media (max-width: 678px) {

    /* Tailwind's sm breakpoint */
    .head_image1 {
        display: none;
    }

    .head_image2 {
        display: inline;
    }

    .base_width {
        width: 93%;
    }

    .head {
        position: relative;
        height: 70vh;
    }
}
</style>


