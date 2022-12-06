import { Response } from '../model/common'
import { LoginParams } from '../model/login'
import { BaseServer } from '../server/base-server'
import { baseProvider } from './base-provider'

class LoginProvider {
  server = baseProvider
  // 登录
  login = async (mobile: string, password: string) => {
    try {
      const res = await this.server.post<Response<string>, LoginParams>('/api/sys/login', { mobile, password }, { headers: { 'content-type': 'application/json' } })
      console.log(res)
      if (res.success) {
        localStorage.setItem('token', res.data)
        localStorage.setItem('isLogin', JSON.stringify(true))
        return res
      } else {
        return res
      }
    } catch (error) {}
  }
  // 获取用户信息
  getUserInfo = async () => {
    const res =await this.server.post<Response<any>>('/api/sys/profile')
    if(res.success) {
      localStorage.setItem('baseInfo', JSON.stringify(res.data))
      return res
    }
  }
}

export const loginProvider = new LoginProvider()
