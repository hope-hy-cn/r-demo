import React, { Component } from 'react'
import moment from 'moment'
import {
  Table,
  Button,
  Icon,
  Modal,
  message,
  Card,
  Input
} from 'antd'

import './DepartmentList.scss'

import XLSX from 'xlsx'
export default class DepartmentList extends Component {
  constructor () {
    super ()
    this.isComponentMounted =false
    this.state = {
      dataSource: [],
      totalCount: 0,
      // 每页显示条数
      pageSize: 10,
      // 当前页
      currentPage: 1,
      isLoading: false,
      searchText: ''
    }
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { this.searchInput = node; }}
          placeholder={"请输入搜索的部门名称！"}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          重置
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    }
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  fetchArticles = () => {
    this.setState({
      isLoading: true
    })
    this.http.fetchDepartmentList({
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
    this.props.history.push(`/admin/department/edit/${id}`, {
      ceshichuancan: 1
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
        this.http.deleteDepartmentById(id)
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

  exportXlsx = () => {
    const title = this.columns.map(item => item.title)
    // 删除最后一个（操作）
    title.pop()

    const data = this.state.dataSource.reduce((result, item) => {
      const row = [item.id, item.department, item.administration, item.function, item.createAt]
      result.push(row)
      return result
    }, [])
    data.unshift(title)

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "departmentList.xlsx");
  }

  componentDidMount() {
    this.isComponentMounted = true
    this.fetchArticles()
  }

  componentWillUnmount() {
    this.isComponentMounted = false
  }

  render() {
    this.columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '部门名称',
      dataIndex: 'department',
      key: 'department',
      ...this.getColumnSearchProps('department'),
    }, {
      title: '上级部门名称',
      dataIndex: 'administration',
      key: 'administration'
    }, { 
      title: '职能说明',
      dataIndex: 'function',
      key: 'function'
    }, {
      title: '修改时间',
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
            <Button type="danger" onClick={this.handleDelete.bind(this, record.id, record.department)}>
              <Icon type="delete" />删除
            </Button>
          </Button.Group>
        )
      }
    }]

    return (
      <Card
      title="部门管理"
      extra={<Button size="small" type="primary" onClick={this.exportXlsx}>导出excel</Button>}
      >
        <Table
          loading={this.state.isLoading}
          rowKey={record => record.id}
          dataSource={this.state.dataSource}
          columns={this.columns}
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
            current: this.state.currentPage,
            // 指定每页可以显示多少条
            pageSizeOptions: ['5','10','15','20'],
            // 是否可以改变 pageSize
            showSizeChanger: true
          }}
          />
      </Card>
    )
  }
}
