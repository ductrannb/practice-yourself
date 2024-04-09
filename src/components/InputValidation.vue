<template>
  <v-text-field
      v-model="value"
      @blur="handleBlur"
      :label="label"
      :error-messages="errors"
      :type="type"
      :variant="variant"
      :color="color"
  />
</template>

<script setup>
import { defineProps, toRef } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    requird: false,
  },
  type: {
    type: String,
    requird: false,
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
    required: false,
  },
});

const { value, handleBlur, errors } = useField(toRef(props, "name"), undefined);
</script>