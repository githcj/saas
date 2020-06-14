import React from 'react'
import {
    CaretLeftOutlined,
} from '@ant-design/icons';
import '../../assets/css/wang/purchase.css'
import { Table } from 'antd'


const columns = [
    {
        title: '序号',
        dataIndex: 'serialNum',
        key: 'serialNum',
        align: 'center'
    },
    {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center'
    },
    {
        title: '单位/大单位',
        dataIndex: 'bigDan',
        key: 'bigDan',
        align: 'center'
    },
    {
        title: '数量',
        dataIndex: 'Num1',
        key: 'Num1',
        align: 'center'
    },
    {
        title: '小单位/价格',
        dataIndex: 'smallPrice',
        key: 'smallPrice',
        align: 'center'
    },
    {
        title: '数量',
        dataIndex: 'Num2',
        key: 'Num2',
        align: 'center'
    },
    {
        title: '金额',
        dataIndex: 'SumPrice',
        key: 'SumPrice',
        align: 'center'
    }
];

const data = [];
for (var i = 0; i < 20; i++) {
    data.push({
        key: i,
        serialNum: 10001,
        name: '名字',
        bigDan: '100/箱',
        Num1: '99',
        smallPrice: '10/瓶',
        Num2: '99',
        SumPrice: '999'
    })
}
 

class purchaseDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        let newDom
        const {location} = this.props
        console.log(location.params)
        const difficult = location.params.state
        if(difficult===4){
            newDom =    <div className="detail-middle-se1-new">
                            <div>审批时间：</div>
                            <div>入库时间：</div>
                        </div>
        }
        if(difficult===3){
            newDom =    <div>
                            <div>审批时间：</div>
                        </div>
        }
        let status
        if(difficult === 1) {
            status= <span style={{color:'red'}}>待审批</span>
        }
        if(difficult === 2) {
            status= <span style={{color:'red'}}>不通过</span>
        }
        if(difficult=== 3){
            status= <span style={{color:'red'}}>已通过</span>
        } 
        if(difficult===4){
            status= <span style={{color:'red'}}>已入库</span>
        }
        // 审批意见
        let yijianDom
        if(location.params.yijian === '' || !location.params.yijian){
            yijianDom = <span>无</span>
        }
        if(location.params.yijian){
            yijianDom = <span>{location.params.yijian}</span>
        }
        return (
            <div className="detail">
                <div className="admin-top">
                    <div className='purchase-firtop'>
                        <div className='dynamic-top-left'>
                            <div className='dynamic-top-left-mark'></div>
                            <p className='dynamic-top-word'><span style={{color:'black'}}>采购预览-{status}</span></p>
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
                        <p>单号：<span className="danHao" style={{ color: 'red'}}>25151541315316</span></p>
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
                            <div className="detail-middle-se1-div">
                                审批状态：<span style={{color:'red'}}>{status}</span>
                            </div>
                            <div className="detail-middle-se1-new">
                                {newDom}
                            </div>
                    </div>
                    <div className="detail-middle-se22">
                        <p>审批意见：{yijianDom} </p>
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
                        <div className="totals">
                                <div className="totals-se1">
                                    <span className="span-one">商品共：</span>
                                    <span className="span-two"
                                    style={{color:'red'}}>{data.length}</span>
                                </div>
                                <div className="totals-se1">
                                    <span className="span-one">金额合计：</span>
                                    <span className="span-two"
                                    style={{color:'red'}}>{9999.00}元</span>
                                </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default purchaseDetail