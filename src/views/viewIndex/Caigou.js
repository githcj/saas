import React from "react"
import { Route, NavLink, Redirect } from "react-router-dom"
import purchaseAdmin from '../viewPurchase/purchaseAdmin'
import purchaseApply from '../viewPurchase/purchaseApply'
import purchaseDetail from '../viewPurchase/purchaseDetail'
import '../../assets/css/purchase.css'
import { Menu,Row, Col } from 'antd'

const Caigou = (props) => {
	const { match } = props
	return (
		<div className="Cai">
			<Row>
      <Col span={4}>
			<div className="links">
			<Menu style={{background: '#f3f3f3'}}>
                    <Menu.ItemGroup key="g1" title="基本资料">
                        <Menu.Item key="1">
				<NavLink to={match.url + "/purchaseAdmin"}>采购管理</NavLink>
				</Menu.Item>
				<Menu.Item key="2">
				<NavLink to={match.url + "/purchaseApply"}>采购申请</NavLink>
				</Menu.Item>
				<Menu.Item key="3">
				<NavLink to={match.url + "/purchaseDetail"}>采购详情</NavLink>
				</Menu.Item>
				</Menu.ItemGroup>
				</Menu>

			</div>
			</Col>
			<Col span={20}>
			<div className="show">
				<Route path={match.url + "/purchaseAdmin"} component={purchaseAdmin}>
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

export default Caigou
