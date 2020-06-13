import React, { Component } from 'react'
import {
    Popconfirm,
    message,
  } from "antd";


 export default class Delete extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    Delete=()=> {
        this.props.toRecord()
    }
    render() {
        console.log(this.props.recoder)
        function confirm(e) {
            console.log(e);
            message.success("删除成功");
            
          }
      
          function cancel(e) {
            console.log(e);
            message.error("Click on No");
          }
        return(
            <div style={{display:'inline-block'}} className='delete'>
            <Popconfirm
              title="您确定要删除这条数据吗"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <a onClick={this.Delete} className='caozuoA' href="#">删除</a>
            </Popconfirm>
            </div>
        )
    }
}