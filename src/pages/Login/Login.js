import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
} from 'antd'
import './login.scss'

import { doLogin } from '../../store/actions/user'

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log(this.props)
        this.props.doLogin(values)
        this.props.history.push('/admin/dashboard')
      }
    });
  }
  render() {
    const {
      state = {}
    } = this.props.location
    const {
      from = "/admin/dashboard"
    } = state
    const { getFieldDecorator } = this.props.form;
    return (
      this.props.isLogin
      ?
      <Redirect to={from} />
      :
      <div className='wrap'>
      <Form onSubmit={this.handleSubmit} className="login-form">
      <h1>午休餐饮有限公司后台管理系统</h1>
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入你的用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="管理员输入admin,游客输入guest" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入你的密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="管理员输入admin,游客输入guest" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="login-form-forgot" href="#">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    isLogin: state.user.isLogin
  }
}


export default connect(mapState,{ doLogin })(Form.create()(Login));



