import React, { Component } from 'react'
import { Table, DatePicker, Select } from 'antd'
import { SyncOutlined, SearchOutlined,  UpOutlined, UnorderedListOutlined } from '@ant-design/icons'
import '../../assets/css/viewStock/stock.css'

const columns = [
    {
        title: '编号',
        dataIndex: 'id',
    },
    {
        title: '操作者',
        dataIndex: 'bulidDate',
    },
    {
        title: '操作日期',
        dataIndex: 'store',
    },
    {
        title:'ip地址',
        dataIndex:'salesMan'
    },
    {
        title:'操作记录',
        dataIndex:'total'
    },
];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        id: i,
        bulidDate: 'admin',
        store: '2020-06-06',
        salesMan:'172.2.1.2',
        total:'编辑会员账号',
    });
}
const { Option } = Select;


export default class Operation extends Component {
    constructor(props) {
      super(props)
      this.state={
        opeList:[]
      }
    }

    componentDidMount() {
        
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
                            操作人员：
                            <Select style={{ width: 160 }}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </div>
                        <div>
                            操作日期：
                            <DatePicker style={{ width: 160 }}/>
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
                                className="select">
                                <Option value="1">一周前</Option>
                                <Option value="2">一月前</Option>
                                <Option value="3">一年前</Option>
                            </Select>
                            </div>
                            <button type="button">确定</button>
                            <Select
                                defaultValue="显示条数"
                                style={{ width: 100 }}
                                className="select">
                                <Option value="5">5</Option>
                                <Option value="10">10</Option>
                                <Option value="20">20</Option>
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