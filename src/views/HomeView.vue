<template>
  <main>
    <h1 class="green">Hello World</h1>
    <v-icon icon="mdi-home" />
  </main>
</template>

<script>
export default {
  mounted() {
    axios.get('hello')
  }
}
</script>
