import request from '@/utils/request'
// import {httpConfig} from '@/config'

const file = {
  // 上传文件
  uploadFile (formData) {
    const url = `/attachment-download`
    return request.upload(url, formData)
  },

  // 下载附件
  downloadAttachment (attachmentId) {
    const url = `/attachment-download?attachmentId=${attachmentId}`
    return request.download(url, {})
  },

  // 删除附件
  deleteAttachment (attachmentId) {
    const url = `/attachment?attachmentId=${attachmentId}`
    return request.deleteRequest(url, {})
  }
}

export default file
