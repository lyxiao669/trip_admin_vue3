<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭这个标签
      </li>
      <li @click="closeOthersTags">关闭其他标签</li>
      <li @click="closeAllTags(selectedTag)">关闭所有标签</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { RootState } from '@/store'
import { computed, defineComponent, getCurrentInstance, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { RouteLocationNormalized, RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ScrollPane from './scroll-pane.vue'

type Tag = any

export default defineComponent({
  components: { 
    ScrollPane
  },
  setup() {
    const store = useStore<RootState>()
    const currentRoute = useRoute()
    const router = useRouter()
    const { proxy } = getCurrentInstance() as any

    let visible = ref(false)
    let top = ref(0)
    let left = ref(0)
    let selectedTag = ref({})
    let affixTags = reactive<any[]>([])
    let tagComponents = ref<any[]>([])
    let scrollPane = ref<any>(null)

    const visitedViews = computed(() => {
      return store.state.tagsView.visitedViews
    })

    onMounted(() => {
      addTags()
    })

    const addTags = () => {
      const { path } = currentRoute
      if (path && !path.startsWith('/redirect/')) {
        store.dispatch('tagsView/addView', currentRoute)
      }
      return false
    }

    const setTabComponent = (tag: Tag) => {
      tagComponents.value = []
    }

    const isActive = (route: RouteLocationNormalizedLoaded) => {
      return route.path === currentRoute.path
    }

    const isAffix = (tag: Tag) => {
      return (tag?.meta && tag?.meta?.affix) ?? false
    }

    const moveToCurrentTag = () => {
      const tags = tagComponents.value
      if (!tags) {
        return
      }

      nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === currentRoute.path) {
            scrollPane.value.moveToTarget(tag)
            if (tag.to.fullPath !== currentRoute.fullPath) {
              store.dispatch('tagsView/updateVisitedView', currentRoute)
            }
            break
          }
        }
      })
    }

    const closeMenu = () => {
      visible.value = false
    }

    const refreshSelectedTag = (view: RouteLocationNormalized) => {
      store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        console.log('fullPath', view)
        nextTick(() => {
          router.replace({
            path: '/redirect/' + encodeURIComponent(fullPath.slice(1)),
          })
        })
      })
    }

    const toLastView = (visitedViews: RouteLocationNormalized[], view: RouteLocationNormalized) => {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          router.replace({ path: '/redirect/' + encodeURIComponent(view.fullPath.slice(1)) })
        } else {
          router.push('/')
        }
      }
    }

    const closeSelectedTag = (view: any) => {
      store.dispatch('tagsView/delView', view)
        .then(({ visitedViews }) => {
          if (isActive(view)) {
            toLastView(visitedViews, view)
          }
        })
    }

    const closeOthersTags = () => {
      router.push(selectedTag.value)
      store.dispatch('tagsView/delOthersViews', selectedTag.value)
        .then(() => {
          moveToCurrentTag()
        })
    }

    const closeAllTags = (view: RouteLocationNormalized) => {
      store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (affixTags.some((tag) => tag.path === view.path)) {
          return
        }
        toLastView(visitedViews, view)
      })
    }

    const openMenu = (tag: any, e: MouseEvent) => {
      const menuMinWidth = 105
      const offsetLeft = proxy.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = proxy.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const innerLeft = e.clientX - offsetLeft + 15 // 15: margin right

      if (innerLeft > maxLeft) {
        left.value = maxLeft
      } else {
        left.value = innerLeft
      }

      top.value = e.clientY
      visible.value = true
      selectedTag.value = tag
    }

    watch(() => {
      return currentRoute.path
    }, () => {
      addTags()
      moveToCurrentTag()
    })

    watch(() => {
      return visible.value
    }, (value) => {
      if (value) {
        document.body.addEventListener('click', closeMenu)
      } else {
        document.body.removeEventListener('click', closeMenu)
      }
    })

    return {
      top,
      left,
      visible,
      selectedTag,
      visitedViews,
      scrollPane,

      isAffix,
      isActive,
      closeSelectedTag,
      openMenu,
      closeOthersTags,
      refreshSelectedTag,
      closeAllTags
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: $theme;
        color: #fff;
        border-color: $theme;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
