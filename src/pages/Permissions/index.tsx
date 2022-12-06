import { Button, Card, Row, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import styled from 'styled-components'

const PermissionsStyled = styled.div`
  .ant-row {
    padding: 10px;
  }
`

interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
  description: string
  children?: DataType[]
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Delete</a>
  }
]

const data: DataType[] = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    children: [
      {
        key: 5,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
      }
    ]
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable'
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
  }
]

export const Permission: React.FC = () => {
  return (
    <PermissionsStyled>
      <Row justify={'end'} gutter={[5, 5]}>
        <Button>添加权限</Button>
      </Row>
      <Card>
        <Table
          bordered
          columns={columns}
          // expandable={{
          //   expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
          //   rowExpandable: record => record.name !== 'Not Expandable'
          // }}
          dataSource={data}
        />
      </Card>
    </PermissionsStyled>
  )
}
