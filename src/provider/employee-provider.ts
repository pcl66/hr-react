import { Response } from "../model/common"
import { Data } from "../model/employee"
import { baseProvider } from "./base-provider"

class EmployeeProvider {
  server = baseProvider
  // 获取员工列表
  getUserList = async(params: any) => {
    const res = await this.server.get<Response<Data>>('/api/sys/user', {params})
    console.log('res', res.data)
    return res.data
  }
}

export const employeeProvider = new EmployeeProvider()