import React, { Component } from 'react'
import '../../assets/css/wang/apply.css'
import { Select,Table } from 'antd'

const { Option } = Select;
export default class purchaseApply extends Component{
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
                align:'center'
            },{
                title: '单价/大单位',
                dataIndex: 'big',
                align:'center'
            },{
                title:'数量',
                dataIndex:'bigNum',
                align:'center',
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
                dataIndex:'small',
                align:'center'
            },{
                title:'数量',
                dataIndex:'smallNum',
                align:'center',
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
                align:'center',
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
                align:'center'
            },{
                title:'操作',
                dataIndex:'delHandle',
                align:'center',
                render: () => <span style={{color:'rgb(26, 188, 156)'}}>删除</span>
            }
        ]
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'goodsName',
                align:'center'
            },
            {
                title: '大单位',
                dataIndex: 'bigUnit',
                align:'center'
            },
            {
                title: '大单位单价',
                dataIndex: 'bigPrice',
                align:'center'
            },
            {
                title:'小单位',
                dataIndex:'smallUnit',
                align:'center'
            },
            {
                title:'小单位价格',
                dataIndex:'smallPrice',
                align:'center'
            },
            {
                title:'现有库存',
                dataIndex:'storage',
                align:'center'
            },{
                title:'操作',
                dataIndex:'addHandle',
                align:'center',
                render: () => <span style={{color:'rgb(26, 188, 156)'}}>添加</span>
            }
        ]
        const { data, detailData } = this.state
        
        return (
            <div className="apply">
                <header>
                    <div className="apply-top">
                        <div className="top-box"></div>
                        <p className="top-title">采购申请</p>
                    </div>
                </header>

                <section className='apply-sec1'>
                    <div className="addstock-info-title">
                        <p>基本信息</p>
                    </div>
                    <div className="addstock-info">
                        <div>
                            <span style={{color:'red'}}>*</span>
                            供货厂商：
                            <Select style={{ width: 160 }}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </div>
                        <div>
                            <span style={{color:'red'}}>*</span>
                            付款类型：
                            <Select style={{ width: 160 }}>
                                <Option value="1">全部</Option>
                                <Option value="2">预付款</Option>
                                <Option value="3">货到付款</Option>
                            </Select>
                        </div>
                        <div>
                            <span style={{color:'red'}}>*</span>
                            审批人：
                            <Select style={{ width: 160 }}>
                                <Option value="1">A</Option>
                                <Option value="2">B</Option>
                                <Option value="3">C</Option>
                            </Select>
                        </div>
                        <div>
                            <span style={{color:'red'}}>*</span>
                            采购日期：
                            <Select style={{ width: 160 }}>
                                <Option value="1">2017</Option>
                                <Option value="2">预付款</Option>
                                <Option value="3">货到付款</Option>
                            </Select>
                        </div>
                    </div>
                </section>

                <section className='apply-sec2'>
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
                        <div className="totals">
                            <div className="totals-se1">
                                <span className="span-one">商品共：</span>
                                <span className="span-two">{detailData.length}</span>
                            </div>
                            <div className="totals-se1">
                                <span className="span-one">金额合计：</span>
                                <span className="span-two">{9999.00}元</span>
                            </div>
                            <div className="apply-sub">提交</div>
                        </div>
                </section>
            </div>
        )
    }
}



