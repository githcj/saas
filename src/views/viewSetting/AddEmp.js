import React, { Component } from 'react'
import { Form, Input, Button,Select, message , DatePicker, } from 'antd';
import moment from 'moment';
import ConTitle from '../../components/ConTitle'
import WXUpLoad from '../../components/WXUpLoad'
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


class AddEmp extends Component {
    constructor(props){
        super(props)
        this.state = {
            rowInfo:{},
            finishFun:null,
            depList:[],
            posNameList:[],
        }
    }

    disabledDate = (current) => {//日期范围
        return current > moment().endOf('day');
    }
      
    onAddFinish = async values => {
        values.emp_birth = moment(values.emp_birth).format()
        values.emp_entry_time = moment(values.emp_entry_time).format()

        console.log(values,this.props.location.params.row);
        
        
        const {data:res}  = await axios.post('/employee/addEmp',values)
        if(res.code !== 200) return message.error('添加员工失败!')
        message.success('添加员工成功!')
        this.props.history.push({
            pathname:'/home/system/Employee'
        })
    };
    
    onEditFinish = async values => {
        const {data:res}  = await axios.post('/employee/updEmp',values)
        if(res.code !== 200) return message.error('编辑用户信息失败!')
        message.success('编辑用户信息成功!')
        this.props.history.push({
            pathname:'/home/system/Employee'
        })
    }

    // 组件加载完毕请求数据

    async componentDidMount() {
        if(this.props.location.params.row){
            this.setState({
                finishFun:this.onEditFinish,
            })
        }else {
            this.setState({
                finishFun:this.onAddFinish
            })
        }
        //下拉列表选项查询
        console.log('gdsagjdghj')
        const {data:depData} = await axios.post('/department/gettingdep')
        const {data:posData} = await axios.post('/position/gettingposition')
        this.setState({
            depList:depData.data,
            posNameList:posData.data,
        })
        console.log(this.setState);
        
    }

    render() {
        const PassDiv = <Form.Item
            name='emp_password'
            label="登录密码"
            rules={[
            {
                required: true,
                message:'请输入登录密码'
            },
            ]}
        >
            <Input.Password />
        </Form.Item>

        const rePassDiv = <Form.Item
            name='emp_confirm_pwd'
            label="确认登录密码"
            rules={[
            {
                required: true,
                message:'请确认登录密码'
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


        return (
            <div className="gongsi">
            <div className='gongsi-firtop'>
                <ConTitle titleName={this.props.location.params.title} clickName="返回" />
            </div>
            <div className='company-content'>
                <Form {...layout} name="nest-messages" onFinish={this.state.finishFun} size="large"
                initialValues={this.props.location.params.row}>
                    <Form.Item
                        name="emp_account"
                        label="员工账号"
                        rules={[
                        {
                            required: true,
                            message: '请输入员工账号!' 
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='emp_name'
                        label="员工姓名"
                        rules={[
                        {
                            required: true,
                            message: '请输入员工姓名!' 
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='dep_id'
                        label="所属部门"
                        rules={[
                        {
                            required: true,
                            message: '请选择所属部门!' 
                        },
                        ]}
                    >
                        <Select style={{ width: 120 }} onChange={this.handleChange}>
                            {this.state.depList.map(item => {
                                return <Option value={item.dep_id}>{item.dep_name}</Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='position_id'
                        label="职位名称"
                        rules={[
                        {
                            required: true,
                            message: '请选择职位名称!' 
                        },
                        ]}
                    >
                        <Select style={{ width: 120 }} onChange={this.handleChange}>
                            {this.state.posNameList.map(item => {
                                return <Option value={item.position_id}>{item.position_name}</Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='emp_sex'
                        label="员工性别"
                        rules={[
                        {
                            required: true,
                            message: '请选择员工性别!' 
                        },
                        ]}
                    >
                        <Select style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value="0">男</Option>
                            <Option value="1">女</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='emp_cardid'
                        label="员工身份证号"
                        rules={[
                        {
                            required: true,
                            message:'请输入员工身份证号'
                        },{ 
                            pattern:/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                            message:'请输入有效身份证号'
                        }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='emp_phone'
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
                        name='emp_qq'
                        label="员工QQ"
                        rules={[
                        {
                            required: true,
                            message:'请输入员工QQ'
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='emp_addr'
                        label="员工家庭地址"
                        rules={[
                        {
                            required: true,
                            message:'请输入员工家庭地址'
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='emp_birth'
                        label="出生日期"
                    >
                        <DatePicker disabledDate={this.disabledDate} />
                    </Form.Item>
                    <Form.Item
                        name='emp_entry_time'    
                        label="入职日期"
                    >
                        <DatePicker />
                    </Form.Item>
                    {this.props.location.params.row ? null : PassDiv}
                    {this.props.location.params.row ? null : rePassDiv}
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

export default AddEmp
