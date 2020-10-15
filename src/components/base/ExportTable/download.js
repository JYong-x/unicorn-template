import { commonExportExcel } from '@/utils/exportExcel'

import request from '@/utils/request'

const { download: streamDownload, downloadGet: streamDownloadGet } = request
const fileDownload = require('js-file-download')
/**
 *后台下载
 */
export const downloadFile = (obj, baseHttp, vm) => {
  const { url, fnType, downloadObj } = { ...obj || {}}
  if (fnType === 'post') {
    return postDownload(url, downloadObj, baseHttp, vm)
  } else {
    return getDownload(url, baseHttp, vm)
  }
}
function postDownload (url, obj, baseHttp, vm) {
  streamDownload(url, obj || {}, baseHttp).then(res => {
    if (res && res.status === 200) {
      // 以下fileName是取后台的文件名,如果没有'content-disposition',可以直接略过这一步,自己定：如fileName="xxx.xlsx"。
      if (res.headers['content-disposition']) {
        let fileName = res.headers['content-disposition']
        if (fileName !== undefined) {
          fileName = decodeURI(fileName.replace('attachment; filename=', ''))
          fileName = decodeURI(fileName.replace('attachment;filename=', ''))
        }
        vm.btnLoading(false)
        fileDownload(res.data, fileName)
      } else {
        vm.btnLoading(false)
      }
    } else {
      vm.btnLoading(false)
    }
  }).catch(() => {
    vm.btnLoading(false)
  })
}
function getDownload (url, baseHttp, vm) {
  streamDownloadGet(url, {}, baseHttp).then(res => {
    if (res && res.status === 200) {
      // 以下fileName是取后台的文件名,如果没有'content-disposition',可以直接略过这一步,自己定：如fileName="xxx.xlsx"。
      if (res.headers['content-disposition']) {
        let fileName = res.headers['content-disposition']
        if (fileName !== undefined) {
          fileName = decodeURI(fileName.replace('attachment; filename=', ''))
          fileName = decodeURI(fileName.replace('attachment;filename=', ''))
        }
        vm.btnLoading(false)
        fileDownload(res.data, fileName)
      } else {
        vm.btnLoading(false)
      }
    } else {
      vm.btnLoading(false)
    }
  }).catch(() => {
    vm.btnLoading(false)
  })
}
/**
 *前后台下载
 */
export const setAndDownloadFile = (obj, baseHttp, vm) => {
  const dataVo = {}
  const { tabList, data, url, name } = { ...obj || {}}
  dataVo.title = name
  dataVo.headers = data.header
  dataVo.datas = setDownloadFormat(tabList, data)
  // console.log(dataVo, tabList)
  postDownload(url, dataVo, baseHttp, vm)
}
function setDownloadFormat (tabList, data) {
  const dataList = []
  if (tabList && tabList.length > 0) {
    for (let i = 0; i < tabList.length; i++) {
      const perObj = tabList[i]
      const perList = []
      if (data.dataObj && data.dataObj.length > 0) {
        for (let q = 0; q < data.dataObj.length; q++) {
          if (data.dataObj[q] === null || data.dataObj[q] === undefined || perObj[data.dataObj[q]] === undefined) {
            perList.push(null)
          } else {
            perList.push(perObj[data.dataObj[q]])
          }
        }
      }
      dataList.push(perList)
    }
  }
  return dataList
}
/**
 *前台下载
 */
export const setDownloadFile = (obj, vm) => {
  const { tabList, data, name, fileType } = { ...obj || {}}
  return setDownloadTemplate(tabList, data, name, fileType, vm)
}
function setDownloadTemplate (tabList, data, name, fileType, vm) {
  const jsonList = []
  if (tabList && tabList.length > 0) {
    for (let i = 0; i < tabList.length; i++) {
      const perObj = tabList[i]
      const perJson = {}
      if (data.header && data.header.length > 0) {
        for (let q = 0; q < data.header.length; q++) {
          perJson[data.header[q]] = perObj[data.dataObj[q]]
        }
      }
      jsonList.push(perJson)
    }
  }
  if (name) {
    name = name.split('.' + fileType)[0] + '.' + fileType
  }
  vm.btnLoading(false)
  return commonExportExcel(name, jsonList)
}
