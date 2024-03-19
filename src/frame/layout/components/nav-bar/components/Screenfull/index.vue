<template>
  <div>
    <jz-icon :icon="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import screenfull, { Screenfull } from 'screenfull'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'Screenfull',
  setup() {
    const isFullscreen = ref<Boolean>(false)

    const change = () => {
      let screenfull2 = screenfull as Screenfull 
      isFullscreen.value = screenfull2.isFullscreen
    }

    const click = () => {
      if (!screenfull.isEnabled) {
        ElMessage({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    }

    onMounted(() => {
      if (screenfull.isEnabled) {
        screenfull.on('change', change)
      }
    })

    onBeforeUnmount(() => {
      if (screenfull.isEnabled) {
        screenfull.off('change', change)
      }
    })


    return {
      isFullscreen,
      click
    }
  }
})
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
