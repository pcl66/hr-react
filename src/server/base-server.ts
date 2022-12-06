import { AxiosRequestConfig } from 'axios'
import { Response } from '../model/common'
import { HttpClient } from './http-client'

export class BaseServer {
  constructor(baseURL: string) {
    this.baseURL = baseURL
  }
  baseURL
  // 请求客户端实例
  http = new HttpClient()
  /**
   * get
   *
   * @author 张卓诚
   * @template T
   * @param {string} url
   * @param {AxiosRequestConfig} [setting]
   * @returns
   * @memberof BaseServer
   */
  public async get<T>(url: string, setting?: AxiosRequestConfig) {
    return this.http
      .get<T>(url, { ...setting, baseURL: this.baseURL })
      .then(res => res.data)
      // .catch(this.catch401)
  }
  /**
   * post
   *
   * @author 张卓诚
   * @template T
   * @template P
   * @param {string} url
   * @param {P} [data]
   * @param {AxiosRequestConfig} [setting]
   * @returns
   * @memberof BaseServer
   */
  public async post<T, P = T>(url: string, data?: P, setting?: AxiosRequestConfig) {
    return this.http
      .post<T, P>(url, data, { ...setting, baseURL: this.baseURL })
      .then(res => res.data)
      // .catch(this.catch401)
  }

  /**
   * put
   *
   * @author 张卓诚
   * @template T
   * @template P
   * @param {string} url
   * @param {P} [data]
   * @param {AxiosRequestConfig} [setting]
   * @returns
   * @memberof BaseServer
   */
  public async put<T, P = T>(url: string, data?: P, setting?: AxiosRequestConfig) {
    return this.http
      .put<T, P>(url, data, { ...setting, baseURL: this.baseURL })
      .then(res => res.data)
      // .catch(this.catch401)
  }

  /**
   * delete
   *
   * @author 张卓诚
   * @param {string} url
   * @param {AxiosRequestConfig} [setting]
   * @returns
   * @memberof BaseServer
   */
  public async delete(url: string, setting?: AxiosRequestConfig) {
    return this.http
      .delete(url, { ...setting, baseURL: this.baseURL })
      .then(res => res.data)
      // .catch(this.catch401)
  }

  /**
   * 获取token
   *
   * @author 张卓诚
   * @param {string} url
   * @param {AxiosRequestConfig} [setting]
   * @returns
   * @memberof BaseServer
   */
  public getToken() {
    const token = localStorage.getItem('token')
    return token
  }
  public getContextLogout() {
    // @ts-ignore
    return window.logout
  }
  // /** 处理401 */
  // catch401(err: any) {
  //   if (err.response.status === 401) {
  //     this.getContextLogout()()
  //   }
  //   throw err.response.data
  // }
}

// export const baseServer = new BaseServer()
