import React, { Component, Fragment, createRef } from 'react'
import {
  Row,
  Col,
  Card,
  Icon,
  Button,
  TimePicker,
  Input,
  Avatar,
  Calendar
} from 'antd'

import moment from 'moment'

import './dashboard.scss'

import echarts from 'echarts';

const { Meta } = Card

const { TextArea } = Input

const Search = Input.Search

function onPanelChange(value, mode) {
  console.log(value, mode);
}

export default class Dashboard extends Component {
  userIncrement = createRef()
  state = {
    value: moment('2017-01-25'),
    selectedValue: moment('2017-01-25'),
    open: false,
    loading: true,
  }

  handleOpenChange = (open) => {
    this.setState({ open });
  }

  handleClose = () => this.setState({ open: false })

  onSelect = (value) => {
    this.setState({
      value,
      selectedValue: value,
    });
  }

  onPanelChange = (value) => {
    this.setState({ value });
  }

  componentDidMount() {
    this.userIncrementChart = echarts.init(this.userIncrement.current);
    this.userIncrementChart.setOption({
      title: {
          // text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      },
      yAxis: {},
      series: [{
          name: '签到人数',
          type: 'bar',
          data: [15, 20, 22, 21, 17, 10]
      }]
  })
  }
  
  render() {
    return (
      <Fragment>
        <div className="main-content dashboard-content">
          <Row>
            <Col span={4}>
              <Card
                style={{ width: '100%', height:'100%' }}
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
              >
                <Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
            <Col span={13}>
              <div>
                <div className="header"><h3>请假申请</h3></div>
                <div className="content">
                  <div className="text">
                    <Input placeholder="标题" />
                    <TextArea rows={4} placeholder="说明..."/>
                  </div>
                  <div className="times">
                    <div className="start-time">
                    <span>开始时间</span>
                      <TimePicker
                        open={this.state.open}
                        onOpenChange={this.handleOpenChange}
                        addon={() => (
                          <Button size="small" type="primary" onClick={this.handleClose}>
                            Ok
                          </Button>
                        )}
                      />
                    </div>
                    <div className="end-time">
                    <span>结束时间</span>
                      <TimePicker
                        open={this.state.open}
                        onOpenChange={this.handleOpenChange}
                        
                        addon={() => (
                          <Button size="small" type="primary" onClick={this.handleClose}>
                            Ok
                          </Button>
                        )}
                      />
                    </div>
                    <Button type="primary" className="submit">提交</Button>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={5} className="bulletin-board">
              <div className="header">
                <h2>公告栏</h2>
              </div>
              <div className="main-context">
                <p><Icon type="notification" className="notification"/>我市将展开“微小餐饮”专项整治</p>
                <p><Icon type="notification" className="notification"/>北京阳光餐饮APP10月上线</p>
                <p><Icon type="notification" className="notification"/>2018第四届上海国际酒店与餐饮...</p>
                <p><Icon type="notification" className="notification"/>东莞“明厨亮灶”餐饮单位数已达...</p>
                <p><Icon type="notification" className="notification"/>重庆将更改食品安全标识，50%餐...</p>
                <p><Icon type="notification" className="notification"/>小杨煎胜用心做餐饮 楚连胜打造...</p>
                
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <div className="header">
                <h3>考勤日历</h3>
              </div>
              <div style={{ width: '100%', border: '1px solid #d9d9d9', borderRadius: 4 }}>
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
              </div>
            </Col>
            <Col span={7}>
              <div className="header">
                <h3>考勤统计</h3>
                <div className="contacts" ref={this.userIncrement} style={{ height:"100%", width:"100%" }}>
                </div>
              </div>
            </Col>
            <Col span={5}>
              <Search
                onSearch={value => console.log(value)}
                style={{ width: "100%", marginTop: "16px" }}
                className="search-contact"
              />
              <Card
                style={{ width: "100%" }}
                actions={[<Icon type="message" />, <Icon type="user" />, <Icon type="team" />]}
                bordered={ false }
              >
              </Card>
            </Col>
          </Row>
        </div>
      </Fragment>
      
    )
  }
}
