<template>
  <ckeditor :editor="editor" :config="editorConfig" v-model="model"></ckeditor>
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
  name: 'CustomCkeditor',
  components: [CKEditor],
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
      },
      model: ''
    };
  }
}
</script>

<style scoped>

</style>