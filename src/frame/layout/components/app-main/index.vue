<template>
  <section class="app-main">
    <router-view v-slot="{ Component  }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts">
import { RootState } from '@/store'
import { useStore } from 'vuex'
import { computed, defineComponent, } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore<RootState>()
    const route = useRoute()

    // 缓存目录
    const cachedViews = computed(() => {
      return store.state.tagsView.cachedViews
    })

    // 识别的key
    const key = computed(() => {
      return route.path
    })

    return {
      cachedViews,
      key
    }
  },
})
</script>

<style lang="scss" scoped>
.app-main {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding-top: 80px;
  position: relative;
  overflow: hidden;
}

</style>
