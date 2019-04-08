import React, { Component } from 'react'
import {
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  message
} from 'antd'

import moment from 'moment'

const { Option } = Select;

class StaffEdit extends Component {
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
        this.http.saveStaff(data)
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
    this.http.fetchStaff(this.props.match.params.id)
      .then(resp => {
        if(resp.data.code === 200) {
          this.props.form.setFieldsValue({
            name: resp.data.data.name,
            position: resp.data.data.position,
            age: resp.data.data.age,
            phone: resp.data.data.phone,
            createAt: moment(Number.parseInt(resp.data.data.createAt, 10)),
            address: resp.data.data.address
          })
          // 保存id用于知道是哪份账单的备注
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
        title="职员信息"
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item
            {...formItemLayout}
            label="姓名"
          >
            {
              getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入职员姓名！' }],
              })(
                <Input placeholder="职员姓名" />
              )
            }
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="职位"
            
          >
            {getFieldDecorator('position', {
              rules: [
                { required: true, message: '请选择职员职位!' },
              ],
            })(
              <Select placeholder="职位">
                <Option value="收银员">收银员</Option>
                <Option value="服务员">服务员</Option>
                <Option value="配菜员">配菜员</Option>
                <Option value="厨师">厨师</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="年龄"
          >
            {
              getFieldDecorator('age', {
                rules: [{ required: true, message: '请输入职员年龄' }],
              })(
                <Input placeholder="年龄" />
              )
            }
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="联系方式"
          >
            {
              getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入联系方式' }],
              })(
                <Input placeholder="联系方式" />
              )
            }
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="出生日期"
          >
            {
              getFieldDecorator('createAt', {
                rules: [{ required: true, message: '请选择出生日期' }],
              })(
                <DatePicker showTime format="YYYY-MM-DD" />
              )
            }
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="地址"
          >
            {
              getFieldDecorator('address', {
                rules: [{ required: true, message: '请输入职员地址' }],
              })(
                <Input placeholder="地址" />
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

export default Form.create()(StaffEdit)