<template>
    <div class="text-lef">
        <Carousel :autoplay="2500" :itemsToShow="2" :wrap-around="true">
            <Slide v-for="item in props.data" class="slide p-2 pb-4">
                <div class="cursor-pointer shadow-lg w-full border rounded-md hover:shadow-emerald-200 duration-300 flex flex-col"
                    @click="$router.push('/event/' + item.id)">
                    <div class="h-64 w-full relative flex-shrink-0">
                        <img :src="item.image" alt="" class="absolute top-0 left-0 h-full w-full rounded-md object-cover">
                    </div>
                    <div class="flex-grow p-3 flex flex-col justify-between">
                        <p class="font-semibold text-lg text-left mb-8 truncate w-full">{{ item.title }}</p>
                        <div>
                            <p class="text-left text-sm mb-1">
                                {{ item.startDate }}
                                {{ item.isOnline == 1 ? 'online' : item.isOnline }}
                            </p>
                            <p class="text-left text-lg">{{ item.price == 0 ? "free" : item.price + ' $' }} </p>
                        </div>
                    </div>
                </div>
            </Slide>


            <template #addons>
                <Navigation />
                <Pagination />
            </template>
        </Carousel>

    </div>
</template>
  



<script setup lang="ts">
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { PropType } from 'vue'


interface SlideData {
    image: string;
    title: string;
    startDate: string;
    id: Number;
    price: Number;
    isOnline: Number;
}

const props = defineProps({
    data: {
        type: Array as PropType<SlideData[]>,
        required: true
    }
})


</script>


<style >
.carousel__pagination {
    display: flex;
    justify-content: center;
    gap: 7px;
    list-style: none;
    padding: 20px;

}


.carousel__pagination-button {
    background-color: #7f817fca;
    border: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.carousel__pagination-button--active {
    background-color: #000000;
    width: 23px;
    height: 12px;
    border-radius: 16px/12px;
}

.carousel__pagination-button:after {
    background: #000000;
    width: 0;
    height: 0;

}

.carousel__prev {
    border: 2px solid #1d1c1c92;
    left: -50px;
    border-radius: 12px;
    height: 20%;
    transition: .4s;
}

.carousel__next {
    border: 2px solid #1d1c1c92;
    right: -50px;
    border-radius: 12px;
    height: 20%;
    transition: .4s;
}

.carousel__prev svg,
.carousel__next svg {
    fill: #1d1c1c92;
    transition: .4s;

}

.carousel__prev:hover,
.carousel__next:hover,
.carousel__prev:hover svg,
.carousel__next:hover svg {
    border-color: #000;
    fill: #000;

}
</style>

