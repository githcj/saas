import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import Caigou from "./Caigou";
import Xiaoshou from "./Xiaoshou";
import Kucun from "./Kucun";
import Zijin from "./Zijin";
import Dongtai from "./Dongtai";
import System from "./System";
import "../../assets/css/huang/home.css";
import { Row, Col } from "antd";
import { UserOutlined, HomeOutlined, BellFilled, CloseCircleOutlined } from "@ant-design/icons";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { match } = this.props;
        return (
            <div className="home">
                <Row>
                    <Col span={24}>
                        <div className="home-link">
                            <span className="">saas平台</span>
                            <NavLink to={match.url}>系统</NavLink>
                            <NavLink to={match.url + "/Caigou"}>采购</NavLink>
                            <NavLink to={match.url + "/Xiaoshou"}>销售</NavLink>
                            <NavLink to={match.url + "/Kucun"}>库存</NavLink>
                            <NavLink to={match.url + "/Zijin"}>资金</NavLink>
                            <NavLink to={match.url + "/Dongtai"}>动态</NavLink>
                            <div className="home-icon">
                                <span>
                                    <UserOutlined />
                  管理员 |{" "}
                                </span>
                                <span>
                                    <HomeOutlined /> |
                </span>
                                <span><BellFilled /> | </span>
                                <span><CloseCircleOutlined /></span>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div>
                        <Route path={match.url} exact component={System}></Route>
                        <Route path={match.url + "/Caigou"} component={Caigou} />
                        <Route path={match.url + "/Xiaoshou"} component={Xiaoshou} />
                        <Route path={match.url + "/Kucun"} component={Kucun} />
                        <Route path={match.url + "/Zijin"} component={Zijin} />
                        <Route path={match.url + "/Dongtai"} component={Dongtai} />
                    </div>
                </Row>
            </div>
        );
    }
}
