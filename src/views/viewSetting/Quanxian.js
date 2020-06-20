import React, { Component } from 'react'
import ConTitle from '../../components/ConTitle'
import '../../assets/css/viewSetting/Power.css'
import { Checkbox,Button, message } from 'antd'
import PowerTable from '../../components/PowerTable'
// import {connect} from 'react-redux'
import {getSecondChildrenList,reTreeNode} from '../../store/user/selector'
import axios from '../../plugins/axios'

let index = 0

class Quanxian extends Component{
    constructor(props) {
        super(props)
        this.state = {
            rowInfo:{},
            powerList:[],//所有权限
            checkList:[],//选择的权限
            indeterminate:true,
            checkAll:false,
        }
    }

    async componentDidMount() {
        
        const {data:res} = await axios.post('/position/getpermission')//获取所有权限列表
        // console.log(res,'res for Quanxian')
        let powerList = reTreeNode(res.data,0)
        // console.log(powerList,'this state powerList')
        powerList = getSecondChildrenList(powerList)//得到二级权限
        // // console.log(powerList,'powerList')

        const rowInfo = this.props.location.params
        // console.log(rowInfo,'Quanxian rowInfo');
        
        const {data:empPower} = await axios.post('/position/getEmppermission',{position_id:rowInfo.position_id})//获取当前选择角色权限
        // console.log(empPower)
        let checkedList = reTreeNode(empPower.data,0)

        // let checkedList = reTreeNode(JSON.parse(sessionStorage.getItem('checkedList')),0)
        checkedList = getSecondChildrenList(checkedList)//得到二级权限
        // console.log(checkedList, this.state.powerList,'checkedList')
        this.proData(checkedList,powerList)
        // console.log(this.props.checkList,'props checkList')

        
        await this.setState({
            powerList,
            rowInfo
        })
        // console.log(this.state.powerList,'state.powerList')

        
    }

    proData = (listData,powerList)=>{//生成checkList函数
        const checkList = []
        
        powerList.map(item => {
            // 子元数组
            let Obj = {}
            Obj.power_id = item.power_id
            Obj.parent_id = item.parent_id

            let isItem = listData.filter(lItem => {
                return lItem.power_id === item.power_id
            })

            if(isItem.length !== 0){
                isItem = isItem[0]
                if(isItem.children){//有子权限
                    Obj.children = isItem.children.map(items =>{
                        return items.power_id
                    })
                    
                    // 判断是否全选
                    let ObjLength = powerList.filter(oItem =>{
                        return isItem.power_id === oItem.power_id
                    })
                    // console.log(item,ObjLength[0],'error')
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
                    
                }else {//无子权限
                    Obj.indeterminate = false
                    Obj.checked = false
                }
            }
            

            checkList.push(Obj)
        })
        this.setState({
            checkList
        })
        // console.log(checkList,'Obj');
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
        // console.log(e.target.checked);
        if(e.target.checked) {
            this.proData(this.state.powerList,this.state.powerList)
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
    onCheckOneAllChange = (e,id,listId)=>{
        let isChecked = e.target.checked
        // console.log(e.target.checked,id,index);
        
        const {checkList,powerList} = this.state
        // console.log(checkList,powerList,'list');

        for(let i=0; i<checkList.length; i++){//查出每个表格对应的全部选项值
            if(checkList[i].power_id === id && isChecked){//确定选的那个表且该表全选
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
        index = listId
        
    }
    // 选择一个
    onChange = (checkedValues,id) =>{
        console.log(checkedValues,id,'checkedValues');
        let Obj = this.state.powerList.filter(item =>{
            return id === item.power_id
        })
        // console.log(Obj)
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
        // console.log(this.state.checkList,'checkList');
    }

    //权限修改
    editPower = async() =>{
        // console.log('???');
        let params = {}
        params.powerArr = []
        let {checkList} = this.state
        checkList.map(item => {
            if(item.children){
                if(item.children.length !== 0 ) {
                    params.powerArr.push(item.parent_id,item.power_id)
                    item.children.map( cItem =>{
                        params.powerArr.push(cItem)
                    })
                }
            }
        })
        params.position_id = this.state.rowInfo.position_id
        console.log(params,'1params');
        params.powerArr = this.eddRepeatNum(params.powerArr)
        console.log(params,'2params');
        
        const {data:res} = await axios.post('/position/setpermission',params)
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
        console.log(this.state.checkList,this.state.powerList,'渲染时的checkList')

        const listDOM = ppList.map((item) => {
            if(item.children) {
                // if(!this.state.index) {

                    // for(let i=0; i<this.state.checkList.length; i++){
                    //     if(this.state.checkList[i].power_id === item.power_id){
                    //        index=i
                    //     }
                    // }
                // }
                // console.log(item,index,'index');
                
                
                {/* 选出后渲染DOM */}
                return <PowerTable checkList={this.state.checkList} item={item} 
                key={item.power_id} onCheckOneAllChange={this.onCheckOneAllChange} onChange={this.onChange} />
            }
        })

        return (
            <div className="stockOut">
                <header>
                    <div className="stockout-top">
                        <ConTitle titleName='权限设置' clickName="返回" />
                    </div>
                </header>
                
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


export default Quanxian;
