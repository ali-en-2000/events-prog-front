<template>
    <div class=" mx-5 sm:px-10 lg:px-28 font-sans text-lg">
        <Swiper v-if="data.slider && data.slider.length > 0" :data="data.slider" class="m-10 hidden md:block" />
        <div class="text-3xl shadow-lg border mt-5 p-5">
            <div class="flex justify-between items-center mb-4">
                <p class="ml-2 text-cyan-900">filters</p>
                <select
                    class="border border-gray-300 p-2 pr-8 rounded-md text-lg focus:border-emerald-500 outline-none duration-300 bg-white"
                    v-model="selectBoxValue" @change="getAll(selectedCategory, selectBoxValue)">
                    <option value="None" selected>select</option>
                    <option value="0">Online</option>
                    <option value="1">Offline</option>
                </select>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 border-t border-emerald-500 p-3">
                <p v-for="item, index in filter.items" :key="index" @click="changeChategory(item)"
                    class="text-xs md:text-base py-1.5 rounded-md transition-colors duration-500 cursor-pointer text-center hover:bg-emerald-300 hover:text-white"
                    :class="item.isSelected ? ' bg-emerald-500 text-white hover:bg-emerald-500' : ''">
                    {{ item.title }}
                </p>
            </div>
        </div>
        <div class="text-3xl">
            <span class="block pl-5 mt-10 border-l-4 border-emerald-400 font-semibold">
                The most popular events
            </span>
        </div>
        <ItemList v-if="data.allList && data.allList.length > 0" :items="data.allList" :loader="allLoader"
            :item-count="itemCount" />
        <p v-if="!data.allList || data.allList.length <= 0"
            class="text-xl text-center border  my-20  p-5 rounded-md shadow-md">no
            content for this filter</p>

        <div class="text-3xl ">
            <span class="block pl-5 mt-10 border-l-4 border-emerald-400 font-semibold">
                Best sellers of the week
            </span>
        </div>
        <ItemList v-if="data.bestSellerList && data.bestSellerList.length > 0" :items="data.bestSellerList"
            :loader="favoritLoader" :item-count="4" />
        <p v-if="!data.bestSellerList || data.bestSellerList.length <= 0"
            class="text-xl text-center border  my-20  p-5 rounded-md shadow-md">no
            content for this list</p>


        <div class="text-3xl ">
            <span class="block pl-5 mt-10 border-l-4 border-emerald-400 font-semibold">
                Popular organizer events
            </span>
        </div>
        <ItemList v-if="data.favoritList && data.favoritList.length > 0" :items="data.favoritList"
            :loader="bestSellerLoader" :item-count="4" />
        <p v-if="!data.favoritList || data.favoritList.length <= 0"
            class="text-xl text-center border  my-20  p-5 rounded-md shadow-md">no
            content for this list</p>
    </div>
</template>
  
<script setup lang="ts">
import { watch } from 'vue';
import { useStore } from "~~/stores";
const router = useRouter();

const axios = useNuxtApp().$axios


var data = reactive({
    'slider': [],
    'allList': [],
    'bestSellerList': [],
    'favoritList': [],
})

interface FilterItem {
    title: string;
    isSelected: boolean;
}

var filter = reactive({
    items: [] as FilterItem[],
    SelectedStyle: 'border rounded-sm text-cyan-500 border-cyan-500 bg-cyan-50 text-xs'
});

const selectBoxValue = ref('None');
var allLoader = ref(false)
var selectedCategory = ref('')
var favoritLoader = ref(false)
var bestSellerLoader = ref(false)
var itemCount = ref(6)




onMounted(async () => {
    selectedCategory.value = 'a9656c57-f147-ee11-a8f7-f0d5bf0fbe40'

    getSlider()
    getAll(selectedCategory.value)
    getBestSeller()
    getFavorit()    
    useStore().checkAuth()   
    useStore().showLayout()

    const res = await axios.get('Category/GetAllCategory');
    filter.items = res.data.map((category: any) => {
        return { title: category.name, id: category.id, isSelected: category.id === selectedCategory.value ? true : false };
    });
})

async function getSlider() {
    favoritLoader.value = false
    try {
        const res = await axios.get('Event/HomePageSlider?sliderItemCount=5');
        data.slider = res.data
    } catch (error) {
        console.error(error);
    }
}

async function getAll(categoryId: string, isOnline: any = "None") {
    allLoader.value = false
    const params = ['Event/GetAllByFilter?pageNumber=1&pageSize=6&FilterMode=0'];

    if (categoryId) {
        params.push(`categoryId=${categoryId}`);
    }
    if (typeof isOnline !== 'undefined' && isOnline !== '') {
        params.push(`EventStatus=${isOnline}`);
    }
    const url = params.join('&');

    try {
        const res = await axios.get(url);
        allLoader.value = true
        data.allList = res.data.slice(0, 6)
    } catch (error) {
        console.error(error);
    }
}

async function getBestSeller() {
    bestSellerLoader.value = false
    try {
        const res = await axios.get('Event/GetAllByFilter?pageNumber=1&pageSize=3&FilterMode=1');
        bestSellerLoader.value = true
        data.bestSellerList = res.data.slice(0, 3)
    } catch (error) {
        console.error(error);
    }
}

async function getFavorit() {
    favoritLoader.value = false
    try {
        const res = await axios.get('Event/GetAllByFilter?pageNumber=1&pageSize=3&FilterMode=2');
        favoritLoader.value = true
        data.favoritList = res.data.slice(0, 3)
    } catch (error) {
        console.error(error);
    }
}

function changeChategory(item: any) {
    filter.items.forEach((item) => (item.isSelected = false));
    item.isSelected = true;
    selectedCategory.value = item.id
    getAll(item.id, selectBoxValue.value)
}

watch(
    () => useStore().searchValue,
    async (newValue, oldValue) => {
        allLoader.value = false
        if (useStore().searchValue) {
            try {
                const res = await axios.get('Event/SearchEventName?searchTerm=' + useStore().searchValue);
                allLoader.value = true
                data.allList = res.data
            } catch (error) {
                console.error(error);
            }
        } else {
            getAll(selectedCategory.value)

        }
    }
);

</script>

<style scoped></style>

