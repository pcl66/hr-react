import { LoginStyled } from "./styled"
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useHistory, withRouter } from "react-router-dom";
import { WithRouterProps } from "react-router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { loginProvider } from "../../provider/login-provider";
import { UserContext } from "../../context/userContext";

export const Login1 = (p: WithRouterProps<any>) => {
  const userInfo = useContext(UserContext)
  const history = useHistory()
  const [form] = useForm()
  useEffect(() => {
    console.log('login-history', history)
    form.setFieldsValue({
      username: '13800000002',
      password: '123456'
    })
  }, [])
  const onFinish = (values: any) => {
    console.log('Success:', values);
    loginProvider.login(values.username, values.password).then(res => {
      if(res?.success) {
        message.success('登录成功！')
        // @ts-ignore
        userInfo.setUserInfo({isLogin: true, token: res})
        loginProvider.getUserInfo().then(res => {
          //@ts-ignore
          userInfo.setUserInfo((last) => ({...last, baseInfo: res.data}))
        })
      } else {
        message.error(res?.message)
        return
      }
    })
    //@ts-ignore
    // p.history.push('/home')
    history.push({pathname:'/home'})
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (<LoginStyled>
    <div className="login">
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 20 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>记住我</Checkbox>
      </Form.Item>

      <div style={{textAlign : 'center'}}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </div>
    </Form>
    </div>
  </LoginStyled>)
}

export const Login = withRouter(Login1)
