import React, { Component } from 'react'
import { Table, Select , Switch, message ,  } from 'antd'
import ConTitle from '../../components/ConTitle'
import { UnorderedListOutlined } from '@ant-design/icons'
import '../../assets/css/viewSetting/Department.css'
import axios from '../../plugins/axios'
import DepartModal from '../../components/DepartModal'
import DepartDelPop from '../../components/DepartDel'

const { Option } = Select

  
export default class Department extends Component{
    constructor(props){
        super(props)
        this.state = {
            departList:[],
            eachPage:10,
            ModalVisible:false,
            rowInfo:{},
            title:'',
            finishFun:null,
        }
    }

    columns = [
        {
          title: '部门名称',
          dataIndex: 'dep_name',
          width:'120px',
          key:'dep_name'
        },
        {
          title: '职能描述',
          dataIndex: 'dep_describe',
          width:'150px',
          key:'dep_describe'
        },
        {
          title: '员工数量',
          dataIndex: 'emp_num',
          key:'emp_num',
          render: (text,row,index) => <a style={{color: '#08b990'}} onClick={()=>this.toEmp(row.dep_id)}>{text}</a>,
        },{
            title: '添加时间',
            dataIndex: 'dep_addtime',
            width:'200px',
            key:'dep_addtime'
        },{
            title: '是否启用',
            dataIndex:'dep_status',
            key:'dep_status',
            render: (text,row) => (<Switch checked={text ? true : false} onChange={()=>this.changeStatus(row)} />)
        },{
            title: '操作',
            width:'150px',
            key:'toDo',
            render: (text,row) => (<div className='toDo'><a onClick={()=>this.showModel(row)}>编辑</a>
            <DepartDelPop confirm={(e)=>this.confirm(row.dep_id,e)} cancel={this.cancel} /></div>)
        }
      ];
    
    // 组件加载完毕请求数据
    async componentDidMount() {
        const {data} = await axios.post('/depManagement')
        const {data:res} = data
        this.setState({
            departList:res
        })
    }

    // 分页
    pageNumChange = (value) => {
        this.setState({
            eachPage:value
        })
    }

    //排序
    sortChange = (value) => {
        const newList = [...this.state.departList]
        switch (value) {
            case 'addName':
                newList.sort(
                    function compareFunction(param1, param2) {
                        return param1.dep_name.localeCompare(param2.dep_name,"zh");
                    }
                )
                break;
            case 'eddName':
                newList.sort(
                    function compareFunction(param1, param2) {
                        return param2.dep_name.localeCompare(param1.dep_name,"zh");
                    }
                )
                break;
            case 'addNum':
                newList.sort((param1, param2) =>{
                        return param1.emp_num - param2.emp_num
                    }  
                )
                break;
            case 'eddNum':
                newList.sort((param1, param2) =>{
                    return param2.emp_num - param1.emp_num
                }  
            )
            break;
        }

        this.setState({
            departList: newList
        })
    }

    // 修改部门状态
    changeStatus = async (row)=>{
        const {departList} = this.state
        let newList = departList.map((item) =>{
            if(item.dep_id === row.dep_id){
                if(row.dep_status){
                    item.dep_status = 0
                }else {
                    item.dep_status = 1
                }
            }
            return item
        })
        let status
        if(row.dep_status){
            status = 0
        }else {
            status = 1
        }
        
        const {data:res} = await axios.post('/isActiveDep',{dep_id:row.dep_id,dep_status:status})
        if(res.code !== 200) return message.error('修改状态失败!')
        message.success('修改状态成功')
        this.setState({
            departList:newList
        })
    }

    // saveFormRef = (formRef) => {
    //     this.formRef = formRef
    // }

    // 编辑
    async showModel(row) {
        if(row !== undefined) {
            await this.setState({
                rowInfo:row,
                title:'编辑部门信息',
                finishFun:this.onFinish,
                ModalVisible: true,
            })
        }else {
            await this.setState({
                title:'添加部门',
                finishFun:this.onAdd,
                ModalVisible: true,
            })
        }
        
    }

    // 表单提交
    onFinish = async (value,form) => {
        value.dep_id = this.state.rowInfo.dep_id

        if(value.dep_name !== this.state.rowInfo.dep_name || value.dep_describe !== this.state.rowInfo.dep_describe){
            // console.log(value);
            const {data:res} = await axios.post('/updDep',value)
            // console.log(res,'res');
            if(res.code !== 200) return message.error('修改信息失败')
            message.success('修改信息成功')
            this.componentDidMount()
            this.setState({
                rowInfo:{},
                ModalVisible:false
            })
            form.resetFields()
        }else{
            this.setState({
                rowInfo:{},
                ModalVisible:false
            })
            form.resetFields()
            return message.info('未修改信息')
        }
    };

    onAdd = async (value,form) => {
        console.log(value);
        const {data:res}  = await axios.post('/addDep',value)
        if(res.code !== 200) return message.error('添加部门失败!')
        message.success('添加部门成功')
        this.componentDidMount()
        form.resetFields()
        this.setState({
            ModalVisible:false
        })
    }

    //取消编辑
    handleCancel = async(form) => {
        // form.resetFields();
        await this.setState({
            rowInfo:{},
            ModalVisible:false,
        })
        form.resetFields();
        message.info('取消信息编辑')
        console.log(this.setState.rowInfo,'cancel');
        
    };

    // 删除
    confirm = async(id,e) => {
        const {data:res} = await axios.post('/delDep',{dep_id:id})
        if(res.code !== 200) return message.error('删除失败!')
        message.success('删除成功!')
        this.componentDidMount()
    }

    cancel = () => {
        message.info('取消删除!');
    }

    // 点击员工数量跳转
    toEmp = (id) => {
        // console.log(id,this.props,'props');
        this.props.history.push({
            pathname:'/home/system/Employee',
            params:id //参数在this.props.location.params中
        })
        
    }

    render(){
        return (
            <div className="stockOut">
                <header>
                    <div className="stockout-top">
                        <ConTitle titleName='部门管理' />
                    </div>
                </header>
                <div className='dynamic-dataList'>
                    <div className='dynamic-left-title'>
                        <UnorderedListOutlined style={{fontSize:'18px'}}/>
                        <span style={{fontSize:'14px'}}>数据列表</span>
                    </div>
                    <div className="purchase-table-se2">
                        <div className="addDiv" onClick={()=>this.showModel()}>添加</div>
                        <Select defaultValue="显示条数" style={{ width: 120 }} onChange={this.pageNumChange}>
                            <Option value="10">10条/页</Option>
                            <Option value="15">15条/页</Option>
                            <Option value="20">20条/页</Option>
                        </Select>
                        <Select defaultValue="排序方式" className="seen" style={{ width: 150 }} onChange={this.sortChange}>
                            <Option value="addName">部门名称升序</Option>
                            <Option value="eddName">部门名称降序</Option>
                            <Option value="addNum">员工数量升序</Option>
                            <Option value="eddNum">员工数量降序</Option>
                        </Select>
                    </div>
                </div>

                <div className="table">
                    <Table 
                    dataSource={this.state.departList} 
                    columns={this.columns} 
                    bordered
                    rowKey={this.state.departList.dep_id}
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

                <DepartModal
                    {...this.state}
                    onCreate={this.state.finishFun}
                    onCancel={this.handleCancel}
                />
            </div>
        )
    }
}
