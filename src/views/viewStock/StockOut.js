import React, { Component } from 'react'
import { Table, DatePicker, Select } from 'antd'
import { SyncOutlined, SearchOutlined, DownOutlined, UpOutlined, UnorderedListOutlined } from '@ant-design/icons'
import '../../assets/css/viewStock/stockout.css'

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
        title: '出库仓库',
        dataIndex: 'store',
    },
    {
        title:'业务员',
        dataIndex:'salesMan'
    },
    {
        title:'总金额',
        dataIndex:'total'
    },
    {
        title:'出库时间',
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
        dataIndex:'approveState'
    }
];

const data = [];
for (let i = 0; i < 46; i++) {
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
        state:'待审批',
        approveState:'审批'
    });
}
const { Option } = Select;


export default class StockOut extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="stockOut">
                <header>
                    <div className="stock-top">
                        <div className='stock-top-left'>
                            <div className='stock-top-left-mark'></div>
                            <p className='stock-top-word'>出库管理</p>
                        </div>
                        <div className='stock-top-right'>
                            <SyncOutlined />
                            <p className='stock-top-word'>刷新</p>
                        </div>
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
                            <DatePicker style={{ width: 160 }}/>
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
                                className="select">
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
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
                        rowSelection={{ type: 'Checkbox' }}
                        dataSource={data}
                        columns={columns}
                        bordered />
                </div>
            </div>
        )
    }
}