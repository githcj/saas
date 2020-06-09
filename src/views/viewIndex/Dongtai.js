import React from 'react'
import PersonDynamic from '../viewDynamic/PeosonDynamic'
import GoodsDynamic from '../viewDynamic/GoodsDynamic'
import ShopDynamic from '../viewDynamic/ShopDynamic'
import '../../assets/css/dynamic/dongtai.css'
import { NavLink, Route, Redirect } from 'react-router-dom'
import { Row, Col, Menu } from 'antd';

const Dongtai = (props) => {
	const { match } = props
	return (
		<div className="dongtai">
			<Row>
      <Col span={4}>
			<div className='dongtai-leftmenu'>
			<Menu style={{background: '#f3f3f3'}}>
                    <Menu.ItemGroup key="g1" title="基本资料">
                        <Menu.Item key="1">
				<NavLink to={ match.url + '/persondynamic'}>人员销售动态</NavLink>
				</Menu.Item>
				<Menu.Item key="2">
				<NavLink to={ match.url + '/goodsdynamic'}>商品销售动态</NavLink>
				</Menu.Item>
				<Menu.Item key="3">
				<NavLink to={ match.url + '/shopdynamic'}>门店销售动态</NavLink>
				</Menu.Item>
				</Menu.ItemGroup>
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

export default Dongtai