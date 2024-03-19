<template>
  <el-dialog v-model="isShow">
    <el-form size="small" class="menu-form" label-width="100px">
      <el-form-item label="上级菜单" prop="id">
        <el-cascader
          v-model="menuPidList"
          :options="menus"
          :props="{
            label: 'menuName',
            value: 'id',
            checkStrictly: true
          }"
          @change="onMenuSelectChange"
        />
      </el-form-item>
      <el-form-item label="菜单名称" prop="menuName">
        <el-input v-model="formData.menuName" />
      </el-form-item>
      <el-form-item label="菜单图标" prop="menuIcon">
        <el-row class="menu-icon">
          <el-col v-for="icon in iconList" :key="icon" :span="4">
            <jz-icon
              :icon="icon"
              :class="['svg-box', {'selected': formData.menuIcon === icon}]"
              @click="onSetIcon(icon)"
            >
              <i :class="icon" />
            </jz-icon>
          </el-col>
          <el-col :span="4">
            <div
              :class="['svg-box', {'selected': formData.menuIcon === ''}]"
              @click="onSetIcon('')"
            >
              <span>无</span>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="菜单排序" prop="menuSort">
        <el-input-number v-model="formData.menuSort" />
      </el-form-item>
      <el-form-item label="菜单URL" prop="menuUrl">
        <el-input v-model="formData.menuUrl" />
      </el-form-item>
      <el-form-item>
        <div class="pop-center-btn-wrap">
          <el-button :loading="isLoading" type="success" @click="submit">
            {{ formData.id ? '修改菜单' : '添加菜单' }}
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { jsonClone } from '@/frame/utils'
import { defineComponent, PropType, reactive, ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { RootState } from '@/store'
import { addMenuApi, updateMenuApi } from '@/apis/menu'
import iconListJson from '@/frame/components/jz-icon/iconfont.json'

interface MenuFormData {
  [key: string]: string | number| string[] | boolean
}

export default defineComponent({
  props: {
    menus: {
      type: Array as PropType<MenuRecordListModel>,
      default: () => ([])
    }
  },
  emits: ['refresh'],
  setup(props, { emit }) {
    const { menus } = toRefs(props)
    const store = useStore<RootState>()

    const isLoading = ref(false)
    const isShow = ref(false)
    let formData = ref<MenuFormData>({})
    const menuPidList = ref<number[]>([])
    const iconList = ref<string[]>(iconListJson.glyphs.map(a => a.font_class))

    const onMenuSelectChange = (e: string[]) => {
      formData.value.menuPid = e[e.length - 1]
    }

    const onSetIcon = (icon: string) => {
      formData.value.menuIcon = icon
    }

    const resetValue = (menuPid: number) => {
      isShow.value = true
      formData.value = {}
      if (menuPid) {
        menuPidList.value = [menuPid]
        formData.value.menuPid = menuPid
      } else {
        menuPidList.value = []
      }
    }

    const setValue = (setFormData: MenuFormData) => {
      isShow.value = true
      formData.value = jsonClone(setFormData)
      setpmuCodes()
    }

    const setpmuCodes = () => {
      const menuPid = formData.value.menuPid
      if (!menuPid) {
        menuPidList.value = []
        return false
      }

      const innerMenuPid: number[] = []

      function search(data: MenuRecordListModel, deep: number) {
        let isFind = false
        for (let i = 0; i < data.length; i++) {
          const menu = data[i]
          if (menu.id === menuPid) {
            isFind = true
            innerMenuPid[deep] = menu.id
            break
          } else {
            if (menu.children && menu.children.length > 0) {
              if (search(menu.children, deep + 1)) {
                isFind = true
                innerMenuPid[deep] = menu.id
                break
              }
            }
          }
        }
        return isFind
      }

      search(menus.value, 0)
      menuPidList.value = innerMenuPid
    }

    const submit = async() => {
      isLoading.value = true
      try {
        if (formData.value.id) {
          await updateMenuApi(formData.value)
          ElMessage.success('更新菜单成功!')
        } else {
          await addMenuApi(formData.value)
          ElMessage.success('新增菜单成功!')
        }
        isShow.value = false
        emit('refresh')
        store.dispatch('user/getPower')
      } catch(e) {
        console.log(e.message)
      } finally {
        isLoading.value = false
      }
    }

    return {
      isShow,
      formData,
      menuPidList,
      iconList,
      isLoading,

      onMenuSelectChange,
      onSetIcon,
      resetValue,
      setValue,
      submit
    }
  }
})
</script>

<style lang="scss">
.menu-icon {
  padding-top: 6px;
  .svg-box {
    display: inline-block;
    padding: 4px;
    cursor: pointer;
    line-height: 1;
    &.selected {
      background-color: #eee;
    }
  }
}
</style>
