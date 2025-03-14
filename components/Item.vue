<template>
    <div class="text-sm flex flex-col h-full bg-gray-50 border" @mouseover="data.isHovered = true" @mouseleave="data.isHovered = false">

        <img :src="item.image" :alt="item.title" class="object-cover cursor-pointer h-56 p-4 duration-500 rounded-t-lg"
            :class="data.isHovered ? 'scale-105' : ''" @click="$router.push('/event/' + item.id)">

        <div class="flex flex-col h-full p-3">
            <div class="flex-grow">
                <span class="date text-gray-600 text-base flex justify-between">{{ item.startDate }}
                    <span>
                        <IconsSave class="cursor-pointer" />
                    </span>
                </span>
                <p class="py-2 text-lg cursor-pointer" @click="$router.push('/event/' + item.id)">{{ item.title }}</p>
            </div>
            <div>
                <p class="base">
                    <IconsLocation />
                    <span v-if="item.isOnline != 'Online'">
                        Tehran
                    </span>
                    <span v-else>
                        {{item.isOnline}}
                    </span>
                </p>
                <p class="base ">
                    <IconsTag class="" />
                    <span class="">
                        {{item.price}}
                    </span>
                </p>
            </div>
            <div class="flex gap-2 text-xs mt-3">
                <img :src="item.image" :alt="item.title" class="w-8 h-8 bg-cover rounded-lg">
                <span class="text-ellip m-auto">{{ item.description }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    item: Object,
})

const data = reactive({
    isHovered: false
})
</script>

<style scoped>

.base {
    display: flex;
    gap: 5px;
    padding: 3px 5px;
    font-size: .8em;
}

.text-ellip {
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
