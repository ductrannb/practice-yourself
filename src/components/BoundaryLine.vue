<template>
  <p class="boundary-line">
    <span>{{ text }}</span>
  </p>
</template>

<script>
export default {
  name: "BoundaryLine",
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.boundary-line {
  width: 100%;
  text-align: center;
  color: rgba(0,0,0,0.6);
  border-bottom: 1px solid rgba(0,0,0,0.6);
  line-height: 0.1em;
  margin: 10px 0 20px;
}

.boundary-line span {
  background: #ffffff;
  padding: 0 10px;
}
</style>