import Vue from 'vue'
import axios from '@/utils/interceptor'
import config from '@/config'
const qs = require('querystring')

const base = config.baseApi

const get = (url, params = {}, api) => {
  return axios({
    method: 'get',
    params: params,
    url: `${api || base}${url}`
  })
}

const post = (url, params, api) => {
  return axios({
    method: 'post',
    data: qs.stringify(params),
    url: `${api || base}${url}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

const postJson = (url, params, api) => {
  return axios({
    method: 'post',
    data: params,
    url: `${api || base}${url}`,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

const put = (url, params, api) => {
  return axios({
    method: 'put',
    data: params,
    url: `${api || base}${url}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

const putJson = (url, params, api) => {
  return axios({
    method: 'put',
    data: params,
    url: `${api || base}${url}`,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

const download = (url, params = {}, api) => {
  return axios({
    method: 'post',
    data: params,
    url: `${api || base}${url}`,
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'arraybuffer'
  })
}

const downloadGet = (url, params = {}, api) => {
  return axios({
    method: 'get',
    data: params,
    url: `${api || base}${url}`,
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'arraybuffer'
  })
}

const upload = (url, params, config) => {
  return axios({
    method: 'post',
    data: params,
    url: `${config.baseUrl || base}${url}`,
    onUploadProgress: config.onUploadProgress,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const uploadPut = (url, params, config) => {
  return axios({
    method: 'put',
    data: params,
    url: `${config.baseUrl || base}${url}`,
    onUploadProgress: config.onUploadProgress,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const uploadJson = (url, params, api) => {
  return axios({
    method: 'post',
    data: params,
    url: `${api || base}${url}`,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

const request = {
  get,
  post,
  postJson,
  put,
  putJson,
  download,
  downloadGet,
  upload,
  uploadPut,
  uploadJson
}

export default request

Vue.prototype.$http = request
