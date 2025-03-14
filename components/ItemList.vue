<template>
    <div v-if="!props.loader">
        <SkeletonLoader :type="data.type" :item-count="data.itemCount" />
    </div>
    <div v-else class="py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="item, index in props.items" :key="index"
            class="rounded overflow-hidden shadow-md hover:shadow-lg hover:shadow-emerald-200 duration-300">
            <Item :item="item" />
        </div>
    </div>
</template>
 
<script setup>
const props = defineProps({
    items: Array,
    loader: Boolean,
    itemCount: Number
})

const data = reactive({
    itemCount: props.itemCount,
    type: 'mainList'
}
)

</script>

