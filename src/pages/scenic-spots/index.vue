<template>
  <page-model :config="config" ref="pageRef"  />
</template>

<script setup lang="tsx">
import { defineConfig } from '@juzhenfe/page-model'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import request from '@/utils/request';
import citys from '@/static/city.json'; //省市区json库

interface areaModel {
  center: [],
  label: string,
  value: string,
  children: areaModel[]
}


let reflections = reactive({

})
//处理省市区数据
// const processCitys = () => {
//   reflections.cityData = citys.map((item: areaModel) => ({
//     center: item.center,
//     label: item.label,
//     value: item.value,
//     children: item.children?.map((city: areaModel) => ({
//       center: city.center,
//       label: city.label,
//       value: city.value,
//     }))
//   }))
// }
let config = defineConfig<ScenicSpot, { extend: ' ' }>({
  url: 'ScenicSpots',
  delUrl: 'ScenicSpots/:id',
  updUrl: 'ScenicSpots',
  delKey: 'id',
  otherParams:{
    
  },
  addButton: {
    text: '添加景区'
  },
  searchForm: {
    beforeSubmit(form) {
      console.log('searchform::', form)
      return form
    },
    els: [
      {
        eType: 'juzhen-cascader',
        prop: 'KeyWord',
        label: '省份筛选',
        props: {
          placeholder: '请选择省市',
          props: {
            checkStrictly:true,
            label:'label',
            value:'label'
          },
          options: citys.map((item: any) => ({
            center: item.center,
            label: item.label,
            value: item.value,
            children: item.children?.map((city: areaModel) => ({
              center: city.center,
              label: city.label,
              value: city.value,
            }))
          })),
        },
        change(value) {
          pageRef.value.refreshTableData()
          console.log('value::', value)
        },
      },
    ]
  },
  table: {
    operate: {
      width: '150px',
      els: [
        {
          text: '编辑',
          isEdit: true,
        },
        {
          text: '删除',
          isDel: true,
        }
      ]
    },
    els: [
      {
        label: '图片',
        prop: 'images',
        renderFn(row) {
          let imageList = row.images.split(',');
          let img = imageList[0];
          return (
            <el-image style="width: 50px; height: 50px" src={img} preview-src-list={imageList} preview-teleported={true} fit="contain"></el-image>
          )
        }
      },
      {
        label: '景点名',
        prop: 'spotName'
      },
      {
        label: '景点公告',
        prop: 'notice',
        props: {
          showOverflowTooltip: true,
        },
      },
      {
        label: '景点描述',
        prop: 'description',
        props: {
          showOverflowTooltip: true,
        },
      },
      {
        label: '省份',
        prop: 'provinceName'
      },
      {
        label: '城市',
        prop: 'cityName'
      },
      {
        label: '详细地址',
        prop: 'address'
      },
      {
        label: '电话',
        prop: 'telephone'
      },
      {
        label: '开放时间',
        prop: 'openingHours'
      },
      {
        label: '人气',
        prop: 'likes'
      },
      {
        label:'票价',
        prop:'ticketPrice'
      }
    ]
  },
  form: {
    beforeSubmit(form){
      form.provinceName = form.area[0]
      form.cityName = form.area[1]
      console.log('form::', form)
      return form
    },
    props: {
      labelWidth:'100px'
    },
    required: ['spotName', 'description'],
    async bindData(formData) {
      console.log('formData::', formData)
      formData.area = [formData.provinceName, formData.cityName]
      // 如果经纬度为空,则默认地址自动获取经纬度
      if (!formData.location) {
        formData.location = [108.354549, 22.790514]
        formData.longitude = 108.354549
        formData.latitude = 22.790514

      }

      return formData
    },
    els: [
      {
        eType: 'img-upload',
        label: '图片',
        prop: 'images',
        props: {
          mult: true
        }
      },
      {
        eType: 'el-input',
        label: '景点名',
        prop: 'spotName'
      },
      {
        eType: 'editor',
        label: '景点公告',
        prop: 'notice'
      },
      {
        eType: 'editor',
        label: '景点描述',
        prop: 'description'
      },
      {
        eType: 'el-cascader',
        label: '省市区',
        prop: 'area',
        // change(data, value, label) {
        //     console.log("value: " + value + "label: " + label + "data:" + data);
        // },
        props: {
          placeholder: '请选择省市',
          props: {
            // checkStrictly:true,
            emitPath:true,
            label:'label',
            value:'label'
          },
          options:citys.map((item: any) => ({
            center: item.center,
            label: item.label,
            value: item.value,
            children: item.children?.map((city: areaModel) => ({
              center: city.center,
              label: city.label,
              value: city.value,
            }))
          })),
        }
      },
      {
        eType: 'el-input',
        label: '详细地址',
        prop: 'address'
      },
      {
        eType: 'el-input',
        label: '电话',
        prop: 'telephone'
      },
      {
        eType: 'el-input',
        label: '开放时间',
        prop: 'openingHours'
      },
      {
        eType: 'el-input-number',
        label: '人气',
        prop: 'likes'
      },
      {
        eType:'el-input-number',
        label:'票价',
        prop:'ticketPrice'
      },
      {
        eType: 'a-map',
        label: '选择位置',
        prop: 'location',
        props: {
          useCenter: true,
          search: true,
          width: '100%',
        },
        async change(val, form) {
          // 设置经纬度
          this.formData.longitude = val[0]
          this.formData.latitude = val[1]
        },
      },
      {
        eType: 'el-input',
        prop: 'longitude',
        label: '经度',
        props: {
          disabled: true
        },
        col: {
          span: 9,
        },
      },
      {
        eType: 'el-input',
        prop: 'latitude',
        label: '纬度',
        props: {
          disabled: true
        },
        col: {
          span: 9,
        },
      },
    ]
  }
})

onMounted(async () => {

})

const pageRef = ref<any>(null)
const refreshTableData = () => {
  pageRef.value.refreshTableData()
}

// 腾讯地图 获取省市区
let getProvince = async () => {
  let res = await request.get(`https://apis.map.qq.com/map/ws/district/v1/list`, {
    key: 'OOJBZ-M5MK3-OQR3H-3NAC5-FCDST-2EBS3'
  })
  console.log('data::', res.result)
}
</script>
