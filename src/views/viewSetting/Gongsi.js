import React from 'react'
import { Form, Input, Tooltip, Button, InputNumber, message } from 'antd';
import ConTitle from '../../components/ConTitle'
import WXUpLoad from '../../components/WXUpLoad'
import CompanyImgs from '../../components/CompanyImgs'
import axios from '../../plugins/axios'
import { EnvironmentOutlined } from '@ant-design/icons';
import '../../assets/css/viewSetting/Gongsi.css'

const Gongsi = (props)=> {
    
    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 8,
        },
    };

      
    const onFinish = async values => {
        console.log('Success:', values);
        const {data}  = await axios.post('/setCompany',values)
        const {data:res} = data
        if(res.code !== 200) return message.error(res.message)
        message.success(res.message)
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

      
    return (
        <div className="gongsi">
            <div className='gongsi-firtop'>
                <ConTitle titleName='公司信息'/>
            </div>
            <div className='company-content'>
                <Form {...layout} name="nest-messages" onFinish={onFinish} onFinishFailed={onFinishFailed} size="large">
                    <Form.Item
                        name={'com_name'}
                        label="公司名称"
                        rules={[
                        {
                            required: true,
                            message: '请输入公司名称!' 
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={'com_addr'}
                        label="公司地址"
                        rules={[
                        {
                            required: true,
                            message: '请输入公司地址!' 
                        },
                        ]}
                    >
                        <Input
                            suffix={
                                <Tooltip title="选择地址">
                                    <EnvironmentOutlined />
                                </Tooltip>
                            }
                        />
                    </Form.Item>
                    {/* <Form.Item
                        name={''}
                        label="员工数"
                        rules={[
                        {
                            required: true,
                            message: '请输入员工数!',
                        },
                        ]}
                    >
                        <InputNumber min={1} />
                    </Form.Item> */}
                    <Form.Item
                        name={'emp_name'}
                        label="负责人"
                        rules={[
                        {
                            required: true,
                            message: '请输入负责人!' 
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={'emp_cardid'}
                        label="身份证号"
                        rules={[
                        {
                            required: true,
                            message:'请输入身份证号'
                        },{ 
                            pattern:/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                            message:'请输入有效身份证号'
                         }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={'emp_phone'}
                        label="联系电话"
                        rules={[
                        {
                            required: true,
                            message:'请输入联系电话'
                        },{ pattern:/^1[3456789]\d{9}$/ ,
                            message:'请输入有效联系电话'
                        }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={'com_email'}
                        label="邮箱"
                        rules={[
                        {
                            required: true,
                            message:'请输入邮箱'
                        },{ 
                            type:"email",
                            message:'请输入有效邮箱'
                        }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item
                        name={'wx'}
                        label="微信"
                        rules={[
                        {
                            required: true,
                            message:'请选择上传微信二维码'
                        }
                        ]}
                    >
                        <WXUpLoad notify='点击上传二维码' />
                    </Form.Item>
                    <Form.Item
                        name={'logo'}
                        label="公司Logo"
                        rules={[
                        {
                            required: true,
                            message:'请选择logo上传'
                        }
                        ]}
                    >
                        <WXUpLoad notify='点击上传logo' />
                    </Form.Item>
                    <Form.Item
                        name={'instr'}
                        label="备注"
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        name={'companyImgs'}
                        label="公司宣传图册"
                    >
                        <CompanyImgs />
                    </Form.Item> */}
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit" >
                        提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Gongsi
