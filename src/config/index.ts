/**
 * @author yangshangman
 * @description 项目配置
 */

// 运行环境
export const isProduction = process.env.NODE_ENV === 'production'

// 请求基础的路径
export const baseURL = 'https://localhost:5516/'
// export const baseURL = isProduction ? '' : ''
// 开启上方菜单栏选项，开启后将提取一级菜单作为navbar的选项，子菜单显示在侧边栏
export const openTopBarMenu = false

// 项目名称
export const projectName = '爱追光后台管理系统'

// 项目logo
export const projectLogo = {
  show: true,
  url: '/imgs/logo.png'
}

// token存储key
export const TokenName = 'token-for-admin'

// 七牛上传配置信息
// export const qiniu = {
//   open: true,
//   region: 'juzhenshop',
//   tokenUrl: 'api/Qiniu/CreateUploadToken',
//   uploadUrl: 'https://upload.qiniup.com/',
//   fileUrl: 'https://juzhenshopimg.juzhentech.com/'
// }
export const qiniu = {
  open: true,
  region: 'file',
  tokenUrl: 'https://localhost:5516/Upload/CreateUploadToken',
  uploadUrl: 'https://up-z2.qiniup.com/',
  fileUrl: 'http://s7ugxdtnz.hn-bkt.clouddn.com/'
}

// 本地接口上传文件
export const normalUpload = {
  fileUrl: 'http://localhost:5001',
  uploadUrl: 'http://localhost:5001/api/netpoint/Upload/File'
}
