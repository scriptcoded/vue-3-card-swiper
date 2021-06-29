<template>
  <div>
    <input
      :id="id"
      v-model="value"
      :type="type"
      :name="name"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :placeholder="placeholder"
      class="w-full border rounded-lg shadow-sm focus:shadow-md"
      :class="{
        'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500': !error,
        'border-red-600 focus:border-red-500 ring-red-600 focus:ring-red-600': error
      }"
    >
    <span class="text-red-600 text-sm">{{ error }}</span>
  </div>
</template>

<script lang="ts">
import { computed, toRefs } from '@vue/runtime-core'
export default {
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: null
    },
    id: {
      type: String,
      default: null
    },
    autocomplete: {
      type: String,
      default: null
    },
    error: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    autofocus: Boolean
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const { modelValue } = toRefs(props)

    const value = computed({
      get: () => modelValue.value,
      set: (value) => emit('update:modelValue', value)
    })

    return {
      value
    }
  }
}
</script>

<style>

</style>
