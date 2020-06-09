import React, { Component } from 'react'
import { Route,NavLink } from 'react-router-dom'
import Order from '../viewSales/order'
import newOrder from '../viewSales/newOrder'
import { Row, Col } from 'antd';


const Xiaoshou = (props)=> {
  const {match} = props
  return (
    <div className="about">
     <Row>
       <Col className="list" span={4}>
            <NavLink to={match.url   }>订单列表</NavLink>
            <NavLink to={match.url + '/newOrder' }>新增订单</NavLink>
        </Col>
        <Col  span={20}>
            <Route path={match.url} exact  component={Order} />
            <Route path={match.url + '/newOrder'} component={newOrder} />
        </Col>
    </Row>
   

    </div>
  )
}

export default Xiaoshou