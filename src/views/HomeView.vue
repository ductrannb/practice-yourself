<template>
  <main>
    <h1 class="green">Hello World</h1>
    <v-icon icon="mdi-home" />
    <v-btn v-if="!isLoading" @click="startLoading">Start Loading</v-btn>
    <v-btn v-else @click="stopLoading">Stop Loading</v-btn>
  </main>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  created() {
    console.log()
  },
  computed: {
    ...mapGetters(['isLoading'])
  },
  mounted() {
    axios.get('hello')
  },
  methods: {
    ...mapActions(['startLoading', 'stopLoading'])
  }
}
</script>
