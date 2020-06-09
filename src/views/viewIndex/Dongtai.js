import React from 'react'
import PersonDynamic from '../viewDynamic/PeosonDynamic'
import GoodsDynamic from '../viewDynamic/GoodsDynamic'
import ShopDynamic from '../viewDynamic/ShopDynamic'
import '../../assets/css/dynamic/dongtai.css'
import { NavLink, Route, Redirect } from 'react-router-dom'

const Dongtai = (props) => {
	const { match } = props
	return (
		<div className="dongtai">
			<div className='dongtai-leftmenu'>
				<NavLink to={ match.url + '/persondynamic'}>人员销售动态</NavLink>
				<NavLink to={ match.url + '/goodsdynamic'}>商品销售动态</NavLink>
				<NavLink to={ match.url + '/shopdynamic'}>门店销售动态</NavLink>
				<Redirect from={ match.url } exact to={ match.url + '/persondynamic'}></Redirect>
			</div>
			<div className='dongtai-content'>
				<Route path={ match.url + '/persondynamic'} component={PersonDynamic}></Route>
				<Route path={ match.url + '/goodsdynamic'} component={GoodsDynamic}></Route>
				<Route path={ match.url + '/shopdynamic'} component={ShopDynamic}></Route>
			</div>
		</div>
	)
}

export default Dongtai