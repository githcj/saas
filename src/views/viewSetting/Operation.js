import React, { Component } from 'react'
import { Table, DatePicker, Select, message } from 'antd'
import { SyncOutlined, SearchOutlined,  UpOutlined, UnorderedListOutlined, DownOutlined } from '@ant-design/icons'
import ConTitle from '../../components/ConTitle'
import moment from 'moment'
import '../../assets/css/viewStock/stock.css'
import axios from '../../plugins/axios'

const columns = [
    {
        title: '编号',
        dataIndex: 'log_id',
        key:1
    },
    {
        title: '操作者',
        dataIndex: 'emp_name',
        key:2
    },
    {
        title: '操作日期',
        width:'500px',
        dataIndex: 'log_time',
        key:3
    },
    {
        title:'ip地址',
        dataIndex:'log_ip',
        key:4
    },
    {
        title:'操作记录',
        dataIndex:'log_record',
        key:5
    },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
};

const { Option } = Select;


export default class Operation extends Component {
    constructor(props) {
      super(props)
      this.state={
        distrList:[],
        operaList:[],
        isSearch:true,
        searchInfo:{
            emp_id:null,
            log_time:null
        },
        log_time:'',
        eachPage:5,
      }
    }

    async componentDidMount() {
        // const {data:operaData} = await axios.post('/log/gettingOperator')
        const {data} = await axios.post('/log/querylogbycondition',this.state.searchInfo)
        const {data:res} = data
        console.log(res);

        res.map((item,index) => {
            item.key = item.log_id
            item.log_time = moment(item.log_time).format('YYYY-MM-DD HH:mm:ss')
            return item
        })

        await this.setState({
            distrList:res,
            // operaList:operaData.data,
        })
        console.log(this.state.operaList);
        
    }

    //操作人员改变
    operaChange = (value)=>{
        let searchInfo = this.state.searchInfo
        searchInfo.emp_id = value
        this.setState({
            searchInfo
        })
        console.log(value,this.state.searchInfo);
        
    }

    // 时间筛选改变
    dateChange = (value)=>{
        let time
        let {log_time} = this.state
        switch(value){
            case '1':
                time = moment().subtract('days', 7).format('YYYY-MM-DD HH:mm:ss');
            break;
            case '2':
                time = moment().subtract('month', 1).format('YYYY-MM-DD HH:mm:ss');
            break;
            case '3':
                time = moment().subtract('years', 1).format('YYYY-MM-DD HH:mm:ss');
            break;
        }
        log_time = time
        this.setState({
            log_time
        })
        console.log(value,time,this.state.log_time);
        
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

    disabledDate = (current) => {//日期范围
        return current > moment().endOf('day');
    }

    searchDateChange= (date,dateString)=>{
        const {searchInfo} = this.state
        searchInfo.log_time = dateString
        this.setState({
            searchInfo
        })
    }

     // 分页
    pageNumChange = (value) => {
        this.setState({
            eachPage:value
        })
    }

    delLogs = async() =>{
        console.log(this.state.log_time);
        
        const {data:res} = await axios.post('/log/deletelogbycondition',this.state.log_time)
        if(res.code !== 200 ) return message.error('删除日志失败!')
        this.setState({
            log_time:''
        })
        message.success('删除日志成功')
        this.componentDidMount()
    }
    

    


    render() {
        return (
            <div className="stockOut">
                <header>
                    <div className="stockout-top">
                        <ConTitle titleName='日志管理' />
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
                            操作人员：
                            <Select style={{ width: 160 }} onChange={this.operaChange}>
                                {this.state.operaList.map(item => {
                                    return <Option value={item.emp_id}>{item.emp_name}</Option>
                                })}
                            </Select>
                        </div>
                        <div>
                            操作日期：
                            <DatePicker disabledDate={this.disabledDate} onChange={this.searchDateChange} style={{ width: 160 }}/>
                        </div>
                    </div>
                </section>

                <div className="table">
                    <div className="dataList">
                        <div className="left">
                            <UnorderedListOutlined />
                            <span>数据列表</span>
                        </div>
                        <div className="right">
                          <div>
                            清除日志：
                            <Select
                                defaultValue="选择清除的日期"
                                style={{ width: 100 }}
                                className="select"
                                onChange={this.dateChange}>
                                <Option value="1">一周前</Option>
                                <Option value="2">一月前</Option>
                                <Option value="3">一年前</Option>
                            </Select>
                            </div>
                            <div className="searchResult" style={{padding:'4px 0'}} onclick={this.delLogs}>确认</div>
                            <Select
                                defaultValue="显示条数"
                                style={{ width: 100 }}
                                className="select" onChange={this.pageNumChange}>
                                <Option value="5">5条/页</Option>
                                <Option value="10">10条/页</Option>
                                <Option value="15">15条/页</Option>
                            </Select>
                        </div>
                    </div>
                        <Table
                            rowSelection={{
                                type: 'checkbox',
                                ...rowSelection,
                            }}
                            columns={columns}
                            dataSource={this.state.distrList}
                            pagination={{
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