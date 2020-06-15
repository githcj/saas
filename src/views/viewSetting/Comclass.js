import React from 'react'
import '../../assets/css/dynamic/PersonDynamic.css'
import '../../assets/css/system/comclass.css'
import { Table } from 'antd'
import {
    SyncOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons'
import axios from '../../plugins/axios'

class Comclass extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			level:'一级',
			data:[]
		}
    }
    LookLower = (id) => {
        this.props.history.push({
            pathname:'/home/system/secondary',
            params:id
        })
    }
	componentWillMount () {
        axios({
            method:'POST',
			url:'/commodity_level/queryone',
			data:{
				token:'akjshfkla'
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
    toAddclass = () => {
        this.props.history.push('/home/system/addclass')
    }

	render() {
        const columns = [
            {
                title: '编号',
                dataIndex: 'commodity_level_id',
                key: 'commodity_level_id',
                align:'center'
            },
            {
                title: '品牌名称',
                dataIndex: 'commodity_level_name',
                key: 'commodity_level_name',
                align:'center'
            },
            {
                title: '级别',
                dataIndex: 'level',
                key: 'level',
                align:'center',
                render:() => <span>一级</span>
            },
            {
                title: '商品数量',
                dataIndex: 'good_num',
                key: 'good_num',
                align:'center'
            },
            {
                title: '操作',
                dataIndex: 'does',
                key: 'does',
                align:'center',
                render:(text, record) => {
                    return (
                        <p className='caozuoPart'>
                            <a style={{marginRight:10}}>新增下级</a>
                            <a className='midA' onClick={() => this.LookLower(record.commodity_level_name)}>查看下级</a>
                        </p>
                    )
                }
            },
        ];
        const { data, level } = this.state
		return (
			<div className="comclass">
				{/* 顶部 */}
				<div className='dynamic-top'>
                    <div>
                        <div className='dynamic-top-left'>
                            <div className='dynamic-top-leftmark'></div>
                            <p className='dynamic-top-word'>商品分类 - 一级</p>
                        </div>
                        <div className='dynamic-top-right'>
                            <SyncOutlined />
                            <p className='dynamic-top-word'>刷新</p>
                        </div>
                    </div>
                </div>
				<div className="comclass-table">
					<div className='comclass-table-top'>
						<div className="purchase-table-se1">
							<UnorderedListOutlined />
							<p className="brandma-p">数据列表</p>
						</div>
						<div className="addDiv" onClick={this.toAddclass}>添加</div>
					</div>
					<Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        pagination={{
                            showTotal:(total) => {
                                return (
                                    <p>共有{
                                        Math.ceil(total / 10)
                                    }页/{total}条数据</p>
                                )
                            },
                            pageSize:10,
                            showQuickJumper:true
                        }}
                    />
				</div>
			</div>
		)
	}
}

export default Comclass