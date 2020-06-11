import React from 'react';
import '../../assets/css/wang/purchase.css'
import '../../assets/css/system/brandma.css'
import '../../assets/css/dynamic/PersonDynamic.css'
import { Select } from 'antd'
import { Table, Input } from 'antd'
import {
    SearchOutlined,
    SyncOutlined,
    UpOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons'
import axios from '../../plugins/axios'

const columns = [
    {
        title: '编号',
        dataIndex: 'serialNum',
        key: 'serialNum',
        align:'center'
    },
    {
        title: '品牌名称',
        dataIndex: 'brandName',
        key: 'brandName',
        align:'center'
    },
    {
        title: '相关',
        dataIndex: 'related',
        key: 'related',
        align:'center',
        render:() => {
            return (
                <p className='xiangguanP'>商品：<a>{100}</a></p>
            )
        }
    },
    {
        title: '操作',
        dataIndex: 'does',
        key: 'does',
        align:'center',
        render:() => {
            return (
                <p className='caozuoPart'>
                    <a>编辑</a>
                    <a className='midA'>删除</a>
                </p>
            )
        }
    },
];
const { Option } = Select;

class Brandma extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data:[],
            eachPage:10
        }
    }
    componentWillMount () {
        axios({
            method:'GET',
            url:'/brandma'
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
    //显示条数
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
        if(value === '15') {
            newData.sort((a, b) => {
                return a.serialNum - b.serialNum
            })
        }
        if(value === '20') {
            newData.sort((a, b) => {
                return b.serialNum - a.serialNum
            })
        }
        this.setState({
            data: newData
        })
    }
    render(){
        const { data } = this.state
        for(let i = 0; i < data.length; i++){
            data[i].key = i
        }
        return (
            <div className="brandma">
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
                <div className="purchase-search">
                    <div className="purchase-top">
                        <div className="purchase-top-se1">
                            <SearchOutlined />
                            <p className='brandma-p'>筛选查询</p>
                        </div>
                        <div className="purchase-top-se2">
                            <div className="purchase-top-se1">
                                <UpOutlined />
                                <p className='purchase-p'>收起筛选</p>
                            </div>
                            <div className="purchase-result">
                                <p className='purchase-p'>查询结果</p>
                            </div>
                        </div>
                    </div>
                    <div className="brandma-middle">
                        <div className="brandma-middle-se1">
                            <p className="brandma-middle-se1-p">创建日期：</p>
                            <Input placeholder="品牌名称/关键词" />
                        </div>
                    </div>
                </div>
                <div className="purchase-table">
                    <div className="purchase-table-top">
                        <div className="purchase-table-se1">
                            <UnorderedListOutlined />
                            <p className="brandma-p">数据列表</p>
                        </div>
                        <div className="purchase-table-se2">
                            <div className="addDiv">添加</div>
                            <Select defaultValue="显示条数" style={{ width: 120 }} onChange={this.pageNumChange}>
                                <Option value="ten">每页10条</Option>
                                <Option value="twenty">每页20条</Option>
                                <Option value="thirty">每页30条</Option>
                            </Select>
                            <Select defaultValue="排序方式" className="seen" style={{ width: 120 }} onChange={(value) => this.sortChange(value)}>
                                <Option value="15">编号递增</Option>
                                <Option value="20">编号递减</Option>
                            </Select>
                        </div>
                    </div>
                    <Table 
                        rowSelection={{type:'Checkbox'}}
                        columns={columns} dataSource={data}
                        bordered>
                    </Table>
                </div>
            </div>
        )
    }
}

export default Brandma