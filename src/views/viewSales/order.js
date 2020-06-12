// import React, { useState,useEffect } from 'react'
import React, { Component } from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import '../../assets/css/sales/order.css'
import { Table, Button,Select,Modal } from 'antd';
import { Route, NavLink } from 'react-router-dom'
import {yulanAction} from '../../store/order/orderActions'
import {
    SearchOutlined,
    SyncOutlined,
    UnorderedListOutlined
  } from '@ant-design/icons'
  const { Option } = Select

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            orderDate: '',
            orderList: [],
            eachPage:10,
            visible:false,
            car:[]
        };
    }
    editval = (value,index) => {
        this.state.car=[]
        console.log(this.state.car,'this.state.car');
        const car=this.state.car 
        car.push({
            id:index,
            cont:value
        })
        this.setState({
            car:car
        })
        console.log(this.state.car,);
        
    }

    // showModal = () => {
	// 	this.setState({
	// 	  	visible: true,
	// 	});
	// }
	// handleOk = e => {
	// 	console.log(e);
	// 	this.setState({
	// 	  	visible: false,
	// 	});
	// }
	// handleCancel = e => {
	// 	console.log(e);
	// 	this.setState({
	// 	  	visible: false,
	// 	});
	// }

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
     //每页条数改变
     pageNumChange = (value) => {
        if(value === 'ten') {
            this.setState({
                eachPage:10
            })
        }
        if(value === 'twenty') {
            this.setState({
                eachPage:20
            })
        }
        if(value === 'thirty') {
            this.setState({
                eachPage:30
            })
        }
    }
    //排序
    sortChange = (value) => {
        const newData = [...this.state.orderList]
        if(value === 'saleLowHight') {
            newData.sort((a, b) => {
                return a.jine - b.jine
            })
        }
        if(value === 'saleHightLow') {
            newData.sort((a, b) => {
                return b.jine - a.jine
            })
        }
        this.setState({
            orderList: newData
        })
    }
    render() {
        const { orderList, selectedRowKeys,eachPage } = this.state;
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
                render: (text,record)=> {
                   return <div>
                        <Select defaultValue='客户名称' onChange={(value) => this.editval(value,record.key)}>
                            <Option value="ten">car1</Option>
                            <Option value="twenty">car2</Option>
                            <Option value="thirty">car2</Option>
                       </Select>
                    </div>
                    
                }
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
                            <Select className="xiaoshou">
                                <Option value="全部">全部</Option>
                                <Option value="车销">车销</Option>
                                <Option value="仿销">仿销</Option>
                            </Select>
                        </div>
                        <div>
                            <label >订单类型：</label>
                            <Select className="xiaoshou">
                                <Option value="全部">全部</Option>
                                <Option value="普通订单">普通订单</Option>
                                <Option value="退货订单">退货订单</Option>
                            </Select>
                        </div>
                        <div>
                            <label >客户类型：</label>
                            <Select className="xiaoshou">
                                <Option value="全部">全部</Option>
                                <Option value="客户A型">客户A型</Option>
                                <Option value="客户B型">客户B型</Option>
                            </Select>

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
                        {/* <div className="quire-title ">
                        <div>数据列表</div>
                       
                        
                        </div> */}
                        <div className='order-quire'>
                    <div className='dynamic-left-title'>
                        <UnorderedListOutlined style={{fontSize:'20px'}}/>
                        <span style={{fontSize:'14px'}}>数据列表</span>
                    </div>
                    <div className='order'>
                    <NavLink className="order-chaxun"  to={msg + '/newOrder'} >添加</NavLink>
                        <Select defaultValue="显示条数" style={{ width: 120 }} onChange={this.pageNumChange}>
                            <Option value="ten">每页10条</Option>
                            <Option value="twenty">每页20条</Option>
                            <Option value="thirty">每页30条</Option>
                        </Select>
                        <Select defaultValue="排序方式" style={{ width: 150 }} onChange={(value) => this.sortChange(value)}>
                            <Option value="saleHightLow">金额从高到低</Option>
                            <Option value="saleLowHight">金额从低到高</Option>
                        </Select>
                    </div>
                </div>



                    </div>
                    <Table 
                    className="order-table"
                    rowSelection={rowSelection} 
                    columns={columns} 
                    dataSource={orderList}
                    bordered 
                    pagination={{
                            showQuickJumper:true,
                            showTotal:(total) => {
                                return (
                                    <p>共有{
                                        Math.ceil(total / eachPage)
                                    }页/{total}条数据</p>
                                )
                            },
                            pageSize:eachPage
                        }}
                    />

                      {/* <Modal
						title="编辑"
						centered
						visible={this.state.visible}
						onOk={this.handleOk}
						okText='确定'
						okType='primary'
						cancelText='重置'
						onCancel={this.handleCancel}
						>
						<div className='modal-item'>
							<p>商品类型：</p>
							<Select defaultValue="请选择商品分类" style={{ width: '60%' }}>
								<Option value="jack">Jack</Option>
								<Option value="lucy">Lucy</Option>
								<Option value="Yim">yim</Option>
							</Select>
						</div>
						<div className='modal-item'>
							<p>厂商名称：</p>
							<Select defaultValue="请选择厂商" style={{ width: '60%' }}>
								<Option value="jack">Jack</Option>
								<Option value="lucy">Lucy</Option>
								<Option value="Yim">yim</Option>
							</Select>
						</div>
						<div className='modal-item'>
							<p>上下架</p>
							<Select defaultValue="全部" style={{ width: '60%' }}>
								<Option value="shelve">上架</Option>
								<Option value="xiajia">下架</Option>
							</Select>
						</div>
					</Modal> */}
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
