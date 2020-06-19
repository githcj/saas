import React, {Component ,useState, useEffect} from 'react'
import { connect } from "react-redux";
import '../../assets/css/sales/order.css'
import { Table, Button,Radio, Select } from 'antd';
import {
    SearchOutlined,
    SyncOutlined,
    UpOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons'
import axios from 'axios'
const { Option } = Select



export default class OrderDetail extends Component {
    constructor(props) {
		super(props)
		this.state = {
            z: [],
            goods:[],
            sum:0
		}
    }

        // console.log(props);
        // const {location} = props
        //  const [z,setz] = useState('')
        //   const [goods,setgoods] = useState([])

        //   console.log(location.params,'params');
          
       
        componentDidMount(){
            const {location} =this.props
             axios({
                method: 'POST',
                url: 'http://172.16.6.29:8080/sales/querySales', 
                data:{
                    token:'123',
                    sales_id: location.params
                }
            })    
           .then(res =>{
                this.setState({
                    z:res.data,
                    goods:res.data.salesDetailList
                    })     
                    console.log(this.state.goods,'goods'); 
                    var suma = 0;
                    for(var i=0 ; i<this.state.goods.length ; i++){
                         suma += this.state.goods[i].total_price
                    }
                    this.setState({
                        sum:suma
                    }) 
               })
           .catch(err =>{
                 console.log('err',err);  
                })

               
                
        

        }

    

    

    render(){
        const goodscolumns = [
            {
                title: '商品名称',
                align:'center',
                dataIndex: 'goods_name',
            },
            {
                title: '单价/大单位',
                align:'center',
                // dataIndex: 'goodsname',
                render: (text, record, index) => 
                  <span>{record.whole_price + '/' + record.whole_unit}</span>
            },
            {
                title: '数量',
                align:'center',
                dataIndex: 'whole_num',
            },
            {
                title: '小单位/单价',
                align:'center',
                render: (text, record, index) =>
                    <span>
                        {record.single_price + '/' + record.single_unit}
                    </span>
    
            },
            {
                title: '数量',
                align:'center',
                dataIndex: 'single_num',
            },
            {
                title: '正常',
                align:'center',
                dataIndex: 'goods_type_name',
            },
            {
                title: '金额',
                align:'center',
                dataIndex: 'total_price',
                // render: (text, record, index) => {
                //     return <span>{Math.abs(record.whole_price * record.whole_num + record.single_price * record.single_num).toString()}</span>
                // }
            },
        ];
        const {z,goods,sum} =this.state
        const {location} =this.props
    //     const sum=0
    //    for(let i=0 ; i<goods.length ; i++){
    //         sum += goods[i].total_price
    //    }
       

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
                             <div>编号 ：{location.params}</div>
                         </div>
                        <div className="condition2 flex-row">
                            <div className="bianju3">编号类型：{z.sales_id}</div>
                            <div className="bianju3">客户名称：{z.customer_name}</div>
                            <div className="bianju3">业务员：  {z.salesman}</div>
                            <div className="bianju3">出货仓库：{z.ware_name}</div>
                            <div className="bianju3">发货日期：{z.create_time}</div>
                            <div className="bianju3">销售类型：{z.sales_method_name}</div>
                            <div className="bianju3">配送车辆：{z.vehicle_id}</div>
                       </div>     
                     
     
                     </div>
     
                          <div className="table2">
                          <Table  
                         columns={goodscolumns} 
                         dataSource={z.salesDetailList}
                         bordered 
                         />
                          </div>
     
                          <footer>
                     <div className="payInfo">
                         <p>付款信息</p>
                     </div>
                     <div className="payInfo-detail">
     
                         <div>
                             <span className="span-one">应付款金额：</span>
                             <span className="span-two">{sum}</span>
                         </div>
                         <div>
                             <button type="button">提交</button>
                         </div>
                     </div>
                 </footer>
                      
            </div>
        )
    }
}
 
   



