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
import "../../assets/css/viewStock/stockout.css";
import { Link } from "react-router-dom";
import Delete from '../../components/Delete'
import Edit from '../../components/Edit'

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    id: i,
    name: "admin",
    miaoshu: "这是大哥",
    store: "2020-06-06",
  });
}
const { Option } = Select;

export default class Position extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { msg } = this.props;
    const columns = [
      {
        title: "职位名称",
        dataIndex: "name",
      },
      {
        title: "职能描述",
        dataIndex: "miaoshu",
      },
      {
        title: "添加时间",
        dataIndex: "store",
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
            <Link to={msg + "/Quanxian"}>权限设置</Link>
            <Edit />
            <Delete />
          </div>
        ),
      },
    ];

    return (
      <div className="stockOut">
        <header>
          <div className="stock-top">
            <div className="stock-top-left">
              <div className="stock-top-left-mark"></div>
              <p className="stock-top-word">职位管理</p>
            </div>
            <div className="stock-top-right">
              <SyncOutlined />
              <p className="stock-top-word">刷新</p>
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
          <Table dataSource={data} columns={columns} bordered />
        </div>
      </div>
    );
  }
}
