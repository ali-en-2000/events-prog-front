<template>
    <span class="inset-y-0  flex items-center px-2">
        <svg class="h-5 w-5 duration-300" :class="bg && 'text-teal-300'" viewBox="0 0 20 20" fill="currentColor"
            aria-hidden="true">
            <path fill-rule="evenodd"
                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                clip-rule="evenodd" />
        </svg>
    </span>
</template>

<script setup>
const props = defineProps({
    bg: Boolean
})
</script>

