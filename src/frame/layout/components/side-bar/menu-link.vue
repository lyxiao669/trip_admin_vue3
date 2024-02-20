<template>
  <a v-if="isExternalUrl" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>

  <router-link v-else :to="to">
    <slot />
  </router-link>

</template>

<script lang="tsx">
import { defineComponent, toRefs, ref } from 'vue'

import { isExternal } from '@/frame/utils/is'

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { to } = toRefs(props)

    const isExternalUrl = ref(isExternal(to.value))
    return {
      isExternalUrl: isExternalUrl,
      to
    }
  }
})
</script>
