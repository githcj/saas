import React, { Component } from 'react'
import { Table, DatePicker, Select } from 'antd'
import { SyncOutlined, SearchOutlined, DownOutlined, UpOutlined, UnorderedListOutlined } from '@ant-design/icons'
import '../../assets/css/viewStock/stock.css'
import { Link } from 'react-router-dom'

export default class StockIn extends Component{
    constructor(props){
        super(props)
        this.state = {
            pagesize:10
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
    render(){
        const columns = [
            {
                title: '编号',
                dataIndex: 'id',
            },
            {
                title: '创建日期',
                dataIndex: 'bulidDate',
            },
            {
                title: '供货厂商',
                dataIndex: 'store',
            },
            {
                title:'进货仓库',
                dataIndex:'salesMan'
            },
            {
                title:'总金额',
                dataIndex:'total'
            },
            {
                title:'入库时间',
                dataIndex:'deliveryTime'
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
                dataIndex:'state'
            },
            {
                title:'审批操作',
                dataIndex:'approveState', 
                render: (text, record, index)=> {
                    if(record.state === '待审批') {
                        return <span>审批</span>
                    } else if(record.state === '已入库') {
                        return null
                    }
                }
            },{
                title:'操作',
                dataIndex:'handle',
                render:(text,record,index) => {
                    if(record.state === '待审批'){
                        return (
                            <p 
                            style={{
                                display:'flex',
                                justifyContent:'space-evenly'
                            }}>
                                <span 
                                style={{
                                    color:'lightgreen'
                                }}>编辑</span>
                                <span>
                                    <Link to={this.props.msg + '/stockinfail'}>预览</Link>
                                </span>
                                <span
                                style={{
                                    color:'lightpink'
                                }}>删除</span>
                            </p>
                        )
                    }else if(record.state === '已通过'){
                        return (
                            <p
                            style={{
                                display:'flex',
                                justifyContent:'space-evenly'
                            }}>
                                <span>
                                    <Link to={this.props.msg + '/stockinpass'}>预览</Link>
                                </span>
                                <span
                                style={{
                                    color:'lightpink'
                                }}>删除</span>
                            </p>
                        )
                    }
                }
            }
        ];
        return (
            <div className="stockIn">
                <header>
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
                            <button type="button" className="add">添加</button>
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
                        dataSource={data}
                        columns={columns}
                        bordered
                        pagination={{
                            pageSize:this.state.pagesize,
                            showQuickJumper:true,
                            showTotal:(total) => {
                                return (
                                    <p>共有{Math.ceil(total / this.state.pagesize)}页/{total}条数据</p>
                                )
                            },
                        }} />
                </div>
            </div>
        )
    }
}


const data = [];
for (let i = 0; i < 20; i++) {
    data.push({
        key: i,
        id: i,
        bulidDate: '2020-01-03',
        store: 'A',
        salesMan:'A',
        total:'9999',
        deliveryTime:'2020-06-06',
        initiator:"A",
        approver:'B',
        state:Math.random() > 0.5 ? '待审批' : '已通过',
        approveState:''
    });
}
const { Option } = Select;