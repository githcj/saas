import React from 'react'
import { Input } from 'antd';

const Login = (props)=> {
  // const {match, history} = props
  return (
    <div className="about">
      <Input size="large" placeholder="请输入账号" />
      <Input.Password placeholder="请输入密码" />
      登录
    </div>
  )
  }

export default Login