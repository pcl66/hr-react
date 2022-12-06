import { Response } from "../model/common";
import { Duty } from "../model/department";
import { baseProvider} from "./base-provider";

class DepartmentProvider {
  server = baseProvider
  // 获取机构列表
  getDepList = async () => {
    const res: any = await this.server.get('/api/company/department')
    console.log('机构',res)
    return res.data
  }
  // 获取机构列表
  getDepById = async (id: string) => {
    const res: any = await this.server.get('/api/company/department/' + id)
    console.log('机构详情',res)
    return res.data
  }

  // 获取部门负责人列表
  getDepDutyList = async () => {
    const res = await this.server.get<Response<Duty[]>>('/api/sys/user/simple')
    console.log('负责人', res)
    return res.data
  }

  // 新增部门
  addDep = async (params: any) => {
    const res = await this.server.post('/api/company/department',params)
  }
  // 编辑部门
  updateDep = async (id: string, params: any) => {
    const res = await this.server.put(`/api/company/department/${id}`,params)
  }
  // 删除部门
  deleteDep = async (id: string) => {
    const res = await this.server.delete('/api/company/department/' + id)
  }
}

export const departmentProvider = new DepartmentProvider()