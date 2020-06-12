import React from 'react'
import {CaretLeftOutlined } from '@ant-design/icons';
import '../../assets/css/viewStock/stockFail.css'
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
for(var i=0;i<20;i++){
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


const StockInDetail = (props) => {
    return (
        <div className="stockInFail">
            <header>
                <div className='purchase-firtop'>
                    <div className='dynamic-top-left'>
                        <div className='dynamic-top-left-mark'></div>
                        <p className='dynamic-top-word'>入库预览-待审批</p>
                    </div>
                    <div className='dynamic-top-right'>
                        <CaretLeftOutlined />
                        <p className='dynamic-top-word'>返回</p>
                    </div>
                </div>
            </header>
            <section>
                <div className="fail-info-title">
                    <p className="p1">基本信息</p>
                    <p className="p2">单号：<span style={{ color: 'red' }}>25151541315316</span></p>
                </div>
                <div className="fail-info-detail">
                    <p>进货仓库：<span>A仓库</span></p>
                    <p>供货厂商：<span>A厂商</span></p>
                    <p>创建日期：<span>2017-09-29</span></p>
                </div>
            </section>
            <section>
                <div className="fail-info-title">
                    <p className="p1">
                        审批状态：
                        <span style={{ color: 'red' }}>待审批</span>
                    </p>
                </div>
                <div className="fail-info-detail">
                    <p className="p1">审批意见：<span>无</span></p>
                </div>
            </section>
            <section>
                <div className="fail-info-title">
                    <p className="p1">商品明细</p>
                </div>
                <div>
                    <Table
                        id="table"
                        rowSelection={{ type: 'Checkbox' }}
                        columns={columns}
                        dataSource={data}
                        bordered>
                    </Table>
                    <div className="fail-total">
                            <div>
                                <span className="span-one">商品共：</span>
                                <span className="span-two">{data.length}</span>
                            </div>
                            <div>
                                <span className="span-one">金额合计：</span>
                                <span className="span-two">{9999.00}元</span>
                            </div>
                    </div>
                </div>
            </section>
            <footer>
                <div className="fail-payInfo">
                    <p>付款信息</p>
                </div>
                <div className="fail-payInfo-detail">
                    <div>
                        <p>
                            <span>付款类型：</span>
                            <span>现金</span>
                        </p>
                    </div>
                    <div className="fail-payment">
                        <p>
                            <span>预付款：</span>
                            <span className="span-two">9999.00元</span>
                        </p>
                        <p>
                            <span>实付金额：</span>
                            <span className="span-two">0.00元</span>
                        </p>
                        <p>
                            <span>优惠金额：</span>
                            <span className="span-two">0.00元</span>
                        </p>
                    </div>
                    <div>
                        <p>
                            <span>应付款金额：</span>
                            <span className="span-two">0.00元</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default StockInDetail