import React, { Component } from 'react'
import { Table, Select , Input , Switch, message ,DatePicker  } from 'antd'
import ConTitle from '../../components/ConTitle'
import { UnorderedListOutlined,SearchOutlined,UpOutlined,DownOutlined } from '@ant-design/icons'
import moment from 'moment'
import '../../assets/css/viewSetting/Department.css'
import axios from '../../plugins/axios'
import EmployeeModal from '../../components/EmployeeModal'
import DepartDelPop from '../../components/DepartDel'

const { Option } = Select;

  
export default class Employee extends Component{
    constructor(props){
        super(props)
        this.state = {
            empList:[],
            eachPage:10,
            title:'修改密码',
            emp_id:0,
            searchInfo:{},
            ModalVisible:false,
            depList:[]
        }
    }

    columns = [
        {
          title: '员工账号',
          dataIndex: 'emp_account',
          width:'120px',
          key:'emp_account'
        },{
          title: '姓名',
          dataIndex: 'emp_name',
          width:'150px',
          key:'emp_name'
        },{
          title: '手机号',
          dataIndex: 'emp_phone',
          key:'emp_phone',
        },{
            title: '所属部门',
            dataIndex:'dep_name',
            key:'dep_name',
        },{
            title: '职位',
            dataIndex:'position_name',
            key:'position_name',
        },{
            title: '最后登录',
            dataIndex:'emp_last_time',
            key:'emp_last_time',
        },{
            title: '是否启用',
            dataIndex:'emp_status',
            key:'emp_status',
            render: (text,row) => (<Switch checked={text ? true : false} onChange={()=>this.changeStatus(row)} />)
        },{
            title: '操作',
            width:'200px',
            key:'toDo',
            render: (text,row) => (<div className='toDo'>
            <a onClick={()=> this.showReModal(row.emp_id)}>重置密码</a>
            <a onClick={()=> this.toEdit(row)}>编辑</a>
            <DepartDelPop confirm={()=>this.confirm(row.emp_id)} cancel={this.cancel} /></div>)
        }
      ];
    
    // 组件加载完毕请求数据
    async componentDidMount() {
        let emp_id = this.props.location.params
        const { searchInfo } = this.state
        searchInfo.emp_id = emp_id
        this.setState({
            searchInfo
        })
        const {data} = await axios.post('/employee/queEmp',this.state.searchInfo)
        const {data:res} = data
        const {data:depData} = await axios.post('/gettingdep')
        console.log(res);
        
        res.map(item =>{
            item.emp_birth = moment(item.emp_birth).format('YYYY-MM-DD')
            item.emp_last_time = moment(item.emp_last_time).format('YYYY-MM-DD')
            item.emp_entry_time = moment(item.emp_entry_time).format('YYYY-MM-DD')
            return item
        })
        this.setState({
            empList:res,
            depList:depData.data,
        })
        console.log(this.state.empList);
        
    }

    // 分页
    pageNumChange = (value) => {
        this.setState({
            eachPage:value
        })
    }

    //排序
    sortChange = (value) => {
        const newList = [...this.state.empList]
        switch (value) {
            case 'addName':
                newList.sort(
                    function compareFunction(param1, param2) {
                        return param1.emp_name.localeCompare(param2.emp_name,"zh");
                    }
                )
            break;
            case 'eddName':
                newList.sort(
                    function compareFunction(param1, param2) {
                        return param2.emp_name.localeCompare(param1.emp_name,"zh");
                    }
                )
            break;
        }

        this.setState({
            empList: newList
        })
    }

    toEdit(row) {
        row.emp_birth = moment(row.emp_birth,'YYYY-MM-DD')
        row.emp_entry_time = moment(row.emp_entry_time,'YYYY-MM-DD')
        this.props.history.push({
            pathname:'/home/system/AddEmp',
            params: {title:"编辑员工信息",row} //参数在this.props.location.params中
        })
    }

    // 修改员工状态
    changeStatus = async (row)=>{
        const {empList} = this.state
        let status
        empList.map((item) =>{
            if(item.emp_id === row.emp_id){
                if(row.emp_status){
                    status = 0
                }else {
                    status = 1
                }
            }
            return item
        })
        console.log(status);
        
        const {data:res} = await axios.post('/employee/isActiveEmp',{emp_id:row.emp_id,emp_status:status})
        if(res.code !== 200) return message.error('修改状态失败!')
        message.success('修改状态成功')
        this.componentDidMount()
    }

    //重置密码
    showReModal = (id) =>{
        this.setState({
            ModalVisible:true,
            emp_id:id
        })
    }
    // 表单提交

    resetPass = async (value,form) => {
        console.log(value);
        let params = {}
        params.emp_id = this.state.emp_id
        params.emp_password = value.emp_password
        console.log(params);
        
        const {data:res}  = await axios.post('/employee/resetPassword',params)
        if(res.code !== 200) return message.error('重置密码失败!')
        message.success('重置密码成功!')
        this.componentDidMount()
        form.resetFields()
        this.setState({
            ModalVisible:false
        })
    }

    //取消编辑
    handleCancel = async(form) => {
        form.resetFields();
        message.info('取消编辑')
        this.setState({
            ModalVisible:false
        })
    };

    // 删除
    confirm = async(id,e) => {
        const {data:res} = await axios.post('/employee/delEmp',{emp_id:id})
        if(res.code !== 200) return message.error('删除失败!')
        message.success('删除成功!')
        this.componentDidMount()
    }

    cancel = () => {
        message.info('取消删除!');
    }

    render(){
        return (
            <div className="stockOut">
                <header>
                    <div className="stockout-top">
                        <ConTitle titleName='员工管理' />
                    </div>
                </header>

                <section>
                    <div className="screen">
                        <div className="left">
                            <SearchOutlined />
                            <span>筛选查询</span>
                        </div>
                        <div className="right">
                            <div>
                                <DownOutlined />
                                <UpOutlined />
                                <span>收起筛选</span>
                            </div>
                            <div className="searchResult">查询结果</div>
                        </div>
                    </div>
                    <div className="search">
                    <div>
                            输入搜索：
                            {/* <Input /> */}
                        </div>
                        <div>
                            所属部门：
                            <Select style={{ width: 160 }} onChange={this.handleChange}>
                                {this.state.depList.map(item => {
                                    return <Option value={item.dep_id}>{item.dep_name}</Option>
                                })}
                            </Select>
                        </div>
                    </div>
                </section>

                <div className='dynamic-dataList'>
                    <div className='dynamic-left-title'>
                        <UnorderedListOutlined style={{fontSize:'18px'}}/>
                        <span style={{fontSize:'14px'}}>数据列表</span>
                    </div>
                    <div className="purchase-table-se2">
                        <div className="addDiv" onClick={()=>this.props.history.push({
                            pathname:'/home/system/AddEmp',
                            params:{title:'添加员工'}
                        })}>添加</div>
                        <Select defaultValue="显示条数" style={{ width: 120 }} onChange={this.pageNumChange}>
                            <Option value="10">10条/页</Option>
                            <Option value="15">15条/页</Option>
                            <Option value="20">20条/页</Option>
                        </Select>
                        <Select defaultValue="排序方式" className="seen" style={{ width: 150 }} onChange={this.sortChange}>
                            <Option value="addName">员工姓名升序</Option>
                            <Option value="eddName">员工姓名降序</Option>
                        </Select>
                    </div>
                </div>

                <div className="table">
                    <Table 
                    dataSource={this.state.empList} 
                    columns={this.columns} 
                    bordered
                    rowKey={this.state.empList.emp_id}
                    pagination={{
                        showQuickJumper:true,
                        showTotal:(total) => {
                            return (
                                <p>共有{
                                    Math.ceil(total / this.state.eachPage)
                                }页/{total}条数据</p>
                            )
                        },
                        pageSize:this.state.eachPage
                    }}
                    />
                </div>

                <EmployeeModal
                    {...this.state}
                    onCreate={this.resetPass}
                    onCancel={this.handleCancel}
                />
            </div>
        )
    }
}
