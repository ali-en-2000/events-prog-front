<template>
    <div class="container">
        <h1 data-test="h1-tag" class="text-center my-10 text-4xl font-bold">List of Organizers</h1>

        <div class="border px-5 py-5 md:py-10 shadow-md hover:shadow-lg duration-300 flex items-center">
            <form class="w-full flex justify-center text-sm md:text-base" @submit.prevent="searchOrganizers()">
                <input type="text" placeholder="Enter name of organizer" v-model="search"
                    class="flex-grow px-2 py-3 border border-gray-300 rounded-lg outline-none duration-200 focus:outline-none text-gray-700" />
                <button type="submit"
                    class="ml-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:bg-emerald-800 p-3 focus:outline-none transition-colors duration-200">
                    <span class="text-white font-semibold">Search</span>
                </button>
            </form>
        </div>

        <div class="my-10">
            <NuxtLink to="/organizations/new"
                class="ml-3 bg-emerald-600 text-white hover:text-white rounded hover:bg-emerald-700 focus:bg-emerald-800 p-2 focus:outline-none transition-colors duration-200 font-semibold">
                Create New Organizer
            </NuxtLink>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            <div class="border p-5 shadow-md hover:shadow-lg duration-300" v-for="item in data.organizers" :key="item.id">
                <div class="flex items-center mb-6">
                    <img :src="item.image" alt="Organizer Logo" class="w-16 h-16 rounded-full" />
                    <h2 class="ml-4 text-xl font-medium">{{ item.name }}</h2>
                </div>
                <div class="flex justify-between">
                    <div class="flex items-center">
                        <span class="text-sm text-gray-600">Events Held:</span>
                        <span class="text-xl font-medium ml-2">{{ item.companyEventsCount }}</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-sm text-gray-600">Followers:</span>
                        <span class="text-xl font-medium ml-2">{{ item.companyFollowersCount }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-16 w-full  flex justify-center items-center">
            <button type="button" v-if="loadMore.showLoadmore"
                class="flex  ml-3 bg-emerald-600 text-white hover:text-white rounded hover:bg-emerald-700 focus:bg-emerald-800 p-2 focus:outline-none transition-colors duration-200 font-semibold"
                @click.prevent="loadMoreOrganizers()">
                Load More Organizers
            </button>
        </div>

    </div>
</template>
  
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useToast } from "vue-toastification";
const toast = useToast();

const axios = useNuxtApp().$axios

type Organizer = {
    id: string;
    image: string;
    name: string;
    companyFollowersCount: string;
    companyEventsCount: string;
};

const search = ref('');
const loadMore = reactive({ count: 6, showLoadmore: false, allCount: 0 });
const data = reactive({ organizers: [] as Organizer[] });

onMounted(() => {
    CountOrganizer();
    getData();
});

async function getData() {

    const res = await axios.get('Organizer/GetAllOrganizers?GetAll=false&topCompanyCount=' + loadMore.count);
    data.organizers = res.data;
    if (loadMore.count < loadMore.allCount) {
        loadMore.showLoadmore = true
    }
}
async function CountOrganizer() {
    try {
        const res = await axios.get('Organizer/CountOrganizer');
        loadMore.allCount = res.data;
    } catch (error) {
        toast.error("An error occurred!");

    }

}

async function searchOrganizers() {
    if (search.value) {
        try {
            const res = await axios.get('Organizer/SearchCompanies?name=' + search.value);
            data.organizers = res.data;
        } catch (error) {
            toast.error("An error occurred!");

        }
    } else {
        getData();
    }
}

async function loadMoreOrganizers() {
    loadMore.count += 3
    if (loadMore.count > loadMore.allCount) {
        loadMore.showLoadmore = false
    }
    try {
        const res = await axios.get('Organizer/GetAllOrganizers?GetAll=false&topCompanyCount=' + loadMore.count);
        data.organizers = res.data;

    } catch (error) {
        toast.error("An error occurred!");
    }
}

</script>
  
<style scoped>
.container {
    direction: ltr;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}
</style>