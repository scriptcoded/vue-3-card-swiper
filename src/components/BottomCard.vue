<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen"
    :class="{
      'pointer-events-none': !open,
      'transition-all duration-300 ease': !isDismissing
    }"
    :style="{
      'backdrop-filter': blurCSS
    }"
  >
    <div
      ref="card"
      class="w-full h-full pointer-events-auto zbg-blue-600 bg-opacity-30"
      :class="{
        'transition-transform duration-300 ease-in-out': !isDismissing
      }"
      :style="{
        transform: `translateY(${offset * 100}%)`
      }"
    >
      <slot
        v-if="open"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Hammer from 'hammerjs'
import { ref, toRefs } from '@vue/reactivity'
import { computed, onMounted, watch } from '@vue/runtime-core'

export default {
  props: {
    open: Boolean
  },
  emits: ['update:open'],
  setup (props, { emit }) {
    const { open } = toRefs(props)

    const card = ref<HTMLElement>()

    const offset = ref(0)
    const isDismissing = ref(false)

    const setupHammer = () => {
      if (!card.value) {
        throw new Error('Missing swiper element')
      }

      const swiperManager = new Hammer.Manager(card.value)
      swiperManager.add(new Hammer.Pan({
        threshold: 0,
        pointers: 0,
        direction: Hammer.DIRECTION_VERTICAL
      }))

      swiperManager.on('pan', (e) => {
        if (isDismissing.value) {
          offset.value = Math.max(e.deltaY, 0) / card.value!.clientHeight
        }
      })

      swiperManager.on('panstart', (e) => {
        isDismissing.value = e.offsetDirection === Hammer.DIRECTION_DOWN
      })

      swiperManager.on('panend', (e) => {
        if (isDismissing.value) {
          isDismissing.value = false
          offset.value = 0

          if (e.deltaY > 200 || e.velocityY > 0.4) {
            offset.value = 1

            setTimeout(() => {
              emit('update:open', false)
            }, 300)
          }
        }
      })
    }

    onMounted(setupHammer)

    const reactToOpen = () => {
      offset.value = open.value ? 0 : 1
    }

    watch(open, reactToOpen)
    onMounted(reactToOpen)

    const blur = computed(() => {
      // Length is for how long the effect should last, expressed as a
      // percentage of the container height.
      const length = 0.3
      // Strength is the strength of the blur effect, expessed in pixels.
      const strength = 5

      const lerp = (length - offset.value) * (1 / length)

      return Math.max(lerp * strength, 0)
    })

    const blurCSS = computed(() => {
      return blur.value > 0
        ? `blur(${blur.value}px)`
        : null
    })

    return {
      card,
      offset,
      isDismissing,
      blurCSS
    }
  }
}
</script>

<style>

</style>
