import React from 'react'
import { Form, Input, Tooltip, Button, InputNumber } from 'antd';
import ConTitle from '../../components/ConTitle'
import WXUpLoad from '../../components/WXUpLoad'
import CompanyImgs from '../../components/CompanyImgs'
import {
    EnvironmentOutlined
} from '@ant-design/icons';
import '../../assets/css/viewSetting/Gongsi.css'

const Gongsi = (props)=> {
    const { TextArea } = Input;
    
    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 8,
        },
    };

      
    const Demo = () => {
        const onFinish = values => {
            console.log(values);
        };
    }

    const onFinish = () => {

    }
        
      
    return (
        <div className="gongsi">
            <div className='gongsi-firtop'>
                <ConTitle titleName='????'/>
            </div>
            <div className='company-content'>
                <Form {...layout} name="nest-messages" onFinish={onFinish} size="large">
                    <Form.Item
                        name={['company', 'name']}
                        label="????"
                        rules={[
                        {
                            required: true,
                            message: '???????!' 
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['company', 'address']}
                        label="????"
                        rules={[
                        {
                            required: true,
                            message: '???????!' 
                        },
                        ]}
                    >
                        <Input
                            suffix={
                                <Tooltip title="????">
                                    <EnvironmentOutlined />
                                </Tooltip>
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name={['company', 'staffNum']}
                        label="???"
                        rules={[
                        {
                            required: true,
                            message: '??????!' 
                        },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name={['company', 'charge']}
                        label="???"
                        rules={[
                        {
                            required: true,
                            message: '???????!' 
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['company', 'IDCard']}
                        label="????"
                        rules={[
                        {
                            required: true,
                            message:'???????'
                        },{ 
                            pattern:/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                            message:'???????????'
                         }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['company', 'phoneNum']}
                        label="????"
                        rules={[
                        {
                            required: true,
                            message:'???????'
                        },{ pattern:/^1[3456789]\d{9}$/ ,
                            message:'???????????'
                        }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['company', 'email']}
                        label="????"
                        rules={[
                        {
                            required: true,
                            message:'???????'
                        },{ 
                            type:"email",
                            message:'????????'
                        }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['company', 'wx']}
                        label="?????"
                        rules={[
                        {
                            required: true,
                            message:'??????????'
                        }
                        ]}
                    >
                        <WXUpLoad notify='???????' />
                    </Form.Item>
                    <Form.Item
                        name={['company', 'logo']}
                        label="??logo"
                        rules={[
                        {
                            required: true,
                            message:'???logo??'
                        }
                        ]}
                    >
                        <WXUpLoad notify='??logo??' />
                    </Form.Item>
                    <Form.Item
                        name={['company', 'instr']}
                        label="??"
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        name={['company', 'companyImgs']}
                        label="?????"
                    >
                        <CompanyImgs />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                        ??
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Gongsi
