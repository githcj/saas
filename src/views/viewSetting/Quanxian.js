import React, { Component } from 'react'
import ConTitle from '../../components/ConTitle'
import '../../assets/css/viewSetting/Power.css'
import { Checkbox,Row,Col } from 'antd'
import PowerTable from '../../components/PowerTable'

const {CheckboxGroup} = Checkbox

export default class Quanxian extends Component{
    constructor(props) {
        super(props)
        this.state = {
            rowInfo:{},
            powerList:[{
                power_id:1,
                power_name:'商品管理',
                power_path:'/home/system',
                children:[
                    {power_id:2,
                    power_name:'商品管理添加',
                    power_path:'/home/system',},
                    {power_id:3,
                    power_name:'商品管理删除',
                    power_path:'/home/system',},
                    {power_id:4,
                    power_name:'商品管理编辑',
                    power_path:'/home/system',},
                    {power_id:5,
                    power_name:'商品管理查询',
                    power_path:'/home/system',},
                    {power_id:6,
                    power_name:'商品管理查看',
                    power_path:'/home/system',},
                    {power_id:7,
                    power_name:'商品管理的撒看见',
                    power_path:'/home/system',},
                ]
            },{
                power_id:8,
                power_name:'职位管理',
                power_path:'/home/system',
                children:[
                    {power_id:9,
                    power_name:'职位管理添加',
                    power_path:'/home/system',},
                    {power_id:10,
                    power_name:'职位管理删除',
                    power_path:'/home/system',},
                    {power_id:11,
                    power_name:'职位管理编辑',
                    power_path:'/home/system',},
                    {power_id:12,
                    power_name:'职位管理查询',
                    power_path:'/home/system',},
                    {power_id:13,
                    power_name:'职位管理查看',
                    power_path:'/home/system',},
                    {power_id:14,
                    power_name:'职位管理的撒看见',
                    power_path:'/home/system',},
                ]
            }],
            checkedList:[{
                power_id:1,
                power_name:'商品管理',
                power_path:'/home/system',
                children:[
                    {power_id:2,
                    power_name:'商品管理添加',
                    power_path:'/home/system',},
                    {power_id:5,
                    power_name:'商品管理查询',
                    power_path:'/home/system',},
                    {power_id:6,
                    power_name:'商品管理查看',
                    power_path:'/home/system',},
                    {power_id:7,
                    power_name:'商品管理的撒看见',
                    power_path:'/home/system',},
                ]
            },{
                power_id:8,
                power_name:'职位管理',
                power_path:'/home/system',
                children:[
                    {power_id:9,
                    power_name:'职位管理添加',
                    power_path:'/home/system',},
                    {power_id:10,
                    power_name:'职位管理删除',
                    power_path:'/home/system',},
                    {power_id:11,
                    power_name:'职位管理编辑',
                    power_path:'/home/system',},
                    {power_id:12,
                    power_name:'职位管理查询',
                    power_path:'/home/system',},
                ]
            }
        ],
            indeterminate:false,
            checkAll:true,
            checked:true,
            checkList:[]
        }
    }
    
    

    componentWillMount () {
        this.proData()
    }

    componentDidMount() {
        const rowInfo = this.props.location.params
        this.setState({
            rowInfo
        })
    }

    proData = (listData)=>{
        const checkList = this.state.checkList
        this.state.checkedList.map(item => {
            let Obj = {}
            Obj.power_id = item.power_id
            // 子元数组
            Obj.children = item.children.map(items =>{
                return items.power_id
            })
            // 判断是否全选
            let ObjLength = this.state.powerList.filter(oItem =>{
                return item.power_id === oItem.power_id
            })
            
            let length = ObjLength[0].children.length
            if(length === item.children.length){
                Obj.indeterminate = false
                Obj.checked = true
            }else {
                Obj.indeterminate = true
                Obj.checked = false
            }

            checkList.push(Obj)

        })
        this.setState({
            checkList
        })
        console.log(this.state.checkList,'Obj');
    }

    // 选择全部
    onCheckAllChange = (e) =>{
        console.log(e);
        this.setState({
            // checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    }
    // 选择一个表的
    onCheckOneAllChange = (e,id)=>{
        let isChecked = e.target.checked
        console.log(e.target.checked,id);
        
        const {checkList,powerList} = this.state

        for(let i=0; i<checkList.length; i++){
            if(checkList[i].power_id === id && isChecked){
                let poList = powerList.filter(item => {
                    return item.power_id = id
                })
                poList = poList[0].children.map(item =>{
                    return item.power_id
                })
                console.log(poList);
                checkList[i].children = poList
                checkList[i].indeterminate = false
                checkList[i].checked = true
            }
            if(checkList[i].power_id === id && !isChecked){
                checkList[i].children = []
                checkList[i].indeterminate = true
                checkList[i].checked = false
            }
        }
        this.setState({
            checkList
        })
        console.log(this.state.checkList);
        
        // let 
    }
    // 选择一个
    onChange = (checkedValues,id) =>{
        console.log(checkedValues,id,'checkedValues');
        let Obj = this.state.powerList.filter(item =>{
            return id === item.power_id
        })
        console.log(Obj)
        let length = Obj[0].children.length
        let checkList = this.state.checkList
        for(let i=0; i<checkList.length; i++){
            if(checkList[i].power_id === id){
                checkList[i].children = checkedValues
                if(length === checkedValues.length) {
                    checkList[i].indeterminate = false
                    checkList[i].checked = true
                }else {
                    checkList[i].indeterminate = false
                    checkList[i].checked = false
                }
            }
        }
        this.setState({
            checkList
        })
        console.log(this.state.checkList,'checkList');
        
    }

    render () {
        return (
            <div className="stockOut">
                <header>
                    <div className="stockout-top">
                        <ConTitle titleName='权限设置' clickName="返回" />
                    </div>
                </header>
                {/* <section id="border-section"> */}
                <div className='power-title-box'>
                    <div className='power-title'>
                        <span style={{fontSize:'14px'}}>当前职位：{this.state.rowInfo.position_name}</span>
                    </div>
                    
                    {/* 多选框 */}
                    <div className='power-checkbox-box'>
                        {/* 复用结构 */}
                        {this.state.powerList.map((item) => {
                            let index
                            for(let i=0; i<this.state.checkList.length; i++){
                                if(this.state.checkList[i].power_id === item.power_id){
                                    index=i
                                }
                            }
                            
                            {/* 选出后渲染DOM */}
                            return <PowerTable {...this.state} index={index} item={item} key={index} onCheckOneAllChange={this.onCheckOneAllChange}
                            onChange={this.onChange} />

                            {/* <div className='power-check-box' key={item.power_id}>
                                    <div className="power-check-title">
                                        <Checkbox
                                            indeterminate={this.state.checkList[index].indeterminate}
                                            onChange={(e)=>this.onCheckOneAllChange(e,item.power_id)}
                                            checked={this.state.checkList[index].checked}
                                        >
                                            {item.power_name}
                                        </Checkbox>
                                    </div>
                                    <div className="power-check-body">
                                        <Checkbox.Group style={{ width: '100%' }} value={this.state.checkList[index].children} id={index} onChange={(value)=>{this.onChange(value,item.power_id)}}>
                                            <Row className="power-check-body">
                                            {item.children.map(childItem =>{
                                                return  <Col span={8} className="power-check-item-box" key={childItem.power_id}>
                                                            <Checkbox value={childItem.power_id}>{childItem.power_name}</Checkbox>
                                                        </Col>
                                            })}
                                            </Row>
                                        </Checkbox.Group>
                                    </div>
                            </div> */}
                        })}
                    </div>
                    <div className="power-check-title">
                        <Checkbox
                            indeterminate={this.state.indeterminate}
                            onChange={this.onCheckAllChange}
                            checked={this.state.checked}
                        >
                            选择全部
                        </Checkbox>
                    </div>
                </div>
            </div>
        )
    }
}

// export default Quanxian