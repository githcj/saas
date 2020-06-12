import React from 'react'
import '../../assets/css/system/addgoods.css'
import {
	LeftOutlined
} from '@ant-design/icons'

class AddGoods extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    // 返回上个页面
    goBack = () => {
        this.props.his.goBack()
    }
    render() {
        return (
            <div className='addgoods'>
                <div className='dynamic-top'>
					<div>
						<div className='dynamic-top-left'>
							<div className='dynamic-top-leftmark'></div>
							<p className='dynamic-top-word'>添加商品</p>
						</div>
						<div className='dynamic-top-right'>
                            <LeftOutlined />
							<p className='dynamic-top-word' onClick={() => this.goBack()}>返回</p>
						</div>
					</div>
				</div>
                <div className='addgoods-body'>
                    <div>
                        <div className='first'>
                            <div className='biaoqian'>
                                <div className='black'>
                                    基本信息
                                </div>
                                <div className='sanjiao'></div>
                            </div>
                        </div>
                        <div className='second'>
                            <h1>dsadasd</h1>
                            <h1>dsadasd</h1>
                            <h1>dsadasd</h1>
                            <h1>dsadasd</h1>
                            <h1>dsadasd</h1>
                            <h1>dsadasd</h1>
                            <h1>dsadasd</h1>
                        </div>
                    </div>
                    <div>
                        <div className='first'>
                            <div className='biaoqian'>
                                <div className='black'>
                                    规格信息
                                </div>
                                <div className='sanjiao'></div>
                            </div>
                        </div>
                        <div className='second'></div>
                    </div>
                    <div>
                        <div className='first'>
                            <div className='biaoqian'>
                                <div className='black'>
                                    商品价格
                                </div>
                                <div className='sanjiao'></div>
                            </div>
                        </div>
                        <div className='second'></div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddGoods