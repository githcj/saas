import React, { Component } from 'react'
import { Table, Select , Switch, message ,  } from 'antd'
import ConTitle from '../../components/ConTitle'
import { UnorderedListOutlined } from '@ant-design/icons'
import '../../assets/css/viewSetting/Department.css'
import axios from '../../plugins/axios'
import UnitModal from '../../components/UnitModal'
import DepartDelPop from '../../components/DepartDel'
import moment from 'moment'

const { Option } = Select

  
export default class Department extends Component{
    constructor(props){
        super(props)
        this.state = {
            unitList:[],
            eachPage:10,
            ModalVisible:false,
            rowInfo:{},
            title:'',
            finishFun:null,
        }
    }

    columns = [
        {
          title: '单位名称',
          dataIndex: 'unit_name',
          key:'unit_name'
        },{
            title: '添加时间',
            dataIndex: 'unit_addtime',
            key:'unit_addtime'
        },{
            title: '是否启用',
            dataIndex:'unit_status',
            key:'unit_status',
            render: (text,row) => (<Switch checked={text ? true : false} onChange={()=>this.changeStatus(row)} />)
        },{
            title: '操作',
            key:'toDo',
            render: (text,row) => (<div className='toDo'><a onClick={()=>this.showModel(row)}>编辑</a>
            <DepartDelPop confirm={(e)=>this.confirm(row.dep_id,e)} cancel={this.cancel} /></div>)
        }
      ];
    
    // 组件加载完毕请求数据
    async componentDidMount() {
        const {data} = await axios.post('/unit/showunit')
        const {data:res} = data
        res.map (item =>{
            item.unit_addtime = moment(item.unit_addtime).format('YYYY-MM-DD HH:mm:ss')
            return item
        })
        this.setState({
            unitList:res
        })
        
        console.log(res);
    }

    // 分页
    pageNumChange = (value) => {
        this.setState({
            eachPage:value
        })
    }

    //排序
    sortChange = (value) => {
        const newList = [...this.state.unitList]
        switch (value) {
            case 'addName':
                newList.sort(
                    function compareFunction(param1, param2) {
                        return param1.unit_name.localeCompare(param2.unit_name,"zh");
                    }
                )
            break;
            case 'eddName':
                newList.sort(
                    function compareFunction(param1, param2) {
                        return param2.unit_name.localeCompare(param1.unit_name,"zh");
                    }
                )
            break;
        }

        this.setState({
            unitList: newList
        })
    }

    // 修改部门状态
    changeStatus = async (row)=>{
        const {unitList} = this.state
        let status
        unitList.map((item) =>{
            if(item.unit_id === row.unit_id){
                if(row.unit_status){
                    status = 0
                }else {
                    status = 1
                }
            }
            return item
        })
        // console.log(row.dep_id,status);
        
        const {data:res} = await axios.post('/unit/startstopunit',{dep_id:row.unit_id,unit_status:status})
        if(res.code !== 200) return message.error('修改状态失败!')
        message.success('修改状态成功')
        this.componentDidMount()
    }


    // 编辑
    async showModel(row) {
        if(row !== undefined) {
            await this.setState({
                rowInfo:row,
                title:'编辑单位信息',
                finishFun:this.onFinish,
                ModalVisible: true,
            })
        }else {
            await this.setState({
                title:'添加单位',
                finishFun:this.onAdd,
                ModalVisible: true,
            })
        }
        
    }

    // 表单提交
    onFinish = async (value,form) => {
        value.unit_id = this.state.rowInfo.unit_id

        if(value.unit_name !== this.state.rowInfo.unit_name || value.unit_type !== this.state.rowInfo.unit_type){
            console.log(value);
            const {data:res} = await axios.post('/unit/updateunit',value)
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
        const {data:res}  = await axios.post('/unit/addunit',value)
        if(res.code !== 200) return message.error('添加单位失败!')
        message.success('添加单位成功')
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
        const {data:res} = await axios.post('/unit/deleteunit',{unit_id:id})
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
                        <ConTitle titleName='计量单位管理' />
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
                            <Option value="addName">计量单位名称升序</Option>
                            <Option value="eddName">计量单位名称降序</Option>
                        </Select>
                    </div>
                </div>

                <div className="table">
                    <Table 
                    dataSource={this.state.unitList} 
                    columns={this.columns} 
                    bordered
                    rowKey={this.state.unitList.unit_id}
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

                <UnitModal
                    {...this.state}
                    onCreate={this.state.finishFun}
                    onCancel={this.handleCancel}
                />
            </div>
        )
    }
}
