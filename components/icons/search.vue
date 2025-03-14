<template>
    <span class="inset-y-0 flex items-center px-2">
        <svg class="svg-icon search-icon" aria-labelledby="title desc" height="16" role="img" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 19.9 19.7">
            <title id="title">Search Icon</title>
            <desc id="desc">A magnifying glass icon.</desc>
            <g class="search-path" fill="none" stroke="#111">
                <path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4" />
                <circle cx="8" cy="8" r="7" />
            </g>
        </svg>
    </span>
</template>

<script setup>
const props = defineProps({
    bg: Boolean
})
</script>