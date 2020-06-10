import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import Order from "../viewSales/order";
import newOrder from "../viewSales/newOrder";
import orderDetail from '../viewSales/orderDetail'
import { Row, Col, Menu } from "antd";

const Xiaoshou = (props) => {
  const { match } = props;
  return (
    <div className="about">
      <Row>
        <Col  span={4}>
            <div className='list'>
          <Menu style={{ background: "#f3f3f3" }}>
            <Menu.ItemGroup key="g1">
              <Menu.Item key="1">
                <NavLink to={match.url}>订单列表</NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to={match.url + "/newOrder"}>新增订单</NavLink>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
          </div>
        </Col>
        <Col span={20}>
          <Route path={match.url} exact component={Order} >
              <Order msg={match.url} his={props.history}></Order>
          </Route>
          <Route path={match.url + "/newOrder"} component={newOrder} />
          <Route path={match.url + '/orderDetail'} component={orderDetail}></Route>
        </Col>
      </Row>
    </div>
  );
};

export default Xiaoshou;
