import React, { Component } from 'react'
import {
    Modal,
    Popconfirm,
    message,
    Switch,
    Table,
    DatePicker,
    Select,
  } from "antd";


 export default class Delete extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render() {
        function confirm(e) {
            console.log(e);
            message.success("Click on Yes");
          }
      
          function cancel(e) {
            console.log(e);
            message.error("Click on No");
          }
        return(
            <div>
            <Popconfirm
              title="您确定要删除这条数据吗"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">删除</a>
            </Popconfirm>
            </div>
        )
    }
}