<template>
  <div class="menu-container">
    <div class="left-bar">
      <div class="add-father">
        <jz-icon icon="component" />
        <span class="btn-add-fa" @click="onAddFaMenu">新增菜单</span>
      </div>
      <father
        :menus="treeData"
        v-model:current="current"
        @del="delMenu"
        @edit="editMenu"
      />
    </div>
    <div class="right-bar">
      <div class="add-child">
        <span class="title">{{ currentItem.menuName }} - 子菜单</span>
        <div class="btn-add-child" @click="onAddChildMenu">新增子菜单</div>
      </div>
      <children
        ref="children"
        :menus="children"
        @del="delMenu"
        @edit="editMenu"
      />
    </div>

    <menuForm
      ref="menuForm"
      :menus="treeData"
      @refresh="onRefresh"
    />

  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox, ElMessage } from 'element-plus'

import father from './components/father/index.vue'
import children from './components/children/index.vue'
import menuForm from './components/menuForm/index.vue'
import { tree } from '@/frame/utils'
import { RootState } from '@/store'
import { deleteMenuApi, getMenusListApi } from '@/apis/menu'
export default defineComponent({
  name: 'MenuPage',
  components: {
    father,
    children,
    menuForm
  },
  setup() {
    const current = ref(0)
    const treeData = ref<MenuRecordListModel>([])
    const menuForm = ref<any>(null)
    const store = useStore<RootState>()

    const currentItem = computed(() => {
      return treeData.value[current.value] ?? {} as MenuRecordListModel
    })

    const children = computed(() => {
      const innerCur = currentItem.value
      return innerCur
        ? innerCur.children ?? []
        : []
    })

    const onRefresh = () => {
      getTreeData()
    }

    const getTreeData = async () => {
      let data = await getMenusListApi()
      if (data) {
        data = data.sort((a, b) => (b.menuSort ?? 0) - (a.menuSort ?? 0))
        treeData.value = tree(data, 'id', 'menuPid')
      } else {
        treeData.value = []
      }
    }

    const onAddFaMenu = () => {
      menuForm.value.resetValue()
    }

    const onAddChildMenu = () => {
      const currentItem = treeData.value[current.value]
      menuForm.value.resetValue(currentItem ? currentItem.id : null)
    }

    const editMenu = (menu: MenuRecordModel) => {
      menuForm.value.setValue(menu)
    }
    
    const delMenu = async (menu: MenuRecordModel, index: number, isChild: boolean) => {
      await ElMessageBox.confirm('确定删除该菜单？', '提示', {
        type: 'warning'
      })
      await deleteMenuApi(menu.id)
      ElMessage.success('删除菜单成功!')
      store.dispatch('user/getPower')
      onRefresh()

      if (!isChild && index === current.value) {
        current.value = index === 0
          ? 0
          : index - 1
      }
    }

    getTreeData()

    return {
      treeData,
      current,
      currentItem,
      children,
      menuForm,

      onAddFaMenu,
      onAddChildMenu,
      editMenu,
      delMenu,
      onRefresh
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.menu-container {
  height: calc(100vh - 84px);
  position: relative;
  .left-bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 300px;
    box-sizing: border-box;
    border-right: 1px solid #EBEEF5;
    padding: 20px;
  }
  .right-bar {
    margin-left: 300px;
  }
}
.add-father {
  color: $theme;
  line-height: 20px;
  height: 20px;
  .btn-add-fa {
    margin-left: 10px;
    cursor: pointer;
  }
}
.add-child {
  display: flex;
  align-items: center;
  height: 66px;
  padding: 0 30px;
  border-bottom: 1px solid #EBEEF5;
  box-sizing: border-box;
  .title {
    flex-grow: 1;
    color: #666666;
    font-size: 18px;
    font-weight: 600;
  }
  .btn-add-child {
    background-color: $theme;
    border-radius: 4px;
    width: 94px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
