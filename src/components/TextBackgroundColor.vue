<template>
  <span>
    <img :src="blue ? '/images/text-bg-blue.png' : '/images/text-bg-orange.png'">
  </span>
</template>

<script>
export default {
  name: "TextBackgroundColor",
  props: {
    blue: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
span {
  position: absolute;
  z-index: 1;
  inset: 0px;
  box-sizing: border-box;
  margin: .6rem auto 0;
  display: block;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
  overflow: hidden;
}
</style>