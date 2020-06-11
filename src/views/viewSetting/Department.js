import React, { Component } from 'react'
import { Table, Select } from 'antd'
import ConTitle from '../../components/ConTitle'
import { UnorderedListOutlined } from '@ant-design/icons'
import '../../assets/css/viewSetting/Department.css'

const { Option } = Select

const columns = [
    {
      title: '部门名称',
      dataIndex: 'dep_name',
    },
    {
      title: '职能描述',
      dataIndex: 'dep_describe',
    },
    {
      title: '员工数量',
      dataIndex: 'emp_num',
    },{
        title: '添加时间',
        dataIndex: 'dep_addtime'
    },{
        title: '是否启用',
        
    },{
        title: '操作'
    }
  ];
  
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      dep_name: `Edward King ${i}`,
      dep_describe: '无描述',
      emp_num: `${i}`,
      dep_addtime:'2020-12-6'
    });
  }

  

export default class Department extends Component{
    constructor(props){
        super(props)
        this.state = {
            search:[{

            }]
        }
    }

    handleChange = () =>{

    }
    render(){
        return (
            <div className="stockOut">
                <header>
                    <div className="stockout-top">
                        <ConTitle titleName='部门管理' />
                    </div>
                </header>
                <div className='dynamic-dataList'>
                    <div className='dynamic-left-title'>
                        <UnorderedListOutlined style={{fontSize:'20px'}}/>
                        <span style={{fontSize:'14px'}}>数据列表</span>
                    </div>
                    <div className="purchase-table-se2">
                        <div className="addDiv">添加</div>
                        <Select defaultValue="显示条数" style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value="15">10条/页</Option>
                            <Option value="20">15条/页</Option>
                        </Select>
                        <Select defaultValue="排序方式" className="seen" style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value="15">编号递增</Option>
                            <Option value="20">编号递减</Option>
                        </Select>
                    </div>
                </div>

                <div className="table">
                    <Table 
                    dataSource={data} 
                    columns={columns} 
                    bordered

                    />
                </div>
            </div>
        )
    }
}