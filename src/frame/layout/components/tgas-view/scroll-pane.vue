<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref } from "vue"

const tagAndTagSpacing = 4 // tagAndTagSpacing

export default defineComponent({
  name: 'ScrollPane',
  setup(props, { emit }) {

    const instance = getCurrentInstance() as any

    let scrollContainer = ref<any>(null)

    const scrollWrapper = computed(() => {
      return scrollContainer.value?.wrap
    })

    const handleScroll = (e: any) => {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = scrollWrapper.value
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
    }

    const moveToTarget = (currentTag: any) => {
      const $container = scrollContainer.value.$el
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = scrollWrapper.value
      const tagList: any[] = instance.proxy.$parent.tagComponents

      let firstTag = null
      let lastTag = null

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }

      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex((item) => item === currentTag)
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft =
          nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft =
          prevTag.$el.offsetLeft - tagAndTagSpacing

        if (
          afterNextTagOffsetLeft >
          $scrollWrapper.scrollLeft + $containerWidth
        ) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
        }
      }
    }

    return {
      scrollContainer,

      handleScroll
    }
  }
})
</script>

<style lang="scss">
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  .el-scrollbar__bar {
    bottom: 0px;
  }
  .el-scrollbar__wrap {
    height: 49px;
  }
}
</style>
