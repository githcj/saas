import React from "react"
import { Route, NavLink, Redirect } from "react-router-dom"
import purchaseAdmin from '../viewPurchase/purchaseAdmin'
import purchaseApply from '../viewPurchase/purchaseApply'
import purchaseDetail from '../viewPurchase/purchaseDetail'
import '../../assets/css/purchase.css'

const Caigou = (props) => {
	const { match } = props
	return (
		<div className="Cai">
			<div className="links">
				<NavLink to={match.url + "/purchaseAdmin"}>采购管理</NavLink> |
				<NavLink to={match.url + "/purchaseApply"}>采购申请</NavLink> |
				<NavLink to={match.url + "/purchaseDetail"}>采购详情</NavLink>

			</div>
			<div className="show">
				<Route path={match.url + "/purchaseAdmin"} component={purchaseAdmin}>
				</Route>
				<Route path={match.url + "/purchaseApply"} component={purchaseApply}>
				</Route>
				<Route path={match.url + "/purchaseDetail"} component={purchaseDetail}>
				</Route>
				<Redirect exact to={match.url + '/purchaseAdmin'}></Redirect>
			</div>
		</div>
	)
}

export default Caigou
