import React from 'react'
import '../../assets/css/dynamic/PersonDynamic.css'
import '../../assets/css/system/comclass.css'
import '../../assets/css/system/secondary.css'
import '../../assets/css/system/addbrand.css'
import { Input, Upload, Button, message } from 'antd'
import {
    LeftOutlined,
    UploadOutlined
} from '@ant-design/icons'
import axios from '../../plugins/axios'


class AddBrand extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            data: [],
            name:'',
            story:''
		}
    }
    componentWillMount() {
        const obj = this.props.his.location.params
        this.setState({
            name:obj.brand_name
        })
    }
    // 返回
    goBack = () => {
        this.props.his.goBack()
    }
    // 提交
    submitAdd = () => {
        const { name, story } = this.state
        const obj = this.props.his.location.params
        if(obj === '添加'){
            axios({
                method:'POST',
                url:'/brand/add',
                data:{
                    token:'dsadas',
                    brand_name:name,
                    brand_remarks:story
                }
            })
            .then(res => {
                console.log(res)
                this.props.his.push('/home/system/Brandma')
            })
            .catch(err => {
                console.log(err)
            })
        }
        else{
            axios({
                method:'POST',
                url:'/brand/update',
                data:{
                    token:'sdasd',
                    brand_id:obj.brand_id,
                    brand_name:name,
                    brand_remarks:story
                }
            })
            .then(res => {
                console.log(res)
                this.props.his.push('/home/system/Brandma')
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
    // 
    changeName = (e) => {
        this.setState({
            name:e.target.value
        })
    }
    changeStory = (e) => {
        this.setState({
            story:e.target.value
        })
    }
	render() {
        const { TextArea } = Input
        const { name, story } = this.state
        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 上传成功`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败.`);
                }
            },
        }
        const { his } = this.props
        let newTitle
        if(his.location.params === '添加'){ 
            newTitle = <p className="brandma-p">添加新品牌</p>
        }else{
            newTitle = <p className="brandma-p">编辑品牌</p>
        }
		return (
			<div className="cominfo">
				{/* 顶部 */}
				<div className='dynamic-top'>
					<div>
						<div className='dynamic-top-left'>
							<div className='dynamic-top-leftmark'></div>
							{newTitle}
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
                        {newTitle}
						</div>
					</div>
                    <div style={{height:300,width:'100%',background:'white'}}>
                        <div className='mid-content'>
                            <div>
                                <span className='mid-con-span import-span'>品牌名称：</span>
                                <Input 
                                    style={{ width: 200 }} 
                                    onChange={(e) => this.changeName(e)}
                                    value={name}
                                ></Input>
                            </div>
                            <div>
                                <span className='mid-con-span import-span'>品牌LOGO：</span>
                                <Upload {...props}>
                                    <Button>
                                        <UploadOutlined /> 上传LOGO
                                    </Button>
                                </Upload>
                            </div>
                            <div>
                                <span className='mid-con-span'>品牌故事：</span>
                                <TextArea 
                                    style={{ width: '70%',height:80 }} 
                                    onChange={(e) => this.changeStory(e)}
                                    value={story}/>
                            </div>
                            <div style={{justifyContent:'center'}}>
                                <Button type='primary' onClick={this.submitAdd}>提交</Button>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
		)
	}
}

export default AddBrand