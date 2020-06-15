import React, { useRef } from 'react'
import { Modal, Input , Form } from 'antd'
// import DepartForm from './DepartForm'


const DepartModal = (props) => {
    const {ModalVisible,onCancel,onCreate,title,rowInfo} = props
    
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    };
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
                    name='emp_password'
                    label="新密码"
                    rules={[
                    {
                        required: true,
                        message:'请输入新密码'
                    },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name='emp_confirm_pwd'
                    label="确认密码"
                    rules={[
                    {
                        required: true,
                        message:'请确认密码'
                    },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                            if (!value || getFieldValue('emp_password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('两次登录密码不一致');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    )
    
}

export default DepartModal


