<template>
  <button
    :type="type"
    class="focus:outline-none border focus:ring-2 focus:ring-opacity-50 rounded-md px-4 h-10 min-w-[40px] font-medium text-sm focus:ring-offset-2 shadow-sm"
    :class="colorClasses"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { computed, toRefs } from '@vue/runtime-core'

export default {
  props: {
    type: {
      type: String,
      default: 'button'
    },
    color: {
      type: String,
      default: 'plain'
    }
  },
  setup (props) {
    const { color } = toRefs(props)

    const colorMap: Record<string, string> = {
      plain: 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100 focus:ring-indigo-600',
      indigo: 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 focus:ring-indigo-600'
    }

    const colorClasses = computed(() => colorMap[color.value])

    return {
      colorClasses
    }
  }
}
</script>

<style>

</style>
