<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path + index.toString()">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { RootState } from '@/store'
import { computed, defineComponent, ref, watch } from 'vue'
import { RouteRecordRedirectOption, useRoute, useRouter } from 'vue-router'
import { compile } from 'path-to-regexp'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore<RootState>()
    const route = useRoute()
    const router = useRouter()

    const userFirstMenu = computed(() => {
      return store.state.user.userFirstMenu
    })

    const isDashboard = computed(() => {
      return route.path === userFirstMenu.value?.menuUrl
    })

    type LevelModel = {
      path: string;
      redirect?: RouteRecordRedirectOption;
      meta: {
        title: string;
      }
    }

    const levelList = ref<LevelModel[]>([])

    // 获取面包屑数据
    const getBreadcrumb = () => {
      let result: LevelModel[] = []
      let matched = route.matched.filter((item) => item.meta && item.meta.title)

      const matchedRecords = matched.map((matchItem) => {
        return {
          path: matchItem.path,
          redirect: matchItem.redirect,
          meta: {
            title: (matchItem?.meta?.title ?? '未定义菜单') as string,
          }
        }
      })
      if (!isDashboard.value) {
        result = [{ path: <string>userFirstMenu.value?.menuUrl, meta: { title: '首页' } }].concat(matchedRecords)
      } else {
        result = matchedRecords
      }
      levelList.value = result
    }

    watch(() => {
      return route.path
    }, () => {
      getBreadcrumb()
    })

    getBreadcrumb()

    // 点击面包屑事件
    const handleLink = (item: LevelModel) => {
      const { params } = route
      const newPath = compile(item.path)(params)
      router.push(newPath)
    }

    return {
      levelList,
      handleLink
    }
  },
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 48px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
