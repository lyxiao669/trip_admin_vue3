<template>
  <div>
    <jz-icon v-if="icon" style="margin-right: 15px;" class="menu-icon" :icon="icon" />
    <span class="menu-text">{{ title }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
})
</script>
