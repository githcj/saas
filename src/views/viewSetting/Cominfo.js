import React from 'react'
import '../../assets/css/dynamic/PersonDynamic.css'
import '../../assets/css/system/comclass.css'
import { Table, Switch } from 'antd'
import {
	SyncOutlined,
	UnorderedListOutlined,
} from '@ant-design/icons'
import axios from 'axios'

const columns = [
	{
		title: '编号',
		dataIndex: 'serialNum',
		key: 'serialNum',
		align: 'center'
	},
	{
		title: '商品名称',
		dataIndex: 'goodsName',
		key: 'goodsName',
		align: 'center'
	},
	{
		title: '成本价格',
		dataIndex: 'cost',
		key: 'cost',
		align: 'center'
	},
	{
		title: '规格',
		dataIndex: 'specifica',
		key: 'specifica',
		align: 'center'
	},
	{
		title: '厂商名称',
		dataIndex: 'vendorName',
		key: 'vendorName',
		align: 'center'
	},
	{
		title: '品牌名称',
		dataIndex: 'brandName',
		key: 'brandName',
		align: 'center'
	},
	{
		title: '商品类型',
		dataIndex: 'goodsType',
		key: 'goodsType',
		align: 'center'
	},
	{
		title: '大单位',
		dataIndex: 'bUnit',
		key: 'bUnit',
		align: 'center'
	},
	{
		title: '小单位',
		dataIndex: 'sUnit',
		key: 'sUnit',
		align: 'center'
	},
	{
		title: '状态',
		dataIndex: 'state',
		key: 'state',
		align: 'center',
		render:() => (<span>上架：<Switch onChange={() => console.log('ddd')} /></span>)
	},
	{
		title: '操作',
		dataIndex: 'does',
		key: 'does',
		align: 'center',
		render: () => {
			return (
				<p className='caozuoPart'>
					<a>编辑</a>
					<a className='midA'>删除</a>
					<a>锁定价格</a>
				</p>
			)
		}
	},
];

class Cominfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}
	componentWillMount() {
		axios({
			method: 'POST',
			url: 'http://119.23.228.238:3031/mock/47/goodsLevel',
			data: {
				level: '一级'
			}
		})
			.then(res => {
				this.setState({
					data: res.data.filter(item => item.level === '一级')
				})
			})
			.catch(err => {
				console.log(err)
			})
	}
	render() {
		const { data } = this.state
		for (let i = 0; i < data.length; i++) {
			data[i].key = i
		}
		return (
			<div className="cominfo">
				{/* 顶部 */}
				<div className='dynamic-top'>
					<div>
						<div className='dynamic-top-left'>
							<div className='dynamic-top-leftmark'></div>
							<p className='dynamic-top-word'>商品列表</p>
						</div>
						<div className='dynamic-top-right'>
							<SyncOutlined />
							<p className='dynamic-top-word'>刷新</p>
						</div>
					</div>
				</div>
				<div>

				</div>

				<div className="comclass-table">
					<div className='comclass-table-top'>
						<div className="purchase-table-se1">
							<UnorderedListOutlined />
							<p className="brandma-p">数据列表</p>
						</div>
						<div className="addDiv">添加</div>
					</div>
					<Table
                        rowSelection={{type:'Checkbox'}}
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

export default Cominfo