import Vue from 'vue'
import axios from '@/utils/interceptor'
import { config } from '@/config'
const qs = require('querystring')

const base = config.baseUrl

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

const upload = (url, params, api) => {
  return axios({
    method: 'post',
    data: params,
    url: `${api || base}${url}`,
    headers: {
      'Content-Type': 'multipart/form-data'
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
  upload
}

export default request

Vue.prototype.$request = request
