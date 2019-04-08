import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Layout,
  Menu,
  Icon,
  Input,
  Avatar,
  Dropdown,
  Badge
} from 'antd';

import {logout} from '../../store/actions/user'

import {
  withRouter,
  Link
} from 'react-router-dom'

import logo from '../../assets/logo.png'

import './AppFrame.scss'

import routes from '../../routes'

const menus = routes.filter(route => route.isMenu === true)

const { Header, Content, Sider } = Layout;

const Search = Input.Search;

class AppFrame extends Component {
  state = {
    collapsed: false,
  };
  
  onCollapse = (collapsed) => {
    // console.log(collapsed);
    this.setState({ collapsed });
  }

  handleMenuClick = ({key}) => {
    console.log(key)
    const {
      history,
      match
    } = this.props

    history.push(`${match.path}${key}`)
  }

  doLogout = () => {
    this.props.logout()
    this.props.history.push('/login')
    window.sessionStorage.removeItem('userInfo')
  }

  render() {
    // console.log(this.props)
    const {
      pathname
    } = this.props.location

    const defaultSelectedKey = pathname.split("/").slice(2).join('/')
    // console.log(defaultSelectedKey)

    const menu = (
      <Menu>
        <Menu.Item key="0">
          <Badge count={this.props.unreadNotificationCount} offset={[12,-5]}>
            <Link to={{
              pathname: '/admin/information/notice'
            }}>待处理消息</Link>
          </Badge>
        </Menu.Item>
        <Menu.Item key="1">
        <Link to={{
              pathname: '/admin/information/notice'
            }}>消息中心</Link>
        </Menu.Item>
      </Menu>
    );
    const menu1 = (
      <Menu>
        <Menu.Item key="5">
        <Link onClick={this.doLogout} to={{
              pathname: '/login'
            }}>退出</Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo">
            <img src={logo} alt="logo"/>
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={[`/${defaultSelectedKey}`]}
            mode="inline"
            onClick={this.handleMenuClick}
          >
            {
                menus.map(item => {
                  return (
                    <Menu.Item key={item.path}>
                      <Icon type={item.iconType} />
                      <span>{item.title}</span>
                    </Menu.Item>
                  )
                })
              }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#2b3245', padding: 0 }}>
              <div className="header-info" style={{width:'430px',color:"white"}}>
                <Search
                  placeholder="搜索"
                  onSearch={value => console.log(value)}
                  enterButton
                />
                <span className="message-icon">
                  <Dropdown overlay={menu} trigger={['click']}>
                    <Badge dot={this.props.hasUnreadNotification}>
                      <Icon type="bell" style={{color:' #fff',fontSize:'16px'}} />
                    </Badge>
                  </Dropdown>
                  <Icon type="mail" />
                </span>
                <span className="avatar">
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  {this.props.displayUsername}
                </span>
                <span className="setting">
                  <Dropdown overlay={menu1} trigger={['click']}><Icon type="setting" /></Dropdown>
                  
                </span>
              </div>
          </Header>
          <Content style={{ margin: '24px 24px' }}>
            <div style={{background: '#fff', minHeight: '80vh' }}>
            {this.props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapState = (state )=> {
  return {
    hasUnreadNotification: state.notification.content.some(item => item.hasRead === false),
    unreadNotificationCount: state.notification.content.filter(item => item.hasRead === false).length,
    displayUsername: state.user.displayName
  }
}
export default connect(mapState,{logout})(withRouter(AppFrame))