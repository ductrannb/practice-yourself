<template>
  <div :class="{'ckeditor-box': true, 'ckeditor-error': errorMessage}" ref="ckeditor">
    <ckeditor
        :editor="editor" v-model="editorModel" :config="editorConfig"
        @input="$emit('update:modelValue', editorModel.replace('<h1>&nbsp;</h1>', ''))"
    ></ckeditor>
    <span class="ckeditor--error-message" v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

<script>
import Editor from "@blowstack/ckeditor5-full-free-build"

export default {
  props: {
    placeholder: {
      type: String,
      default: 'Nhập nội dung'
    },
    errorMessage: {
      type: String,
      default: null
    },
    updater: {
      type: String,
      required: true
    }
  },
  computed: {
    editorConfig() {
      return {
        toolbar: [
          'bold',
          'italic',
          'alignment',
          'CodeBlock',
          'FontColor',
          'FontBackgroundColor',
          'ImageInsert',
          'MathType',
          '|',
          'undo',
          'redo'
        ],
        placeholder: this.placeholder
      }
    },
    editor() {
      return Editor
    }
  },
  data() {
    return {
      editorModel: '',
    };
  },
  watch: {
    updater(value) {
      this.editorModel = value
    }
  }
};
</script>

<style scoped>
.ckeditor--error-message {
  color: var(--color-error);
  font-size: .8rem;
}
</style>