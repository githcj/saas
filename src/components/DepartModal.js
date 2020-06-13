import React, { useRef } from 'react'
import { Modal, Input , Form } from 'antd'
// import DepartForm from './DepartForm'


const DepartModal = (props) => {
    const {ModalVisible,onCancel,onCreate,title,rowInfo} = props
    
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    };
    const { TextArea } = Input
    const [form] = Form.useForm();
    // const formRef = useRef(null)
    form.setFieldsValue(rowInfo)
    return (
        <Modal
        visible={ModalVisible}
        title={title}
        okText="提交"
        cancelText="取消"
        onCancel={()=>onCancel(form)}
        onOk={() => {
            // console.log(formRef,'formRef')
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
            {/* <DepartForm ref={formRef} {...props}/> */}
            <Form
                {...layout}
                style={{width:'33vw'}}
                form={form}
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

export default DepartModal


