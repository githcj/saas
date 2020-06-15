import React, { Component, useState } from "react"
import { Form, Modal, message, Input, Switch, Table, Select } from "antd"
import ConTitle from "../../components/ConTitle"
import { UnorderedListOutlined } from "@ant-design/icons"
import "../../assets/css/viewSetting/Department.css"
import axios from "../../plugins/axios"
import Delete from "../../components/Waredelete"
import Edit from '../../components/WareEidt'

const { Option } = Select

export default class Warehouse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: "",
      search: [{}],
      visible: false,
      confirmLoading: false,
      recoder: '',
    }
  }

  componentDidMount() {
    axios({
      method: "POST",
      url: "/warehouse/showwarehouse",
    })
      .then((res) => {
        console.log(res.data.data);
        this.setState({
          data: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = () => {};

  toAddware = () => {
    this.props.his.push({
      pathname: this.props.msg + "/AddWare",
      params: { aa: 123 },
    });
  }

  showModal = (recoder) => {
    console.log(recoder)

    this.setState({
      recoder,
      visible: true,
    })
  }

  onCancel = () => {
    this.setState({
      visible: false,
    })
    message.error("修改失败")
  }

  toRecord = async (record) => {
    await this.setState({
      recoder: record,
    })
    console.log(this.state)
  }
  toDel = rec => {
      console.log('id',rec)
    axios({
      method: "POST",
      url: "/warehouse/deletewarehouse",
      data: {
        ware_id: rec
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const onCreate = values => {
      this.setState({
        confirmLoading: true,
      })
      axios({
        method: "POST",
        url: "/warehouse/updatewarehouse",
        data: values,
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log("err", err)
        })

      setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false,
        })
        message.success("修改成功");
      }, 2000)
    };

    const { visible, confirmLoading, data, recoder } = this.state;

    const columns = [
      {
        title: "仓库名称",
        dataIndex: "ware_name",
      },
      {
        title: "仓库类型",
        dataIndex: "ware_type",
      },
      {
        title: "仓库地址",
        dataIndex: "ware_addr",
      },
      {
        title: "负责人",
        dataIndex: "emp_name",
      },
      {
        title: "联系电话",
        dataIndex: "emp_phone",
      },
      {
        title: "跟车司机",
        dataIndex: "driver_name",
      },
      {
        title: "是否启用",
        dataIndex: "axios",
        render: () => <Switch defaultChecked />,
      },
      {
        title: "操作",
        width: "9vw",
        dataIndex: "caozuo",
        render: (text, record, index) => (
          <div className="caozuoPart">
            <a className="caozuoA" onClick={() => this.showModal(record)}>
              编辑
            </a>
            <Delete
            msg={record}
              toDel={this.toDel}
              toRecord={() => this.toRecord(record)}
            />
          </div>
        ),
      },
    ]

    return (
        <div className="warehouse">
            <Edit 
            visible={visible}
            confirmLoading={confirmLoading}
            recoder={recoder}
            onCreate={onCreate}
            onCancel={this.onCancel}
             />
            <header>
                <div className="stockout-top">
                    <ConTitle titleName="仓库管理" />
                </div>
            </header>
        <div className="dynamic-dataList">
            <div className="dynamic-left-title">
                <UnorderedListOutlined style={{ fontSize: "20px" }} />
                <span style={{ fontSize: "14px" }}>数据列表</span>
            </div>
            <div className="purchase-table-se2">
                <div onClick={this.toAddware} className="addDiv">
                添加
                </div>
                <Select
                defaultValue="显示条数"
                style={{ width: 120 }}
                onChange={this.handleChange}
                >
                    <Option value="15">10条/页</Option>
                    <Option value="20">15条/页</Option>
                </Select>
                <Select
                defaultValue="排序方式"
                className="seen"
                style={{ width: 120 }}
                onChange={this.handleChange}
                >
              <Option value="15">编号递增</Option>
              <Option value="20">编号递减</Option>
            </Select>
          </div>
        </div>

        <div className="table">
          <Table dataSource={data} columns={columns} bordered />
        </div>
      </div>
    );
  }
}
