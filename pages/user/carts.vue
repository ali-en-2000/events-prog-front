<template>
    <div class="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 data-test="h1-tag" class="text-center my-20 text-4xl font-bold">List of your carts</h1>
        <h1 data-test="h1-tag" v-if="!carts" class="text-center my-48 text-2xl font-semibold text-gray-500">Your cart is
            empty</h1>

        <div v-if="carts" class="grid gap-8 md:grid-cols-2 my-10 lg:grid-cols-3">

            <div class="border p-5 rounded-lg shadow-md hover:shadow-xl duration-300" v-for="item in carts"
                :key="item.ticketID" @click="$router.push('/event/' + item.eventId)">
                <img :src="item.eventImage" alt="Organizer Logo"
                    class="w-16 h-16 md:w-24 md:h-24 rounded-full mx-auto mb-6" />

                <div class="flex justify-between mb-6">
                    <h2 class="text-xl font-semibold">{{ item.eventTitle }}</h2>
                    <h2 class="text-2xl font-bold">{{ item.eventPrice }}$</h2>
                </div>

                <div class="flex flex-col gap-5">
                    <div class="flex justify-between items-center text-base">
                        <span class="font-semibold text-gray-800">Start date:</span>
                        <span>{{ item.eventStartDate }}</span>
                    </div>

                    <div class="flex justify-between items-center text-base">
                        <span class="font-semibold text-gray-800">End date:</span>
                        <span>{{ item.eventFinishDate }}</span>
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
const carts = ref(null)

onMounted(() => {
    getCarts()
})


async function getCarts() {
    try {
        const response = await axios.get('Cart/GetAllTicketsInCart')
        if (!response.data.message && response.status == 200) {
            carts.value = response.data

        } else if (response.data.message == 'سبد خرید شما خالی میباشد !!.') {
            carts.value = null

        } else {
            carts.value = null
        }
    } catch (error) {
        toast.error("An error occurred. Please try again!");


    }

}

</script>