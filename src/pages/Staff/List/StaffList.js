import React, { Component } from 'react'
import moment from 'moment'
import {
  Table,
  Button,
  Icon,
  Tag,
  Modal,
  message,
  Card,
  Input
} from 'antd'

import './StaffList.scss'

import XLSX from 'xlsx'
export default class StaffList extends Component {
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
          placeholder={"请输入搜索的职员姓名！"}
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
    this.http.fetchStaffList({
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
    this.props.history.push(`/admin/staff/edit/${id}`, {
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
        this.http.deleteStaffById(id)
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
    console.log(this.columns)
    const title = this.columns.map(item => item.title)
    // 删除最后一个（操作）
    title.pop()

    const data = this.state.dataSource.reduce((result, item) => {
      const row = [item.id, item.name, item.position, item.age, item.phone, item.createAt, item.address]
      result.push(row)
      return result
    }, [])
    data.unshift(title)

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "staffList.xlsx");
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
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      ...this.getColumnSearchProps('name'),
    }, {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
      filters: [{
        text: '收银员',
        value: '收银员',
      }, {
        text: '服务员',
        value: '服务员',
      }, {
        text: '配菜员',
        value: '配菜员',
      }, {
        text: '厨师',
        value: '厨师',
      }],
      onFilter: (value, record) => record.position.indexOf(value) === 0,
      render: position => {
        let color = ""
        switch(position) {
          case '收银员': 
            color = 'blue';
            break;
          case '服务员':
            color = 'purple';
            break;
          case '配菜员':
            color = 'orange';
            break;
          case '厨师':
            color = 'red';
            break;
          default:
            break;
        }
        return <Tag color={color}>{position}</Tag>
      }
    }, { 
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
    }, { 
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone'
    }, {
      title: '出生日期',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (createAt) => {
        return moment(Number.parseInt(createAt, 10)).format('YYYY-MM-DD');
      }
    }, { 
      title: '地址',
      dataIndex: 'address',
      key: 'address'
    }, {
      title: '操作',
      key: 'actions',
      render: (text, record, index) => {
        return (
          <Button.Group size='small'>
            <Button type="primary" onClick={this.handleEdit.bind(this, record.id)}>
              <Icon type="edit" />编辑
            </Button>
            <Button type="danger" onClick={this.handleDelete.bind(this, record.id, record.name)}>
              <Icon type="delete" />删除
            </Button>
          </Button.Group>
        )
      }
    }]

    return (
      <Card
      title="职员管理"
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
            showSizeChanger: true,
            // 用于显示数据总量和当前数据顺序
            showTotal: (total, range) => {
              return <span>总共有<Tag>{total}</Tag>位员工</span>
            }
          }}
          />
      </Card>
    )
  }
}
