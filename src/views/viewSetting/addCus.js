import React, { useState, useEffect } from 'react'
import { Form, Input, Tooltip, Button, InputNumber, message ,Select} from 'antd';
import ConTitle from '../../components/ConTitle'
import WXUpLoad from '../../components/WXUpLoad'
import CompanyImgs from '../../components/CompanyImgs'
import axios from '../../plugins/axios'
import { EnvironmentOutlined } from '@ant-design/icons';
import '../../assets/css/viewSetting/Gongsi.css'

const {Option} = Select

const AddCus = (props) => {
    const [kehu,setKehu] = useState([])
    const [fuze,setfuze] = useState([])
    const [jiage,setjiage] = useState([])
    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 8,
        },
    };

      
    const onFinish =  values => {
        console.log('Success:', values.customer_name);
        const tokens= localStorage.getItem('token')
        axios({
            method: 'POST',
            url: '/customer/add',
            data:{
                token:tokens,
                customer_name:values.customer_name,
                customer_address:values.customer_address,
                customer_type_id:values.customer_type_id,
                price_system_id:values.price_system_id,
                customer_area:values.customer_area,
                customer_contacts:values.customer_contacts,
                customer_phone:values.customer_phone,
                customer_tel:values.customer_tel,
                emp_id:values.emp_id,
                customer_creater:'admin'
            //    data:values
            }
        })
            .then(res => {
                message.success(res.message)
                props.his.push({
                    pathname:'/home/system/Cusinfo'
                })
            })
            .catch(err => {
                console.log(err);
            })
    };

         

    useEffect( ()=>{//async函数会返回一个promise，并且Promise对象的状态值是resolved（成功的） 而effect不允许有返回值
        axios({
        method: 'POST',
        url: '/combobox/customer',
         })
        .then(res => {
            setKehu(res.data.data)
        })
        .catch(err => {
            console.log(err);
        })

      axios({
            method: 'POST',
            url: '/person/in_charge',
        })
        .then(res => {
            setfuze(res.data.data)
        })
        .catch(err => {
            console.log(err);
        })

        axios({
            method: 'POST',
            url: '/combobox/price_system',
        })
        .then(res => {
            console.log(res,'res');
            
            setjiage(res.data.data)
            console.log(res.data.data,'dataaaaaa');
            
        })
        .catch(err => {
            console.log(err);
        })

         
    },[])

    

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        
    };


    
     
      
    return (
        <div className="gongsi">
            <div className='gongsi-firtop'>
                <ConTitle titleName='客户信息'/>
            </div>
            <div className='company-content'>
                <Form {...layout} name="nest-messages" onFinish={onFinish} onFinishFailed={onFinishFailed} size="large">
                    <Form.Item
                        name={'customer_name'}
                        label="客户名称"
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
                        name={'customer_address'}
                        label="客户地址"
                        rules={[
                        {
                            required: true,
                            message: '请输入客户地址!' 
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
                    <Form.Item
                        name={'price_system_id'}
                        label="价格体系"
                        rules={[
                        {
                            required: true,
                            message: '请选择价格体系!' 
                        },
                        ]}
                    >
                        <Select >
                            {
                               jiage.map(item =>(
                                  <Select.Option value={item.price_system_id}>
                                      {item.price_system_name}
                                  </Select.Option>
                             )) 
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={'customer_type_id'}
                        label="客户类型"
                        rules={[
                        {
                            required: true,
                            message: '请选择客户类型!' 
                        },
                        ]}
                    >
                        <Select >
                            {
                               kehu.map(item =>(
                                  <Select.Option value={item.customer_type_id}>
                                      {item.customer_type_name}
                                  </Select.Option>
                             )) 
                            }name
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={'customer_area'}
                        label="营业面积"
                        rules={[
                        {
                            required: true,
                            message: '请输入营业面积!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={'customer_contacts'}
                        label="联系人"
                        rules={[
                        {
                            required: true,
                            message: '请输入联系人!' 
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                   
                    <Form.Item
                        name={'customer_phone'}
                        label="手机号码"
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
                        name={'customer_tel'}
                        label="固话"
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
                        name={'emp_id'}
                        label="负责人员"
                        rules={[
                        {
                            required: true,
                            message: '请输入负责人!' 
                        },
                        ]}
                    >
                        <Select   >
                            {
                               fuze.map((item,index) =>(
                                <Select.Option value={item.emp_id}>
                                      {item.emp_name}
                                </Select.Option>
                             )) 
                         }
                        
                        </Select>
                       
                    </Form.Item>
                    
                    {/* <Form.Item
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
                    </Form.Item> */}
                   
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                          提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default AddCus
