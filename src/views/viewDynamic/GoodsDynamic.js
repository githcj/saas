import React from 'react'
import '../../assets/css/dynamic/PersonDynamic.css'
import {
    SearchOutlined,
    SyncOutlined,
    UnorderedListOutlined
  } from '@ant-design/icons'
import { Table, Select } from 'antd'
import axios from '../../plugins/axios'

class GoodsDynamic extends React.Component {
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
            method:'POST',
            url:'/sales_trends/goods_queryall',
            data:{
                token:'dasdas'
            }
        })
        .then(res => {
            this.setState({
                data:res.data.data
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
    //排序
    sortChange = (value) => {
        const newData = [...this.state.data]
        if(value === 'saleLowHight') {
            newData.sort((a, b) => {
                return a.goods_num - b.goods_num
            })
        }
        if(value === 'saleHightLow') {
            newData.sort((a, b) => {
                return b.goods_num - a.goods_num
            })
        }
        if(value === 'amountLowHight') {
            newData.sort((a, b) => {
                return a.whole_num - b.whole_num
            })
        }
        if(value === 'amountHightLow') {
            newData.sort((a, b) => {
                return b.whole_num - a.whole_num
            })
        }
        this.setState({
            data: newData
        })
    }
    render() {
        const { Option } = Select
        const { data, eachPage } = this.state
        const columns = [
            {
                title: '序号',
                dataIndex: 'goods_id',
                key: 'goods_id',
            },
            {
                title: '商品名称',
                dataIndex: 'goods_name',
                key: 'goods_name',
            },
            {
                title: '销售额',
                dataIndex: 'goods_num',
                key: 'goods_num',
            },
            {
                title: '销量',
                dataIndex: 'whole_num',
                key: 'whole_num',
            },
        ];
        //给表格数据添加 key 值
        for(let i = 0; i < data.length; i++){
            data[i].key = i
        }
        return (
            <div className='goods-dynamic'>
                <div className='dynamic-top'>
                    <div>
                        <div className='dynamic-top-left'>
                            <div className='dynamic-top-leftmark'></div>
                            <p className='dynamic-top-word'>商品销售动态</p>
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
                        <Select defaultValue="排序方式" style={{ width: 150 }} onChange={(value) => this.sortChange(value)}>
                            <Option value="saleHightLow">销售额从高到低</Option>
                            <Option value="saleLowHight">销售额从低到高</Option>
                            <Option value="amountLowHight">销量从低到高</Option>
                            <Option value="amountHightLow">销量从高到低</Option>
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

export default GoodsDynamic