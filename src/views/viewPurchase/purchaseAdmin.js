import React from 'react'
import { DatePicker, Select, Table, Modal, Button } from 'antd'
import '../../assets/css/wang/purchase.css'
import {
    SearchOutlined,
    SyncOutlined,
    UpOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons';
import axios from '../../plugins/axios'



function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
}
function onOk(value) {
    console.log('onOk: ', value);
}
const { RangePicker } = DatePicker;
const { Option } = Select;

class purchaseAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            everyPage: 10,
            loading: false,
            visible: false,
            shenpi: [],
            yijian: '',
            id: '',
            shenpiyijian: ''
        }
    }
    componentWillMount() {
        axios({
            method: 'POST',
            url: '/purchase/showpurchas'
        })
            .then(res => {
                const newData = res.data
                newData.map((item,index) => {
                    newData[index].key = index
                    return newData
                })
                this.setState({
                    data: newData
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    pageNumChange = (value) => {
        if (value === 'ten') {
            this.setState({
                everyPage: 10
            })
        }
        if (value === 'twenty') {
            this.setState({
                everyPage: 20
            })
        }
    }
    sortChange = (value) => {
        const newData = [...this.state.data]
        if (value === 'saleLowHeight') {
            newData.sort((a, b) => {
                return a.SumMoney - b.SumMoney
            })
        }
        if (value === 'saleHeightLow') {
            newData.sort((a, b) => {
                return b.SumMoney - a.SumMoney
            })
        }
        this.setState({
            data: newData
        })
    }
    todetail = (record) => {
        this.props.msg.push({
            pathname: '/home/Caigou/purchaseDetail',
            params: record
        })
    }
    showModal = (i,index) => {
        console.log('我触发了', i, this.state)
        this.setState({
            visible: true,
            id: i,
            i:index
        })
    };
    showModelR = (i,index) => {
        this.setState({
            visible: true,
            id: i,
            i:index
        })
    }
    handleOk = () => {
        const data2 = this.state.data
        const { id, shenpiyijian } = this.state
        var dt = new Date()
        var year = dt.getFullYear()
        var mounth = dt.getMonth() + 1
        var day = dt.getDate()
        if(mounth<10){
            mounth = "0" + mounth
        }
        if(day<10){
            day = "0" + day
        }
        var timing = year +"-" + mounth + "-" + day
        data2.filter(item => {
            if (id === item.purchase_id && item.purchase_status === 3) {
                item.purchase_status = 4
                item.rktiming = timing
            }else if (id === item.purchase_id) {
                console.log(item.purchase_id + '我今天吃的水饺' + id)
                item.purchase_status = 3
                item.yijian = shenpiyijian
                item.sptiming = timing
            }
            return item
        })
        this.setState({
            data: data2,
            loading: false,
            visible: false,
            shenpiyijian: ''
        });
    }
    handleCancel = () => {
        const newData = [...this.state.data]
        const i = this.state.i
        newData[i].purchase_status = 2
        this.setState({ 
            visible: false,
            data:newData
         })
    }
    yijianChange = (e) => {
        this.setState({
            shenpiyijian: e.target.value
        })
    }
    render() {
        const { props } = this.props
        const { visible, loading } = this.state;
        const columns = [
            {
                title: '编号',
                dataIndex: 'purchase_id',
                key: 'purchase_id',
                align: 'center'
            },
            {
                title: '创建日期',
                dataIndex: 'create_time',
                key: 'create_time',
                align: 'center'
            },
            {
                title: '供货厂商',
                dataIndex: 'supplier_id',
                key: 'supplier_id',
                align: 'center'
            },
            {
                title: '总金额',
                dataIndex: 'total_price',
                key: 'total_price',
                align: 'center'
            },
            {
                title: '需用日期',
                dataIndex: 'require_time',
                key: 'require_time',
                align: 'center'
            },
            {
                title: '创建人',
                dataIndex: 'founder_id',
                key: 'founder_id',
                align: 'center'
            },
            {
                title: '审批人',
                dataIndex: 'approver_id',
                key: 'approver_id',
                align: 'center'
            },
            {
                title: '状态',
                dataIndex: 'purchase_status',
                key: 'purchase_status',
                align: 'center',
                render: (text, record, index) => {
                    if (text === 1) {
                        return <span>待审批</span>
                    } else if (text === 2) {
                        return <span>不通过</span>
                    } else if (text === 3) {
                        return <span>已通过</span>
                    } else if (text === 4) {
                        return <span>已入库</span>
                    }
                }
            },
            {
                title: '审批操作',
                dataIndex: 'doesA',
                key: 'doesA',
                align: 'center',
                render: (text, record, index) => {
                    console.log(record, '11111')
                    if (record.purchase_status === 1) {
                        return <div>
                            <span type="primary"
                                style={{ cursor: 'pointer' }}
                                onClick={() => this.showModal(record.purchase_id,record.key)}>
                                审批</span>
                        </div>
                    } else if (record.purchase_status === 2) {
                        return <div>
                            <span type="primary"
                                style={{ cursor: 'pointer' }}
                                onClick={() => this.showModal(record.purchase_id,record.key)}>
                                审批</span>
                        </div>
                    } else if (record.purchase_status === 3) {
                        return <div>
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={() => this.showModelR(record.purchase_id,record.key)}>
                                入库</span>
                        </div>
                    } else if (record.purchase_status === 4) {
                        return null
                    }
                }
            },
            {
                title: '操作',
                dataIndex: 'does',
                key: 'does',
                align: 'center',
                render: (text, record, index) => {
                    console.log(text, record, index)
                    if (record.purchase_status === 1 || record.purchase_status === 2) {
                        return <p className="caozuoP">
                            <a>编辑</a>
                            <a onClick={() => this.todetail(record)}>预览</a>
                            <a>删除</a>
                        </p>
                    } else if (record.purchase_status === 4 || record.purchase_status === 3) {
                        return <p className="caozuoP">
                            <a onClick={() => this.todetail(record)}>预览</a>
                            <a>删除</a>
                        </p>
                    }
                }
            },
        ];
        const { data, everyPage } = this.state
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
                                onChange={(value) => this.sortChange(value)} >
                                <Option value="saleLowHeight">总金额递增</Option>
                                <Option value="saleHeightLow">总金额递减</Option>
                            </Select>
                        </div>
                    </div>
                    <Table
                        rowSelection={{ type: 'Checkbox' }}
                        columns={columns}
                        dataSource={data}
                        bordered
                        pagination={{
                            showQuickJumper: true,
                            showTotal: (total) => {
                                return (
                                    <p>共有{
                                        Math.ceil(total / everyPage)
                                    }页/{total}条数据
                                    </p>
                                )
                            },
                            pageSize: everyPage
                        }}>
                    </Table>
                    <Modal
                        visible={visible}
                        title="审批意见"
                        onOk={() => this.handleOk()}
                        onCancel={() => this.handleCancel()}
                        footer={[
                            <Button key="back" onClick={() => this.handleCancel()}>
                                不同意
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={() => this.handleOk()}>
                                同意
                            </Button>,
                        ]}
                    >
                        <div className="YiJ">
                            <div>审批意见：</div>
                            <div>
                                <input value={this.state.shenpiyijian} onChange={this.yijianChange}></input>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default purchaseAdmin


