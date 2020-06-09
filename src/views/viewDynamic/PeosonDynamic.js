import React from 'react'
import '../../assets/css/dynamic/PersonDynamic.css'
import {
    SearchOutlined,
    SyncOutlined,
    UnorderedListOutlined
  } from '@ant-design/icons'
import { Table, Select } from 'antd'
import axios from 'axios'

class PersonDynamic extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data:[],
            eachPage:10
        }
    }
    //组件挂载完毕加载
    componentWillMount() {
        axios({
            method:'GET',
            url:'http://119.23.228.238:3031/mock/47/personDynamic'
        })
        .then(res => {
            this.setState({
                data:res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    //每页条数改变
    pageNumChange = (value) => {
        if(value === 'ten') {
            this.setState({
                eachPage:10
            })
        }
        if(value === 'twenty') {
            this.setState({
                eachPage:20
            })
        }
        if(value === 'thirty') {
            this.setState({
                eachPage:30
            })
        }
    }
    render() {
        const { Option } = Select
        const { data, eachPage } = this.state
        let columns = [
            {
                title: '序号',
                dataIndex: 'serialNum',
                key: 'serialNum',
            },
            {
                title: '人员名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '销售额',
                dataIndex: 'sales',
                key: 'sales',
            },
            {
                title: '配送额',
                dataIndex: 'distribution',
                key: 'distribution',
            },
        ];
        //给表格数据添加 key 值
        for(let i = 0; i < data.length; i++){
            data[i].key = i
        }
        //排序方式改变
        function sortChange (value) {
            if(value === 'saleLowHight') {
                columns[2].sorter = (a, b) => a.sales - b.sales
                console.log(columns[2])
            }
        }

        return (
            <div className='person-dynamic'>
                <div className='dynamic-top'>
                    <div>
                        <div className='dynamic-top-left'>
                            <div className='dynamic-top-leftmark'></div>
                            <p className='dynamic-top-word'>人员销售动态</p>
                        </div>
                        <div className='dynamic-top-right'>
                            <SyncOutlined />
                            <p className='dynamic-top-word'>刷新</p>
                        </div>
                    </div>
                </div>
                <div className='dynamic-query'>
                    <div className='dynamic-left-title'>
                        <SearchOutlined style={{fontSize:'20px'}}/>
                        <span style={{fontSize:'14px'}}>筛选查询</span>
                    </div>
                    <div className='dynamic-query-filter'>
                        <div className='dynamic-query-filteritem'>本日</div>
                        <div className='dynamic-query-filteritem'>最近7日</div>
                        <div className='dynamic-query-filteritem'>最近30天</div>
                        <div className='dynamic-query-filteritem'>本月</div>
                    </div>
                </div>
                <div className='dynamic-dataList'>
                    <div className='dynamic-left-title'>
                        <UnorderedListOutlined style={{fontSize:'20px'}}/>
                        <span style={{fontSize:'14px'}}>数据列表</span>
                    </div>
                    <div className='dynamic-right-title'>
                        <Select defaultValue="显示条数" style={{ width: 120 }} onChange={this.pageNumChange}>
                            <Option value="ten">每页10条</Option>
                            <Option value="twenty">每页20条</Option>
                            <Option value="thirty">每页30条</Option>
                        </Select>
                        <Select defaultValue="排序方式" style={{ width: 150 }} onChange={sortChange}>
                            <Option value="saleHightLow">销售额从高到低</Option>
                            <Option value="saleLowHight">销售额从低到高</Option>
                            <Option value="disLowHight">配送额从低到高</Option>
                            <Option value="disHightLow">配送额从高到低</Option>
                        </Select>
                    </div>
                </div>
                <div className='dynamic-dataTable'>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        pagination={{
                            showQuickJumper:true,
                            showTotal:(total) => {
                                return (
                                    <p>共有{
                                        Math.ceil(total / eachPage)
                                    }页/{total}条数据</p>
                                )
                            },
                            pageSize:eachPage
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default PersonDynamic