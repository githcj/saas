import React, { Component } from 'react'
import '../../assets/css/viewStock/stockDetail.css'
import { Table } from 'antd'
import axios from '../../plugins/axios'
import ConTitle from '../../components/ConTitle'

export default class StockInDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            allData:[],
            tableData:[],
            allPrice:''
        }
    }
    //入库预览
    componentDidMount(){
        console.log(this.props.msg.params.godown_id)
        axios({
            method:'POST',
            url:'/entry/previewEnterWare',
            data:{
                godown_id:this.props.msg.params.godown_id
            }
        })
        .then(res => {
            console.log(res.data)
            const newData = res.data.data
            newData.map((item,index) => {
                item.key = index
            })
            let allPrice = 0
            for(let i=0;i<newData.length;i++){
                allPrice += newData[i].total_price
            }
            this.setState({
                allData:res.data,
                tableData:newData,
                allPrice:allPrice
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    render(){
        const columns = [
            {
                title: '序号',
                dataIndex: 'key',
                render:(text,record) => {
                    return record.key+1
                }
            },
            {
                title: '商品名称',
                dataIndex: 'goods_name'
            },
            {
                title: '单位/大单位',
                dataIndex: 'bigDan',
                render:(text,record) => {
                    return record.gu_cost_price_big + '/' + record.unit_name_big
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
                    return record.gu_cost_price_small + '/' + record.unit_name_small
                }
            },
            {
                title: '数量',
                dataIndex: 'single_num'
            },
            {
                title: '金额',
                dataIndex: 'total_price'
            }
        ]
        const { allData,tableData,allPrice } = this.state
        return (
            <div className="stockInDetail detail">
                <header>
                    <ConTitle titleName=""></ConTitle>
                </header> 
                <section>
                    <div className="detail-info-title">
                        <p className="p1">基本信息</p>
                        <p className="p2">单号：<span style={{ color: 'red' }}>{allData.entry_id}</span></p>
                    </div>
                    <div className="detail-info-detail">
                        <p>进货仓库：<span>{allData.ware_name}</span></p>
                        <p>供货厂商：<span>{allData.supplier_name}</span></p>
                        <p>创建日期：<span>{allData.create_time}</span></p>
                    </div>
                </section>
                <section>
                    <div className="detail-info-title">
                        <p className="p1">
                            审批状态：
                            <span style={{ color: 'red' }}>{allData.check_status === 0 ? '待审批' : '已通过'}</span>
                        </p>
                    </div>
                    <div className="detail-info-detail">
                        <p className="p1">审批意见：<span>{allData.check_opinion}</span></p>
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
                                    <span className="span-two">{allPrice}.00元</span>
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
                                <span className="span-two">{allPrice}.00元</span>
                            </p>
                            <p>
                                <span>实付金额：</span>
                                <span className="span-two">{allPrice}.00元</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span>应付款金额：</span>
                                <span className="span-two">{allPrice}.00元</span>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}