// import React, { useState,useEffect } from 'react'
import React, { useState ,useEffect} from 'react'
// import axios  from 'axios'
import '../../assets/css/sales/order.css'
import { Table, Button } from 'antd';

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
    {
       title: 'Axios',
       dataIndex: 'axios',
        render:()=> <a>delete</a>
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

const  Order = ()=>{
    const [ orderDate , setOrderDate ] = useState('')
    const [ selectedRowKeys , setselectedRowKeys] = useState([]) 
    const [loading , setloading] = useState(false)


    const setDate =(e)=>{
        setOrderDate(e.target.value)
        console.log(orderDate);
        
    }
   const start = () => {
       setloading(true)
       setTimeout(() => {
        setselectedRowKeys([])
        setloading(false)
      }, 1000);
    }

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
      
    };
 



        const rowSelection = {
            selectedRowKeys,
            onChange:onSelectChange,
          };
    
          const hasSelected = selectedRowKeys.length > 0;
          
      console.log(hasSelected,'has')


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
                         <label >创建日期：</label><input  value={orderDate} onChange={setDate} type="date"></input>
                     </div>
                     <div>
                        <label >销售类型：</label>
                        <select  className="xiaoshou">
                            <option value="全部">全部</option>
                            <option value="车销">车销</option>
                            <option  value="仿销">仿销</option>
                        </select>
                     </div>
                     <div>
                         <label >订单类型：</label>
                         <select  className="xiaoshou">
                            <option value="全部">全部</option>
                            <option value="普通订单">普通订单</option>
                            <option  value="退货订单">退货订单</option>
                         </select>
                     </div>
                     <div>
                         <label >客户类型：</label>
                         <select  className="xiaoshou">
                            <option value="全部">全部</option>
                            <option value="客户A型">客户A型</option>
                            <option  value="客户B型">客户B型</option>
                         </select>
                         
                     </div>
                </div>
            </div>

            <div className="table">
                <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    Reload
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
             </div>


            
        </div>
      

       

    )
}

export default Order