import storage from 'storejs'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/store/mutation-types'

export function getToken () {
  return storage.get(ACCESS_TOKEN)
}

export function setToken (token) {
  storage.set(ACCESS_TOKEN, token)
}

export function setRefreshToken (refreshToken) {
  storage.set(REFRESH_TOKEN, refreshToken)
}

export function removeToken () {
  storage.remove(ACCESS_TOKEN)
}

export function removeAuth () {
  storage.remove(ACCESS_TOKEN)
  storage.remove(REFRESH_TOKEN)
}
