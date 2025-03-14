<template>
    <div class="flex flex-col justify-center w-screen h-screen  text-center align">
        <p>page not found</p>
        <img src="../../assets/images/notFound.jpg" 
        @click="myfun()"
        class=" shadow-lg mx-auto cursor-pointer border border-gray-100" alt="">

    </div>
</template>

<script setup>
function myfun() {
    alert('hi')
}

</script>