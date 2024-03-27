<script setup>
import TheWelcome from '../components/TheWelcome.vue'
defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>

<template>
  <main>
    <h1 class="green">Xin chao {{ name }}</h1>
    <TheWelcome />
  </main>
</template>
