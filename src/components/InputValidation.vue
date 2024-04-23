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
  </v-text-field>
</template>

<script setup>
import {computed, defineProps, ref, toRef} from "vue";
import { useField } from "vee-validate";


const props = defineProps({
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
  }
});

let isShowPassword = ref(false);
const typeInput = computed(() => {
  if (props.isPassword && !isShowPassword.value) {
    return 'password'
  }
  return 'text'
})

const { value, handleBlur, errors } = useField(toRef(props, "name"), undefined);
</script>
<style scoped>
</style>