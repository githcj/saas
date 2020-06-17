import React, {Component } from 'react'
import { connect } from "react-redux";
import '../../assets/css/sales/order.css'
import { Table, Button,Radio, Select } from 'antd';
import {
    SearchOutlined,
    SyncOutlined,
    UpOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons'
const { Option } = Select



const orderDetail = (props)=> {
        console.log(props);
        const {location} = props

   return(
       <div>
             <div className='dynamic-top'>
                    <div>
                        <div className='dynamic-top-left'>
                            <div className='dynamic-top-leftmark'></div>
                            <p className='dynamic-top-word'>订单预览-普通订单</p>
                        </div>
                        <div className='dynamic-top-right'>
                            <SyncOutlined />
                            <p className='dynamic-top-word'>返回</p>
                        </div>
                    </div>
                </div>

                <div className="quire">
                    <div className="quire-title">
                        <div >基本信息</div>
                        <div>编号 ：123</div>
                    </div>
                   <div className="condition2 flex-row">
                       <div className="bianju3">编号类型：{location.params.sales_id}</div>
                       <div className="bianju3">客户名称：{location.params.customer_name}</div>
                       <div className="bianju3">业务员：{location.params.salesman}</div>
                       <div className="bianju3">出货仓库：{location.params.ware_name}</div>
                       <div className="bianju3">发货日期：{location.params.create_time}</div>
                       <div className="bianju3">销售类型：{location.params.sales_method_name}</div>
                       <div className="bianju3">配送车辆：{location.params.vehicle_id}</div>
                  </div>    
                

                </div>

           
       </div>
   )
}
 
   
function mapStateToProps(state){
    return {
       detail:state.order  
      }
 }

export default connect(
    mapStateToProps
    )
(orderDetail);

