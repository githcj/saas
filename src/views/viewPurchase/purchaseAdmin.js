import React from 'react'
import { DatePicker, Select,Table} from 'antd'
import '../../assets/css/wang/purchase.css'
import {
    SearchOutlined,
    SyncOutlined,
    UpOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons';
import axios from 'axios';



function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
}
function onOk(value) {
    console.log('onOk: ', value);
}
const { RangePicker } = DatePicker;
const { Option } = Select;

class purchaseAdmin extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            everyPage:10
        }
    }
    componentWillMount(){
        axios({
            method:'GET',
            url:'http://119.23.228.238:3031/mock/47/purchasing'
        })
        .then(res=>{
            this.setState({
                data:res.data
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    pageNumChange = (value) =>{
        if(value==='ten'){
            this.setState({
                everyPage:10
            })
        }
        if(value==='twenty'){
            this.setState({
                everyPage:20
            })
        }
    }
    sortChange = (value) =>{
        const newData = [...this.state.data]
        if(value === 'saleLowHeight'){
            newData.sort((a,b)=>{
                return a.SumMoney - b.SumMoney
            })
        }
        if(value === 'saleHeightLow'){
            newData.sort((a,b)=>{
                return b.SumMoney - a.SumMoney
            })
        }
        this.setState({
            data:newData
        })
    }
    todetail = (record) => {
        this.props.msg.push({
            pathname:'/home/Caigou/purchaseDetail',
            params:record
        })
    }
    render(){
        const { props } = this.props
        const columns = [
            {
                title: '编号',
                dataIndex: 'serialNum',
                key: 'serialNum',
                align:'center'
            },
            {
                title: '创建日期',
                dataIndex: 'data',
                key: 'data',
                align:'center'
            },
            {
                title: '供货厂商',
                dataIndex: 'gongHuo',
                key: 'gongHuo',
                align:'center'
            },
            {
                title: '总金额',
                dataIndex: 'SumMoney',
                key: 'SumMoney',
                align:'center'
            },
            {
                title: '需用日期',
                dataIndex: 'needData',
                key: 'needData',
                align:'center'
            },
            {
                title: '创建人',
                dataIndex: 'person',
                key: 'person',
                align:'center'
            },
            {
                title: '审批人',
                dataIndex: 'shenpiRen',
                key: 'shenpiRen',
                align:'center'
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                align:'center',
                render:(text,record,index)=>{
                    if(text===1){
                        return<span>待审批</span>
                    }else if(text===2){
                        return<span>不通过</span>
                    }else if(text===3){
                        return<span>已通过</span>
                    }else if(text===4){
                        return<span>已入库</span>
                    }
                }
            },
            {
                title: '审批操作',
                dataIndex: 'doesA',
                key: 'doesA',
                align:'center',
                render: (text, record, index)=> {
                    console.log(text,record,index)
                    if(record.state === 1) {
                        return <a>审批</a>
                    } else if(record.state === 2) {
                        return <a>审批</a>
                    } else if(record.state=== 3){
                        return <a>入库</a>
                    }else if(record.state===4){
                        return null
                    }
                }
            },
            {
                title: '操作',
                dataIndex: 'does',
                key: 'does',
                align:'center',
                render:(text,record,index)=>{
                    console.log(text,record,index)
                    if(record.state === 1 || record.state ===2){
                        return <p className="caozuoP">
                            <a>编辑</a>
                            <a onClick = {() => this.todetail(record)}>预览</a>
                            <a>删除</a>
                        </p>
                    }else if(record.state === 4 || record.state ===3){
                        return <p className="caozuoP">
                            <a onClick = {() => this.todetail(record)}>预览</a>
                            <a>删除</a>
                        </p>
                    }
                }
            },
        ];
        const {data,everyPage} = this.state
        console.log(props)
        return (
            <div className="admin">
                <div className='admin-top'>
                    <div className='purchase-firtop'>
                        <div className='dynamic-top-left'>
                            <div className='dynamic-top-left-mark'></div>
                            <p className='dynamic-top-word'>采购管理</p>
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
                            <p className='purchase-p'>筛选查询</p>
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
                    <div className="purchase-middle">
                        <div className="purchase-middle-se1">
                            <p className="purchase-middle-se1-p">创建日期：</p>
                            <RangePicker
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                                onChange={onChange}
                                onOk={onOk}
                            />
                        </div>
                        <div className="purchase-middle-se2">
                            <p className="purchase-middle-se1-p">供货厂商：</p>
                            <Select defaultValue="lucy" style={{ width: 130 }} >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="Yim">yim</Option>
                            </Select>
                        </div>
                        <div className="purchase-middle-se2">
                            <p className="purchase-middle-se1-p">采购状态：</p>
                            <Select defaultValue="待审批" style={{ width: 130 }} >
                                <Option value="will">待审批</Option>
                                <Option value="no">不通过</Option>
                                <Option value="yes">已通过</Option>
                                <Option value="ku">已入库</Option>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="purchase-table">
                    <div className="purchase-table-top">
                        <div className="purchase-table-se1">
                            <UnorderedListOutlined />
                            <p className="purchase-middle-se1-p">数据列表</p>
                        </div>
                        <div className="purchase-table-se2">
                            <span className="sp an">添加</span>
                            <span className="sp">导出</span>
                            <Select defaultValue="显示条数" style={{ width: 120 }} onChange={this.pageNumChange}>
                                <Option value="ten">每页10条</Option>
                                <Option value="twenty">每页20条</Option>
                            </Select>
                            <Select defaultValue="排序方式" className="seen" 
                            style={{ width: 120 }}
                            onChange={(value)=>this.sortChange(value)} >
                                <Option value="saleLowHeight">总金额递增</Option>
                                <Option value="saleHeightLow">总金额递减</Option>
                            </Select>
                        </div>
                    </div>
                    <Table 
                    rowSelection={{type:'Checkbox'}}
                    columns={columns} 
                    dataSource={data}
                    bordered
                    pagination={{
                        showQuickJumper:true,
                        showTotal:(total)=>{
                            return(
                                <p>共有{
                                    Math.ceil(total / everyPage)
                                    }页/{total}条数据
                                </p>
                            )
                        },
                        pageSize:everyPage
                    }}>
                    </Table>
                </div>
            </div>
        )
    }
}

export default purchaseAdmin


