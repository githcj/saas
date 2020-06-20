import React from 'react';
import '../../assets/css/wang/purchase.css'
import '../../assets/css/system/brandma.css'
import '../../assets/css/dynamic/PersonDynamic.css'
import { Select } from 'antd'
import { Table, Input, Popconfirm, message } from 'antd'
import {
    SearchOutlined,
    SyncOutlined,
    UpOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons'
import axios from '../../plugins/axios'

const { Option } = Select;

class Brandma extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data:[],
            eachPage:10,
            keyword:''
        }
    }
    getAllData = () => {
        
        axios({
            method:'POST',
            url:'/brand/queryall',
            data:{
                token:'gnsdkjhla'
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
    componentWillMount () {
        this.getAllData()
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
    // 关键字双向绑定
    inputChange = (e) => {
        this.setState({
            keyword:e.target.value
        })
    }
    // 查询结果
    queryResult = () => {
        axios({
            method:'POST',
            url:'/brand/wherequery',
            data:{
                token:'sdagjd',
                brand_name:this.state.keyword
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
    // 刷新
    refresh = () => {
        this.getAllData()
        this.setState({
            keyword:''
        })
    }
	// 确认删除
	confirm = (record) => {
		axios({
			method:'POST',
			url:'/brand/delect',
			data:{
				token:'gakjhfkas',
				brand_id:record.brand_id
			}
		})
		.then(res => {
			this.getAllData()
			message.success('删除成功')
		})
		.catch(err => {
			console.log(err)
		})
	}
	cancel = (e) => {
		console.log(e);
		message.error('Click on No');
    }
    // 去添加品牌或者添加
    toAddBrand = (str) => {
        this.props.history.push({
            pathname:'/home/system/addbrand',
            params:str
        })
    }
    toEditBrand = (item) => {
        this.props.history.push({
            pathname:'/home/system/addbrand',
            params:item
        })
    }
    render(){
        const { data, keyword } = this.state
        const columns = [
            {
                title: '编号',
                dataIndex: 'brand_id',
                key: 'brand_id',
                align:'center'
            },
            {
                title: '品牌名称',
                dataIndex: 'brand_name',
                key: 'brand_name',
                align:'center'
            },
            {
                title: '相关',
                dataIndex: 'goods_sum',
                key: 'goods_sum',
                align:'center',
                render:(text) => {
                    return (
                        <p className='xiangguanP'>商品：<a>{text}</a></p>
                    )
                }
            },
            {
                title: '操作',
                dataIndex: 'does',
                key: 'does',
                align:'center',
                render:(text, record) => {
                    return (
                        <p className='caozuoPart'>
                            <a style={{marginRight:10}} onClick={() => this.toEditBrand(record)}>编辑</a>
                            <Popconfirm
                                title="确定删除？"
                                onConfirm={() => this.confirm(record)}
                                onCancel={this.cancel}
                                okText="确定"
                                cancelText="取消"
                            >
                                <a className='midA'>删除</a>
                            </Popconfirm>
                        </p>
                    )
                }
            },
        ];
        return (
            <div className="brandma">
                <div className='dynamic-top'>
                    <div>
                        <div className='dynamic-top-left'>
                            <div className='dynamic-top-leftmark'></div>
                            <p className='dynamic-top-word'>品牌管理</p>
                        </div>
                        <div className='dynamic-top-right' onClick={this.refresh}>
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
                            <div className="purchase-result" onClick={this.queryResult}>
                                <p className='purchase-p'>查询结果</p>
                            </div>
                        </div>
                    </div>
                    <div className="brandma-middle">
                        <div className="brandma-middle-se1">
                            <p className="brandma-middle-se1-p">输入搜索：</p>
                            <Input 
                                placeholder="品牌名称/关键词" 
                                value={keyword}
                                onChange={(e) => this.inputChange(e)}
                            />
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
                            <div className="addDiv" onClick={() => this.toAddBrand('添加')}>添加</div>
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