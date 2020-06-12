import React, { Component, useState } from "react";
import { Form, Modal, message, Input, Switch, Table, Select } from "antd";
import ConTitle from "../../components/ConTitle";
import { UnorderedListOutlined } from "@ant-design/icons";
import "../../assets/css/viewSetting/Department.css";
import axios from "../../plugins/axios";
import Delete from "../../components/Delete";

const { Option } = Select;
const { TextArea } = Input;

export default class Warehouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:'',
      search: [{}],
      visible: false,
      confirmLoading: false,
    };
  }

  componentDidMount() {
    axios({
      method:'POST',
      url:'/warehouse/showwarehouse'
    })
    .then(res=> {
      console.log(res.data.data)
      this.setState({
        data:res.data.data
      })    
    })
    .catch(err=> {
      console.log(err)
    })
  }

  handleChange = () => {};

  toAddware = () => {
    this.props.his.push({
      pathname: this.props.msg + "/AddWare",
      params: { aa: 123 },
    })
  }

  showModal = (recoder) => {
    console.log(recoder)
    this.setState({
      visible: true,
    })
  }

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    })

    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      })
      message.success("修改成功")
    }, 2000)
  }

  handleCancel = () => {
    console.log("Clicked cancel button")
    this.setState({
      visible: false,
    })
    message.error("修改失败")
  }

  render() {
    const { visible, confirmLoading, data } = this.state;

    const onFinish = (values) => {
      console.log("Success:", values)
      values=''
    }

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo)
    }

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
        width:'9vw',
        dataIndex: "axios",
        render: (text,recoder) => (
          <div className="caozuoPart">
            <a className='caozuoA' onClick={()=>this.showModal(recoder)}>编辑</a>
            <Modal
              title="仓库编辑"
              visible={visible}
              onOk={this.handleOk}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
              bodyStyle={{height:'25vw'}}
            >
              <div>
                <Form
                style={{width:'25vw'}}
                  {...layout}
                  name="basic"
                  initialValues={recoder}
                  onFinish={onFinish(recoder)}
                  onFinishFailed={onFinishFailed}                  
                >
                  <Form.Item
                    label="仓库名称"
                    name="ware_name"
                    rules={[
                      {
                        required: true,
                        message: "仓库名不能为空",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="仓库类型"
                    name="ware_type"
                    rules={[
                      {
                        required: true,
                        message: "类型不能为空",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="负责人"
                    name="emp_name"
                    rules={[
                      {
                        required: true,
                        message: "请选择负责人",
                      },
                    ]}
                  >
                    <Select defaultValue="lucy" style={{ width: 120 }}>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="联系电话"
                    name="emp_phone"
                    rules={[
                      {
                        required: true,
                        message: "电话不能为空",
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="仓库地址"
                    name="ware_addr"
                    rules={[
                      {
                        required: true,
                        message: "地址不能为空",
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="跟车司机"
                    name="driver_name"
                    rules={[
                      {
                        required: true,
                        message: "请选择跟车司机",
                      },
                    ]}
                  >
                    <Select defaultValue="lucy" style={{ width: 120 }}>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>
                  </Form.Item>
                </Form>
              </div>
            </Modal>
            <Delete />
          </div>
        ),
      },
    ];

    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 18,
      },
    };
    return (
      <div className="stockOut">
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
