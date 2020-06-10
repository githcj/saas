import React, { Component } from 'react'
import '../../assets/css/viewStock/add.css'
import { Select,Table } from 'antd'




const { Option } = Select;
export default class AddStockIn extends Component{
    constructor(props){
        super(props)
        this.state = {
            List:[],
            listtop:[]
        }
    }
    componentWillMount(){
        const data = [];
        const detailData= []
        for (let i = 0; i < 20; i++) {
            data.push({
                key: i,
                goodsName: '商品名称',
                bigUnit: '箱',
                bigPrice: 100,
                smallUnit:'瓶',
                smallPrice:10,
                storage:'999'
            })
            detailData.push({
                key: i,
                goodsName: '商品名称',
                big: '箱',
                bigNum: 9,
                small:'瓶',
                smallNum:9,
                sum:'999.00',
                productDate:'2020-02-23'
            })
        }
        this.setState({
            data:data,
            detailData:detailData
        })
    }
    red = (data) => {
        if(data.smallNum>1){
            data.smallNum -= 1
        }
        this.setState({
    
        })
    }
    add = (data) => {
        console.log(data)
        data.smallNum += 1
        this.setState({

        })
    }
    redBig = (data) => {
        if(data.bigNum>1){
            data.bigNum -= 1
        }
        this.setState({
    
        })
    }
    addBig = (data) => {
        console.log(data)
        data.bigNum += 1
        this.setState({

        })
    }
    render(){
        const detail = [
            {
                title: '商品名称',
                dataIndex: 'goodsName',
            },{
                title: '单价/大单位',
                dataIndex: 'big',
            },{
                title:'数量',
                dataIndex:'bigNum',
                render: (text,record) => {
                    return(
                        <div className="number">
                            <span onClick={() => this.redBig(record)} className="count">-</span>
                            <span>{text}</span>
                            <span onClick={() => this.addBig(record)} className="count">+</span>
                        </div>
                    )
                }
            },{
                title:'小单位价格',
                dataIndex:'small'
            },{
                title:'数量',
                dataIndex:'smallNum',
                render: (text,record) => {
                    return(
                        <div className="number">
                            <span onClick={() => this.red(record)} className="count">-</span>
                            <span>{text}</span>
                            <span onClick={() => this.add(record)} className="count">+</span>
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
                dataIndex:'productDate'
            },{
                title:'操作',
                dataIndex:'delHandle',
                render: () => <span style={{color:'rgb(26, 188, 156)'}}>删除</span>
            }
        ]
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'goodsName',
            },
            {
                title: '大单位',
                dataIndex: 'bigUnit',
            },
            {
                title: '大单位单价',
                dataIndex: 'bigPrice',
            },
            {
                title:'小单位',
                dataIndex:'smallUnit'
            },
            {
                title:'小单位价格',
                dataIndex:'smallPrice'
            },
            {
                title:'现有库存',
                dataIndex:'storage'
            },{
                title:'操作',
                dataIndex:'addHandle',
                render: () => <span style={{color:'rgb(26, 188, 156)'}}>添加</span>
            }
        ]
        const { data, detailData } = this.state
        
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
                                    <Option value="1">全部</Option>
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
                                style={{width:'100%'}}
                                dataSource={data}
                                columns={columns}
                                bordered />
                        </div>
                    </div>
                </section>

                <section className="goodsDetail">
                    <div className="detail-title">
                        <p>商品明细</p>
                    </div>
                    <Table
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
                                <span className="span-two">{9999.00}元</span>
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
                            <div>
                                优惠金额：
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



