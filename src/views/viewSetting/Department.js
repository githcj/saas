import React, { Component } from 'react'
import { Table, Select , Switch, message } from 'antd'
import ConTitle from '../../components/ConTitle'
import { UnorderedListOutlined } from '@ant-design/icons'
import '../../assets/css/viewSetting/Department.css'
import axios from '../../plugins/axios'
import Item from 'antd/lib/list/Item'

const { Option } = Select

// const 

  

export default class Department extends Component{
    constructor(props){
        super(props)
        this.state = {
            departList:[],
            eachPage:10
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
          render: (text,row,index) => <a style={{color: '#08b990'}} >{text}</a>,
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
            width:'200px',
            key:'toDo',
            render: (text,row) => (<div></div>)
        }
      ];

    changeStatus = async (row)=>{
        const {departList} = this.state
        let newList = departList.map((item) =>{
            if(item.dep_id === row.dep_id){
                console.log(item);
                if(row.dep_status){
                    item.dep_status = 0
                }else {
                    item.dep_status = 1
                }
            }
            return item
        })
        console.log(newList);
        let status
        if(row.dep_status){
            status = 0
        }else {
            status = 1
        }
        console.log(row.dep_id,status);
        
        const {data:res} = await axios.post('/isActiveDep',{dep_id:row.dep_id,dep_status:status})
        if(res.code !== 200) return message.error('修改状态失败!')
        message.success('修改状态成功')
        this.setState({
            departList:newList
        })
    }
    // 组件加载完毕请求数据
    async componentDidMount() {
        const {data} = await axios.post('/depManagement')
        const {data:res} = data
        this.setState({
            departList:res
        })
        console.log(res);
    }

    toEmp = (rowData) =>{
        console.log(rowData);
    
    }

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
                        <div className="addDiv">添加</div>
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
            </div>
        )
    }
}