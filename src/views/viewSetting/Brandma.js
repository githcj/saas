import React from 'react';
import '../../assets/css/purchase.css'
import '../../assets/css/brandma.css'
import '../../assets/css/dynamic/PersonDynamic.css'
import { DatePicker, Select } from 'antd'

import { Table, Tag, Space, Input } from 'antd';
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
        align:'center'
    },
    {
        title: '操作',
        dataIndex: 'does',
        key: 'does',
        align:'center'
    },
];

const data =[];
for(var i=0;i<50;i++){
    data.push({
        key: '1',
        serialNum: 10001,
        data:'2017-09-08 12:12',
        gongHuo: 'A供应厂商',
        needData: '2017-12-26 13:14',
        person: 'A员工',
        shenpiRen:'B员工',
        state:'待审批',
        doesA:'审批',
        does:'编辑 预览 删除'
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
const Brandma = (props) => {
    return (
        <div className="brandma">
			<div className='dynamic-top'>
				<div>
					<div className='dynamic-top-left'>
						<div className='dynamic-top-leftmark'></div>
						<p className='dynamic-top-word'>人员销售动态</p>
					</div>
					<div className='dynamic-top-right'>
						<SyncOutlined />
						<p className='dynamic-top-word'>刷新</p>
					</div>
				</div>
			</div>
            <div className="purchase-search">
                <div className="purchase-top">
                    <div className="purchase-top-se1">
                        <SearchOutlined />
                        <p className='brandma-p'>筛选查询</p>
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
                <div className="brandma-middle">
                    <div className="brandma-middle-se1">
                        <p className="brandma-middle-se1-p">创建日期：</p>
                        <Input placeholder="品牌名称/关键词" />
                    </div>
                </div>
            </div>
            <div className="purchase-table">
                <div className="purchase-table-top">
                    <div className="purchase-table-se1">
                        <UnorderedListOutlined />
                        <p className="brandma-p">数据列表</p>
                    </div>
                    <div className="purchase-table-se2">
                        <div className="addDiv">添加</div>
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
                rowSelection={{type:'checkbox'}}
                columns={columns} dataSource={data}
                bordered>
                </Table>
            </div>
        </div>
    )
}

export default Brandma