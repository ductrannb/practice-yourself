<template>
  <div class="ckeditor-box" ref="ckeditor">
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';

export default {
  components: {ckeditor: CKEditor.component},
  props: {
    minHeight: {
      type: String,
      default: '500px'
    }
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {

      }
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>