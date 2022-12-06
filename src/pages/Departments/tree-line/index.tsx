import { Button, message, Popconfirm, Popover, Tag } from 'antd'
import styled from 'styled-components'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { DetailModel } from '../detail-model'
import { departmentProvider } from '../../../provider/department-provider'

const TreeLineStyled = styled.div`
  /* position: absolute;
  right: 0;
  display: flex; */
  width: 700px;
  display: flex;
  /* justify-content: flex-end; */
  /* .duty {
    width: 60%;
  }
  .name {
    width: 20%;
  }
  .handel {
    width: 20%;
  } */
  .duty,
  .name {
    padding-left: 30px;
    &:nth-child(1) {
      padding: 0;
    }
  }
  .handle {
    cursor: pointer;
    /* text-align: center; */
    border-radius: 3px;
    padding: 5px;
    transition: all 0.3s;
    &:hover {
      background-color: #d0e2ed;
      transition: all 0.3s;
    }
  }
  .popover1 {
  }
`

interface P {
  duty: string
  name: string
  id: string
  trigger: number
  setTrigger: React.Dispatch<React.SetStateAction<number>>
}

export const TreeLine: React.FC<P> = p => {
  const { trigger, setTrigger } = p
  const [open, setOpen] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [depInfo, setDepInfo] = useState<any>(null)

  const hide = () => {
    setOpen(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  const hAddDep = () => {
    setIsEdit(false)
    setOpen(false)
    setVisible(true)
  }

  const hEditDep = () => {
    setIsEdit(true)
    setOpen(false)
    setVisible(true)
    departmentProvider.getDepById(p.id).then(res => {
      console.log('resid', res)
      setDepInfo(res)
    })
  }


  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    departmentProvider.deleteDep(p.id).then(res => {
      message.success('删除成功');
      setTrigger((last) => last + 1)
    })
  };
  
  
  const renderPopoverContent = () => {
    return (
      <>
        <div
          className='handle'
          onClick={e => {
            e.stopPropagation()
            hAddDep()
          }}>
          新增子部门位
        </div>
        <div
          className='handle'
          onClick={e => {
            e.stopPropagation()
            hEditDep()
          }}>
          编辑部门
        </div>
        {/* <div className='handle'> */}
           {/* @ts-ignore */}
          <Popconfirm title='确认删除吗？' onConfirm={confirm} okText='Yes' cancelText='No'>
            <div className='handle'>删除部门</div>
          </Popconfirm>
        {/* </div> */}
      </>
    )
  }

  return (
    <TreeLineStyled id='tree-line'>
      <div className='duty'> {p.name}</div>
      <div className='name'>
        <Tag color='blue'>{p.duty}</Tag>
      </div>
      <div className='duty'>
        <Popover content={renderPopoverContent()} overlayClassName='popover1' getPopupContainer={() => document.querySelector('#tree-line') as HTMLElement} overlayInnerStyle={{ cursor: 'pointer' }} trigger='click' open={open} onOpenChange={handleOpenChange}>
          <Button
            onClick={e => {
              e.stopPropagation()
            }}
            size='small'
            color='blue'
            icon={<EditOutlined />}>
            操作
          </Button>
        </Popover>
      </div>
      {visible && <DetailModel depInfo={depInfo} trigger={trigger} setTrigger={setTrigger} id={p.id} isEdit={isEdit} visible={visible} setVisible={setVisible} />}
    </TreeLineStyled>
  )
}
