import React from 'react'
import '../../assets/css/dynamic/PersonDynamic.css'
import '../../assets/css/system/comclass.css'
import { Table, Switch, Input, Select, Modal } from 'antd'
import {
	SyncOutlined,
	UnorderedListOutlined,
	SearchOutlined,
	UpOutlined
} from '@ant-design/icons'
import axios from '../../plugins/axios'

const { Option } = Select

class Cominfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			visible:false,
			modalInfo:{
				goodsType:'',
				vendor:'',
				state:''
			}
		}
	}
	componentWillMount() {
		axios({
			method: 'GET',
			url: '/goodsInfo'
		})
		.then(res => {
			this.setState({
				data: res.data
			})
		})
		.catch(err => {
			console.log(err)
		})
	}
	//模态框显示隐藏
	showModal = () => {
		this.setState({
		  	visible: true,
		});
	}
	handleOk = e => {
		console.log(e);
		this.setState({
		  	visible: false,
		});
	}
	handleCancel = e => {
		console.log(e);
		this.setState({
		  	visible: false,
		});
	}
	shangxiaJia = (s) => {
		const { data } = this.state
		let newList = data.map(item => {
			if(item.serialNum === s){
				if(item.state === 0){
					item.state = 1
				}else if(item.state === 1){
					item.state = 0
				}
			}
			return item
		})
		this.setState({
			data:newList
		})
		console.log(data)
	}
	render() {
		const { data } = this.state
		for (let i = 0; i < data.length; i++) {
			data[i].key = i
		}
		const columns = [
			{
				title: '编号',
				dataIndex: 'serialNum',
				key: 'serialNum',
				align: 'center',
			},
			{
				title: '商品名称',
				dataIndex: 'goodsName',
				key: 'goodsName',
				align: 'center',
			},
			{
				title: '成本价格',
				dataIndex: 'cost',
				key: 'cost',
				align: 'center',
			},
			{
				title: '规格',
				dataIndex: 'specifica',
				key: 'specifica',
				align: 'center',
				width:50
			},
			{
				title: '厂商名称',
				dataIndex: 'vendorName',
				key: 'vendorName',
				align: 'center',
			},
			{
				title: '商品类型',
				dataIndex: 'goodsType',
				key: 'goodsType',
				align: 'center',
			},
			{
				title: '大单位',
				dataIndex: 'bUnit',
				key: 'bUnit',
				align: 'center',
				width:80
			},
			{
				title: '小单位',
				dataIndex: 'sUnit',
				key: 'sUnit',
				align: 'center',
				width:80
			},
			{
				title: '状态',
				dataIndex: 'state',
				key: 'state',
				align: 'center',
				render:(text, record) => {
					let newDom
					if(text === 0){
						let status = false
						newDom = <span>上架：<Switch checked={status} onChange={() => this.shangxiaJia(record.serialNum)} /></span>
					}
					else if(text === 1){
						let status = true
						newDom = <span>上架：<Switch checked={status} onChange={() => this.shangxiaJia(record.serialNum)} /></span>
					}
					return newDom
				},
				width:120
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
				},
				width:180
			},
		]
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
				<div className='allGoodsBtn'>
					<div className='allBtn'>全部商品({data.length})</div>
					<div className='allBtn'>已上架</div>
					<div className='allBtn'>未上架</div>
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
							<div 
								className="purchase-result jiansuo" 
								onClick={this.showModal}>
								<p className='purchase-p'>高级检索</p>
							</div>
						</div>
					</div>
					{/* 模态框 */}
					<Modal
						title="高级检索"
						centered
						visible={this.state.visible}
						onOk={this.handleOk}
						okText='开始检索'
						okType='primary'
						cancelText='重置'
						onCancel={this.handleCancel}
						>
						<div className='modal-item'>
							<p>商品类型：</p>
							<Select defaultValue="请选择商品分类" style={{ width: '60%' }}>
								<Option value="jack">Jack</Option>
								<Option value="lucy">Lucy</Option>
								<Option value="Yim">yim</Option>
							</Select>
						</div>
						<div className='modal-item'>
							<p>厂商名称：</p>
							<Select defaultValue="请选择厂商" style={{ width: '60%' }}>
								<Option value="jack">Jack</Option>
								<Option value="lucy">Lucy</Option>
								<Option value="Yim">yim</Option>
							</Select>
						</div>
						<div className='modal-item'>
							<p>上下架</p>
							<Select defaultValue="全部" style={{ width: '60%' }}>
								<Option value="shelve">上架</Option>
								<Option value="xiajia">下架</Option>
							</Select>
						</div>
					</Modal>
					<div className="purchase-middle">
						<div className='filter-item'>
							<p>输入搜索：</p>
							<Input placeholder="商品名称" style={{width:'60%'}} />
						</div>
						<div className='filter-item'>
							<p>商品类型：</p>
							<Select defaultValue="请选择商品类型" style={{ width: '60%' }}>
								<Option value="jack">Jack</Option>
								<Option value="lucy">Lucy</Option>
								<Option value="Yim">yim</Option>
							</Select>
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
							<div className="addDiv tianjiagoods" style={{ height: 32 }}>添加商品</div>
							<div className="daoDiv addDiv" style={{ height: 32 }}>导入</div>
							<div className="daoDiv addDiv" style={{ height: 32 }}>导出</div>
							<div>
								<Select defaultValue="显示条数" style={{ width: 120 }} onChange={this.pageNumChange}>
									<Option value="ten">每页10条</Option>
									<Option value="twenty">每页20条</Option>
									<Option value="thirty">每页30条</Option>
								</Select>
							</div>
							<div>
								<Select defaultValue="排序方式" style={{ width: 150 }} onChange={(value) => this.sortChange(value)}>
									<Option value="saleHightLow">销售额从高到低</Option>
									<Option value="saleLowHight">销售额从低到高</Option>
									<Option value="disLowHight">配送额从低到高</Option>
									<Option value="disHightLow">配送额从高到低</Option>
								</Select>
							</div>
						</div>
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