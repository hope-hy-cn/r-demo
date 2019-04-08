import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Card,
  List,
  Button
} from 'antd'

import { maskNotificationRead, maskAllNotificationRead } from '../../../store/actions/notification'

class Notification extends Component {
  render() {
    return (
      <Card
      title="消息中心"
      >
        <Button onClick={this.props.maskAllNotificationRead}>全部标记为已读</Button>
        <br/>
        <br/>
        <List
          dataSource={this.props.content}
          renderItem={item => (
            <List.Item>
              <Button onClick={this.props.maskNotificationRead.bind(this, item.id)}>标记为已读</Button>
              <span style={{color: item.hasRead ? 'black': 'red'}}>{item.title}</span>
            </List.Item>
          )}
        />
      </Card>
    )
  }
}

const mapState = (state) => {
  return {
    content: state.notification.content
  }
}

export default connect(mapState, { maskNotificationRead, maskAllNotificationRead })(Notification)