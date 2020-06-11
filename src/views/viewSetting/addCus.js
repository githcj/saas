// import React, { useState,useEffect } from 'react'
import React, { Component } from 'react'
import axios from 'axios'
import '../../assets/css/sales/order.css'
import { Table, Button } from 'antd';





export default class addCus extends Component {
    constructor(props) {
        super(props);
        this.state = {
           userName:'',
           yymianji:'',
           phone:'',
           person:'',
           fzperson:''

        };
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
        const { userName, yymianji ,phone ,person , fzperson } = this.state;
    

        return (
            <div className="addcus">
                 <div className="top">
                    <div className="top-title">添加客户</div>
                </div>
                <div className="quire">
                    <div className="quire-title ">
                        <div>添加客户</div>
                    </div>
                    <div className="cont">
                         <div className="left">
                             <label className="right">客户名称：</label>
                             <input   value={userName} onchange={this.setName} ></input>
                         </div>
                         <div className="left">
                             <label  className="right">客户地址：</label>
                             <input  value={userName} onchange={this.setName} ></input>
                         </div>
                         <div className="left">
                         <label className="right">客户类型：</label>
                            <select className="xiaoshou2">
                                <option value="全部">类型1</option>
                                <option value="车销">类型2</option>
                                <option value="仿销">类型3</option>
                            </select>
                         </div>
                         <div className="left">
                         <label className="right">价格体系：</label>
                            <select className="xiaoshou2">
                                <option value="全部">类型1</option>
                                <option value="车销">类型2</option>
                                <option value="仿销">类型3</option>
                            </select>
                         </div>
                         <div  className="left">
                             <label className="right">营业面积：</label>
                             <input  value={yymianji} onchange={this.setyymianji} ></input>
                         </div>
                         <div  className="left">
                             <label className="right">联系人：</label>
                             <input  value={person} onchange={this.setperson} ></input>
                         </div>
                         <div className="left">
                             <label className="right">手机号码：</label>
                             <input   value={phone} onchange={this.setphone} ></input>
                         </div>
                         <div  className="left">
                             <label className="right">负责人员：</label>
                             <input   value={fzperson} onchange={this.setfzperson} ></input>
                         </div>
                         <div  className="left">
                         <label className="right">区域名称：</label>
                            <select className="xiaoshou2" >
                                <option value="全部">类型1</option>
                                <option value="车销">类型2</option>
                                <option value="仿销">类型3</option>
                            </select>
                         </div>
                         <Button  className="left">提交</Button>
                    </div>
                  </div>
            </div>
        )
    }
}
