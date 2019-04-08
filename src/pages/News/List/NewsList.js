import React, { Component } from 'react'
import {
  Fragment
} from 'react'
import { 
  Row,
  Col,
  Card
} from 'antd'

export default class NewsList extends Component {
  render() {
    return (
      <Fragment>
        <Row 
          type = { 'flex' }
          justify = { 'space-between' }
          style = {{
            height: '49%'
          }}
        >
          <Col span = {10}>
          <Card
            title="通知中心"
            headStyle = {{
              color: '#fff'
            }}
            style={{ 
              width: '100%'
            }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
    </Card>
          </Col>
          <Col span = {10}>
          <Card
            title="公告"
            headStyle = {{
              color: '#fff'
            }}
            style={{ 
              width: '100%'
            }}
          >
           
          </Card>
          </Col>
        </Row>
        <Row
         style = {{
          height: '49%',
          marginTop: '2%'
          
        }}
        >
          <Col span = {24}>
          <Card
            title="企业活动"
            headStyle = {{
              color: '#fff'
            }}
            style={{ 
              width: '100%'
            }}
          >
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
          </Card>
          </Col>
        </Row>
      </Fragment>
    )
  }
}
