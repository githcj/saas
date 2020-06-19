import React,{useState,useEffect} from "react"
import { Route, NavLink, Redirect } from "react-router-dom"
import PurchaseAdmin from '../viewPurchase/purchaseAdmin'
import purchaseApply from '../viewPurchase/purchaseApply'
import purchaseDetail from '../viewPurchase/purchaseDetail'
import '../../assets/css/wang/purchase.css'
import { Menu, Row, Col } from 'antd'
import {getLimitList} from '../../store/user/selector'
import {connect} from 'react-redux'

const Caigou = (props) => {
    const { match, history } = props

    const [activeKey,setactiveKey] = useState(['1'])
    
    useEffect(()=>{
        setactiveKey([sessionStorage.getItem('activeKey')])
    },[])

    console.log("system:", match.url);
    // console.log(props,'SystemProps')
    const {checkedList} = props.state.userReducer//获取列表
    let sysList = getLimitList(checkedList,-1,14)//该页权限列表

    console.log(sysList,'SysList')

    const menuDOM = sysList.map(item => {//节点生成
        return (<Menu.ItemGroup title={item.power_name}>
            {item.children.map(cItem => {
                return (
                    <Menu.Item key={cItem.power_id}>
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
		<div className="Cai">
			<Row>
				<Col span={4}>
					<div className="links">
						<Menu style={{ background: '#f3f3f3' }} selectedKeys={activeKey} onClick={changeActiveKey}>
							<Menu.ItemGroup key="g1" title="基本资料">
								<Menu.Item key="1">
									<NavLink to={match.url + "/purchaseAdmin"}>采购管理</NavLink>
								</Menu.Item>
								<Menu.Item key="2">
									<NavLink to={match.url + "/purchaseApply"}>采购申请</NavLink>
								</Menu.Item>
							</Menu.ItemGroup>
						</Menu>

					</div>
				</Col>
				<Col span={20}>
					<div className="show">
						<Route path={match.url + "/purchaseAdmin"}>
							<PurchaseAdmin msg={history} />
						</Route>
						<Route path={match.url + "/purchaseApply"} component={purchaseApply}>
						</Route>
						<Route path={match.url + "/purchaseDetail"} component={purchaseDetail}>
						</Route>
						<Redirect exact to={match.url + '/purchaseAdmin'}></Redirect>
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

export default connect(mapStateToProps)(Caigou);
