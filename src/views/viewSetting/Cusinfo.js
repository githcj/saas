// import React, { useState,useEffect } from 'react'
import React, { Component } from 'react'
import axios from 'axios'
import '../../assets/css/sales/order.css'
import { Table, Button } from 'antd';
import { NavLink, Route, Redirect } from 'react-router-dom'
import addCus from '../viewSetting/addCus'
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
        render: () => (
          <span>
               <a>编辑</a>
               <a>删除</a>
          </span>
        )
    },

];


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
            dates:''
        };
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

    // onSelectChange = selectedRowKeys => {
    //     console.log('selectedRowKeys changed: ', selectedRowKeys);
    //     this.setState({ selectedRowKeys });
    // };
    render() {
        const { orderList, selectedRowKeys ,phone ,sousuo , dates } = this.state;
        // const rowSelection = {
        //     selectedRowKeys,
        //     onChange: this.onSelectChange,
        // };
        // const hasSelected = selectedRowKeys.length > 0;

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

                <div className="table">
                    <div style={{ marginBottom: 16 }}>
                        {/* <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    Reload
                </Button> */}
                        {/* <span style={{ marginLeft: 8 }}>
                            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                        </span> */}
                    </div>
                    <div className="quire-title ">
                        <div>数据列表</div>
                       
                        <NavLink  to={msg + '/addCus'} className="chaxun">添加</NavLink>
                    </div>
                    <Table 
                    // rowSelection={rowSelection} 
                    columns={columns} 
                    dataSource={orderList}
                    bordered />
                </div>
            </div>
        )
    }
}
