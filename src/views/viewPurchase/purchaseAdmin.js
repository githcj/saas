import React from 'react';
import '../../assets/css/purchase.css'
import { DatePicker, Select,Table} from 'antd'

import {
    SearchOutlined,
    SyncOutlined,
    UpOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons';

const columns = [
    {
        title: '编号',
        dataIndex: 'serialNum',
        key: 'serialNum',
        align:'center'
    },
    {
        title: '创建日期',
        dataIndex: 'data',
        key: 'data',
        align:'center'
    },
    {
        title: '供货厂商',
        dataIndex: 'gongHuo',
        key: 'gongHuo',
        align:'center'
    },
    {
        title: '总金额',
        dataIndex: 'SumMoney',
        key: 'SumMoney',
        align:'center'
    },
    {
        title: '需用日期',
        dataIndex: 'needData',
        key: 'needData',
        align:'center'
    },
    {
        title: '创建人',
        dataIndex: 'person',
        key: 'person',
        align:'center'
    },
    {
        title: '审批人',
        dataIndex: 'shenpiRen',
        key: 'shenpiRen',
        align:'center'
    },
    {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        align:'center'
    },
    {
        title: '审批操作',
        dataIndex: 'doesA',
        key: 'doesA',
        align:'center',
        render: (text, record, index)=> {
            console.log(text,record,index)
            if(record.state === '待审批') {
                return <span>审批</span>
            } else if(record.state === '已入库') {
                return null
            }
        }
    },
    {
        title: '操作',
        dataIndex: 'does',
        key: 'does',
        align:'center',
        render:(text,record,index)=>{
            console.log(text,record,index)
            if(record.state === '待审批'){
                return <p>
                    <span>编辑</span>
                    <span>预览</span>
                    <span>删除</span>
                </p>
            }else if(record.state === '已入库'){
                return <p>
                    <span>预览</span>
                    <span>删除</span>
                </p>
            }
        }
    },
];

const data =[];
for(var i=0;i<50;i++){
    data.push({
        key: i,
        serialNum: 10001,
        data:'2017-09-08 12:12',
        gongHuo: 'A供应厂商',
        needData: '2017-12-26 13:14',
        person: 'A员工',
        shenpiRen:'B员工',
        state: Math.random() > 0.5 ? '待审批' : '已入库',
        doesA:'',
        does:''
    })
}

function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
}
function onOk(value) {
    console.log('onOk: ', value);
}
function handleChange(value) {
    console.log(`selected ${value}`);
}
const { RangePicker } = DatePicker;
const { Option } = Select;
const Admin = (props) => {
    return (
        <div className="admin">
            <div className='purchase-firtop'>
                <div className='dynamic-top-left'>
                    <div className='dynamic-top-left-mark'></div>
                    <p className='dynamic-top-word'>采购管理</p>
                </div>
                <div className='dynamic-top-right'>
                    <SyncOutlined />
                    <p className='dynamic-top-word'>刷新</p>
                </div>
            </div>
            <div className="purchase-search">
                <div className="purchase-top">
                    <div className="purchase-top-se1">
                        <SearchOutlined />
                        <p className='purchase-p'>筛选查询</p>
                    </div>
                    <div className="purchase-top-se2">
                        <div className="purchase-top-se1">
                            <UpOutlined />
                            <p className='purchase-p'>收起筛选</p>
                        </div>
                        <div className="purchase-result">
                            <p className='purchase-p'>查询结果</p>
                        </div>
                    </div>
                </div>
                <div className="purchase-middle">
                    <div className="purchase-middle-se1">
                        <p className="purchase-middle-se1-p">创建日期：</p>
                        <RangePicker
                            showTime={{ format: 'HH:mm' }}
                            format="YYYY-MM-DD HH:mm"
                            onChange={onChange}
                            onOk={onOk}
                        />
                    </div>
                    <div className="purchase-middle-se2">
                        <p className="purchase-middle-se1-p">供货厂商：</p>
                        <Select defaultValue="lucy" style={{ width: 130 }} onChange={handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yim">yim</Option>
                        </Select>
                    </div>
                    <div className="purchase-middle-se2">
                        <p className="purchase-middle-se1-p">采购状态：</p>
                        <Select defaultValue="待审批" style={{ width: 130 }} onChange={handleChange}>
                            <Option value="will">待审批</Option>
                            <Option value="no">不通过</Option>
                            <Option value="yes">已通过</Option>
                            <Option value="ku">已入库</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="purchase-table">
                <div className="purchase-table-top">
                    <div className="purchase-table-se1">
                        <UnorderedListOutlined />
                        <p className="purchase-middle-se1-p">数据列表</p>
                    </div>
                    <div className="purchase-table-se2">
                        <span className="sp an">添加</span>
                        <span className="sp">导出</span>
                        <Select defaultValue="显示条数" style={{ width: 120 }} onChange={handleChange}>
                            <Option value="15">15</Option>
                            <Option value="20">20</Option>
                        </Select>
                        <Select defaultValue="排序方式" className="seen" style={{ width: 120 }} onChange={handleChange}>
                            <Option value="15">编号递增</Option>
                            <Option value="20">编号递减</Option>
                        </Select>
                    </div>
                </div>
                <Table 
                rowSelection={{type:'Checkbox'}}
                columns={columns} dataSource={data}
                bordered>
                </Table>
            </div>
        </div>
    )
}

export default Admin