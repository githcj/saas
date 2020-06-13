import React from 'react'
import {  Input , Form , Modal } from 'antd'

const { TextArea } = Input


const DepartFrom = (props) => {
    const {ModalVisible,onCancel,onCreate,rowInfo} = props
    // console.log(rowInfo);
   
    const [form] = Form.useForm();

    form.setFieldsValue(rowInfo)
    return (
        <Modal
        visible={ModalVisible}
        title="编辑部门信息"
        okText="提交"
        cancelText="取消"
        onCancel={onCancel}
        onOk={() => {
            form
            .validateFields()
            .then(values => {
                form.resetFields();
                onCreate(values,form);
            })
            .catch(info => {
                
            });
        }}
        >
        <Form
        style={{width:'25vw'}}
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={rowInfo}
        >
            <Form.Item
            name="dep_name"
            label="部门名称"
            rules={[
                {
                required: true,
                message: '请填写部门名称!',
                },
            ]}
            >
                <Input value={rowInfo.dep_name} />
            </Form.Item>
            <Form.Item
            name="dep_describe"
            label="职能描述"
            rules={[
                {
                required: true,
                message: '请填写职能描述!',
                },
            ]}
            >
                <TextArea value={rowInfo.dep_describe} autoSize/>
            </Form.Item>
        </Form>
    </Modal>
    )
    
}

export default DepartFrom


