import React from 'react'
import {  Input , Form  } from 'antd'

const { TextArea } = Input


const DepartForm = (props) => {
    const {rowInfo} = props
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    };
   
    const [form] = Form.useForm();

    form.setFieldsValue(rowInfo)
    return (
        <Form
<<<<<<< HEAD
        style={{width:'25vw'}}
=======
            {...layout}
            style={{width:'33vw'}}
>>>>>>> depart
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
    )
    
}

// DepartForm = React.forwardRef(())


export default DepartForm


