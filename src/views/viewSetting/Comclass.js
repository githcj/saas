import React from 'react'
import '../../assets/css/dynamic/PersonDynamic.css'
import '../../assets/css/system/comclass.css'
import { Table } from 'antd'
import {
    SyncOutlined,
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
        title: '级别',
        dataIndex: 'level',
        key: 'level',
        align:'center'
    },
    {
        title: '商品数量',
        dataIndex: 'count',
        key: 'count',
        align:'center'
    },
    {
        title: '操作',
        dataIndex: 'does',
        key: 'does',
        align:'center',
        render:() => {
            return (
                <p className='caozuoPart'>
                    <a>新增下级</a>
                    <a className='midA'>查看下级</a>
                </p>
            )
        }
    },
];

class Comclass extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			level:'一级',
			data:[]
		}
	}
	componentWillMount () {
        axios({
            method:'POST',
			url:'/goodsLevel',
			data:{
				level:this.state.level
			}
        })
        .then(res => {
            this.setState({
                data:res.data.filter(item => item.level === '一级')
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
	render() {
        const { data, level } = this.state
        for(let i = 0; i < data.length; i++){
            data[i].key = i
        }
		return (
			<div className="comclass">
				{/* 顶部 */}
				<div className='dynamic-top'>
                    <div>
                        <div className='dynamic-top-left'>
                            <div className='dynamic-top-leftmark'></div>
                            <p className='dynamic-top-word'>商品分类 - {level}</p>
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
						<div className="addDiv">添加</div>
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