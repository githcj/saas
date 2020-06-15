import React, { Component } from 'react'
import '../../assets/css/viewStock/stockDetail.css'
import { Table } from 'antd'
import axios from '../../plugins/axios'
import ConTitle from '../../components/ConTitle'

export default class StockInDetail extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        axios({
            method:'POST',
            url:'/previewEnterWare',
            data:this.props.msg.params.godown_id
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }
    render(){
        const columns = [
            {
                title: '序号',
                dataIndex: 'serialNum'
            },
            {
                title: '商品名称',
                dataIndex: 'name'
            },
            {
                title: '单位/大单位',
                dataIndex: 'bigDan'
            },
            {
                title: '数量',
                dataIndex: 'Num1'
            },
            {
                title: '小单位/价格',
                dataIndex: 'smallPrice'
            },
            {
                title: '数量',
                dataIndex: 'Num2'
            },
            {
                title: '金额',
                dataIndex: 'SumPrice'
            }
        ]
        return (
            <div className="stockInDetail detail">
                <header>
                    <ConTitle titleName=""></ConTitle>
                </header> 
                <section>
                    <div className="detail-info-title">
                        <p className="p1">基本信息</p>
                        <p className="p2">单号：<span style={{ color: 'red' }}>{1234567890}</span></p>
                    </div>
                    <div className="detail-info-detail">
                        <p>进货仓库：<span>A仓库</span></p>
                        <p>供货厂商：<span>A厂商</span></p>
                        <p>创建日期：<span>2017-09-29</span></p>
                    </div>
                </section>
                <section>
                    <div className="detail-info-title">
                        <p className="p1">
                            审批状态：
                            <span style={{ color: 'red' }}>待审批</span>
                        </p>
                    </div>
                    <div className="detail-info-detail">
                        <p className="p1">审批意见：<span>无</span></p>
                    </div>
                </section>
                <section>
                    <div className="detail-info-title">
                        <p className="p1">商品明细</p>
                    </div>
                    <div>
                        <Table
                            id="table"
                            rowSelection={{ type: 'Checkbox' }}
                            columns={columns}
                            // dataSource={data}
                            bordered>
                        </Table>
                        <div className="detail-total">
                                <div>
                                    <span className="span-one">商品共：</span>
                                    <span className="span-two">{}</span>
                                </div>
                                <div>
                                    <span className="span-one">金额合计：</span>
                                    <span className="span-two">{9999.00}元</span>
                                </div>
                        </div>
                    </div>
                </section>
                <footer>
                    <div className="detail-payInfo">
                        <p>付款信息</p>
                    </div>
                    <div className="detail-payInfo-detail">
                        <div>
                            <p>
                                <span>付款类型：</span>
                                <span>现金</span>
                            </p>
                        </div>
                        <div className="detail-payment">
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
}