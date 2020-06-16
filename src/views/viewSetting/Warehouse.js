import React, { Component } from 'react'
import { Table, Select , Input , Switch, message  } from 'antd'
import ConTitle from '../../components/ConTitle'
import { UnorderedListOutlined,SearchOutlined,UpOutlined,DownOutlined } from '@ant-design/icons'
import '../../assets/css/viewSetting/Department.css'
import axios from '../../plugins/axios'
import DepartDelPop from '../../components/DepartDel'

const { Option } = Select;

  
export default class Warehouse extends Component{
    constructor(props){
        super(props)
        this.state = {
            warehouseList:[],
            empList:[],
            eachPage:10,
            // emp_id:0,
            searchInfo:{
                ware_name:null,
                emp_id:null,
            },
            isSearch:true,
        }
    }

    columns = [
        {
          title: '仓库名称',
          dataIndex: 'ware_name',
          width:'120px',
          key:'ware_name'
        },{
          title: '仓库类型',
          dataIndex: 'waretype_name',
          width:'150px',
          key:'ware_type'
        },{
          title: '仓库地址',
          dataIndex: 'ware_addr',
          key:'ware_addr',
        },{
            title: '负责人',
            dataIndex:'emp_name',
            key:'emp_name',
        },{
            title: '联系电话',
            dataIndex:'emp_phone',
            key:'emp_phone',
        },{
            title: '跟车司机',
            dataIndex:'driver_name',
            key:'driver_name',
        },{
            title: '是否启用',
            dataIndex:'ware_status',
            key:'ware_status',
            render: (text,row) => (<Switch checked={text ? true : false} onChange={()=>this.changeStatus(row)} />)
        },{
            title: '操作',
            width:'200px',
            key:'toDo',
            render: (text,row) => (<div className='toDo'>
            <a onClick={()=> this.toEdit(row)}>编辑</a>
            <DepartDelPop confirm={()=>this.confirm(row.emp_id)} cancel={this.cancel} /></div>)
        }
      ];
    
    // 组件加载完毕请求数据
    async componentDidMount() {
        const {data} = await axios.post('/warehouse/querywarehousebycondition',this.state.searchInfo)
        console.log(data);
        const {data:res} = data
        const {data:empData} = await axios.post('/employee/gettingemployee')//雇员列表请求
        console.log(res);

        await this.setState({
            warehouseList:res,
            empList:empData.data
        })
        message.success('获取数据成功')
        console.log(this.state.warehouseList);
        
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
            warehouseList: newList
        })
    }

    // 修改仓库状态
    changeStatus = async (row)=>{
        const {warehouseList} = this.state
        let status
        warehouseList.map((item) =>{
            if(item.ware_id === row.ware_id){
                if(row.ware_status){
                    status = 0
                }else {
                    status = 1
                }
            }
            return item
        })
        console.log(status);
        
        const {data:res} = await axios.post('/warehouse/startstopwarehouse',{ware_id:row.ware_id,ware_status:status})
        if(res.code !== 200) return message.error('修改状态失败!')
        message.success('修改状态成功')
        this.componentDidMount()
    }

    // 搜索状态
    changeIsSearch = () => {
        let isSearch = this.state.isSearch
        this.setState({
            isSearch: !isSearch
        })
    }

    // 搜索
    async toSearch(e) {
        console.log(e.keyCode);
        
        if(e.keyCode == 13) {
            console.log('?');
            
            if(e.target.value.trim()){
                let searchInfo = this.state.searchInfo
                searchInfo.ware_name = e.target.value.trim()
                this.setState({
                    searchInfo
                })
                console.log('请求');
                
                this.componentDidMount()
            }
        }
    }

    searching = () => {
        this.componentDidMount()
    }
    //部门改变
    empChange = (value)=>{
        let searchInfo = this.state.searchInfo
        searchInfo.emp_id = value
        this.setState({
            searchInfo
        })
        console.log(value,this.state.searchInfo);
        
    }

    // 删除
    confirm = async(id,e) => {
        const {data:res} = await axios.post('/warehouse/deletewarehouse',{ware_id:id})
        if(res.code !== 200) return message.error('删除失败!')
        message.success('删除成功!')
        this.componentDidMount()
    }

    cancel = () => {
        message.info('取消删除!');
    }
    // 编辑
    toEdit(row) { 
        this.props.history.push({
            pathname:'/home/system/AddWare',
            params: {title:"编辑仓库信息",row} //参数在this.props.location.params中
        })
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
                            <div style={{cursor:'pointer'}} onClick={this.changeIsSearch}>
                                {this.state.isSearch ? <UpOutlined /> : <DownOutlined />}
                                {this.state.isSearch ? <span>收起筛选</span> : <span>展开筛选</span>}
                            </div>
                            <div className="searchResult" onClick={this.searching} style={{cursor:'pointer'}}>查询结果</div>
                        </div>
                    </div>
                    <div className="search" style={this.state.isSearch ? {display:'flex'}:{display:'none'}}>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <span style={{display:'inline-block',width:'100px'}}>输入搜索：</span>
                            <Input allowClear onKeyDown={(e)=>this.toSearch(e)}/>
                        </div>
                        <div>
                            负责人员：
                            <Select style={{ width: 160 }} onChange={this.empChange}>
                                {this.state.empList.map(item => {
                                    return <Option value={item.emp_id}>{item.emp_name}</Option>
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
                            pathname:'/home/system/AddWare',
                            params:{title:'添加仓库'}
                        })}>添加</div>
                        <Select defaultValue="显示条数" style={{ width: 120 }} onChange={this.pageNumChange}>
                            <Option value="10">10条/页</Option>
                            <Option value="15">15条/页</Option>
                            <Option value="20">20条/页</Option>
                        </Select>
                        <Select defaultValue="排序方式" className="seen" style={{ width: 150 }} onChange={this.sortChange}>
                            <Option value="addName">仓库名升序</Option>
                            <Option value="eddName">仓库名降序</Option>
                        </Select>
                    </div>
                </div>

                <div className="table">
                    <Table 
                    dataSource={this.state.warehouseList} 
                    columns={this.columns} 
                    bordered
                    rowKey={this.state.warehouseList.ware_id}
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
