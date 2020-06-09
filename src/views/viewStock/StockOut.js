import React, { Component } from 'react'
import { Table } from 'antd'
import {SyncOutlined,SearchOutlined } from '@ant-design/icons'
import '../../assets/css/viewStock/stockout.css'

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }


export default class StockOut extends Component{
    constructor(props){
        super(props)
        this.state = {
            search:[{

            }]
        }
    }
    render(){
        return (
            <div className="stockOut">
                <header>
                    <div className="stockout-top">
                        <div className='stockout-top-left'>
                            <div className='stockout-top-leftmark'></div>
                            <p className='stockout-top-word'>出库管理</p>
                        </div>
                        <div className='stockout-top-right'>
                            <SyncOutlined />
                            <p className='stockout-top-word'>刷新</p>
                        </div>
                    </div>
                </header>

                <section>
                    <div className="screen">
                        <SearchOutlined />
                        <span>筛选查询</span>
                    </div>
                    <div className="search">

                    </div>
                </section>

                <div className="table">
                    <Table 
                    dataSource={data} 
                    columns={columns} 
                    style={{
                        border:'1px solid'
                    }}/>
                </div>
            </div>
        )
    }
}