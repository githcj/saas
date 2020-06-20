import React, { Component } from 'react'
import { Form, Input, Button,Select, message , DatePicker, } from 'antd';
import ConTitle from '../../components/ConTitle'
import axios from '../../plugins/axios'
import '../../assets/css/viewSetting/Gongsi.css'

const { Option } = Select;

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
};


class AddWare extends Component {
    constructor(props){
        super(props)
        this.state = {
            rowInfo:{},
            finishFun:null,
            empList:[],
            driverList:[],
            isOWare:true,
        }
    }


    onAddFinish = async values => {

        console.log(values,this.props.location.params.row);
        
        
        const {data:res}  = await axios.post('/warehouse/addwarehouse',values)
        if(res.code !== 200) return message.error('添加仓库失败!')
        message.success('添加仓库成功!')
        this.props.history.push({
            pathname:'/home/system/Warehouse'
        })
    };
    
    onEditFinish = async values => {
        console.log(values,'editValues')
        const {data:res}  = await axios.post('/warehouse/updatewarehouse',values)
        if(res.code !== 200) return message.error('编辑仓库信息失败!')
        message.success('编辑仓库信息成功!')
        this.props.history.push({
            pathname:'/home/system/Warehouse'
        })
    }

    wareTypeChange = (value)=>{
        if(value === 1) {
            this.setState({
                isOWare:true,
            })
        }else if(value === 2) {
            this.setState({
                isOWare:false,
            })
        }
    }
    // 组件加载完毕请求数据

    async componentDidMount() {
        let row = this.props.location.params.row
        if(row){
            if(row.waretype_id == 1){
                this.setState({
                    isOWare:true,
                    finishFun:this.onEditFinish,
                })
            }else {
                this.setState({
                    isOWare:false,
                    finishFun:this.onEditFinish,
                })
            }
        }else {
            this.setState({
                finishFun:this.onAddFinish
            })
        }
        //下拉列表选项查询
        const {data:empData} = await axios.post('/employee/gettingemployee')
        const {data:driverData} = await axios.post('/driver/gettingdriver')

        this.setState({
            empList:empData.data,
            driverList:driverData.data,
        })
        console.log(this.state);
        

    }

    render() {
        return (
            <div className="gongsi">
            <div className='gongsi-firtop'>
                <ConTitle titleName={this.props.location.params.title} clickName="返回" />
            </div>
            <div className='company-content'>
                <Form {...layout} name="nest-messages" onFinish={this.state.finishFun} size="large"
                initialValues={this.props.location.params.row}>
                    <Form.Item
                        name="ware_name"
                        label="仓库名"
                        rules={[
                        {
                            required: true,
                            message: '请输入仓库名!'
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='waretype_id'
                        label="仓库类型"
                        rules={[
                        {
                            required: true,
                            message: '请选择仓库类型!' 
                        },
                        ]}
                    >
                        <Select onChange={this.wareTypeChange}>
                            <Option value={1}>主仓库</Option>
                            <Option value={2}>副仓库</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='emp_id'
                        label="负责人"
                        rules={[
                        {
                            required: true,
                            message: '请选择负责人!' 
                        },
                        ]}
                    >
                        <Select >
                            {this.state.empList.map(item => {
                                return <Option value={item.emp_id}>{item.emp_name}</Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='emp_phone'
                        label="联系电话"
                        rules={[
                        {
                            required: true,
                            message: '请填写联系电话!' 
                        },{ pattern:/^1[3456789]\d{9}$/ ,
                            message:'请输入有效联系电话'
                        }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {
                        this.state.isOWare ? <Form.Item
                        name='ware_addr'
                        label="仓库地址"
                        rules={[
                        {
                            required: true,
                            message: '请填写仓库地址!' 
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item> :
                    <Form.Item
                        name='driver_id'
                        label="跟车司机"
                        rules={[
                        {
                            required: true,
                            message:'请选择跟车司机'
                        }]}
                    >
                        <Select>
                            {this.state.driverList.map(item => {
                                return <Option value={item.driver_id}>{item.driver_name}</Option>
                            })}
                        </Select>
                    </Form.Item>
                    }
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
}

export default AddWare
