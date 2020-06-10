import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import '../../assets/css/sales/newOrder.css'
import { Table, Button,Radio, Select } from 'antd';
const { Option } = Select

export default class newOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
             neworderDate:'',
             queryorder:[],
             adddata:[],
             big:1,
             small:1,
        };
    }

    add = () => {
        axios({
            method: 'GET',
            url: 'http://119.23.228.238:3031/mock/47/goodsde',
        })
            .then(res => {
                this.setState({
                    adddata: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    componentWillUnmount(){
        
    }


    count(a) {
        this.setState({
            big: a - 1
        })
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://119.23.228.238:3031/mock/47/addorder',
        })
            .then(res => {
                this.setState({
                    queryorder: res.data,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    

    addcount =(arr,i)=>{
        console.log(i,'iiii')
        const adddata =this.state.adddata
        console.log(arr,'0000000000')
        this.setState({
             adddata:adddata.map((item,index) =>(index === i ?  item.smcount +=1 : item) )
        })
        
    }
    setvalue = (value) => {
        console.log(value)
    }
     render(){
           const { adddata } = this.state
           for (let i = 0; i < adddata.length; i++) {
            adddata[i].key = i
        }
        for (let i = 0; i < adddata.length; i++) {
            adddata[i].smcount = 1
        }
        for (let i = 0; i < adddata.length; i++) {
            adddata[i].bgcount = 1
        }
        console.log(adddata, '123123123')
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'goodsname',
            },
            {
                title: '大单位',
                dataIndex: 'bigUnt',
            },
            {
                title: '大单位单价',
                dataIndex: 'bigUntPrice',
            },
            {
                title: '小单位',
                dataIndex: 'smallUnt',
            },
            {
                title: '小单位单价',
                dataIndex: 'smallUntPrice',
            },
            {
                title: '现有库存',
                dataIndex: 'stock',
            },

            {
                title: '操作',
                render: (record,index) => (
                    <span>
                        <a>delete</a>
                        <div onClick={this.add}>add</div>
                    </span>
                )
            },

        ];
        const goodscolumns = [
            {
                title: '商品名称',
                dataIndex: 'goodsname',
            },
            {
                title: '单价/大单位',
                dataIndex: 'bigUnt',
            },
            {
                title: '数量',
                render: (record, index,text) => {
                    console.log('我就是'+adddata[text])
                    return <div>
                        <span>-</span>
                        <span>{record.bgcount}</span>
                        <span >+</span>
                    </div>
                }

            },
            {
                title: '小单位/单价',
                dataIndex: 'smallPrice',
            },
            {
                title: '数量',
                render: (text,record,index) => {
                    
                    return <div>
                        <span>-</span>
                        <span>{record.smcount}</span>
                        <span onClick={() => this.addcount(record,index)}>+</span>
                    </div>
                }
            },
            {
                title: '金额',
                render :(text,record,index) => {
                return <span>{record.smcount * record.smallPrice + record.bgcount * record.bigUnt}</span>
                }
            },
            {
                title: '现有库存',
                dataIndex: 'stock',
            },

            {
                title: '操作',
                render: () => (
                    <span>
                        <a>delete</a>
                    </span>
                )
            },

        ];



        return (
            <div>
                <div className="top">
                    <div className="top-title">新增订单</div>
                </div>

                {/*  基本信息 */}
                <div className="quire">
                    <div className="quire-title">
                        <p >基本信息</p>
                    </div>
                    <div className="condition2 flex-row">
                        <div className="bianju">
                            <label >订单类型：</label><span>普通订单</span>
                         </div>
                         <div className="bianju2" >
                            <label >客户名称：</label>
                            <Select className="xiaoshou" defaultValue='客户名称' onChange={(value) => this.setvalue(value)}>
                                <Option value="全部">客户1</Option>
                                <Option value="车销">客户2</Option>
                                <Option value="仿销">客户3</Option>
                            </Select>
                         </div>
                         <div className="bianju">
                            <label >业务员：</label>
                            <Select className="xiaoshou">
                                <Option value="全部">业务员1</Option>
                                <Option value="车销">业务员2</Option>
                                <Option value="仿销">业务员3</Option>
                            </Select>
                         </div>
                         <div className="bianju">
                            <label >出货仓库：</label>
                            <Select className="xiaoshou"  style={{width:'180px'}}>
                                <Option value="全部">业务员1</Option>
                                <Option value="车销">业务员2</Option>
                                <Option value="仿销">业务员3</Option>
                            </Select>
                         </div>
                         <div className="bianju">
                            <label >发货日期：</label><input style={{width:'120px'}} value={this.neworderDate} onChange={this.setDate} type="date"></input>
                        </div>
                        <div className="bianju">
                            <label >销售类型：</label>
                            <Select className="xiaoshou">
                                <Option value="全部">全部</Option>
                                <Option value="车销">车销</Option>
                                <Option value="仿销">仿销</Option>
                            </Select>
                        </div>
                        <div className="bianju">
                            <label >配送车辆：</label>
                            <Select className="xiaoshou">
                                <Option value="全部">请选择</Option>
                                <Option value="车销">车1</Option>
                                <Option value="仿销">车2</Option>
                            </Select>
                        </div>
                    </div>
                </div>

                {/*  选择商品 */}
                <div className="quire3">
                    <div className="quire-title">
                        <p >选择商品</p>
                    </div>
                    <div className="condition3 flex-row">
                        <div className="bianju ">
                            <label >选择品牌：</label>
                            <select className="xiaoshou">
                                <option value="全部">请选择</option>
                                <option value="车销">品牌11</option>
                                <option value="仿销">品牌2</option>
                            </select>
                        </div>
                        <div className="bianju ">
                            <label >选择分类：</label>
                            <select className="xiaoshou">
                                <option value="全部">请选择</option>
                                <option value="车销">品牌11</option>
                                <option value="仿销">品牌2</option>
                            </select>
                        </div>
                        <div className="bianju ">
                            <label >商品标题：</label>
                            <input ></input>
                        </div>
                        <Radio.Button style={{ marginLeft: '12px' }} type="button" value="large">搜索</Radio.Button>
                    </div>


                    {/* 搜索结果 */}

                    <div className="quire2">
                        <div className="quire-title">
                            <p>搜索结果</p>
                        </div>
                        <Table columns={columns} dataSource={this.state.queryorder} />
                    </div>

                </div>


                {/* 商品明细 */}
                <div className="quire">
                    <div className="quire-title">
                        <p >商品明细</p>
                    </div>
                    <Table columns={goodscolumns} dataSource={this.state.adddata} />
                </div>



            </div>
        )
    }

}

