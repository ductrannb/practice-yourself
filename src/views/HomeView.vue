<script setup>
const baseUrl = import.meta.env.VITE_BASE_URL_API
</script>

<template>
  <main>
    <h1 class="green">Hello World</h1>
    <h1 class="green">{{ baseUrl }}</h1>
  </main>
</template>
