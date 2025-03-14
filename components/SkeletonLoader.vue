<template>
    <div v-if="props.type == 'mainList'" class="flex flex-wrap justify-between py-5 animate-pulse">
        <div v-for="item, index in props.itemCount" :key="index"
            class="h-5/6 w-full my-5 sm:w-30 rounded overflow-hidden shadow-md bg-slate-100 hover:shadow-lg hover:shadow-emerald-200 duration-300">
            <div class="">
                <div class="h-40 border bg-white flex justify-center">
                    <IconsPicture class="w-1/3" />
                </div>
                <div class="flex flex-col p-3">
                    <div class="flex-grow w-3/4 bg-gray-200 h-5 rounded-sm mb-2">
                    </div>
                    <div class="flex-grow w-1/4 bg-gray-200 h-5 rounded-sm mb-2">
                    </div>
                    <div class="flex-grow w-1/4 bg-gray-200 h-5 rounded-sm mb-2">
                    </div>
                </div>
                <div class="flex p-3 gap-2">
                    <div class="w-10 h-10 rounded-full bg-gray-200">
                    </div>
                    <div class="w-2/4 bg-gray-200 h-5 rounded-sm self-center">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    type: String,
    itemCount: Number
})
</script>
