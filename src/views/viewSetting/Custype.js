// import React, { useState,useEffect } from 'react'
import React, { Component } from 'react'
import axios from 'axios'
import '../../assets/css/sales/order.css'
import { Table, Button } from 'antd';

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


export default class Custype extends Component {
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

        return (
            <div>
                <div className="top">
                    <div className="top-title">客户类型</div>
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
                        <div className="chaxun">添加</div>
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
