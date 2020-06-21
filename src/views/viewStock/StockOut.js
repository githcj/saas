import React, { Component } from 'react'
import { Table, DatePicker, Select, Modal } from 'antd'
import { SyncOutlined, SearchOutlined, DownOutlined, UpOutlined, UnorderedListOutlined } from '@ant-design/icons'
import '../../assets/css/viewStock/stock.css'
import axios from '../../plugins/axios'
import ConTitle from '../../components/ConTitle'

export default class StockOut extends Component {
    constructor(props) {
        super(props)
        this.state = {
            outData:[],
            pagesize:10,
            visible:false,
            approveIdea:'',
            index:''
        }
    }
    toAddStockOut = () => {
        this.props.msg.push({
            pathname:'/home/Kucun/addstockout'
        })
    }
    todetail = (data) => {
        this.props.msg.push({
            pathname:'/home/Kucun/stockoutdetail',
            params:data
        })
    }
    // editHandle = (data) => {
    //     this.props.msg.push({
    //         pathname:'/home/kucun/addstockout',
    //         params:data
    //     })
    // }
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
    //出库管理
    componentDidMount(){
        axios({
            method:'POST',
            url:'/out/queryOutList',
        })
        .then(res => {
            console.log(res.data.data,'出库数据');
            
            const data = res.data.data
            data.map((item,index) => {
                item.key = index
                return data
            })
            this.setState({
                outData:data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    //删除出库单
    del = (data) => {
        axios({
            method:'POST',
            url:'/delOutbound',
            data:{
                out_id:data.out_id
            }
        })
        .then(res => {
            console.log(res.data.code)
            console.log(data)
            // const newData = [...this.state.outData]
            // newData.splice(data.key,1)
            // this.setState({
            //     outData:newData
            // })
        })
        .catch(err => {
            console.log(err)
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
    //出库审批
    agree = () => {
        axios({
            method:'POST',
            url:'/checkOutbound',
            data:{
                approval_opinion:this.state.approveIdea,
                isOk:true
            }
        })
        .then(res => {
            console.log(res.data.code)
            const newData = [...this.state.outData]
            const i = this.state.index
            newData[i].out_status = '已通过'
            this.setState({
                outData:newData,
                visible:false
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    getDate = (e) => {
        console.log(e._d)
    }
    render() {
        const columns = [
            {
                title: '编号',
                dataIndex: 'out_id',
            },
            {
                title: '创建日期',
                dataIndex: 'create_time',
            },
            {
                title: '出库仓库',
                dataIndex: 'ware_name',
            },
            {
                title:'业务员',
                dataIndex:'salesman'
            },
            {
                title:'总金额',
                dataIndex:'total_price'
            },
            {
                title:'出库时间',
                dataIndex:'out_time'
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
                render: (text, record)=> {
                    if(record.out_status === '待审批') {
                        return <span style={{color:'rgb(26, 188, 156)',cursor:'pointer'}} onClick={() => this.approve(record.key)}>审批</span>
                    } else if(record.out_status === '已入库') {
                        return null
                    }
                }
            },{
                title:'操作',
                dataIndex:'handle',
                render:(text, record) => {
                    if(record.out_status === '待审批'){
                        return (
                            <p className="tableHandle">
                                {/* <span onClick={() => this.editHandle(record)}>编辑</span> */}
                                <span onClick={() => this.todetail(record)}>预览</span>
                                <span onClick={() => this.del(record)}>删除</span>
                            </p>
                        )
                    }else if(record.out_status === '已通过'){
                        return (
                            <p className="tableHandle">
                                <span onClick={() => this.todetail(record)}>预览</span>
                                <span onClick={() => this.del(record)}>删除</span>
                            </p>
                        )
                    }
                }
            }
        ]
        const {RangePicker} = DatePicker
        const { outData,visible,pagesize,approveIdea } = this.state
        return (
            <div className="stockOut">
                <header>
                    <ConTitle titleName='出库管理'/>
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
                            出库日期：
                            <DatePicker style={{ width: 160 }} onChange={this.getDate}/>
                        </div>
                        <div>
                            出库仓库：
                            <Select style={{ width: 160 }}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </div>
                        <div>
                            客户名称：
                            <Select style={{ width: 160 }}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </div>
                        <div>
                            审核状态：
                            <Select
                                defaultValue="全部"
                                style={{ width: 160 }}>
                                <Option>全部</Option>
                                <Option>待审批</Option>
                                <Option>已通过</Option>
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
                            <button type="button" className="add" onClick={this.toAddStockOut}>添加</button>
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
                        dataSource={outData}
                        columns={columns}
                        bordered
                        pagination={{
                            pageSize:pagesize,
                            showQuickJumper:true,
                            showTotal:(total) => {
                                return (
                                    <p>共有{Math.ceil(total / pagesize)}页/{total}条数据</p>
                                )
                            },
                        }}  />
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