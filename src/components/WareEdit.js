import React, { useState } from 'react'
import { Select,Button, Modal, Form, Input, Radio } from 'antd'

const { Option } = Select

const WareEidt = ({confirmLoading, recoder, visible, onCreate, onCancel }) => {

    const layout = {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 18,
        },
      }
    const [form] = Form.useForm()


    return (
        <div>
            <Modal
            title="仓库编辑"
            visible={visible}
            okText="修改"
            cancelText="取消"
            onOk={() => {
                form
                .validateFields()
                .then( values => {
                form.resetFields();
                onCreate(values);
                console.log('values',values)
                })
                .catch((info) => {
                console.log("Validate Failed:", info);
                })
            }}
        confirmLoading={confirmLoading}
          onCancel={onCancel}
          bodyStyle={{ height: "25vw" }}
        >
          <Form
          form={form}
            style={{ width: "25vw" }}
            {...layout}
            name="form_in_modal"
            initialValues={recoder}
          >
            <Form.Item
              form={form}
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
              <Select style={{ width: 120 }}>
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
                },
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
                },
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
              <Select style={{ width: 120 }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        </div>
        )
}

export default WareEidt