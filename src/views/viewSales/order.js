// import React, { useState,useEffect } from 'react'
import React, { Component } from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import '../../assets/css/sales/order.css'
import { Table, Button,Select,Modal ,input, Input} from 'antd';
import { Route, NavLink } from 'react-router-dom';
// import {yulanAction} from '../../store/order/orderActions'

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
            orderxiaoshou:'',
            orderkehu:'',
            orderdingdan:'',
            orderList: [],
            eachPage:10,
            visible:false,
            car:[],
            xiaoshoutype:[],
            kehutype:[],
            bianji:[],
            z:'',
            ordercar:[]
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
    editorder =(e)=> {
        const bianji=this.state.bianji
        bianji.sales_type_name=e
        this.setState({
            bianji:bianji
        })
    }
    editordercar =(e)=>{
        const bianji=this.state.bianji
        bianji.vehicle_id=e
        this.setState({
            bianji:bianji
        })
        console.log(this.state.bianji,'bianji200');
        
    }

    showModal = (record) => {
        console.log(record,'recordorder');
        
		this.setState({
            bianji:record,
		  	visible: true,
        });
        
	}
	handleOk = e => {
        const tokens=localStorage.getItem('token')
        console.log(tokens,'tokens');
        
        const bianji=this.state.bianji
        console.log(e);
        axios({
            method: 'POST',
            url: 'http://172.16.6.27:8080/customer/update',
            data:{
                token:tokens,
                sales_id:bianji.sales_id,
                sales_method_name:bianji.sales_method_name,
                vehicle_id:bianji.vehicle_id
            }
        })
        .then(res => {
            console.log(res,'bianjiorder');
            
            console.log(this,'this')
            this.componentDidMount() 
        })
        .catch(err => {
            console.log(err);
        })

		this.setState({
		  	visible: false,
        });
        
	}
	handleCancel = e => {
		console.log(e);
		this.setState({
		  	visible: false,
		});
	}

  async  componentDidMount() {
       const tokens=localStorage.getItem('token')
       await axios({
            method: 'POST',
            url: 'http://172.16.6.29:8080/sales/querySalesList',
            data:{
                token:tokens
            }
        })
            .then(res => {
                console.log(res,'orderlist');
                this.setState({
                    orderList: res.data
                })

                console.log(this.state.orderList,'orderlist222');
                
                for (let i = 0; i < this.state.orderList.length; i++) {
                    this.state.orderList[i].key = i
                }
            })
            .catch(err => {
                console.log(err);
            })

     await  axios({
            method: 'POST',
            url: 'http://172.16.6.27:8080/combobox/customer', 
        })    
           .then(res =>{

               this.setState({
                     kehutype:res.data.data
               })
           })
           .catch(err =>{
                 console.log(err,err);  
           })

      await axios({
            method: 'POST',
            url: 'http://172.16.6.27:8080/combobox/sales_method', 
        })    
           .then(res =>{
               this.setState({
                     xiaoshoutype:res.data.data
               })
           })
           .catch(err =>{
                 console.log(err,err);  
           })

           await axios({
            method: 'POST',
            url: 'http://172.16.6.29:8080/driver/queryVehicleList', 
        })    
           .then(res =>{
               
               this.setState({
                     ordercar:res.data
               })
               console.log(this.state.ordercar);
               

           })
           .catch(err =>{
                 console.log(err,err);  
           })


    }
    yulan =(record)=>{ 
             console.log(record.sales_id,'salesid');
             this.props.his.push({
                pathname:'/home/xiaoshou/orderDetail',
                params: record.sales_id
               })
    }

     //处理 查询数据
    setDate = (e) => {
        this.setState({
            orderDate: e.target.value
        })
    }
    orderxiaoshou =(value)=>{
        console.log(value,'xiaoshouvalue');
        
        this.setState({
            orderxiaoshou:value
        })
    }
    orderkehu=(value)=>{
        this.setState({
            orderkehu:value
        })
    }
    orderdingdan =(value)=>{
        this.setState({
            orderdingdan:value
        })
    }

    // 查询请求
    Cusinfoquery =()=>{
        const tokens=localStorage.getItem('token')
        console.log(this.state.sousuo); 
         axios({
             method: 'POST',
             url: 'http://172.16.6.29:8080/sales/querySalesList',
             data:{
                 token:tokens,
                 start_time:this.state.orderDate,
                 sales_method_name:this.state.orderxiaoshou,
                 sales_type_name :this.state.orderdingdan,
                 customer_type_name:this.state.orderkehu ,
             }
         })
             .then(res => {
                  console.log(res,'res');
                  console.log(this.state.orderdingdan,'dingdan');
                  
                 this.setState({
                     orderList: res.data
                 })
                 console.log(this.state.orderList);
             })
             .catch(err => {
                 console.log(err);
             })    
     }

     //删除
     orderdellist =(row)=>{
         const id= row.sales_id
         console.log(id);
         const tokens=localStorage.getItem('token')
        axios({
            method: 'POST',
            url: 'http://172.16.6.29:8080/sales/deleteSales',
            data:{
                token:tokens,
                sales_id:id
            }
        })
            .then(res => {
                 
               this.componentDidMount()
            })
            .catch(err => {
                console.log(err);
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
        const { bianji,orderList, selectedRowKeys,eachPage ,xiaoshoutype,kehutype,ordercar} = this.state;
        const {msg} =this.props
       
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        // const hasSelected = selectedRowKeys.length > 0;
         const xiaoshou =xiaoshoutype.map((item,index)=>(
             <Option value={item.brand_id}>
                 {item.brand_name}
            </Option>
         ))

         const kehu=kehutype.map((item,index)=>(
            <Option value={item.customer_type_id}>
                {item.customer_type_name}
           </Option>
        ))
        const ordercar2=ordercar.map((item,index)=>(
            <Option value={item}>
                {item}
           </Option>
        ))


       
        const columns = [
            {
                title: '编号',
                align:'center',
                dataIndex: 'sales_id',
            },
            {
                title: '销售类型',
                align:'center',
                dataIndex: 'sales_method_name',
            },
            {
                title: '金额合计',
                align:'center',
                dataIndex: 'sales_payable',
            },
            {
                title: '创建日期',
                align:'center',
                dataIndex: 'create_time',
                render:(text,row,index)=> (
                    <span>
                        {new Date(text).toLocaleString()}
                    </span>
                )
            },
            {
                title: '订单类型',
                align:'center',
                dataIndex: 'sales_type_name',
            },
            {
                title: '客户类型',
                align:'center',
                dataIndex: 'customer_type_name',
            },
            {
                title: '客户名称',
                align:'center',
                dataIndex: 'customer_name',
            },
            {
                title: '业务员',
                align:'center',
                dataIndex: 'salesman',
            },
            {
                title: '出库仓库',
                align:'center',
                dataIndex: 'ware_name',
            },
            {
                title: '配送车辆',
                align:'center',
                dataIndex: 'vehicle_id',
            },
            {
                title: 'Axios',
                align:'center',
                render: (text,record,index) => {
                    if(record.sales_type_name == '普通订单'){
                       return    <span className="order-axios">
                                    <a onClick={()=>this.showModal(record)}>编辑</a>
                                    <a onClick={()=>this.orderdellist(record)}>删除</a>
                                    <a onClick={()=> this.yulan(record)}>预览</a>
                         </span>
                    }else{
                      return  <span className="order-axios">
                       <a  onClick={()=>this.orderdellist(record)}>删除</a>
                       <a onClick={()=> this.yulan(record)}>预览</a>
                     </span>
                    }
                    
                }
            },
        
        ];



        return (
            <div>
                <div className="top">
                    <div className="top-title">订单列表</div>
                </div>
                <div className="quire">
                    <div className="quire-title">
                        <div>筛选查询</div>
                        <div className="chaxun" onClick={this.Cusinfoquery}>查询结果</div>
                    </div>
                    <div className="condition flex-row">
                        <div>
                            <label >创建日期：</label><Input style={{width:'150px'}} value={this.orderDate} onChange={this.setDate} type="date"></Input>
                        </div>
                        <div>
                            <label >销售类型：</label>
                            <Select className="xiaoshou" onChange={(value)=> this.orderxiaoshou(value)}>
                                 {xiaoshou}
                            </Select>
                        </div>
                        <div>
                            <label >订单类型：</label>
                            <Select className="xiaoshou" onChange={(value)=> this.orderdingdan(value)}>
                                <Option value="普通订单">普通订单</Option>
                                <Option value="退货订单">退货订单</Option>
                            </Select>
                        </div>
                        <div>
                            <label >客户类型：</label>
                            <Select className="xiaoshou" onChange={(value)=> this.orderkehu(value)}>
                                {kehu}
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
                    rowSelection={rowSelection} 
                    columns={columns} 
                    align="center"
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

                      <Modal
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
							<p>编号：</p>
							<Input defaultValue={bianji.sales_id} style={{width:'170px'}} disabled></Input>
						</div>
						<div className='modal-item'>
							<p>订单类型：</p>
							<Select defaultValue={bianji.sales_type_name} onChange={(value) => this.editorder(value)}  style={{ width: '60%' }}>
								<Option value='普通订单'>普通订单</Option>
								<Option value='退货订单'>退货订单</Option>
							</Select>
						</div>
						<div className='modal-item'>
							<p>配送车辆：</p>
							<Select defaultValue={bianji.vehicle_id} onChange={(value) => this.editordercar(value)} style={{ width: '60%' }}>
						       	{ordercar2}
							</Select>
						</div>
					</Modal>
                </div>
            </div>
        )
    }
}



//  function mapDispatchToProps(dispath){
//     return{
//       yulan:(record)=>dispath(yulanAction(record,history)),
//      }
//   }

// export default connect(
//     null,
//     mapDispatchToProps
//     )
// (Order);
