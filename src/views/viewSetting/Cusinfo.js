// import React, { useState,useEffect } from 'react'
import React, { Component } from 'react'
import axios from '../../plugins/axios'
import '../../assets/css/sales/order.css'
import { Table, Button ,Select,Modal,message} from 'antd';

import { NavLink, Route, Redirect } from 'react-router-dom'
import addCus from '../viewSetting/addCus'
import locale from 'antd/lib/date-picker/locale/en_US';
const {Option} = Select



export default class Cusinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            orderDate: '',
            orderList: [],
            sousuo:'',
            phone:'',
            dates:'',
            eachPage:10,
            visible:false,
            bianji:[],
            query:[],
            kehutype:[],
            fuzeperson:[],
            value:0,
            usertype:0,
            date:'',
            delvis: false,
            confirmLoading: false,
            delid:''

        };
    }

    modelkehumingc =(e) =>{
          const bianji=this.state.bianji
          bianji.customer_name=e.target.value

          this.setState({
              bianji:bianji
          })
    }

    modellianxi =(e)=>{
        const bianji=this.state.bianji
        bianji.customer_contacts=e.target.value
        this.setState({
            bianji:bianji
        })
    }
    modelphone =(e)=>{
        const bianji=this.state.bianji
        bianji.customer_phone=e.target.value
        this.setState({
            bianji:bianji
        }) 
    }

    modeladdres =(e)=>{
        const bianji=this.state.bianji
        bianji.customer_address=e.target.value
        this.setState({
            bianji:bianji
        }) 
    }
    modelchuangjian =(e)=>{
        const bianji=this.state.bianji
        bianji.customer_creater=e.target.value
        this.setState({
            bianji:bianji
        })   
    }

    modeldata =(e)=>{
        console.log(e.target.value,'value');
        
        const bianji=this.state.bianji
        bianji.customer_create_time=e.target.value
        this.setState({
            bianji:bianji
        }) 
        console.log(this.state.bianji,'bianji');
        
    }


    showModal = async(row) => {
    
	  await	this.setState({
              visible: true,
              bianji:row,
           
        });
	}
	handleOk = e => {
         const  id = localStorage.getItem('username')
         const tokens= localStorage.getItem('token')
         
        axios({
            method: 'POST',
            url: '/customer/update',
            data:{
                token:tokens,
                customer_id:this.state.bianji.customer_id,
                customer_name:this.state.bianji.customer_name,
                customer_address:this.state.bianji.customer_address,
                customer_type_id:this.state.usertype,
                customer_contacts:this.state.bianji.customer_contacts,
                customer_phone:this.state.bianji.customer_phone,
                emp_id:this.state.value,
                customer_create_time:id
            }
        })
        .then(res => {
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
              delvis:false
		});
    }
    
    

   async  componentDidMount() {
    const tokens= localStorage.getItem('token')
    
         await  axios({
                method: 'POST',
                url: '/customer/queryall',
                data:{
                    token:tokens
                }
            })
           .then(res => {
               console.log(res.data.data,'客户数据请求');
               
                  this.setState({
                    orderList: res.data.data
                })
              
                for (let i = 0; i < this.state.orderList.length; i++) {
                    this.state.orderList[i].key = i
                }
                
                console.log(this.state.orderList,'order');
                
            })
            .catch(err => {
                console.log(err);
            })

            await   axios({
                method: 'POST',
                url: '/combobox/customer',
                data:{
                    token:tokens
                }
            })
                .then(res => {
                    this.setState({
                        kehutype: res.data.data
                 })  
                 console.log('kehutype',this.state.kehutype)  
                })
                .catch(err => {
                    console.log(err,'err');
                })

                axios({
                    method: 'POST',
                    url: '/person/in_charge',
                    data:{
                        token:tokens
                    }
                })
                    .then(res => {
                        this.setState({
                            fuzeperson: res.data.data
                        })
                        console.log(this.state,'fuze');
                    })
                    .catch(err => {
                        console.log(err,'err');
                    })
     }

    setphone = (e) => {
        this.setState({
            phone:e.target.value,
        })
    }

    setsousuo = (e) => {
        this.setState({
            sousuo: e.target.value
        })
    }

  setdates = (e) => {
        this.setState({
            dates:e.target.value,
        })
      }
        Cusinfoquery =()=>{
            const tokens= localStorage.getItem('token')
           console.log(this.state.sousuo); 
            axios({
                method: 'POST',
                url: '/customer/wherequery',
                data:{
                    token:tokens,
                    customer_name:this.state.sousuo,
                    customer_phone:this.state.phone,
                    customer_create_time:this.state.dates 
                }
            })
                .then(res => {
                    this.setState({
                        orderList: res.data.data
                    })
                    console.log(this.state.orderList);
                })
                .catch(err => {
                    console.log(err);
                })    
        }

        modelfuze = async(value)=>{
         
           const fuze = this.state.fuzeperson.filter((v,i)=>{
               return v.emp_name  == value
           })

           const fuzeid=fuze[0].emp_id
           await this.setState({
                  value:fuzeid
              })
        }

        modelkehu =async(value)=>{
            const fuze = this.state.kehutype.filter((v,i)=>{
                return v.customer_type_name == value
            })
 
            const fuzeid=fuze[0].customer_type_id
            console.log(fuzeid,'fuze');
            
            await this.setState({
                usertype:fuzeid
            })
         
        }


           delkehu =(row)=>{
              this.setState({
                delvis: true,
              })
             

             const id=this.state.orderList.filter((v,i)=>{
                  return v.customer_id == row.customer_id
              })
             console.log(id,'id');
            
              const ids=id[0].customer_id
            //  console.log(ids,'ids');
             this.setState({
                 delid:ids
             })

             
        }

        delhandok =()=>{
                  const tokens= localStorage.getItem('token')
                    axios({
                        method: 'POST',
                        url: '/customer/delete',
                        data:{
                            token:tokens,
                            customer_id:this.state.delid
                        }
                    })
                        .then(res => {
                            this.setState({
                                confirmLoading: true,
                            })
                            setTimeout(() => {
                                this.setState({
                                  delvis: false,
                                  confirmLoading: false,
                                });
                              }, 1000);
                            console.log(res.message ,'成功');
                            console.log(this,'this')
                            this.componentDidMount() 
                        })
                        .catch(err => {
                            console.log(err);
                        })   
        }

    render() {
        const { orderList,phone ,sousuo,kehutype , fuzeperson,dates ,eachPage,bianji } = this.state;
        const columns = [
            {
                title: '客户名称',
                dataIndex: 'customer_name',
            },
            {
                title: '客户类型',
                dataIndex: 'customer_type_name',
            },
            {
                title: '联系人',
                dataIndex: 'customer_contacts',
            },
            {
              title: '手机号',
              dataIndex: 'customer_phone',
            },
            {
            title: '地址',
            dataIndex: 'customer_address',
            },
            {
              title: '创建人',
              dataIndex: 'customer_creater',
            },
            {
              title: '负责人',
              dataIndex: 'emp_name',
            },
            {
              title: '创建时间',
              align:'center',
              dataIndex: 'customer_create_time',
              render:(text,row,index)=> (
                  <span>
                      {new Date(text).toLocaleString()}
                  </span>
              )
            },
            {
                title: 'Axios',
                align:'center',
                render: (text,row,index) => (
                  <span className="order-axios">
                       <a onClick={()=> this.showModal(row)}>编辑</a>
                       <a onClick={()=> this.delkehu(row)}>删除</a>
                  </span>
                )
            },
        ];
        const kehu=kehutype.map((item,index) =>(
             <Option value={item.customer_type_name}>
                 {item.customer_type_name}
            </Option>
        ))
        

        const fuzeren=fuzeperson.map((item,index) =>(
            
            <Option value={item.emp_name}>
                {item.emp_name}
           </Option>
       ))



        const {match, msg} =this.props
        console.log(this.props)
        return (
            <div>
                <div className="top">
                    <div className="top-title">订单列表</div>
                </div>
                <div className="quire">
                    <div className="quire-title ">
                        <div>筛选查询</div>
                        <div className="chaxun" onClick={this.Cusinfoquery}>查询结果</div>
                    </div>
                    <div className="flex-row condition4 ">
                        <div className="bianju">
                            <label >输入搜索：</label><input placeholder="搜索" value={this.sousuo} onChange={this.setsousuo }></input>
                        </div>
                        <div className="bianju" >
                            <label >手机号：</label>
                            <input  placeholder="请输入手机号" value={phone} onChange={this.setphone} ></input>
                        </div>
                        <div className="bianju">
                            <label >创建时间：</label>
                             <input type="date" placeholder="选择时间" value={dates} onChange={this.setdates}  ></input>
                        </div>
                        
                    </div>
                </div>

                <div className="table2">
                    <div style={{ marginBottom: 16 }}>
                    </div>
                    <div className="quire-title ">
                        <div>数据列表</div>
                        <NavLink  to={msg + '/addCus'} className="chaxun">添加</NavLink>
                    </div>
                    <Table 
                    // rowSelection={rowSelection} 
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
                </div>


                     {/* 删除模态框 */}
                                    <Modal
                                        title="Title"
                                        visible={this.state.delvis}
                                        onOk={this.delhandok}
                                        confirmLoading={this.state.confirmLoading}
                                        onCancel={this.handleCancel}
                                        >
                                           <p>是否确认删除</p>
                                        </Modal>


                
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
							<p>客户名称：</p>
							<input value={bianji.customer_name} onChange={this.modelkehumingc}></input>
						</div>
						<div className='modal-item'>
							<p>客户类型：</p>
							<Select defaultValue={bianji.customer_type_name} onChange={(value)=> this.modelkehu(value)} style={{ width: '60%' }}>
								 {kehu}
							</Select>
						</div>
						<div className='modal-item'>
							<p>联系人：</p>
							<input value={bianji.customer_contacts} onChange={this.modellianxi}></input>
						</div>
                        <div className='modal-item'>
							<p>手机号：</p>
                            <input value={bianji.customer_phone} onChange={this.modelphone}></input>
						</div>
                        <div className='modal-item'>
							<p>地址：</p>
                            <input value={bianji.customer_address} onChange={this.modeladdres}></input>
						</div>
                        <div className='modal-item'>
							<p>创建人：</p>
                            <input value={bianji.customer_creater}  onChange={this.modelchuangjian}></input>
						</div>
                        <div className='modal-item'>
							<p>负责人：</p>
                            <Select defaultValue={bianji.emp_name} onChange={(value)=> this.modelfuze(value)} style={{ width: '60%' }}>
								 {fuzeren}
							</Select>
						</div>
                        <div className='modal-item'>
							<p>创建日期：</p> 
                            <input  value={new Date(bianji.customer_create_time).toLocaleString()} disabled onChange={this.modeldata}></input>
						</div>
					</Modal>
            </div>
        )
    }
}
