import React, { Component } from 'react'
import { Table, DatePicker, Select, Modal } from 'antd'
import { SyncOutlined, SearchOutlined, DownOutlined, UpOutlined, UnorderedListOutlined } from '@ant-design/icons'
import '../../assets/css/viewStock/stock.css'
import axios from '../../plugins/axios'
import ConTitle from '../../components/ConTitle'

export default class StockIn extends Component{
    constructor(props){
        super(props)
        this.state = {
            indata:[],
            pagesize:10,
            visible:false,
            approveIdea:'',
            index:''
        }
    }
    pagesizeChange = (value) => {
        if(value === '10'){
            this.setState({
                pagesize:10
            })
        }else if(value === '20'){
            this.setState({
                pagesize:20
            })
        }else if(value === '30'){
            this.setState({
                pagesize:30
            })
        }
    }
    //入库管理
    componentDidMount(){
        axios({
            method:'POST',
            url:'/enterwareManagement'
        })
        .then(res => {
            console.log(res.data)
            const data = res.data.data
            data.map((item,index) => {
                item.key = index
                return data
            })
            this.setState({
                indata:data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    toAddStockIn = () => {
        this.props.msg.push({
            pathname:'/home/Kucun/addstockin'
        })
    }
    todetail = (data) => {
        this.props.msg.push({
            pathname:'/home/Kucun/stockindetail',
            params:data
        })
    }
    approve = (i) => {
        this.setState({
            visible:true,
            index:i
        })
    }
    getIdea = (e) => {
        this.setState({
            approveIdea:e.target.value
        })
        console.log(e.target.value)
    }
    hideModal = () => {
        this.setState({
            visible:false
        })
    }
    //审批
    agree = () => {
        axios({
            method:'POST',
            url:'/checkEnterWare',
            data:{
                approval_opinion:this.state.approveIdea,
                isOk:true
            }
        })
        .then(res => {
            console.log(this.state.indata)
            console.log(res.data.code)
            const newData = [...this.state.indata]
            const i = this.state.index
            newData[i].out_status = '已通过'
            this.setState({
                indata:newData,
                visible:false
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    render(){
        const columns = [
            {
                title: '编号',
                dataIndex: 'godown_id',
            },
            {
                title: '创建日期',
                dataIndex: 'create_time',
            },
            {
                title: '供货厂商',
                dataIndex: 'supplier_name',
            },
            {
                title:'进货仓库',
                dataIndex:'ware_name'
            },
            {
                title:'总金额',
                dataIndex:'total_price'
            },
            {
                title:'入库时间',
                dataIndex:'entry_time'
            },
            {
                title:'发起人',
                dataIndex:'initiator'
            },
            {
                title:'审批人',
                dataIndex:'approver'
            },
            {
                title:'状态',
                dataIndex:'out_status',
                render:(text) => {
                    if(text === '已通过'){
                        return <span
                        style={{
                            color:'rgb(51, 153, 255)'
                        }}>{text}</span>
                    }
                    return <span>{text}</span>
                }
            },
            {
                title:'审批操作',
                dataIndex:'approveState', 
                render: (text, record, index)=> {
                    if(record.out_status === '待审批') {
                        return <span 
                        style={{color:'rgb(26, 188, 156)',cursor:'pointer'}}
                        onClick={() => this.approve(record.key)}>审批</span>
                    } else if(record.out_status === '已入库') {
                        return null
                    }
                }
            },{
                title:'操作',
                dataIndex:'handle',
                render:(text,record,index) => {
                    if(record.out_status === '待审批'){
                        return (
                            <p className="tableHandle">
                                {/* <span>编辑</span> */}
                                <span onClick={() => this.todetail(record)}>预览</span>
                                <span>删除</span>
                            </p>
                        )
                    }else if(record.out_status === '已通过'){
                        return (
                            <p className="tableHandle">
                                <span onClick={() => this.todetail(record)}>预览</span>
                                <span>删除</span>
                            </p>
                        )
                    }
                }
            }
        ]
        const { indata,pagesize,visible,approveIdea } = this.state
        return (
            <div className="stockIn">
                <header>
                    <ConTitle titleName="入库管理"></ConTitle>
                </header>

                <section>
                    <div className="screen">
                        <div className="left">
                            <SearchOutlined />
                            <span>筛选查询</span>
                        </div>
                        <div className="right">
                            <div>
                                {/* <DownOutlined /> */}
                                <UpOutlined />
                                <span>收起筛选</span>
                            </div>
                            <div className="searchResult">查询结果</div>
                        </div>
                    </div>
                    <div className="search">
                        <div>
                            入库日期：
                            <DatePicker style={{ width: 160 }}/>
                        </div>
                        <div>
                            供货厂商：
                            <Select 
                            defaultValue="供货厂商"
                            style={{ width: 160 }}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </div>
                        <div>
                            进货仓库：
                            <Select 
                            defaultValue="全部"
                            style={{ width: 160 }}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </div>
                        <div>
                            审核状态：
                            <Select
                                defaultValue="全部"
                                style={{ width: 160 }}>
                                <Option value="1">全部</Option>
                                <Option value="2">待审批</Option>
                                <Option value="3">已通过</Option>
                            </Select>
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
                            <button type="button" className="add" onClick={this.toAddStockIn}>添加</button>
                            <button type="button">导出</button>
                            <Select
                                defaultValue="显示条数"
                                style={{ width: 100 }}
                                className="select"
                                onChange={this.pagesizeChange}>
                                <Option value="10">10</Option>
                                <Option value="20">20</Option>
                                <Option value="30">30</Option>
                            </Select>
                            <Select
                                defaultValue="排序方式"
                                style={{ width: 100 }}
                                className="select">
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                            </Select>
                        </div>
                    </div>
                    <Table
                        id="table"
                        rowSelection={{ type: 'Checkbox' }}
                        dataSource={indata}
                        columns={columns}
                        bordered
                        pagination={{
                            pageSize:pagesize,
                            showQuickJumper:true,
                            showTotal:(total) => {
                                return (
                                    <p>共有{Math.ceil(total / this.state.pagesize)}页/{total}条数据</p>
                                )
                            },
                        }} />
                </div>

                <Modal
                visible={visible}
                title='审批意见'
                okText='同意'
                cancelText='取消'
                onOk={this.agree}
                onCancel={this.hideModal}>
                    <div>
                        <label>审批意见:</label>
                        <input type="text" onChange={this.getIdea} value={approveIdea}></input>
                    </div>
                </Modal>

            </div>
        )
    }
}

const { Option } = Select;