import React, { Component } from 'react'
import '../../assets/css/wang/apply.css'
import { Select, Table } from 'antd'
import axios from '../../plugins/axios'
const { Option } = Select;


export default class purchaseApply extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            detailData: [],
            sum: 0
        }
    }
    componentDidMount() {
        const detailData = this.state.detailData
       
        axios({
            method: 'GET',
            url: '/purchaseApply'
        })
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
        var suma = 0
        for (var i = 0; i < detailData.length; i++) {
            suma += detailData[i].smcount * detailData[i].smallPrice + detailData[i].bgcount * detailData[i].bigPrice
        }
        this.setState({
            sum: suma
        })
    }
    addbigcount = (i,n) => {
        var suma = 0
        var addcount = this.state.data
        console.log(i,'i')
        console.log(n,'n')
        if(n>0){
            this.state.detailData.filter((v,x)=>{
                console.log(x,'x')
                if( x === i){
                    addcount[i].bgcount = n+1
                }
            })
            for(var i=0; i<addcount.length;i++){
                suma += addcount[i].smcount * addcount[i].smallPrice + addcount[i].bgcount * addcount[i].bigPrice
            }
            this.setState({
                sum:suma,
                data:addcount
            })
        }
    }
    
    add = (record) => {
        var suma = 0
        let newData = [...this.state.detailData]
        if (newData.length === 0) {
            newData.push(record)
            for (let i = 0; i < newData.length; i++) {
                newData[newData.length - 1].key = i;
                newData[newData.length - 1].smcount = 1;
                newData[newData.length - 1].bgcount = 1;
            }
        }
        else {
            let is = true
            for (let i = 0; i < newData.length; i++) {
                if (record.goodsName === newData[i].goodsName) {
                    is = !is
                    newData[i].bgcount = newData[i].bgcount + 1
                }
            }
            if (is) {
                newData.push(record)
                for (let i = 0; i < newData.length; i++) {
                    newData[newData.length - 1].key = i;
                    newData[newData.length - 1].smcount = 1;
                    newData[newData.length - 1].bgcount = 1;
                }
            }
        }
        for (var i = 0; i < newData.length; i++) {
            suma += newData[i].smcount * newData[i].smallPrice + newData[i].bgcount * newData[i].bigPrice
        }
        console.log(newData)
        this.setState({
            sum: suma,
            detailData: newData
        })
    }
    render() {
        const { data, detailData,sum } = this.state
        for (let i = 0; i < detailData.length; i++) {
            detailData[i].key = i
        }
        const detail = [
            {
                title: '商品名称',
                dataIndex: 'goodsName',
                align: 'center'
            }, {
                title: '单价/大单位',
                dataIndex: 'big',
                align: 'center',
                render: (text, record) => {
                    return record.bigPrice + '/' + record.bigUnit
                }
            }, {
                title: '数量',
                dataIndex: 'bigNum',
                align: 'center',
                render: (text, record,index) => {
                    console.log('我就是',record.bgcount)
                    return  <div className="number">
                            <span onClick={() => this.redbigcount(index,text)} className="count">-</span>
                            <span>{text}</span>
                            <span onClick={() => this.addbigcount(index,text)} className="count">+</span>
                        </div>
                }
            }, {
                title: '小单位价格',
                dataIndex: 'small',
                align: 'center',
                render: (text, record) => {
                    return record.smallPrice + '/' + record.smallUnit
                }
            }, {
                title: '数量',
                dataIndex: 'smallNum',
                align: 'center',
                render: (text, record,index) => {
                    return <div className="number">
                            <span onClick={() => this.redsmcount(index,text)} className="count">-</span>
                            <span>{record.smcount}</span>
                            <span onClick={() => this.addsmcount(index,text)} className="count">+</span>
                        </div>
                }
            },
            {
                title: '金额',
                dataIndex: 'sum',
                align: 'center',
                render: (text, record) => {
                    return (
                        <div>{record.smcount * record.smallPrice + record.bgcount * record.bigPrice}</div>
                    )
                }
            },
                 {
                title: '操作',
                dataIndex: 'delHandle',
                align: 'center',
                render: () => <span style={{ color: 'rgb(26, 188, 156)' }}>删除</span>
            }
        ]
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'goodsName',
                align: 'center'
            },
            {
                title: '大单位',
                dataIndex: 'bigUnit',
                align: 'center'
            },
            {
                title: '大单位单价',
                dataIndex: 'bigPrice',
                align: 'center'
            },
            {
                title: '小单位',
                dataIndex: 'smallUnit',
                align: 'center'
            },
            {
                title: '小单位价格',
                dataIndex: 'smallPrice',
                align: 'center'
            },
            {
                title: '现有库存',
                dataIndex: 'storage',
                align: 'center'
            }, {
                title: '操作',
                dataIndex: 'addHandle',
                align: 'center',
                render: (text, record, index) => (
                    <span style={{ color: 'rgb(26, 188, 156)' }}
                        onClick={() => this.add(record)}>添加</span>
                )
            }
        ]
        
        for (let i = 0; i < detailData.length; i++) {
            detailData[i].key = i
           }
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
                            <span style={{ color: 'red' }}>*</span>
                            供货厂商：
                            <Select style={{ width: 160 }}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </div>
                        <div>
                            <span style={{ color: 'red' }}>*</span>
                            付款类型：
                            <Select style={{ width: 160 }}>
                                <Option value="1">全部</Option>
                                <Option value="2">预付款</Option>
                                <Option value="3">货到付款</Option>
                            </Select>
                        </div>
                        <div>
                            <span style={{ color: 'red' }}>*</span>
                            审批人：
                            <Select style={{ width: 160 }}>
                                <Option value="1">A</Option>
                                <Option value="2">B</Option>
                                <Option value="3">C</Option>
                            </Select>
                        </div>
                        <div>
                            <span style={{ color: 'red' }}>*</span>
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
                                style={{ width: '100%' }}
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
                        style={{ width: '100%' }}
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
                            <span className="span-two">{sum}元</span>
                        </div>
                        <div className="apply-sub">提交</div>
                    </div>
                </section>
            </div>
        )
    }
}



