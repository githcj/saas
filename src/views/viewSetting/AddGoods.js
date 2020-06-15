import React from 'react'
import '../../assets/css/system/addgoods.css'
import {
    LeftOutlined,
    TagOutlined,
    PlusOutlined
} from '@ant-design/icons'
import { Select, Input, Button, Upload } from 'antd'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

class AddGoods extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: [],
        }
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = async file => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        })
    }

    handleChange = ({ fileList }) => this.setState({ fileList })
    // 返回上个页面
    goBack = () => {
        this.props.his.goBack()
    }
    

    render() {
        const { Option } = Select
        const { TextArea } = Input
        const { fileList } = this.state
        const props2 = {
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            listType: 'picture',
            defaultFileList: [...fileList],
            className: 'upload-list-inline',
        }
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
                    {/* 基本信息 */}
                    <div>
                        <div className='first'>
                            <div className='biaoqian'>
                                <div className='black'>
                                    <TagOutlined className='rotateBq'/>
                                    <span>基本信息</span>
                                </div>
                                <div className='sanjiao'></div>
                            </div>
                        </div>
                        <div className='second'>
                            <div className='second-item'>
                                <span>供货商：</span>
                                <Select defaultValue="请选择供货商" style={{ width: 200 }} size='large'>
                                    <Option value="lucy">Lucy</Option>
                                </Select>
                            </div>
                            <div className='second-item'>
                                <span>商品类型：</span>
                                <Select defaultValue="请选择类型" style={{ width: 200 }} size='large'>
                                    <Option value="lucy">Lucy</Option>
                                </Select>
                            </div>
                            <div className='second-item'>
                                <span>商品名称：</span>
                                <Input size="large" placeholder="large size" style={{ width: 200 }}/>
                            </div>
                            <div className='second-item item-area'>
                                <span>商品描述：</span>
                                <TextArea style={{ width: '80%',height:80 }} />
                            </div>
                        </div>
                    </div>
                    {/* 规格信息 */}
                    <div>
                        <div className='first'>
                            <div className='biaoqian'>
                                <div className='black'>
                                    <TagOutlined className='rotateBq'/>
                                    <span>规格信息</span>
                                </div>
                                <div className='sanjiao'></div>
                            </div>
                        </div>
                        <div className='second another'>
                            <div className='second-item'>
                                <span>大单位：</span>
                                <Select defaultValue="请选择单位，例：箱" style={{ width: 200 }} size='large'>
                                    <Option value="xiang">箱</Option>
                                </Select>
                            </div>
                            <div className='second-item'>
                                <span>小单位：</span>
                                <Select defaultValue="请选择单位，例：盒" style={{ width: 200 }} size='large'>
                                    <Option value="he">盒</Option>
                                    <Option value="zhi">支</Option>
                                    <Option value="ping">瓶</Option>
                                </Select>
                            </div>
                            <div className='second-item'>
                                <span>大单位规格：</span>
                                <Input size="large" placeholder="1500ml" style={{ width: 200 }}/>
                            </div>
                            <div className='second-item'>
                                <span>小单位规格：</span>
                                <Input size="large" placeholder="250ml" style={{ width: 200 }}/>
                            </div>
                            <div className='second-item'>
                                <span>保质期：</span>
                                <Input size="large" placeholder="large size" style={{ width: 200 }}/>
                            </div>
                            <div className='second-item'>
                                <span>换算比：</span>
                                <Input size="large" placeholder="6" style={{ width: 200 }}/>
                            </div>
                            <div className='second-item'>
                                <span>打印名称：</span>
                                <Input size="large" placeholder="large size" style={{ width: 200 }}/>
                            </div>
                            <div className='second-item'>
                                <span>排序：</span>
                                <Input size="large" placeholder="large size" style={{ width: 200 }}/>
                            </div>
                        </div>
                    </div>
                    {/* 商品价格 */}
                    <div>
                        <div className='first'>
                            <div className='biaoqian'>
                                <div className='black'>
                                    <TagOutlined className='rotateBq'/>
                                    <span>商品价格</span>
                                </div>
                                <div className='sanjiao'></div>
                            </div>
                        </div>
                        <div className='second another'>
                            <div className='second-item'>
                                <span>大单位成本价：</span>
                                <Input size="large" placeholder="600.00" style={{ width: 200 }}/>
                            </div>
                            <div className='second-item'>
                                <span>小单位成本价：</span>
                                <Input size="large" placeholder="100.00" style={{ width: 200 }}/>
                            </div>
                            <div className='second-item'>
                                <span>大单位供货价：</span>
                                <Input size="large" placeholder="large size" style={{ width: 200 }}/>
                            </div>
                            <div className='second-item'>
                                <span>小单位供货价：</span>
                                <Input size="large" placeholder="large size" style={{ width: 200 }}/>
                            </div>
                            <div className='second-item'>
                                <span>保护价：</span>
                                <Input size="large" placeholder="large size" style={{ width: 200 }}/>
                            </div>
                            <div className='second-item'>
                                <span>价格锁定：</span>
                                <Select defaultValue="否" style={{ width: 200 }} size='large'>
                                    <Option value="lockTrue">是</Option>
                                    <Option value="lockFalse">否</Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                    {/* 价格体系 */}
                    <div>
                        <div className='first'>
                            <div className='biaoqian'>
                                <div className='black'>
                                    <TagOutlined className='rotateBq'/>
                                    <span>价格体系</span>
                                </div>
                                <div className='sanjiao'></div>
                            </div>
                        </div>
                        <div className='second another'>
                            <div className='second-item'>
                                <span>二批价：</span>
                                <Input size="large" placeholder="00.00" style={{ width: 200 }}/>
                            </div>
                            <div className='second-item'>
                                <span>特通价：</span>
                                <Input size="large" placeholder="large size" style={{ width: 200 }}/>
                            </div>
                            <div className='second-item'>
                                <span>终端价：</span>
                                <Input size="large" placeholder="large size" style={{ width: 200 }}/>
                            </div>
                            <div className='second-item'>
                                <span>商超价：</span>
                                <Input size="large" placeholder="large size" style={{ width: 200 }}/>
                            </div>
                            <div className='second-item'>
                                <span>连锁超市：</span>
                                <Input size="large" placeholder="large size" style={{ width: 200 }}/>
                            </div>
                            <div className='second-item'>
                                <span>A类店：</span>
                                <Input size="large" placeholder="large size" style={{ width: 200 }}/>
                            </div>
                            <div className='second-item'>
                                <span>KA卖场：</span>
                                <Input size="large" placeholder="large size" style={{ width: 200 }}/>
                            </div>
                        </div>
                    </div>
                    {/* 商品相册 */}
                    <div className='last-pic'>
                        <div className='first'>
                            <div className='biaoqian'>
                                <div className='black'>
                                    <TagOutlined className='rotateBq'/>
                                    <span>商品相册</span>
                                </div>
                                <div className='sanjiao'></div>
                            </div>
                        </div>
                        <div className='second another'>
                            <div className='photoWall'>
                                <div style={{width:106,height:130,border:'1px solid'}}>
                                    <div className='pic-setting'>
                                        <a>设为主图</a>
                                    </div>
                                </div>
                                <div style={{width:106,height:130,border:'1px solid'}}>
                                    <div className='pic-setting'>
                                        <a>设为主图</a>
                                    </div>
                                </div>
                                <div style={{width:106,height:130,border:'1px solid'}}>
                                    <div className='pic-setting'>
                                        <a>设为主图</a>
                                    </div>
                                </div>
                                <div style={{width:106,height:130,border:'1px solid'}}>
                                    <div className='pic-setting'>
                                        <a>设为主图</a>
                                    </div>
                                </div>
                            </div>
                            <div className='uploadPart'>
                                <Upload {...props2}>
                                    
                                    <Button type="primary" size='large'>上传图片</Button>
                                </Upload>
                                <p>按住ctrl可同时批量选择多张图片上传，最多可以上传4张图片，建议尺寸800*800px</p>
                            </div>
                            <div className='submitPart'>
                                <Button type="primary" size='large' style={{width:200}}>提交</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddGoods