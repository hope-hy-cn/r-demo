import React, { Component, Fragment } from 'react'
import moment from 'moment'
import JobDiaryList from './JobDiaryList'
import {
  Table,
  Button,
  Icon,
  Modal,
  message,
  Card
} from 'antd'

import './WorkMailList.scss'

export default class WorkMailList extends Component {
  columns = [{
    title: '编号',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: '发送人',
    dataIndex: 'sender',
    key: 'sender'
  }, {
    title: '主题',
    dataIndex: 'title',
    key: 'title'
  }, {
    title: '时间',
    dataIndex: 'createAt',
    key: 'createAt',
    render: (createAt) => {
      return moment(Number.parseInt(createAt, 10)).format('YYYY-MM-DD hh:mm:ss');
    }
  }, {
    title: '操作',
    key: 'actions',
    render: (text, record, index) => {
      return (
        <Button.Group size='small'>
          <Button type="danger" onClick={this.handleDelete.bind(this, record.id, record.title)}>
            <Icon type="delete" />删除
          </Button>
        </Button.Group>
      )
    }
  }]

  constructor () {
    super ()
    this.isComponentMounted =false
    this.state = {
      dataSource: [],
      totalCount: 0,
      // 每页显示条数
      pageSize: 3,
      // 当前页
      currentPage: 1,
      isLoading: false
    }
  }

  fetchArticles = () => {
    this.setState({
      isLoading: true
    })
    this.http.fetchWorkMailList({
      offset: (this.state.currentPage - 1) * this.state.pageSize,
      // 每页显示条数
      limited: this.state.pageSize
    })
      .then(resp => {
        if (this.isComponentMounted === false) {
          return;
        }
        if (resp.data.code === 200) {
          this.setState({
            dataSource: resp.data.data,
            totalCount: resp.data.totalCount,
            currentPage: resp.data.currentPage,
            isLoading: false
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleDelete = (id, title) => {
    Modal.confirm({
      // 垂直居中展示 Modal
      centered: true,
      // 点击蒙层是否允许关闭
      maskClosable: true,
      // 	确认按钮文字
      okText: "我确定",
      // 取消按钮文字
      cancelText: "我点错了",
      content: <span>确认要删除<span style={{color: '#f00', padding: '0 5px'}}>{title}</span>吗？</span>,
      // 点击确定回调
      onOk: () => {
        this.setState({
          isLoading: true
        })
        this.http.deleteWorkMailById(id)
        .then(resp => {
          if (resp.data.code === 200) {
            this.setState({
              currentPage: 1
            }, () => {
              this.fetchArticles()
              message.success(resp.data.msg)
            })
          }
        })
      }
    })
  }

  onTableChange = ({current, pageSize}) => {
    const currentPage = (this.state.pageSize === pageSize) ? current : 1
    this.setState({
      currentPage,
      pageSize
    }, () => {
      this.fetchArticles()
    })
  }

  componentDidMount() {
    this.isComponentMounted = true
    this.fetchArticles()
  }

  componentWillUnmount() {
    this.isComponentMounted = false
  }

  render() {
    return (
      <Fragment>
        <Card
        title="工作邮件"
        headStyle={{color: "#fff"}}
        >
          <Table
            loading={this.state.isLoading}
            rowKey={record => record.id}
            dataSource={this.state.dataSource}
            columns={this.columns}
            expandedRowRender={record => <p style={{ margin: 0,textAlign: 'left' }}>邮件内容：{record.content}</p>}
            onChange={this.onTableChange}
            pagination={{
              pageSize: this.state.pageSize,
              // 是否可以改变 pageSize
              hideOnSinglePage: true,
              // 是否可以快速跳转至某页
              showQuickJumper: true,
              // 数据总数
              total: this.state.totalCount,
              // 当前页数
              current: this.state.currentPage
            }}
            />
        </Card>
        <JobDiaryList />
      </Fragment>
    )
  }
}
