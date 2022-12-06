import { Card, Tree } from 'antd'
import { DepartmentsStyled } from './styled'
import type { DataNode, TreeProps } from 'antd/es/tree'
import { TreeLine } from './tree-line'
import { DownOutlined, PlusCircleOutlined, UserOutlined } from '@ant-design/icons'
import { useProvider } from '../../hooks/useProvider'
import { departmentProvider } from '../../provider/department-provider'
import { useEffect, useState } from 'react'
import { transListToTreeData } from '../../utils/func'
const { TreeNode } = Tree

export const Departments: React.FC = () => {
  // const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
  //   console.log('selected', selectedKeys, info)
  // }

  // const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
  //   console.log('onCheck', checkedKeys, info)
  // }
  const [trigger, setTrigger] = useState(1)
  const depList: any = useProvider(departmentProvider.getDepList, [], trigger)
  const [deps, setDeps] = useState<any>(null)
  useEffect(() => {
    if(depList) {
      const res = depList.depts.map((it: any) => ({...it, key:it.id, title: <TreeLine name={it.name} duty={it.manager} id={it.id} trigger={trigger} setTrigger={setTrigger} />}))
      setDeps(transListToTreeData(res, ''))
    }
  }, [depList])
  console.log("depList", depList)
  const getDataNode = () => {
    return 
  }
  return (
    <DepartmentsStyled>
      <Card>
        {
          deps && <Tree showLine icon={<UserOutlined />} showIcon={true} defaultExpandedKeys={['0-0-0', '0-0-1']} defaultSelectedKeys={['0-0-0', '0-0-1']} defaultCheckedKeys={['0-0-0', '0-0-1']}  treeData={deps}>
          {/* <TreeNode title='123' icon={<PlusCircleOutlined />}/> */}
        </Tree>
        }
        
      </Card>
    </DepartmentsStyled>
  )
}
