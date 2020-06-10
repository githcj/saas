import React from 'react'
import {CaretLeftOutlined } from '@ant-design/icons';
import '../../assets/css/purchase.css'
import { Table } from 'antd'


const columns = [
    {
        title: '序号',
        dataIndex: 'serialNum',
        key: 'serialNum',
        align:'center'
    },
    {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        align:'center'
    },
    {
        title: '单位/大单位',
        dataIndex: 'bigDan',
        key: 'bigDan',
        align:'center'
    },
    {
        title: '数量',
        dataIndex: 'Num1',
        key: 'Num1',
        align:'center'
    },
    {
        title: '小单位/价格',
        dataIndex: 'smallPrice',
        key: 'smallPrice',
        align:'center'
    },
    {
        title: '数量',
        dataIndex: 'Num2',
        key: 'Num2',
        align:'center'
    },
    {
        title: '金额',
        dataIndex: 'SumPrice',
        key: 'SumPrice',
        align:'center'
    }
];

const data =[];
for(var i=0;i<52;i++){
    data.push({
        key: i,
        serialNum: 10001,
        name:'2017-09-08 12:12',
        bigDan: 'A供应厂商',
        Num1: '2017-12-26 13:14',
        smallPrice: 'A员工',
        Num2:'B员工',
        SumPrice:'待审批'
    })
}


const Admin = (props) => {
    return (
        <div className="detail">
            <div className="admin">
                <div className='purchase-firtop'>
                    <div className='dynamic-top-left'>
                        <div className='dynamic-top-left-mark'></div>
                        <p className='dynamic-top-word'>采购预览—待审批</p>
                    </div>
                    <div className='dynamic-top-right'>
                        <CaretLeftOutlined />
                        <p className='dynamic-top-word'>返回</p>
                    </div>
                </div>
            </div>
            <div className="detail-middle">
                <div className="detail-middle-se1">
                    <p className="detail-middle-se1p">基本信息</p>
                    <p>单号：<span style={{ color: 'red' }}>25151541315316</span></p>
                </div>
                <div className="detail-middle-se2">
                    <p>供货厂商：<span>A供货商</span></p>
                    <p>付款类型：<span>货到付款</span></p>
                    <p>审批人：<span>员工A</span></p>
                    <p>采购日期：<span>2017-02-26</span></p>
                </div>
            </div>
            <div className="detail-middle">
                <div className="detail-middle-se1">
                    <p className="detail-middle-se1p">
                        审批状态：
                        <span style={{ color: 'red' }}>待审批</span>
                    </p>
                </div>
                <div className="detail-middle-se22">
                    <p>审批意见：<span>无</span></p>
                </div>
            </div>
            <div className="detail-middle">
                <div className="detail-middle-se1">
                    <p className="detail-middle-se1p">商品明细</p>
                </div>
                <div className="detail-middle-se1T">
                    <Table
                        rowSelection={{ type: 'Checkbox' }}
                        columns={columns}
                        dataSource={data}
                        bordered>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Admin