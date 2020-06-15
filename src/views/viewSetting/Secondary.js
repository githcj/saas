import React from 'react'
import '../../assets/css/dynamic/PersonDynamic.css'
import '../../assets/css/system/comclass.css'
import '../../assets/css/system/secondary.css'
import { Table, Switch, Input, Select, Modal } from 'antd'
import {
	SyncOutlined,
	UnorderedListOutlined,
	LeftOutlined
} from '@ant-design/icons'
import axios from '../../plugins/axios'

const { Option } = Select

class Secondary extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
		}
	}
	// 渲染之前
	componentWillMount() {
		axios({
			method: 'POST',
			url: '/commodity_level/querytwo',
			data:{
				token:'kjshdkf'
			}
		})
		.then(res => {
			this.setState({
				data: res.data.data
			})
		})
		.catch(err => {
			console.log(err)
		})
	}
	// 添加分类
	toAdd = () => {
		console.log(this.props)
        this.props.his.push('/home/system/addclass')
    }
    // 返回
    goBack = () => {
        this.props.his.goBack()
    }
	render() {
        const { data } = this.state
        const columns = [
			{
				title: '编号',
				dataIndex: 'commodity_level_id',
				key: 'commodity_level_id',
				align: 'center',
			},
			{
				title: '分类名称',
				dataIndex: 'commodity_level_name',
				key: 'commodity_level_name',
				align: 'center',
			},
			{
				title: '级别',
				dataIndex: 'gu_cost_price',
				key: 'gu_cost_price',
				align: 'center',
				render:() => <span>二级</span>
			},
			{
				title: '数量单位',
				dataIndex: 'unit_name',
				key: 'unit_name',
				align: 'center'
			},
			{
				title: '操作',
				dataIndex: 'commodity_level_name',
				key: 'commodity_level_name',
				align: 'center',
				render: () => {
					return (
						<div>
							<a style={{marginRight:10}}>编辑</a>
							<a>删除</a>
						</div>
					)
				}
			}
        ]
        const { his } = this.props
		return (
			<div className="cominfo">
				{/* 顶部 */}
				<div className='dynamic-top'>
					<div>
						<div className='dynamic-top-left'>
							<div className='dynamic-top-leftmark'></div>
							<p className='dynamic-top-word'>{his.location.params}品牌-二级分类</p>
						</div>
						<div className='secondary-top-right'>
                            <div onClick={this.goBack}>
                                <LeftOutlined />
                                <p className='dynamic-top-word'>返回</p>
                            </div>
                            <div>
                                <SyncOutlined />
                                <p className='dynamic-top-word'>刷新</p>
                            </div>
						</div>
					</div>
				</div>
				<div className="comclass-table">
					<div className='comclass-table-top'>
						<div className="purchase-table-se1">
							<UnorderedListOutlined />
							<p className="brandma-p">数据列表</p>
						</div>
						<div className='comclass-right-title'>
							<div 
								className="addDiv" 
								style={{ height: 32 }}
								onClick={() => this.toAdd()}>
								添加
							</div>
						</div>
					</div>
					<Table
						columns={columns}
						dataSource={data}
						bordered
						pagination={{
							showTotal: (total) => {
								return (
									<p>共有{
										Math.ceil(total / 10)
									}页/{total}条数据</p>
								)
							},
							pageSize: 10,
							showQuickJumper: true
						}}
					/>
				</div>
			</div>
		)
	}
}

export default Secondary