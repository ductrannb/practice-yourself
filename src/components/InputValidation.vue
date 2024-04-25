<template>
  <v-text-field
      class="custom-input"
      v-model="value"
      :error-messages="errors"
      :type="typeInput"
      :variant="variant"
      :color="color"
      bg-active="#000000"
      :append-inner-icon="isPassword ? (isShowPassword ? 'mdi-eye' : 'mdi-eye-off') : null"
      @click:append-inner="isShowPassword = !isShowPassword"
      validate-on="blur lazy"
      :mask="numberMask"
      :rules="numberRules"
  >
    <template v-slot:label>
      <span :class="{'required': isRequired}">{{ label }}</span>
    </template>
    <template v-slot:append>
      <slot name="append"></slot>
    </template>
  </v-text-field>
</template>

<script>
import { useField } from "vee-validate"

export default {
  props: {
    name: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    variant: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      default: '#000000',
    },
    isPassword: {
      type: Boolean,
      default: false
    },
    numberMask: {
      type: String,
      required: false,
    },
    numberRules: {
      type: Array,
      required: false,
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    updater: {
      required: true
    }
  },
  data() {
    return {
      isShowPassword: false,
    };
  },
  computed: {
    typeInput() {
      if (this.isPassword && !this.isShowPassword) {
        return 'password'
      }
      return 'text'
    },
  },
  mounted() {
    if (this.name == 'email') {
      this.$bus.on('validate-email', () => {
        this.validate();
      })
    } else if (this.name == 'password') {
      this.$bus.on('generate-random', (value) => {
        this.value = value
      })
    }
  },
  watch: {
    updater(value) {
      this.value = value
    }
  },
  setup(props) {
    const { value, handleBlur, errors, validate } = useField(props.name, undefined);
    return {
      value,
      handleBlur,
      errors,
      validate,
    };
  },
};
</script>

<style scoped>
</style>