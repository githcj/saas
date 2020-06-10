import React, {Component } from 'react'
import { connect } from "react-redux";
import '../../assets/css/sales/newOrder.css'
import { Table, Button,Radio, Select } from 'antd';
const { Option } = Select


const orderDetail = (props)=> {
        console.log(props);
        const {location} = props

   return(
       <div>
            {location.params.name}
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

