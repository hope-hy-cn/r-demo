import React, { Component } from 'react'
import {
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  message
} from 'antd'

import moment from 'moment'


class DepartmentEdit extends Component {
  constructor () {
    super()
    this.state = {
      id: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = Object.assign({}, values, {
          createAt: values.createAt.format('x'),
          id: this.state.id
        })
        this.http.saveDepartment(data)
          .then(resp => {
            if (resp.data.code === 200) {
              message.success(resp.data.msg)
              this.props.history.goBack()
            }
          })
      }
    });
  }

  componentDidMount () {
    this.http.fetchDepartment(this.props.match.params.id)
      .then(resp => {
        if(resp.data.code === 200) {
          this.props.form.setFieldsValue({
            department: resp.data.data.department,
            administration: resp.data.data.administration,
            function: resp.data.data.function
          })
          this.setState({
            id: resp.data.data.id,
          })
        }
      })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16},
    };
    return (
      <Card
        title="部门信息"
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item
            {...formItemLayout}
            label="部门名称"
          >
            {
              getFieldDecorator('department', {
                rules: [{ required: true, message: '请输入部门名称！' }],
              })(
                <Input placeholder="部门名称" />
              )
            }
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="上级部门名称"
          >
            {
              getFieldDecorator('administration', {
                rules: [{ required: true, message: '请输入上级部门名称' }],
              })(
                <Input placeholder="上级部门名称" />
              )
            }
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="职能说明"
          >
            {
              getFieldDecorator('function', {
                rules: [{ required: true, message: '请输入职能说明' }],
              })(
                <Input placeholder="职能说明" />
              )
            }
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="修改时间"
          >
            {
              getFieldDecorator('createAt', {
                initialValue: moment(),
                rules: [{ required: true, message: '请选择修改时间' }],
              })(
                <DatePicker showTime format="YYYY-MM-DD hh:mm:ss" />
              )
            }
          </Form.Item>
          <Form.Item
            wrapperCol={{span: 16, offset: 4}}
          >
            <Button type="primary" htmlType="submit" className="login-form-button">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(DepartmentEdit)