import React from 'react';
import '../../assets/css/purchase.css'

import { Table, Tag, Space } from 'antd';
import {
    SearchOutlined,
    SyncOutlined,
    UpOutlined,
    UnorderedListOutlined
  } from '@ant-design/icons';

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
    {
      key: '1',
      serialNum:10001,
      name: 'John Brown',
      sales: '￥3,000.00',
      distribution: '￥3,000.00',
    },
    {
      key: '2',
      serialNum:10002,
      name: 'Jim Green',
      sales: '￥3,000.00',
      distribution: '￥3,000.00',
    },
    {
      key: '3',
      serialNum:10003,
      name: 'Joe Black',
      sales: '￥3,000.00',
      distribution: '￥3,000.00',
    },
];
const Admin = (props) => {
    return(
        <div className="admin">
            <div className='dynamic-top'>
                <div className='dynamic-top-left'>
                    <div className='dynamic-top-left-mark'></div>
                    <p className='dynamic-top-word'>采购管理</p>
                </div>
                <div className='dynamic-top-right'>
                    <SyncOutlined />
                    <p className='dynamic-top-word'>刷新</p>
                </div>
            </div>
            <div className="purchase-search">
               <div className="purchase-top">
                    <div>
                        <SearchOutlined />
                        <p>筛选查询</p>
                    </div>
                    <div>
                        <UpOutlined />
                        <p>收起筛选</p>
                    </div>
                    <div>
                        <p>查询结果</p>
                    </div>
                </div>
            </div>
            <div className="purchase-table">
                <Table columns={columns} dataSource={data}></Table>
            </div>
        </div>
    )
}

export default Admin