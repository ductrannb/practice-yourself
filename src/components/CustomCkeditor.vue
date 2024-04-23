<template>
  <div class="ckeditor-box" ref="ckeditor">
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
  </div>
</template>

<script>
import Editor from "@blowstack/ckeditor5-full-free-build"

export default {
  props: {
    placeholder: {
      type: String,
      default: 'Nhập nội dung'
    }
  },
  data() {
    return {
      editor: Editor,
      editorData: '',
      editorConfig: {
        toolbar: [
          'bold',
          'italic',
          'alignment',
          'CodeBlock',
          'FontColor',
          'FontBackgroundColor',
          'ImageCaption',
          'ImageInsert',
          'ImageUpload',
          'MathType',
          '|',
          'undo',
          'redo'
        ],
        placeholder: this.placeholder
      },
    };
  }
};
</script>