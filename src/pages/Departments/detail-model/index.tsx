import { Form, Input, message, Modal, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useProvider } from '../../../hooks/useProvider'
import { Duty } from '../../../model/department'
import { departmentProvider } from '../../../provider/department-provider'

const DetailModelStyled = styled.div``

interface P {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  isEdit: boolean
  id: string
  trigger: number
  setTrigger: React.Dispatch<React.SetStateAction<number>>
  depInfo: any
}

export const DetailModel: React.FC<P> = p => {
  const [form] = useForm()
  const { visible, setVisible, depInfo, isEdit } = p
  const dutyList = useProvider<Duty[]>(departmentProvider.getDepDutyList, [])
  console.log('dutyList', dutyList)
  const hOk = async () => {
    // form.submit()
    form
      .validateFields()
      .then(res => {
        console.log('res', res)
        if(!isEdit) {
          departmentProvider.addDep({...res, pid: p.id}).then(() => {
            p.setTrigger((last) => last + 1)
            message.success('新增子部门成功')
            setVisible(false)
          })
        return
        } else {
          departmentProvider.updateDep(p.id,{...res}).then(() => {
            p.setTrigger((last) => last + 1)
            message.success('编辑部门成功')
            setVisible(false)
          })
        }
      })
      .catch(err => {
        message.error('表单验证未通过')
      })
    // setVisible(false)
  }
  useEffect(() => {
    if(isEdit) {
      // form.setFields(p.depInfo)
      console.log("pp", p.depInfo)
      form.setFieldsValue({...p.depInfo})
    }
  }, [p.depInfo])
  const hCancel = () => {
    setVisible(false)
  }
  const hSubmit = (e: any) => {
    console.log('e', e)
  }
  return (
    <DetailModelStyled>
      <Modal open={visible} title={`${isEdit ? '编辑': '添加子'}部门`} maskClosable={false} destroyOnClose onOk={hOk} onCancel={hCancel} getContainer={() => document.querySelector('#tree-line') as HTMLElement}>
        <Form form={form} labelAlign='right' labelCol={{ span: 5 }} onFinish={hSubmit}>
          <Form.Item rules={[{ required: true, message: 'Please input your username!' }]} label='部门名称' name='name'>
            <Input placeholder='1-10字符' />
          </Form.Item>
          <Form.Item label='部门编码' name='code'>
            <Input disabled={p.isEdit} placeholder='1-10字符' />
          </Form.Item>
          <Form.Item label='部门负责人' name='manager'>
            <Select placeholder='请选择' options={dutyList?.map(it => ({ label: it.username, value: it.username }))}></Select>
          </Form.Item>
          <Form.Item label='部门介绍' name='introduce'>
            <Input placeholder='1-10字符' />
          </Form.Item>
        </Form>
      </Modal>
    </DetailModelStyled>
  )
}
