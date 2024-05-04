<template>
  <div class="author-box">
    <div class="author--avatar-box">
      <img class="author--avatar avatar" :src="author.avatar || '/images/icons/avatar-default.svg'" alt="avatar">
    </div>
    <span class="author--me" v-if="authorIsMe(author.id)">Tôi</span>
    <span v-else>{{ author.name }}</span>
  </div>
</template>

<script>
export default {
  name: "Author",
  props: {
    author: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.author-box {
  display: flex;
  align-items: center;
  column-gap: 12px;
}
.author--avatar-box {
  width: 28px;
  height: 28px;
}
.author--avatar {
  border: 1px solid #eeeeee;
}
.author--me {
  font-weight: bold;
  color: var(--color-main);
}
</style>