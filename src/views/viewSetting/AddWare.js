import React, { useEffect } from "react"
// import { Button, NavBar, Icon } from 'antd-mobile'
import ConTitle from "../../components/ConTitle"
import { Form, Input, Button, Checkbox, Select } from "antd"
import axios from "../../plugins/axios"
const { Option } = Select
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const AddWare = (props) => {
  // const {match, history} = props
  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log("Success:", values)
    axios({
      method:'POST',
      url: '/AddWare'
    })
  }

  const onReset = () => {
    form.resetFields()
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <div className="AddWare">
      <div className="gongsi-firtop">
        <ConTitle titleName="添加仓库" />
      </div>
      <div>
        <Form
          style={{ margin: "0 15%", width: "40vw" }}
          {...layout}
          name="basic"
          form={form}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="仓库名称"
            name="name"
            rules={[
              {
                required: true,
                message: "仓库名不能为空",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="仓库类型"
            name="仓库类型"
            rules={[
              {
                required: true,
                message: "类型不能为空",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="负责人"
            name="负责人"
            rules={[
              {
                required: true,
                message: "请选择负责人",
              },
            ]}
          >
            <Select size="large" placeholder='请选择' style={{ width: 200 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="联系电话"
            name="联系电话"
            rules={[
              {
                required: true,
                message: "电话不能为空",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="仓库地址"
            name="仓库地址"
            rules={[
              {
                required: true,
                message: "地址不能为空",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="跟车司机"
            name="跟车司机"
            rules={[
              {
                required: true,
                message: "请选择跟车司机",
              },
            ]}
          >
            <Select size="large" placeholder='请选择' style={{ width: 200 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddWare;
