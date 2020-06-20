import React from 'react'
import '../../assets/css/system/addgoods.css'
import {
    LeftOutlined,
    TagOutlined,
    PlusOutlined
} from '@ant-design/icons'
import { Select, Input, Button, Upload } from 'antd'
import axios from '../../plugins/axios'

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
            pic1:'',
            goodsName:'', // 商品名称
            goodsMiaoshu:'', //商品描述
            bUnitSP:'', // 大单位规格
            sUnitSP:'', // 小单位规格
            ShelfLife:'', // 保质期
            ratio:6, // 换算比
            BUnitCost:'', // 大单位成本价
            SUnitCost:'', // 小单位成本价
            bUnitSupply:'', // 大单位供货价
            sUnitSupply:'', // 小单位供货价
            proPrice:'', // 保护价
            lockState:0, // 价格锁定
            TwoPiJia:0, // 二批价
            goodsTypeList:[], // 商品类型数组
            goodType:'', //商品类型
            gonghuoList:[],
            gonghuo:'', 
            bigUnitList:[],
            bigUnit:'',
            smallUnitList:[],
            smallUnit:''
        }
    }
    async componentWillMount() {
        await axios({ // 类型
            method:'POST',
            url:'/combobox/commodity_level',
            data:{
                token:'dsada'
            }
        })
        .then(res => {
            this.setState({
                goodsTypeList:res.data.data
            })
        })
        .catch(err => {
            console.log(err)
        })
        await axios({ // 供货商
            method:'POST',
            url:'/combobox/supplier',
            data:{
                token:'dsada'
            }
        })
        .then(res => {
            this.setState({
                gonghuoList:res.data.data
            })
        })
        .catch(err => {
            console.log(err)
        })
        await axios({ // 大单位
            method:'POST',
            url:'/combobox/unit_big',
            data:{
                token:'dsada'
            }
        })
        .then(res => {
            this.setState({
                bigUnitList:res.data.data
            })
        })
        .catch(err => {
            console.log(err)
        })
        await axios({ // 小单位
            method:'POST',
            url:'/combobox/unit_small',
            data:{
                token:'dsada'
            }
        })
        .then(res => {
            this.setState({
                smallUnitList:res.data.data
            })
        })
        .catch(err => {
            console.log(err)
        })
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
    // 设置主图
    tomainPic = (u) => {
        const { fileList } = this.state
        let arr = fileList
        let mainPic = fileList[0]
        arr.splice(0,1)
        arr.map((item, index) => {
            if(item === u){
                fileList.splice(index, 1)
            }
        })
        arr.unshift(u)
        arr.push(mainPic)
        this.setState({
            fileList:arr
        })
    }
    // 删除图片
    delPic = (i) => {
        const { fileList } = this.state
        let newArr = fileList.filter((item, index) => {
            if(index !== i){
                return item
            }
        })
        this.setState({
            fileList:newArr
        })
    }
    // 数据双向绑定
    changeGName = (e) => { // 商品名称
        this.setState({
            goodsName:e.target.value
        })
    }
    changeMiaoshu = (e) => { // 商品描述
        this.setState({
            goodsMiaoshu:e.target.value
        })
    }
    changebUnitSP = (e) => { // 大单位规格
        this.setState({
            bUnitSP:e.target.value
        })
    }
    changesUnitSP = (e) => { // 小单位规格
        this.setState({
            sUnitSP:e.target.value
        })
    }
    changeShelf = (e) => { // 保质期
        this.setState({
            ShelfLife:e.target.value
        })
    }
    changeRatio = (e) => { // 换算比
        this.setState({
            ratio:e.target.value
        })
    }
    changeBUnitCost = (e) => { // 大单位成本价
        this.setState({
            BUnitCost:e.target.value
        })
    }
    changeSUnitCost = (e) => { // 小单位成本价
        this.setState({
            SUnitCost:e.target.value
        })
    }
    changebUnitSupply = (e) => { // 大单位供货价
        this.setState({
            bUnitSupply:e.target.value
        })
    }
    changesUnitSupply = (e) => { // 小单位供货价
        this.setState({
            sUnitSupply:e.target.value
        })
    }
    changeproPrice = (e) => { // 保护价
        this.setState({
            proPrice:e.target.value
        })
    }
    changeproPrice = (e) => { //价格体系
        this.setState({
            TwoPiJia:e.target.value
        })
    }
    changeType = (value) => { //商品类型
        this.setState({
            goodType:value
        })
    }
    changeGonghuo = (value) => { // 供货商
        this.setState({
            gonghuo:value
        })
    }
    changeBunit = (value) => { // 大单位
        this.setState({
            bigUnit:value
        })
    }
    changeSunit = (value) => { // 小单位
        this.setState({
            smallUnit:value
        })
    }


    // 提交
    toSubmit = () => {
        const { goodsName, goodsMiaoshu, bUnitSP, sUnitSP, ShelfLife, ratio, BUnitCost,
            SUnitCost, bUnitSupply, sUnitSupply, goodType, gonghuo, bigUnit, smallUnit } = this.state
        axios({
            method:'POST',
            url:'/goods/add_subordinate',
            data:{
                token:'dsada',
                supplier_id:gonghuo,
                commodity_level_id:goodType,
                goods_name:goodsName,
                goods_remarks:goodsMiaoshu,
                unit_id_big:bigUnit,
                unit_id_small:smallUnit,
                gu_specifications_big:bUnitSP,
                gu_specifications_small:sUnitSP,
                goods_guarantee_period:ShelfLife,
                goods_matrixing:ratio,
                gu_cost_price_big:BUnitCost,
                gu_cost_price_small:SUnitCost,
                gu_supply_price_big:bUnitSupply,
                gu_supply_price_small:sUnitSupply,
            }
        })
        .then(res => {
            console.log(res, '添加成功')
            this.props.his.push('/home/system/Cominfo')
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const { Option } = Select
        const { TextArea } = Input
        const { fileList, goodsName, goodsMiaoshu, bUnitSP, sUnitSP, ShelfLife, ratio, BUnitCost,
                SUnitCost, bUnitSupply, sUnitSupply, proPrice, TwoPiJia, goodsTypeList, gonghuoList,
                bigUnitList, smallUnitList } = this.state
        let typeDom = goodsTypeList.map(item => {
            return <Option value={item.commodity_level_id}>{item.commodity_level_name}</Option>
        })
        let gonghuoDom = gonghuoList.map(item => {
            return <Option value={item.supplier_id}>{item.supplier_name}</Option>
        })
        let bUnitDom = bigUnitList.map(item => {
            return <Option value={item.unit_id_big}>{item.unit_name_big}</Option>
        })
        let sUnitDom = smallUnitList.map(item => {
            return <Option value={item.unit_id_small}>{item.unit_name_small}</Option>
        })
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
                                <span className='span-import'>供货商：</span>
                                <Select 
                                    defaultValue="请选择供货商" 
                                    style={{ width: 200 }} 
                                    size='large'
                                    onChange={(value) => this.changeGonghuo(value)}>
                                    {gonghuoDom}
                                </Select>
                            </div>
                            <div className='second-item'>
                                <span className='span-import'>商品类型：</span>
                                <Select 
                                    defaultValue="请选择类型" 
                                    style={{ width: 200 }} 
                                    size='large'
                                    onChange={(value) => this.changeType(value)}>
                                    {typeDom}
                                </Select>
                            </div>
                            <div className='second-item'>
                                <span className='span-import'>商品名称：</span>
                                <Input 
                                    size="large" 
                                    style={{ width: 200 }}
                                    value={goodsName}
                                    onChange={(e) => this.changeGName(e)}/>
                            </div>
                            <div className='second-item item-area'>
                                <span>商品描述：</span>
                                <TextArea 
                                    style={{ width: '80%',height:80 }}
                                    value={goodsMiaoshu}
                                    onChange={(e) => this.changeMiaoshu(e)} />
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
                                <span className='span-import'>大单位：</span>
                                <Select 
                                    defaultValue="请选择单位，例：箱" 
                                    style={{ width: 200 }} 
                                    size='large'
                                    onChange={(value) => this.changeBunit(value)}>
                                    {bUnitDom}
                                </Select>
                            </div>
                            <div className='second-item'>
                                <span className='span-import'>小单位：</span>
                                <Select 
                                    defaultValue="请选择单位，例：盒" 
                                    style={{ width: 200 }} 
                                    size='large'
                                    onChange={(value) => this.changeSunit(value)}>
                                    {sUnitDom}
                                </Select>
                            </div>
                            <div className='second-item'>
                                <span className='span-import'>大单位规格：</span>
                                <Input 
                                    size="large" 
                                    placeholder="1500ml" 
                                    style={{ width: 200 }}
                                    value={bUnitSP}
                                    onChange={(e) => this.changebUnitSP(e)}/>
                            </div>
                            <div className='second-item'>
                                <span className='span-import'>小单位规格：</span>
                                <Input 
                                    size="large" 
                                    placeholder="250ml" 
                                    style={{ width: 200 }}
                                    value = {sUnitSP}
                                    onChange={(e) => this.changesUnitSP(e)}/>
                            </div>
                            <div className='second-item'>
                                <span className='span-import'>保质期：</span>
                                <Input 
                                    size="large" 
                                    placeholder="3个月" 
                                    style={{ width: 200 }}
                                    value={ShelfLife}
                                    onChange={(e) => this.changeShelf(e)}/>
                            </div>
                            <div className='second-item'>
                                <span className='span-import'>换算比：</span>
                                <Input 
                                    size="large" 
                                    placeholder={ratio} 
                                    style={{ width: 200 }}
                                    value={ratio}
                                    onChange={(e) => this.changeRatio(e)}/>
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
                                <span className='span-import'>大单位成本价：</span>
                                <Input 
                                    size="large" 
                                    placeholder="600.00" 
                                    style={{ width: 200 }}
                                    value={BUnitCost}
                                    onChange={(e) => this.changeBUnitCost(e)}/>
                            </div>
                            <div className='second-item'>
                                <span className='span-import'>小单位成本价：</span>
                                <Input 
                                    size="large" 
                                    placeholder="100.00" 
                                    style={{ width: 200 }}
                                    value={SUnitCost}
                                    onChange={(e) => this.changeSUnitCost(e)}/>
                            </div>
                            <div className='second-item'>
                                <span className='span-import'>大单位供货价：</span>
                                <Input 
                                    size="large" 
                                    placeholder="200.00" 
                                    style={{ width: 200 }}
                                    value={bUnitSupply}
                                    onChange={(e) => this.changebUnitSupply(e)}
                                    />
                            </div>
                            <div className='second-item'>
                                <span className='span-import'>小单位供货价：</span>
                                <Input 
                                    size="large" 
                                    placeholder="200.00" 
                                    style={{ width: 200 }}
                                    value={sUnitSupply}
                                    onChange={(e) => this.changesUnitSupply(e)}/>
                            </div>
                            <div className='second-item'>
                                <span>保护价：</span>
                                <Input 
                                    size="large" 
                                    placeholder="200.00" 
                                    style={{ width: 200 }}
                                    value={proPrice}
                                    onChange={(e) => this.changeproPrice(e)}/>
                            </div>
                            <div className='second-item'>
                                <span>价格锁定：</span>
                                <Select defaultValue="否" disabled style={{ width: 200 }} size='large'>
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
                                <Input 
                                    size="large" 
                                    placeholder="00.00" 
                                    style={{ width: 200 }}
                                    value={TwoPiJia}
                                    onChange={(e) => this.changeproPrice(e)}/>
                            </div>
                            <div className='second-item'>
                                <span>特通价：</span>
                                <Input 
                                    size="large" 
                                    placeholder="large size" 
                                    style={{ width: 200 }}
                                    value={TwoPiJia}
                                    onChange={(e) => this.changeproPrice(e)}/>
                            </div>
                            <div className='second-item'>
                                <span>终端价：</span>
                                <Input 
                                    size="large" 
                                    placeholder="large size" 
                                    style={{ width: 200 }}
                                    value={TwoPiJia}
                                    onChange={(e) => this.changeproPrice(e)}/>
                            </div>
                            <div className='second-item'>
                                <span>商超价：</span>
                                <Input 
                                    size="large" 
                                    placeholder="large size" 
                                    style={{ width: 200 }}
                                    value={TwoPiJia}
                                    onChange={(e) => this.changeproPrice(e)}/>
                            </div>
                            <div className='second-item'>
                                <span>连锁超市：</span>
                                <Input 
                                    size="large" 
                                    placeholder="large size" 
                                    style={{ width: 200 }}
                                    value={TwoPiJia}
                                    onChange={(e) => this.changeproPrice(e)}/>
                            </div>
                            <div className='second-item'>
                                <span>A类店：</span>
                                <Input 
                                    size="large" 
                                    placeholder="large size" 
                                    style={{ width: 200 }}
                                    value={TwoPiJia}
                                    onChange={(e) => this.changeproPrice(e)}/>
                            </div>
                            <div className='second-item'>
                                <span>KA卖场：</span>
                                <Input 
                                    size="large" 
                                    placeholder="large size" 
                                    style={{ width: 200 }}
                                    value={TwoPiJia}
                                    onChange={(e) => this.changeproPrice(e)}/>
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
                                        <img 
                                            src={fileList[0] ? fileList[0].thumbUrl : null}
                                            style={{width:'104px',height:'104px'}}></img>
                                        <div>
                                            <span className='main-pic'>商品主图</span>
                                            <span 
                                                className='del-pic'
                                                onClick={() => this.delPic(0)}>删除图片</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{width:106,height:130,border:'1px solid'}}>
                                    <div className='pic-setting'>
                                        <img 
                                            src={fileList[1] ? fileList[1].thumbUrl : null}
                                            style={{width:'104px',height:'104px'}}></img>
                                        <div>
                                            <span className='tomain' onClick={() => this.tomainPic(fileList[1])}>设为主图</span>
                                            <span 
                                                className='del-pic'
                                                onClick={() => this.delPic(1)}>删除图片</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{width:106,height:130,border:'1px solid'}}>
                                    <div className='pic-setting'>
                                        <img 
                                            src={fileList[2] ? fileList[2].thumbUrl : null}
                                            style={{width:'104px',height:'104px'}}></img>
                                        <div>
                                            <span className='tomain' onClick={() => this.tomainPic(fileList[2])}>设为主图</span>
                                            <span 
                                                className='del-pic'
                                                onClick={() => this.delPic(2)}>删除图片</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{width:106,height:130,border:'1px solid'}}>
                                    <div className='pic-setting'>
                                        <img 
                                            src={fileList[3] ? fileList[3].thumbUrl : null}
                                            style={{width:'104px',height:'104px'}}></img>
                                        <div>
                                            <span 
                                                className='tomain' 
                                                onClick={() => this.tomainPic(fileList[3])}>设为主图</span>
                                            <span 
                                                className='del-pic'
                                                onClick={() => this.delPic(3)}>删除图片</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='uploadPart'>
                                <Upload 
                                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                                    listType='picture'
                                    defaultFileList={fileList}
                                    className='upload-list-inline'
                                    onChange={(file) =>{
                                        console.log(file)
                                        this.setState({
                                            fileList:file.fileList
                                        })
                                    }
                                    }>
                                    
                                    <Button type="primary" size='large'>上传图片</Button>
                                </Upload>
                                <p>按住ctrl可同时批量选择多张图片上传，最多可以上传4张图片，建议尺寸800*800px</p>
                            </div>
                            <div className='submitPart'>
                                <Button 
                                    type="primary" 
                                    size='large' 
                                    style={{width:200}}
                                    onClick={() => this.toSubmit()}>提交</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddGoods