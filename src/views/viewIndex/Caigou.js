import React from "react";
import { Route, NavLink } from "react-router-dom";
import Gongsi from "../viewSetting/Gongsi";
import Department from "../viewSetting/Department";
import Position from "../viewSetting/Position";
import Employee from "../viewSetting/Employee";
import Operation from "../viewSetting/Operation";
import Cusinfo from "../viewSetting/Cusinfo";
import Custype from "../viewSetting/Custype";
import Supplier from "../viewSetting/Supplier";
import Brandma from "../viewSetting/Brandma";
import Comclass from "../viewSetting/Comclass";
import Cominfo from "../viewSetting/Cominfo";
import { Row, Col } from "antd";
import "../../assets/css/huang/system.css";

const Caigou = (props) => {
  const { match } = props;
  return (
    <div className="system">
      <Row>
        <Col span={4}>
        </Col>
        <Col span={20}>
        </Col>
      </Row>
    </div>
  );
};

export default Caigou;
