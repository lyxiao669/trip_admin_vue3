import JSZip from 'jszip'
import request from '@/utils/request'
import { Utils } from '@juzhenfe/modules'
import { consoleError } from '@/frame/utils/console'

const typeStrategy = new Utils.Srategy<string>()

// 图片处理
const imgTypes = ['png', 'jpg', 'jpeg', 'webp']
imgTypes.forEach(type => {
  typeStrategy.add(`image/${type}`, function() {
    return '.' + type
  })
})

// 文件处理
typeStrategy.add('text/plain', function() {
  return '.txt'
})
typeStrategy.add('application/msword', function() {
  return '.doc'
})
typeStrategy.add('application/vnd.openxmlformats-officedocument.wordprocessingml.document', function() {
  return '.docx'
})
typeStrategy.add('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', function() {
  return '.xlsx'
})
typeStrategy.add('application/vnd.ms-excel', function() {
  return '.xls'
})
typeStrategy.add('application/pdf', function() {
  return '.pdf'
})
typeStrategy.add('application/zip', function() {
  return '.zip'
})


const getFileNameByUrl = (src: string, fail: boolean) => {
  const lastSplitStr = src.split('_').slice(-1)[0]
  let name = lastSplitStr.indexOf('.') > -1 ? lastSplitStr : ''
  if (fail) {
    // 如果下载失败，文件名称加入 "-下载失败"
    let splitArray = name.split('.')
    name = splitArray.slice(0, -1).join('') + '-下载失败'
    name += '.' + splitArray.slice(-1)
  }

  return name
}

const getBlobSuffix = async (blob: Blob) => {
  const data = await typeStrategy.fire(blob.type)
  console.log('data', blob.type)
  if (data) {
    return data[0].value
  } else {
    return ''
  }
}


const getBlob = async (src: string) => {
  let fail = false
  let blob: Blob | null = new Blob(['下载失败'], {
    type: 'text/plain'
  })
  try {
    const data = await request.get<Blob>(src, {}, {
      process: true
    }, {
      responseType: 'blob'
    })
    blob = data
  } catch (error) {
    consoleError('getBlob 获取失败')
    fail = true
  }

  return {
    blob,
    fail
  }
}

const downloadByElement = (blobsrc: string, name: string) => {
  let a: HTMLAnchorElement | null = document.createElement('a')
  a.download = name
  a.href = blobsrc
  a.target = '_blank'
  a.click()
}

const downloadZip = async (src: string, name: string) => {
  let zip = new JSZip()
  const srcList = src.split(',')

  let blobList = await Promise.all(srcList.map(src => {
    return getBlob(src)
  }))
  
  let names: string[] = []

  for (let i = 0;i < blobList.length;i++) {
    const {blob, fail} = blobList[i]

    // 获取文件名称
    let downloadName = getFileNameByUrl(srcList[i], fail)
    if (!downloadName) {
      const suffix = await getBlobSuffix(blob)
      downloadName = (i + 1).toString() + suffix
    }

    // 防止文件名称重复
    if (names.includes(downloadName)) {
      downloadName = `(${i + 1})${downloadName}`
    }
    names.push(downloadName)

    zip.file(downloadName, blob)
  }

  var blob = await zip.generateAsync({
    type: 'blob'
  })
  const url = URL.createObjectURL(blob)
  downloadByElement(url, name + '.zip')
}

const downloadSingle = async (src: string, name: string) => {
  const { blob, fail } = await getBlob(src)
  const url = URL.createObjectURL(blob)
  
  // 设置下载文件名称
  let downloadName = getFileNameByUrl(src, fail)
  if (!downloadName) {
    const suffix = await getBlobSuffix(blob)
    downloadName = name + suffix
  }

  downloadByElement(url, downloadName)
}

export const downloadFile = async(src: string, name: string) => {
  if (src.indexOf(',') !== -1) {
    return await downloadZip(src, name)
  } else {
    return await downloadSingle(src, name)
  }
}
