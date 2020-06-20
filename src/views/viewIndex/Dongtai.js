import React,{useState,useEffect} from 'react'
import PersonDynamic from '../viewDynamic/PeosonDynamic'
import GoodsDynamic from '../viewDynamic/GoodsDynamic'
import ShopDynamic from '../viewDynamic/ShopDynamic'
import '../../assets/css/dynamic/dongtai.css'
import { NavLink, Route, Redirect } from 'react-router-dom'
import { Row, Col, Menu } from 'antd';
import {getLimitList} from '../../store/user/selector'
import {connect} from 'react-redux'

const Dongtai = (props) => {
    const { match } = props

    const [activeKey,setactiveKey] = useState(['1'])
    
    useEffect(()=>{
        setactiveKey([sessionStorage.getItem('activeKey')])
    },[])

    console.log("system:", match.url);
    // console.log(props,'SystemProps')
    const {checkedList} = props.state.userReducer//获取列表
    let sysList = getLimitList(checkedList,4,6)//该页权限列表

    console.log(sysList,'SysList')

    const menuDOM = sysList.map((item,index) => {//节点生成
        // console.log(item,'item')
        return (<Menu.ItemGroup title={item.power_name} key={index}>
            { !item.children ? '':
                item.children.map(cItem => {
                return (
                    <Menu.Item key={cItem.power_path} key={cItem.power_path}>
                        <NavLink to={cItem.power_path}>{cItem.power_name}</NavLink>
                    </Menu.Item>
                )
                })}
        </Menu.ItemGroup>)
    })


    //当前点击
    const changeActiveKey = (e) => {
        sessionStorage.setItem('activeKey',e.key)
        console.log(e,props.location.pathname,'点击的节点')
        setactiveKey([e.key])
    }






	return (
		<div className="dongtai">
			<Row>
      <Col span={4}>
			<div className='dongtai-leftmenu'>
			<Menu style={{background: '#f3f3f3'}} selectedKeys={activeKey} onClick={changeActiveKey}>
                {/* <Menu.ItemGroup key="g1" title="基本资料">
                    <Menu.Item key="1">
                    <NavLink to={ match.url + '/persondynamic'}>人员销售动态</NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                    <NavLink to={ match.url + '/goodsdynamic'}>商品销售动态</NavLink>
                    </Menu.Item>
                    <Menu.Item key="3">
                    <NavLink to={ match.url + '/shopdynamic'}>门店销售动态</NavLink>
                    </Menu.Item>
				</Menu.ItemGroup> */}

                {menuDOM}
            </Menu>
			</div>
			</Col>
			<Col span={20}>
			<div className='dongtai-content'>
			<Redirect from={ match.url } exact to={ match.url + '/persondynamic'}></Redirect>
				<Route path={ match.url + '/persondynamic'} component={PersonDynamic}></Route>
				<Route path={ match.url + '/goodsdynamic'} component={GoodsDynamic}></Route>
				<Route path={ match.url + '/shopdynamic'} component={ShopDynamic}></Route>
			</div>
			</Col>
			</Row>
		</div>
	)
}

function mapStateToProps(state) {
    return {
      state
    }
}

export default connect(mapStateToProps)(Dongtai);