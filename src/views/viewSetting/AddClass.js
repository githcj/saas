import React from 'react'
import '../../assets/css/dynamic/PersonDynamic.css'
import '../../assets/css/system/comclass.css'
import '../../assets/css/system/secondary.css'
import '../../assets/css/system/addclass.css'
import { Input, Select, Button, message } from 'antd'
import {
	UnorderedListOutlined,
	LeftOutlined
} from '@ant-design/icons'
import axios from '../../plugins/axios'

const { Option } = Select

class AddClass extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            data: [],
            val:''
		}
    }
    changeInput = (e) => {
        this.setState({
            val:e.target.value
        })
    }
    // 返回
    goBack = () => {
        this.props.his.goBack()
    }
    //
    toSubmit = () => {
        axios({
            method:'POST',
            url:'/brand/add',
            data:{
                token:'sdjasda',
                brand_name:this.state.val
            }
        })
        .then(res => {
            message.success('添加成功')
            this.props.his.goBack()
        })
        .catch(err => {
            console.log(err)
        })
    }
	render() {
		return (
			<div className="cominfo">
				{/* 顶部 */}
				<div className='dynamic-top'>
					<div>
						<div className='dynamic-top-left'>
							<div className='dynamic-top-leftmark'></div>
							<p className='dynamic-top-word'>添加分类</p>
						</div>
						<div className='secondary-top-right'>
                            <div onClick={this.goBack}>
                                <LeftOutlined />
                                <p className='dynamic-top-word'>返回</p>
                            </div>
						</div>
					</div>
				</div>
				<div className="comclass-table">
					<div className='comclass-table-top'>
						<div className="purchase-table-se1">
							<UnorderedListOutlined />
							<p className="brandma-p">添加分类</p>
						</div>
					</div>
                    <div className='addclass-con'>
                        <div className='content-item'>
                            <span className='import-span acc-span'>分类名称：</span>
                            <Input size="large" placeholder="large size" style={{ width: 300 }} onChange={(e) => this.changeInput(e)}/>
                        </div>
                        <div className='content-item'>
                            <span className=' acc-span'>上级分类：</span>
                            <Select defaultValue="请选择分类" style={{ width: 300 }} size='large'>
                                <Option value="xiang">箱</Option>
                            </Select>
                        </div>
                        <div className='content-item'>
                            <span className='acc-tips'>请先选择品牌，默认只能添加二级分类。</span>
                        </div>
                        <div className='content-item'>
                            <span className='acc-span'>数量单位：</span>
                            <Select style={{ width: 300 }} size='large'>
                                <Option value="xiang">箱</Option>
                            </Select>
                        </div>
                        <div className='content-item'>
                            <Button type='primary' onClick={this.toSubmit}>提交</Button>
                        </div>
                    </div>
				</div>
			</div>
		)
	}
}

export default AddClass