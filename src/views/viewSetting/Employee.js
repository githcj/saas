import React, { Component } from "react";
import {
  Modal,
  Popconfirm,
  message,
  Switch,
  Table,
  DatePicker,
  Select,
} from "antd";
import { SyncOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "../../assets/css/viewStock/stock.css";
import { Link } from "react-router-dom";
import Delete from "../../components/Delete";
import Edit from "../../components/Edit";
import axios from "axios";

const { Option } = Select;

export default class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datalist:[]
    };
    
  }

  componentDidMount() {
    axios({
      method: "POST",
      url: "http://119.23.228.238:3031/mock/47/empManagement",
      data: {
        limit: 5,
        page: 1,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        this.setState({
          datalist:res.data.data
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {datalist} = this.state
    const { msg } = this.props;
    const columns = [
      {
        title: "员工账号",
        dataIndex: "emp_account",
      },
      {
        title: "姓名",
        dataIndex: "emp_name",
      },
      {
        title: "手机号",
        dataIndex: "emp_phone",
      },
      {
        title: "所属部门",
        dataIndex: "dep_name",
      },
      {
        title: "职位",
        dataIndex: "position_name",
      },
      {
        title: "最后登录",
        dataIndex: "emp_last_time",
      },
      {
        title: "是否启用",
        dataIndex: "axios",
        render: () => <Switch defaultChecked />,
      },
      {
        title: "操作",
        dataIndex: "axios",
        render: () => (
          <div>
            <Link to={msg + "/Quanxian"}>重置密码</Link>
            <Edit />
            <Delete />
          </div>
        ),
      },
    ];

    return (
      <div className="Employee">
        <header>
          <div className="Employee-top">
            <div className="Employee-top-left">
              <div className="Employee-top-left-mark"></div>
              <p className="Employee-top-word">员工管理</p>
            </div>
            <div className="Employee-top-right">
              <SyncOutlined />
              <p className="Employee-top-word">刷新</p>
            </div>
          </div>
        </header>
        <div className="table">
          <div className="dataList">
            <div className="left">
              <UnorderedListOutlined />
              <span>数据列表</span>
            </div>
            <div className="right">
              <button type="button">添加</button>
              <Select
                defaultValue="显示条数"
                style={{ width: 100 }}
                className="select"
              >
                <Option value="5">5</Option>
                <Option value="10">10</Option>
                <Option value="20">20</Option>
              </Select>

              <Select
                defaultValue="排序方式"
                style={{ width: 100 }}
                className="select"
              >
                <Option value="1">顺序</Option>
                <Option value="0">倒序</Option>
              </Select>
            </div>
          </div>
          <Table  size={'small'} dataSource={datalist} columns={columns} bordered />
        </div>
      </div>
    );
  }
}
