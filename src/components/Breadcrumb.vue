<template>
  <div class="breadcrumb-list-box">
    <ul class="breadcrumb-list">
      <li v-for="(item, index) in items" :key="index" class="breadcrumb-item">
        <router-link v-if="item.route" :to="{name: item.route.name, params: item.route.params}">
          {{ item.title }}
        </router-link>
        <span v-else>
          {{ item.title }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.breadcrumb-list {
  display: flex;
}
.breadcrumb-item {
  font-weight: 500;
}
.breadcrumb-item a {
  color: var(--color-main);
}
.breadcrumb-item:hover a {
  text-decoration: underline;
}
.breadcrumb-item:last-child {
  cursor: default;
}
.breadcrumb-item:not(:last-child):after {
  content: "\F0142";
  display: inline-block;
  font: normal normal normal 24px / 1 "Material Design Icons";
  font-size: inherit;
  text-rendering: auto;
  line-height: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0 .25rem;
}
</style>