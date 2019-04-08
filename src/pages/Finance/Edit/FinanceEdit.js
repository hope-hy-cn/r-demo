import React, { Component, createRef } from 'react'
import {
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  message
} from 'antd'

import './FinanceEdit.scss'

import E from 'wangeditor'

import moment from 'moment'

const { Option } = Select;

class FinanceEdit extends Component {
  constructor () {
    super()
    this.editorRef = createRef()
    this.state = {
      id: '',
      content: ''
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
        this.http.saveFinance(data)
          .then(resp => {
            if (resp.data.code === 200) {
              message.success(resp.data.msg)
              this.props.history.goBack()
            }
          })
      }
    });
  }

  // 初始化编辑器
  initEditor =() => {
    const _this = this;
    // 创建一个编辑器的实例
    this.editorE = new E(this.editorRef.current)
    // 注意顺序 否者不会触发onchange
    this.editorE.customConfig.onchange = function(content) {
      _this.setState({
        content
      })
    }
    this.editorE.customConfig.zIndex = 100
    // 创建
    this.editorE.create()
  }
  componentDidMount () {
    // 在didMount的时候，初始化一个编辑器
    this.initEditor()
    this.http.fetchFinance(this.props.match.params.id)
      .then(resp => {
        // 如果成功，把除了编辑器以外的字段都用setFieldsValue的方法设置到页面上
        if(resp.data.code === 200) {
          this.props.form.setFieldsValue({
            title: resp.data.data.title,
            type: resp.data.data.type,
            price: resp.data.data.price,
            createAt: moment(Number.parseInt(resp.data.data.createAt, 10))
          })
          // 保存id用于知道是哪份账单的备注，content用于editor
          this.setState({
            id: resp.data.data.id,
            content: resp.data.data.content
          })
          // 手动设置editor的值
          this.editorE.txt.html(resp.data.data.content)
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
        title="账单编辑"
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item
            {...formItemLayout}
            label="项目名称"
          >
            {
              getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入项目名称！' }],
              })(
                <Input placeholder="项目名称" />
              )
            }
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="类型"
            
          >
            {getFieldDecorator('type', {
              rules: [
                { required: true, message: '请选择类型!' },
              ],
            })(
              <Select placeholder="类型">
                <Option value="支出">支出</Option>
                <Option value="收入">收入</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="金额"
          >
            {
              getFieldDecorator('price', {
                rules: [{ required: true, message: '请输入金额' }],
              })(
                <Input placeholder="金额" />
              )
            }
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="时间"
          >
            {
              getFieldDecorator('createAt', {
                // initialValue: moment(),
                rules: [{ required: true, message: '请选择时间' }],
              })(
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )
            }
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="备注"
          >
            {
              getFieldDecorator('content', {
                // 不设置保存的时候获取不到值
                initialValue: this.state.content
              })(
                <div ref={this.editorRef}></div>
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

export default Form.create()(FinanceEdit)