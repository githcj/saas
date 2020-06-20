import React, { Component } from 'react'
import ConTitle from '../../components/ConTitle'
import '../../assets/css/viewSetting/Power.css'
import { Checkbox,Button, message } from 'antd'
import PowerTable from '../../components/PowerTable'
import {connect} from 'react-redux'
import {getSecondChildrenList,reTreeNode} from '../../store/user/selector'
import axios from '../../plugins/axios'

let index = 0

class Quanxian extends Component{
    constructor(props) {
        super(props)
        this.state = {
            rowInfo:{},
            // powerList:[{
            //     power_id:1,
            //     parent_id:0,
            //     power_name:'商品管理',
            //     power_path:'/home/system',
            //     children:[
            //         {power_id:2,
            //         power_name:'商品管理添加',
            //         power_path:'/home/system',},
            //         {power_id:3,
            //         power_name:'商品管理删除',
            //         power_path:'/home/system',},
            //         {power_id:4,
            //         power_name:'商品管理编辑',
            //         power_path:'/home/system',},
            //         {power_id:5,
            //         power_name:'商品管理查询',
            //         power_path:'/home/system',},
            //         {power_id:6,
            //         power_name:'商品管理查看',
            //         power_path:'/home/system',},
            //         {power_id:7,
            //         power_name:'商品管理的撒看见',
            //         power_path:'/home/system',},
            //     ]
            // },{
            //     power_id:8,
            //     parent_id:0,
            //     power_name:'职位管理',
            //     power_path:'/home/system',
            //     children:[
            //         {power_id:9,
            //         power_name:'职位管理添加',
            //         power_path:'/home/system',},
            //         {power_id:10,
            //         power_name:'职位管理删除',
            //         power_path:'/home/system',},
            //         {power_id:11,
            //         power_name:'职位管理编辑',
            //         power_path:'/home/system',},
            //         {power_id:12,
            //         power_name:'职位管理查询',
            //         power_path:'/home/system',},
            //         {power_id:13,
            //         power_name:'职位管理查看',
            //         power_path:'/home/system',},
            //         {power_id:14,
            //         power_name:'职位管理的撒看见',
            //         power_path:'/home/system',},
            //     ]
            // },{
            //     power_id:14,
            //     parent_id:13,
            //     power_name:'权限管理',
            //     power_path:'/home/system',
            //     children:[
            //         {power_id:16,
            //         power_name:'权限管理添加',
            //         power_path:'/home/system',},
            //         {power_id:17,
            //         power_name:'权限管理删除',
            //         power_path:'/home/system',},
            //         {power_id:18,
            //         power_name:'权限管理编辑',
            //         power_path:'/home/system',},
            //         {power_id:19,
            //         power_name:'权限管理查询',
            //         power_path:'/home/system',},
            //         {power_id:20,
            //         power_name:'权限管理查看',
            //         power_path:'/home/system',},
            //         {power_id:21,
            //         power_name:'权限管理的撒看见',
            //         power_path:'/home/system',},
            //     ] 
            // }],
            
            indeterminate:true,
            checkAll:false,
            checkList:[],
        }
    }
    
    async componentWillMount () {
        const {data:res} = await axios.post('/position/getpermission')
        console.log(res.data)
        let powerList = reTreeNode(res.data,0)
        console.log(powerList)
        powerList = getSecondChildrenList(powerList)
        console.log(res.data,'powerList')
        this.setState({
            powerList:res.data
        })
        console.log(this.props.checkedList,'props')
        this.proData(this.props.checkedList)
    }

    componentDidMount() {
        const rowInfo = this.props.location.params
        this.setState({
            rowInfo
        })
    }

    proData = (listData)=>{//生成checkList函数
        const checkList = []
        
        listData.map(item => {
            let Obj = {}
            Obj.power_id = item.power_id
            Obj.parent_id = item.parent_id
            // 子元数组
            Obj.children = item.children.map(items =>{
                return items.power_id
            })
            // 判断是否全选
            let ObjLength = this.state.powerList.filter(oItem =>{
                return item.power_id === oItem.power_id
            })
            console.log(ObjLength[0],'error')
            let length = ObjLength[0].children.length
            if(length === item.children.length){
                Obj.indeterminate = false
                Obj.checked = true
            }else if(length === 0){
                Obj.indeterminate = false
                Obj.checked = false
            }else{
                Obj.indeterminate = true
                Obj.checked = false
            }

            checkList.push(Obj)
        })
        this.setState({
            checkList
        })
        console.log(checkList,'Obj');
    }


    noCheckAll = () => {
        const checkList = []
        
        this.state.powerList.map(item => {
            let Obj = {}
            Obj.power_id = item.power_id
            // 子元数组
            Obj.children = []
            Obj.indeterminate = false
            Obj.checked = false

            checkList.push(Obj)
        })
        this.setState({
            checkList
        })
    }

    // 选择全部
    onCheckAllChange = (e) =>{
        console.log(e.target.checked);
        if(e.target.checked) {
            this.proData(this.state.powerList)
            this.setState({
                indeterminate:false,
                checkAll:true
            })
        }else {
            this.noCheckAll()
            this.setState({
                indeterminate:false,
                checkAll:false
            })
        }
    }
    // 选择一个表的
    onCheckOneAllChange = (e,id,listIndex)=>{
        let isChecked = e.target.checked
        console.log(e.target.checked,id,index);
        
        const {checkList,powerList} = this.state
        console.log(checkList,powerList,'list');

        for(let i=0; i<checkList.length; i++){//查出每个表格对应的全部选项值
            if(checkList[i].power_id === id && isChecked){
                let poList = powerList.filter(item => {
                    return item.power_id === id
                })
                poList = poList[0].children.map(pItem =>{
                    return pItem.power_id
                })
                checkList[i].children = poList
                checkList[i].indeterminate = false
                checkList[i].checked = true
            }
            if(checkList[i].power_id === id && !isChecked){
                checkList[i].children = []
                checkList[i].indeterminate = false
                checkList[i].checked = false
            }
        }
        this.setState({
            checkList,
        })
        index = listIndex
        
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
                }else if(checkedValues.length === 0){
                    checkList[i].indeterminate = false
                    checkList[i].checked = false
                }else {
                    checkList[i].indeterminate = true
                    checkList[i].checked = false
                }
            }
        }
        this.setState({
            checkList
        })
        console.log(this.state.checkList,'checkList');
    }

    //权限修改
    editPower = async() =>{
        console.log('???');
        let params = {}
        params.powerArr = []
        let {checkList} = this.state
        checkList.map(item => {
            if(item.children.length !== 0 ) {
                params.powerArr.push(item.parent_id,item.power_id)
                item.children.map( cItem =>{
                    params.powerArr.push(cItem)
                })
            }
        })
        params.position_id = this.state.rowInfo.position_id
        console.log(params,'1params');
        params.powerArr = this.eddRepeatNum(params.powerArr)
        console.log(params,'2params');
        
        const {data:res} = await axios.post('/',params)
        if(res.code !== 200) return message.error('保存失败')
        message.success('保存成功!')
        this.props.history.push({
            pathname:'/home/system/Quanxian'
        })

    }

    //数组查重函数
    eddRepeatNum = (arr) =>{
        let newArr = arr.filter((item,index) =>{
            return arr.lastIndexOf(item) === index
        })
        return newArr
    }

    render () {
        const ppList = this.state.powerList
        console.log(this.state.powerList,'渲染时的powerList')
        const listDOM = ppList.map((item) => {
            if(!this.state.index) {
                console.log(this.state.checkedList,'renderList');
                
                for(let i=0; i<this.state.checkList.length; i++){
                    if(this.state.checkList[i].power_id === item.power_id){
                       index=i
                    }
                }
            }
            console.log(index,'index');
            
            
            {/* 选出后渲染DOM */}
            return <PowerTable checkList={this.state.checkList} index={index} item={item} 
            key={index} onCheckOneAllChange={this.onCheckOneAllChange} onChange={this.onChange} />
        })

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
                        {listDOM}
                    </div>
                    <div className="power-check-bottom">
                        <Checkbox
                            indeterminate={this.state.indeterminate}
                            onChange={this.onCheckAllChange}
                            checked={this.state.checkAll}
                            border
                        >
                            选择全部
                        </Checkbox>
                    </div>
                    <div className="power-bottom-button-box">
                        <Button type="primary" onClick={this.editPower} size="large">
                            保存
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(state => ({checkedList:getSecondChildrenList(state)}))(Quanxian);
