// import React, { useState,useEffect } from 'react'
import React, { Component } from 'react'
import axios from 'axios'
import '../../assets/css/sales/order.css'
import { Table, Button ,Select,Modal} from 'antd';

import { NavLink, Route, Redirect } from 'react-router-dom'
import addCus from '../viewSetting/addCus'
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
            bianji:[]
        };
    }

    showModal = async(row) => {

	  await	this.setState({
              visible: true,
              bianji:row
        });
        console.log(this.state.bianji,'123123123');
        
	}
	handleOk = e => {
		console.log(e);
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


    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://119.23.228.238:3031/mock/47/custorm',
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

    setphone = (e) => {
        this.setState({
            phone: e.target.value
        })
    }

    setsousuo = (e) => {
      this.setState({
          sousuo: e.target.value
      })
  }

  setdates = (e) => {
    this.setState({
        dates: e.target.value
    })
}

    render() {
        const { orderList,phone ,sousuo , dates ,eachPage,bianji } = this.state;
        const columns = [
            {
                title: '客户名称',
                dataIndex: 'useName',
            },
            {
                title: '客户类型',
                dataIndex: 'Customer',
            },
            {
                title: '联系人',
                dataIndex: 'person',
            },
            {
              title: '手机号',
              dataIndex: 'phone',
            },
            {
            title: '地址',
            dataIndex: 'addres',
            },
            {
              title: '创建人',
              dataIndex: 'cjperson',
            },
            {
              title: '负责人',
              dataIndex: 'fzperson',
            },
            {
              title: '创建时间',
              dataIndex: 'timedate',
            },
            {
                title: 'Axios',
                render: (text,row,index) => (
                  <span>
                       <a onClick={()=> this.showModal(row)}>编辑</a>
                       <a>删除</a>
                  </span>
                )
            },
        
        ];

        for (let i = 0; i < orderList.length; i++) {
            orderList[i].key = i
        }
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
                        <div className="chaxun">查询结果</div>
                    </div>
                    <div className="flex-row condition4 ">
                        <div className="bianju">
                            <label >输入搜索：</label><input placeholder="搜索" value={sousuo} onChange={this.setsousuo} ></input>
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
							<input value={bianji.useName}></input>
						</div>
						<div className='modal-item'>
							<p>客户类型：</p>
							<Select defaultValue={bianji.Customer} style={{ width: '60%' }}>
								<Option value='11233'>Jack</Option>
								<Option value="lucy">Lucy</Option>
								<Option value="Yim">yim</Option>
							</Select>
						</div>
						<div className='modal-item'>
							<p>联系人：</p>
							<Select defaultValue={bianji.person} style={{ width: '60%' }}>
								<Option value="shelve">上架</Option>
								<Option value="xiajia">下架</Option>
							</Select>
						</div>
                        <div className='modal-item'>
							<p>手机号：</p>
                            <input value={bianji.phone}></input>
						</div>
                        <div className='modal-item'>
							<p>地址：</p>
                            <input value={bianji.addres}></input>
						</div>
                        <div className='modal-item'>
							<p>创建人：</p>
                            <input value={bianji.cjperson}></input>
						</div>
                        <div className='modal-item'>
							<p>负责人：</p>
                            <input value={bianji.fzperson}></input>
						</div>
                        <div className='modal-item'>
							<p>创建日期：</p> 
                            <input value={bianji.timedate}></input>
						</div>
					</Modal>
            </div>
        )
    }
}
