import React from 'react'
import { Modal, Input , Form ,Select } from 'antd'
// import DepartForm from './DepartForm'

const { Option } = Select


const DepartModal = (props) => {
    const {ModalVisible,onCancel,onCreate,title,rowInfo} = props
    
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    };
    const [form] = Form.useForm();
    // const formRef = useRef(null)
    console.log(rowInfo,'info');
    
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
                console.log(values)
                form.resetFields();
                onCreate(values,form);
            })
            .catch(info => {
                
            });
        }}
        >
            <Form
                {...layout}
                style={{width:'33vw'}}
                form={form}
                name="form_in_modal"
                initialValues={rowInfo}
            >
                <Form.Item
                name="unit_name"
                label="单位名称"
                rules={[
                    {
                    required: true,
                    message: '请填写单位名称!',
                    },
                ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                name="unit_type"
                label="单位类别"
                rules={[
                    {
                    required: true,
                    message: '请选择单位类别!',
                    },
                ]}
                >
                    <Select>
                        <Option value={1}>大单位</Option>
                        <Option value={2}>小单位</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
    
}

export default DepartModal


