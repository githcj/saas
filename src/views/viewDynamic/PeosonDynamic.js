import React, { useState } from 'react'
import './PersonDynamic.css'
import {
    SearchOutlined,
    SyncOutlined,
    UnorderedListOutlined
  } from '@ant-design/icons';
import { Table } from 'antd';

const PersonDynamic = (props) => {
    const columns = [
        {
            title: '序号',
            dataIndex: 'serialNum',
            key: 'serialNum',
        },
        {
            title: '人员名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '销售额',
            dataIndex: 'sales',
            key: 'sales',
        },
        {
            title: '配送额',
            dataIndex: 'distribution',
            key: 'distribution',
        },
    ];
    const data = [
        {key: '1',serialNum:10001,name: 'John Brown',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '2',serialNum:10002,name: 'Jim Green',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '3',serialNum:10003,name: 'Joe Black',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '3',serialNum:10003,name: 'Joe Black',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '1',serialNum:10001,name: 'John Brown',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '2',serialNum:10002,name: 'Jim Green',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '3',serialNum:10003,name: 'Joe Black',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '3',serialNum:10003,name: 'Joe Black',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '1',serialNum:10001,name: 'John Brown',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '2',serialNum:10002,name: 'Jim Green',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '3',serialNum:10003,name: 'Joe Black',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '3',serialNum:10003,name: 'Joe Black',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '1',serialNum:10001,name: 'John Brown',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '2',serialNum:10002,name: 'Jim Green',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '3',serialNum:10003,name: 'Joe Black',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '3',serialNum:10003,name: 'Joe Black',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '1',serialNum:10001,name: 'John Brown',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '2',serialNum:10002,name: 'Jim Green',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '3',serialNum:10003,name: 'Joe Black',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '3',serialNum:10003,name: 'Joe Black',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '1',serialNum:10001,name: 'John Brown',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '2',serialNum:10002,name: 'Jim Green',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '3',serialNum:10003,name: 'Joe Black',sales: '￥3,000.00',distribution: '￥3,000.00',},
        {key: '3',serialNum:10003,name: 'Joe Black',sales: '￥3,000.00',distribution: '￥3,000.00',},
    ];
    const [ pageSize, setPageSize ] = useState(10)
    return (
        <div className='person-dynamic'>
            <div className='dynamic-top'>
                <div className='dynamic-top-left'>
                    <div className='dynamic-top-leftmark'></div>
                    <p className='dynamic-top-word'>人员销售动态</p>
                </div>
                <div className='dynamic-top-right'>
                    <SyncOutlined />
                    <p className='dynamic-top-word'>刷新</p>
                </div>
            </div>
            <div className='dynamic-query'>
                <div className='dynamic-left-title'>
                    <SearchOutlined style={{fontSize:'20px'}}/>
                    <span style={{fontSize:'14px'}}>筛选查询</span>
                </div>
                <div className='dynamic-query-filter'>
                    <div className='dynamic-query-filteritem'>本日</div>
                    <div className='dynamic-query-filteritem'>最近7日</div>
                    <div className='dynamic-query-filteritem'>最近30天</div>
                    <div className='dynamic-query-filteritem'>本月</div>
                </div>
            </div>
            <div className='dynamic-dataList'>
                <div className='dynamic-left-title'>
                    <UnorderedListOutlined style={{fontSize:'20px'}}/>
                    <span style={{fontSize:'14px'}}>数据列表</span>
                </div>
            </div>
            <div className='dynamic-dataTable'>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    pagination={{
                        showQuickJumper:true,
                        showTotal:(total, pageSize) => {
                            return (
                                <p>共有{
                                    Math.ceil(total/pageSize) 
                                }页/{total}条数据</p>
                            )
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default PersonDynamic