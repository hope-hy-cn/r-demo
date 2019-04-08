import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {logout} from '../../store/actions/user'

class Forbidden extends Component{
  doLogout = () => {
    this.props.logout()
    this.props.history.push('/login')
    window.sessionStorage.removeItem('userInfo')
  }

  render() {
    return (
      <div style={{paddingLeft:'100px',paddingTop:'150px'}}>
        <p>您没有权限查看此页面</p>
        <p>可用以下身份登陆查看</p>
        <p>管理员登陆： 用户名：<b>admin</b>  密码：<b>admin</b></p>
        <p>游客登陆： 用户名：<b>guest</b>  密码：<b>guest</b></p>
        <Link onClick={this.doLogout} style={{color:'#345679'}} to="/login">点击立即登陆</Link>
      </div>
    )
  }
}

const mapState = (state )=> {
  return {
    
  }
}
export default connect(mapState,{logout})(Forbidden)
