import Axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { customHistory } from './history'


interface X extends Record<string, string | number> {
  name: string
}

const x: X = {
  name: 'xxx',
  age: 12
}

type Y =  Record<string, string|number> & {
  name: string
}

const y: Y = {
  name: 'xxx',
  age: 12
}


function rejectedInterceptor(error: any) {
  // do some things.
  // console.error(error);
  throw error
}

// const userInfo = useContext(UserContext)
Axios.interceptors.request.use(async (arc: AxiosRequestConfig) => {
  arc.headers!.Authorization = 'Bearer ' + localStorage.getItem('token')
  // customHistory.push({
  //   pathname: '/login'
  //   // state: {
  //   //   // 当前地址栏上的路由地址
  //   //   returnUrl: customHistory.location.pathname
  //   // }
  // })
  return arc
}, rejectedInterceptor)

Axios.interceptors.response.use(
  (ar: AxiosResponse) => {
    console.log('响应拦截器1', ar)

    return ar
  },
  (e: AxiosError) => {
    console.log('响应拦截器2', e)
    if (e.response?.status === 401) {
      console.log('没有权限了')
      localStorage.clear()
      window.location.reload()
      // customHistory.push({
      //   pathname: '/login'
      //   // state: {
      //   //   // 当前地址栏上的路由地址
      //   //   returnUrl: customHistory.location.pathname
      //   // }
      // })
    }
  }
)

export class HttpClient {
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return Axios.get<T>(url, config)
  }

  async post<T = any, R = any>(url: string, data?: R, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return Axios.post<T>(url, data, config)
  }

  async put<T = any, R = any>(url: string, data?: R, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return Axios.put<T>(url, data, config)
  }

  async delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return Axios.delete(url, config)
  }

  async download<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return Axios({
      url,
      method: 'GET',
      responseType: 'blob',
      ...config
    })
  }

  async all<T = any>(request: any[]): Promise<AxiosResponse<T>[]> {
    return Axios.all(request)
  }
}
