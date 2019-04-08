import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router';
import moment from 'moment'
import {
  Table,
  Button,
  Icon,
  Modal,
  message,
  Card,
  Form,
  Input,
  DatePicker,
} from 'antd'


const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const {
        visible, onCancel, onCreate, form,
      } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24},
      };
      return (
        <Modal
          visible={visible}
          title="添加日志"
          okText="添加"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="题目">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入题目!' }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="日志内容">
              {getFieldDecorator('content')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="时间"
            >
              {
                getFieldDecorator('createAt', {
                  initialValue: moment(),
                  rules: [{ required: true, message: '请选择时间!' }],
                })(
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                )
              }
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
)

class JobDiaryList extends Component {
  columns = [{
    title: '编号',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: '题目',
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
          <Button type="primary" onClick={this.handleEdit.bind(this, record.id)}>
            <Icon type="edit" />编辑
          </Button>
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
      isLoading: false,
      visible: false
    }
  }

  fetchArticles = () => {
    this.setState({
      isLoading: true
    })
    this.http.fetchJobDiaryList({
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

  handleEdit = (id) => {
    this.props.history.push(`/admin/jobDiary/edit/${id}`)
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
        this.http.deleteJobDiaryById(id)
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

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
      message.success("添加成功")
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
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
        title="工作日志"
        headStyle={{marginTop:"30px", color: "#fff"}}
        extra={<Button size="small" type="primary" onClick={this.showModal}>添加日志</Button>}
        >
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
          <Table
            loading={this.state.isLoading}
            rowKey={record => record.id}
            dataSource={this.state.dataSource}
            columns={this.columns}
            expandedRowRender={record => <p style={{ margin: 0,textAlign: 'left' }}>日志内容：{record.content}</p>}
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
      </Fragment>
    )
  }
}

export default withRouter(JobDiaryList)