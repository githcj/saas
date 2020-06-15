import React, { Component } from 'react'
import {
    Popconfirm,
    message,
  } from "antd";


 export default class Waredelete extends Component{
    constructor(props){
        super(props)
        this.state={
            id:''
        }
    }

    Delete=()=> {
        this.props.toRecord()
    }
    Confirm= e =>  {
        console.log(e)
        message.success("删除成功")
        this.props.toDel(this.props.msg.ware_id)
    }
    render() {
        function cancel(e) {
            console.log(e)
            message.error("删除失败")
        }

        return(
            <div style={{display:'inline-block'}} className='delete'>
            <Popconfirm
              title="您确定要删除这条数据吗"
              onConfirm={this.Confirm}
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