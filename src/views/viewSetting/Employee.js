import React from 'react'
import { Table, Select , Switch, message ,  } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'
import ConTitle from '../../components/ConTitle'

const { Option } = Select

const Employee = (props)=> {
  // const {match, history} = props
  return (
    <div className="stockOut">
                <header>
                    <div className="stockout-top">
                        <ConTitle titleName='员工管理' />
                    </div>
                </header>
                <div className='dynamic-dataList'>
                    <div className='dynamic-left-title'>
                        <UnorderedListOutlined style={{fontSize:'18px'}}/>
                        <span style={{fontSize:'14px'}}>数据列表</span>
                    </div>
                    <div className="purchase-table-se2">
                        <div className="addDiv">添加</div>
                        <Select defaultValue="显示条数" style={{ width: 120 }} onChange={this.pageNumChange}>
                            <Option value="10">10条/页</Option>
                            <Option value="15">15条/页</Option>
                            <Option value="20">20条/页</Option>
                        </Select>
                        <Select defaultValue="排序方式" className="seen" style={{ width: 150 }} onChange={this.sortChange}>
                            <Option value="addName">员工姓名升序</Option>
                            <Option value="eddName">员工姓名降序</Option>
                            {/* <Option value="addNum">员工数量升序</Option>
                            <Option value="eddNum">员工数量降序</Option> */}
                        </Select>
                    </div>
                </div>

                <div className="table">
                    <Table 
                    dataSource={this.state.departList} 
                    columns={this.columns} 
                    bordered
                    rowKey={this.state.departList.dep_id}
                    pagination={{
                        showQuickJumper:true,
                        showTotal:(total) => {
                            return (
                                <p>共有{
                                    Math.ceil(total / this.state.eachPage)
                                }页/{total}条数据</p>
                            )
                        },
                        pageSize:this.state.eachPage
                    }}
                    />
                </div>

                {/* <DepartFrom
                    {...this.state}
                    onCreate={this.onFinish}
                    onCancel={this.handleCancel}
                /> */}
            </div>
  )
}

export default Employee