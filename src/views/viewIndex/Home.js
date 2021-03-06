import React, { Component } from "react";
import { Route, NavLink, Redirect, Link ,Switch} from "react-router-dom";
import Caigou from "./Caigou";
import Xiaoshou from "./Xiaoshou";
import Kucun from "./Kucun";
import Zijin from "./Zijin";
import Dongtai from "./Dongtai";
import System from "./System";
import "../../assets/css/huang/home.css";
import { Modal, Button, Row, Col } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  UserOutlined,
  HomeOutlined,
  BellFilled,
  CloseCircleOutlined,
} from "@ant-design/icons";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  
  logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem('activeKey')
    this.props.history.push({
        pathname:  "/login",
      });
  };
  
  render() {
    const { match,history } = this.props;
    const username=localStorage.getItem('username')

    function confirm() {
        Modal.confirm({
          title: '退出',
          icon: <ExclamationCircleOutlined />,
          content: '确定要退出吗',
          onOk(){
            localStorage.removeItem("token");
            localStorage.removeItem('username')
            history.push({
                pathname:  "/login",
              });
          },
          okText: '确认',
          cancelText: '取消',
        });
      }

    return (
      <div className="home">
        <Row>
          <Col span={24}>
            <div className="home-link" >
              <span className="">saas平台</span>
              <NavLink to={match.url + "/system"}>系统</NavLink>
              <NavLink to={match.url + "/Caigou"}>采购</NavLink>
              <NavLink to={match.url + "/Xiaoshou"}>销售</NavLink>
              <NavLink to={match.url + "/Kucun"}>库存</NavLink>
              <NavLink to={match.url + "/Zijin"}>资金</NavLink>
              <NavLink to={match.url + "/Dongtai"}>动态</NavLink>
              <div className="home-icon">
                <span>
                  <UserOutlined />
                  {username}
                </span>
                <span>|</span>
                <span>
                  <Link style={{margin:0}} to={match.url + "/system"}>
                  <HomeOutlined />
                  </Link>
                </span>
                <span>|</span>
                <span>
                  <BellFilled />
                </span>
                <span>|</span>
                <span onClick={confirm}>
                  <CloseCircleOutlined />
                </span>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <div onClick={this.getPathName}>
            {/* <Switch> */}
            <Redirect to={ sessionStorage.getItem('activeKey') || match.url + "/system"} />
            <Route path={match.url + "/system"} component={System}></Route>
            <Route path={match.url + "/Caigou"} component={Caigou} />
            <Route path={match.url + "/Xiaoshou"} component={Xiaoshou} />
            <Route path={match.url + "/Kucun"} component={Kucun} />
            <Route path={match.url + "/Zijin"} component={Zijin} />
            <Route path={match.url + "/Dongtai"} component={Dongtai} />
            {/* </Switch> */}
          </div>
        </Row>
      </div>
    );
  }
}

