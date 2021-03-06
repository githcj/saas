import React, { Component } from 'react'
import '../../assets/css/viewStock/add.css'
import { Select,Table,DatePicker } from 'antd'
import axios from '../../plugins/axios'

const { Option } = Select;
export default class AddStockIn extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:[],
            detailData:[],
            allSum:0
        }
    }
    componentDidMount(){
        //存货
        axios({
            method:'POST',
            url:'/entry/good_select',
            data:{
                code:200
            }
        })
        .then(res => {
            console.log(res)
            const data = res.data.data
            data.map((item,index) => {
                item.key = index
                return data
            })
            this.setState({
                data:data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    red = (i) => {
        const detailData = [...this.state.detailData]
        if(detailData[i].smallNum>1){
            detailData[i].smallNum -= 1
            detailData[i].sum = detailData[i].sum - detailData[i].small
        }
        var allSum = 0
        for(let i=0;i<detailData.length;i++){
            allSum = detailData[i].sum + allSum
        }
        this.setState({
            allSum:allSum,
            detailData:detailData
        })
    }
    add = (i) => {
        const detailData = [...this.state.detailData]
        detailData[i].smallNum += 1
        detailData[i].sum = detailData[i].sum + detailData[i].small
        var allSum = 0
        for(let i=0;i<detailData.length;i++){
            allSum = detailData[i].sum + allSum
        }
        this.setState({
            allSum:allSum,
            detailData:detailData
        })
    }
    redBig = (i) => {
        const detailData = [...this.state.detailData]
        if(detailData[i].bigNum>1){
            detailData[i].bigNum -= 1
            detailData[i].sum = detailData[i].sum - detailData[i].big
        }
        var allSum = 0
        for(let i=0;i<this.state.detailData.length;i++){
            allSum = this.state.detailData[i].sum + allSum
        }
        this.setState({
            allSum:allSum,
            detailData:detailData
        })
    }
    addBig = (i) => {
        const detailData = [...this.state.detailData]
        detailData[i].bigNum += 1
        detailData[i].sum = detailData[i].sum + detailData[i].big
        var allSum = 0
        for(let i=0;i<this.state.detailData.length;i++){
            allSum = this.state.detailData[i].sum + allSum
        }
        this.setState({
            allSum:allSum,
            detailData:detailData
        })
    }
    addStockIn = (data) => {
        var allSum = 0
        const detailData = [...this.state.detailData]
        if(detailData.length === 0){
            detailData.push({
                goodsName:data.goods_name,
                big:data.gu_cost_price_big,
                bigUnit:data.unit_name_big,
                bigNum:1,
                small:data.gu_cost_price_small,
                smallUnit:data.unit_name_small,
                smallNum:1,
                sum:data.gu_cost_price_big + data.gu_cost_price_small
            })
            
        }else{
            let is = true
            for(let i=0;i<detailData.length;i++){
                if(data.goodsName === detailData[i].goodsName){
                    is = !is
                    detailData[i].bigNum += 1
                    detailData[i].smallNum += 1
                    detailData[i].sum = data.gu_cost_price_big*detailData[i].bigNum + data.gu_cost_price_small*detailData[i].smallNum
                }
            }
            if(is){
                detailData.push({
                    goodsName:data.goods_name,
                    big:data.gu_cost_price_big,
                    bigUnit:data.unit_name_big,
                    bigNum:1,
                    small:data.gu_cost_price_small,
                    smallUnit:data.unit_name_small,
                    smallNum:1,
                    sum:data.gu_cost_price_big + data.gu_cost_price_small
                })
            }
        }
        for(let i=0;i<detailData.length;i++){
            allSum = detailData[i].sum + allSum
        }
        detailData.map((item,index) => {
            item.key = index
            return detailData
        })
        this.setState({
            detailData:detailData,
            allSum:allSum
        })
    }
    delGoods = (i) => {
        const newData = [...this.state.detailData]
        newData.splice(i,1)
        var allSum = 0
        for(let i=0;i<newData.length;i++){
            allSum = newData[i].sum + allSum
        }
        this.setState({
            detailData:newData,
            allSum:allSum
        })
    }
    render(){
        const { data, detailData,allSum } = this.state
        const detail = [
            {
                title: '商品名称',
                dataIndex: 'goodsName',
            },{
                title: '单价/大单位',
                dataIndex: 'big',
                render:(text,record) => {
                    return record.big + '/' + record.bigUnit
                }
            },{
                title:'数量',
                dataIndex:'bigNum',
                render: (text,record,index) => {
                    return(
                        <div className="number">
                            <span onClick={() => this.redBig(index)} className="count">-</span>
                            <span>{text}</span>
                            <span onClick={() => this.addBig(index)} className="count">+</span>
                        </div>
                    )
                }
            },{
                title:'小单位价格',
                dataIndex:'small',
                render:(text,record) => {
                    return record.small + '/' + record.smallUnit
                }
            },{
                title:'数量',
                dataIndex:'smallNum',
                render: (text,record,index) => {
                    return(
                        <div className="number">
                            <span onClick={() => this.red(index)} className="count">-</span>
                            <span>{text}</span>
                            <span onClick={() => this.add(index)} className="count">+</span>
                        </div>
                    )
                }
            },
            {
                title:'金额',
                dataIndex:'sum',
                render: (text,record)=>{
                    return (
                        <div style={{
                            width:'100px',
                            height:'30px',
                            lineHeight:'30px',
                            border:'1px solid',
                            textAlign:'center',
                            color:'black'
                        }}>{text}</div>
                    )
                }
            },
            {
                title:'生产日期',
                dataIndex:'productDate',
                render: () => <DatePicker style={{width:'120px'}}/>
            },{
                title:'操作',
                dataIndex:'delHandle',
                render: (text,record,index) => <span 
                style={{
                    color:'rgb(26, 188, 156)',
                    cursor:'pointer'
                }} 
                onClick={() => this.delGoods(index)}
                >删除</span>
            }
        ]
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'goods_name',
            },
            {
                title: '大单位',
                dataIndex: 'unit_name_big',
            },
            {
                title: '大单位单价',
                dataIndex: 'gu_cost_price_big',
            },
            {
                title:'小单位',
                dataIndex:'unit_name_small'
            },
            {
                title:'小单位价格',
                dataIndex:'gu_cost_price_small'
            },
            {
                title:'现有库存',
                dataIndex:'goods_sum'
            },{
                title:'操作',
                dataIndex:'addHandle',
                render: (text,record) => {
                    return (
                        <span 
                        style={{color:'rgb(26,188,156)',cursor:'pointer'}}
                        onClick={() => this.addStockIn(record)}
                        >添加</span>
                    )
                }
            }
        ]
        
        return (
            <div className="addstockIn">
                <header>
                    <div className="addstock-top">
                        <div className="top-box"></div>
                        <p className="top-title">添加入库单</p>
                    </div>
                </header>

                <section>
                    <div className="addstock-info-title">
                        <p>基本信息</p>
                    </div>
                    <div className="addstock-info">
                        <div>
                            进货仓库：
                            <Select style={{ width: 160 }}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </div>
                        <div>
                            供货厂商：
                            <Select style={{ width: 160 }}>
                                <Option value="1">全部</Option>
                                <Option value="2">预付款</Option>
                                <Option value="3">货到付款</Option>
                            </Select>
                        </div>
                    </div>
                </section>
                {/* 所有库存 */}
                <section>
                    <div className="addstock-info-title">
                        <p>选择商品</p>
                    </div>
                    <div className="addstock-search">
                        <div className="addstock-info info-two">
                            <div>
                                选择品牌：
                                <Select style={{ width: 160 }}>
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                </Select>
                            </div>
                            <div>
                                选择分类：
                                <Select style={{ width: 160 }}>
                                    <Option value="2">预付款</Option>
                                    <Option value="3">货到付款</Option>
                                </Select>
                            </div>
                            <div>
                                商品标题：
                                <input type="text" className="goodsTitle"></input>
                            </div>
                            <div className="goodsSearch">搜索</div>
                        </div>

                        <div className="search-result">
                            <div className="search-title">
                                <p>搜索结果</p>
                            </div>
                            <Table
                                id="table"
                                style={{width:'100%'}}
                                dataSource={data}
                                columns={columns}
                                bordered
                                pagination={{
                                    pageSize:10,
                                    showQuickJumper:true,
                                    showTotal:(total) => {
                                        return (
                                            <p>共有{Math.ceil(total / 10)}页/{total}条数据</p>
                                        )
                                    },
                                }} />
                        </div>
                    </div>
                </section>
                {/* 添加的商品 */}
                <section className="goodsDetail">
                    <div className="detail-title">
                        <p>商品明细</p>
                    </div>
                    <Table
                        id="table"
                        style={{width:'100%'}}
                        dataSource={detailData}
                        columns={detail}
                        bordered />
                        <div className="total">
                            <div>
                                <span className="span-one">商品共：</span>
                                <span className="span-two">{detailData.length}</span>
                            </div>
                            <div>
                                <span className="span-one">金额合计：</span>
                                <span className="span-two">{allSum}元</span>
                            </div>
                        </div>
                </section>

                <footer>
                    <div className="payInfo">
                        <p>付款信息</p>
                    </div>
                    <div className="payInfo-detail">
                        <div className="payMode">
                            <div>
                                付款类型：
                                <Select style={{ width: 160 }}>
                                    <Option value="1">现金</Option>
                                    <Option value="2">微信</Option>
                                    <Option value="3">支付宝</Option>
                                </Select>
                            </div>
                            <div>
                                <span className="span-one">供货厂商余额：</span>
                                <span className="span-two">{9999.00}元</span>
                            </div>
                        </div>
                        <div className="payment">
                            <div>
                                预付款：
                                <input type="text"></input>
                            </div>
                            <div>
                                实付金额：
                                <input type="text"></input>
                            </div>
                        </div>
                        <div>
                            <span className="span-one">应付款金额：</span>
                            <span className="span-two">{9999.00}元</span>
                        </div>
                        <div>
                            <button type="button">提交</button>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}



