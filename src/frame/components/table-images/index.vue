<template>
  <div class="table-images">
    <el-image
      class="table-el-image"
      v-for="(info, index) in imgs"
      :key="index"
      :src="preview ? info.origin : info.preview"
      :style="{
        width: width + 'px',
        height: height + 'px'
      }"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: 'TableImages',
  props: {
    value: {
      type: String,
      default: ''
    },
    preview: {
      type: Boolean,
      default: true
    },
    mode: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    }
  },
  setup(props, { emit }) {
    const { value, mode, width, height } = toRefs(props)

    const imgs = computed(() => {
      const srcList = value.value?.split(',') ?? []
      return srcList.map(src => {
        return {
          origin: src,
          preview: `${src}?imageView2/${mode.value}/w/${width.value}/h/${height.value}`
        }
      })
    })

    return {
      imgs
    }

  }
})
</script>

<style lang="scss">
.table-images {
  .table-el-image {
    & + .table-el-image {
      margin-left: 10px;
    }
  }
}
</style>