// import React, { useState,useEffect } from 'react'
import React, { Component } from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import '../../assets/css/sales/order.css'
import { Table, Button,Select } from 'antd';
import { Route, NavLink } from 'react-router-dom'
import {yulanAction} from '../../store/order/orderActions'
const { Option } = Select


export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            orderDate: '',
            orderList: []
        };
    }


    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://119.23.228.238:3031/mock/47/order',
        })
            .then(res => {
                this.setState({
                    orderList: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    yulan =(record)=>{
         this.props.his.push({
             pathname:'/home/xiaoshou/orderDetail',
             params:record
            })
    }

    setDate = (e) => {
        this.setState({
            orderDate: e.target.value
        })
    }

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render() {
        const { orderList, selectedRowKeys } = this.state;
        const {msg} =this.props
       
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        // const hasSelected = selectedRowKeys.length > 0;

        for (let i = 0; i < orderList.length; i++) {
            orderList[i].key = i
        }
        const columns = [
            {
                title: '编号',
                dataIndex: 'bianhao',
            },
            {
                title: '销售类型',
                dataIndex: 'sales',
            },
            {
                title: '金额合计',
                dataIndex: 'jine',
            },
            {
                title: '创建日期',
                dataIndex: 'cjrq',
            },
            {
                title: '订单类型',
                dataIndex: 'order',
            },
            {
                title: '客户类型',
                dataIndex: 'userlx',
            },
            {
                title: '客户名称',
                dataIndex: 'username',
            },
            {
                title: '业务员',
                dataIndex: 'person',
            },
            {
                title: '出库仓库',
                dataIndex: 'ckck',
            },
            {
                title: '配送车辆',
                dataIndex: 'car',
            },
            {
                title: 'Adress',
                dataIndex: 'address',
            },
            {
                title: 'Axios',
                render: (text,record,index) => (
                    <span>
                        <a>删除</a>
                        <div onClick={()=> this.yulan(record)}>预览</div>
                    </span>
                )
            },
        
        ];

        return (
            <div>
                <div className="top">
                    <div className="top-title">订单列表</div>
                </div>
                <div className="quire">
                    <div className="quire-title">
                        <p>筛选查询</p>
                    </div>
                    <div className="condition flex-row">
                        <div>
                            <label >创建日期：</label><input value={this.orderDate} onChange={this.setDate} type="date"></input>
                        </div>
                        <div>
                            <label >销售类型：</label>
                            <select className="xiaoshou">
                                <option value="全部">全部</option>
                                <option value="车销">车销</option>
                                <option value="仿销">仿销</option>
                            </select>
                        </div>
                        <div>
                            <label >订单类型：</label>
                            <select className="xiaoshou">
                                <option value="全部">全部</option>
                                <option value="普通订单">普通订单</option>
                                <option value="退货订单">退货订单</option>
                            </select>
                        </div>
                        <div>
                            <label >客户类型：</label>
                            <select className="xiaoshou">
                                <option value="全部">全部</option>
                                <option value="客户A型">客户A型</option>
                                <option value="客户B型">客户B型</option>
                            </select>

                        </div>
                    </div>
                </div>

                <div className="table2">
                    <div >
                        {/* <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    Reload
                </Button> */}
                        {/* <span style={{ marginLeft: 8 }}>
                            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                        </span> */}
                        <div className="quire-title ">
                        <div>数据列表</div>
                       
                        <NavLink  to={msg + '/newOrder'} className="chaxun">添加</NavLink>
                    </div>

                    </div>
                    <Table 
                    className="order-table"
                    rowSelection={rowSelection} 
                    columns={columns} 
                    dataSource={orderList}
                    bordered />
                </div>
            </div>
        )
    }
}



//  function mapDispatchToProps(dispath){
//     return{
//       yulan:(record)=>dispath(yulanAction(record)),
//      }
//   }

// export default connect(
//     null,
//     mapDispatchToProps
//     )
// (Order);
