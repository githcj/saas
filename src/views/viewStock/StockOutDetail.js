import React, { Component } from 'react'
import ConTitle from '../../components/ConTitle'
import '../../assets/css/viewStock/stockDetail.css'
import { Table } from 'antd'
import axios from '../../plugins/axios'


export default class StockOutDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            tableData:'',
            infoData:''
        }
    }
    //预览出库单
    componentDidMount(){
        axios({
            method:'POST',
            url:'/preOutbound',
            data:this.props.msg.params.out_id
        })
        .then(res => {
            console.log(res.data)
            const tableData = res.data.data
            tableData.map((item,index) => {
                tableData[index].key = index
                return tableData
            })
            this.setState({
                tableData:tableData,
                infoData:res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    render(){
        const { tableData,infoData } = this.state
        const mydata = this.props.msg.params
        console.log(mydata)
        const columns = [
            {
                title: '序号',
                dataIndex: 'key',
                render:(text) => <span>{text + 1}</span>
            },
            {
                title: '商品名称',
                dataIndex: 'goods_name'
            },
            {
                title: '单位/大单位',
                dataIndex: 'bigDan',
                render:(text,record) =>{
                    return record.large_unit_price + '/' + record.large_unit
                }
            },
            {
                title: '数量',
                dataIndex: 'whole_num'
            },
            {
                title: '小单位/价格',
                dataIndex: 'smallPrice',
                render:(text,record) => {
                    return record.small_unit_price + '/' + record.small_unit
                }
            },
            {
                title: '数量',
                dataIndex: 'single_num'
            },
            {
                title: '金额',
                dataIndex: 'total_price'
            },{
                title:'生产日期',
                dataIndex:'production_time'
            }
        ]
        return (
            <div className="stockOutDetail detail">
                <header>
                    <ConTitle titleName={'出库预览-' + infoData.check_status}/>
                </header>
                <section>
                    <div className="detail-info-title">
                        <p className="p1">基本信息</p>
                        <p className="p2">单号：<span style={{ color: 'red' }}>{1234567890}</span></p>
                    </div>
                    <div className="detail-info-detail">
                        <p>客户名称：<span>{infoData.customer_name}</span></p>
                        <p>收款方式：<span>{infoData.collect_method}</span></p>
                        <p>业务员：<span>{infoData.salesman}</span></p>
                        <p>跟车配送员：<span>{infoData.deliveryman}</span></p>
                        <p>出货仓库：<span>{infoData.ware_name}</span></p>
                        <p>创建日期：<span>{infoData.create_time}</span></p>
                    </div>
                </section>
                <section>
                    <div className="detail-info-title">
                        <p className="p1">
                            审批状态：
                            <span style={{ color: 'red' }}>{infoData.check_status}</span>
                        </p>
                    </div>
                    <div className="detail-info-detail">
                        <p className="p1">审批意见：<span>{infoData.check_opinion}</span></p>
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
                            dataSource={tableData}
                            bordered>
                        </Table>
                        <div className="detail-total">
                                <div>
                                    <span className="span-one">商品共：</span>
                                    <span className="span-two">{tableData.length}</span>
                                </div>
                                <div>
                                    <span className="span-one">金额合计：</span>
                                    <span className="span-two">{}元</span>
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
