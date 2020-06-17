import React, { Component } from 'react'
import { Table, Select , Switch, message ,  } from 'antd'
import ConTitle from '../../components/ConTitle'
import { UnorderedListOutlined } from '@ant-design/icons'
import '../../assets/css/viewSetting/Department.css'
import axios from '../../plugins/axios'
import PositionModal from '../../components/PositionModal'
import DepartDelPop from '../../components/DepartDel'
import moment from 'moment'

const { Option } = Select

  
export default class Department extends Component{
    constructor(props){
        super(props)
        this.state = {
            positionList:[],
            eachPage:10,
            ModalVisible:false,
            rowInfo:{},
            title:'',
            finishFun:null,
        }
    }

    columns = [
        {
          title: '职位名称',
          dataIndex: 'position_name',
          key:'position_name'
        },
        {
          title: '职能描述',
          dataIndex: 'position_describe',
          key:'position_describe'
        },{
            title: '添加时间',
            dataIndex: 'position_addtime',
            key:'position_addtime'
        },{
            title: '是否启用',
            dataIndex:'position_status',
            key:'position_status',
            render: (text,row) => (<Switch checked={text ? true : false} onChange={()=>this.changeStatus(row)} />)
        },{
            title: '操作',
            key:'toDo',
            render: (text,row) => (<div className='toDo'>
            <a onClick={ () => this.props.history.push({
                pathname:'/home/system/Quanxian',
                params:row
            })}>权限设置</a>
            <a onClick={()=>this.showModel(row)}>编辑</a>
            <DepartDelPop confirm={(e)=>this.confirm(row.position_id,e)} cancel={this.cancel} /></div>)
        }
      ];
    
    // 组件加载完毕请求数据
    async componentDidMount() {
        // const {data} = await axios.post('/position/showposition')
        // const {data:res} = data
        // res.map (item =>{
        //     item.position_addtime = moment(item.position_addtime).format('YYYY-MM-DD HH:mm:ss')
        //     return item
        // })
        let res = [{position_id:1,position_name:'总经理',position_describe:'无',position_addtime:'2020-5-30 12:03:02',position_status:1}]
        this.setState({
            positionList:res
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
        const newList = [...this.state.positionList]
        switch (value) {
            case 'addName':
                newList.sort(
                    function compareFunction(param1, param2) {
                        return param1.position_name.localeCompare(param2.position_name,"zh");
                    }
                )
            break;
            case 'eddName':
                newList.sort(
                    function compareFunction(param1, param2) {
                        return param2.position_name.localeCompare(param1.position_name,"zh");
                    }
                )
            break;
        }

        this.setState({
            positionList: newList
        })
    }

    // 修改职位状态
    changeStatus = async (row)=>{
        const {positionList} = this.state
        let status
        positionList.map((item) =>{
            if(item.position_id === row.position_id){
                if(row.position_status){
                    status = 0
                }else {
                    status = 1
                }
            }
            return item
        })
        // console.log(row.position_id,status);
        
        const {data:res} = await axios.post('/position/updateposition',{position_id:row.position_id,position_status:status})
        if(res.code !== 200) return message.error('修改状态失败!')
        message.success('修改状态成功')
        this.componentDidMount()
    }


    // 编辑
    async showModel(row) {
        if(row !== undefined) {
            await this.setState({
                rowInfo:row,
                title:'编辑职位信息',
                finishFun:this.onFinish,
                ModalVisible: true,
            })
        }else {
            await this.setState({
                title:'添加职位',
                finishFun:this.onAdd,
                ModalVisible: true,
            })
        }
        
    }

    // 表单提交
    onFinish = async (value,form) => {
        value.position_id = this.state.rowInfo.position_id

        if(value.position_name !== this.state.rowInfo.position_name || value.position_describe !== this.state.rowInfo.position_describe){
            // console.log(value);
            const {data:res} = await axios.post('/position/updateposition',value)
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
        const {data:res}  = await axios.post('/position/addposition',value)
        if(res.code !== 200) return message.error('添加职位失败!')
        message.success('添加职位成功')
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
        const {data:res} = await axios.post('/position/delPosition',{position_id:id})
        if(res.code !== 200) return message.error('删除失败!')
        message.success('删除成功!')
        this.componentDidMount()
    }

    cancel = () => {
        message.info('取消删除!');
    }

    // toPower = (row) =>{
    //     console.log(this.props);
        

    // }

    render(){
        return (
            <div className="stockOut">
                <header>
                    <div className="stockout-top">
                        <ConTitle titleName='职位管理' />
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
                            <Option value="addName">职位名称升序</Option>
                            <Option value="eddName">职位名称降序</Option>
                        </Select>
                    </div>
                </div>

                <div className="table">
                    <Table 
                    dataSource={this.state.positionList} 
                    columns={this.columns} 
                    bordered
                    rowKey={this.state.positionList.position_id}
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

                <PositionModal
                    {...this.state}
                    onCreate={this.state.finishFun}
                    onCancel={this.handleCancel}
                />
            </div>
        )
    }
}
