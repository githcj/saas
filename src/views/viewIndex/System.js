<<<<<<< HEAD
import React from "react"
import { Route, NavLink } from "react-router-dom"
import Gongsi from "../viewSetting/Gongsi"
import Department from "../viewSetting/Department"
import Position from "../viewSetting/Position"
import Employee from "../viewSetting/Employee"
import Operation from "../viewSetting/Operation"
import Cusinfo from "../viewSetting/Cusinfo"
import Custype from "../viewSetting/Custype"
import Supplier from "../viewSetting/Supplier"
import Brandma from "../viewSetting/Brandma"
import Comclass from "../viewSetting/Comclass"
import Cominfo from "../viewSetting/Cominfo"
import addCus from "../viewSetting/addCus"
import Warehouse from "../viewSetting/Warehouse"
import AddWare from "../viewSetting/AddWare"
import AddGoods from "../viewSetting/AddGoods"
import AddClass from "../viewSetting/AddClass"
import AddBrand from "../viewSetting/AddBrand"
=======
import React from 'react'
import { Route,NavLink } from 'react-router-dom'
import Gongsi from '../viewSetting/Gongsi'
import Department from '../viewSetting/Department'
import Position from '../viewSetting/Position'
import Employee from '../viewSetting/Employee'
import Operation from '../viewSetting/Operation'
import Cusinfo from '../viewSetting/Cusinfo'
import Custype from '../viewSetting/Custype'
import Supplier from '../viewSetting/Supplier'
import Brandma from '../viewSetting/Brandma'
import Comclass from '../viewSetting/Comclass'
import Cominfo from '../viewSetting/Cominfo'
import addCus from '../viewSetting/addCus'
import AddEmp from '../viewSetting/AddEmp'
>>>>>>> depart

import { Row, Col, Menu } from "antd";
import "../../assets/css/huang/system.css";
import Quanxian from "../viewSetting/Quanxian";
import Secondary from "../viewSetting/Secondary";

const System = (props) => {
	const { match, history } = props;
	console.log("system:", match.url);
	return (
		<div className="system">
			<Row>
				<Col span={4}>
					<div className='system-nav'>
						<Menu style={{ background: '#f3f3f3' }}>
							<Menu.ItemGroup title="基本资料">
								<Menu.Item key="1">
									<NavLink to={match.url}>公司信息</NavLink>
								</Menu.Item>
								<Menu.Item key="2">
									<NavLink to={match.url + "/Department"}>部门管理</NavLink>
								</Menu.Item>
								<Menu.Item key="3">
									<NavLink to={match.url + "/Position"}>职位管理</NavLink>
								</Menu.Item>
								<Menu.Item key="4">
									<NavLink to={match.url + "/Employee"}>员工管理</NavLink>
								</Menu.Item>
								<Menu.Item key="5">
									<NavLink to={match.url + "/Operation"}>操作日志</NavLink>
								</Menu.Item>
								<Menu.Item key="6">
									<NavLink to={match.url + "/Warehouse"}>仓库管理</NavLink>
								</Menu.Item>
							</Menu.ItemGroup>
							<Menu.ItemGroup title="客户管理">
								<Menu.Item key="7">
									<NavLink to={match.url + "/Cusinfo"}>客户信息</NavLink>
								</Menu.Item>
								<Menu.Item key="8">
									<NavLink to={match.url + "/Custype"}>客户类型</NavLink>
								</Menu.Item>
								<Menu.Item key="9">
									<NavLink to={match.url + "/Supplier"}>供应厂商</NavLink>
								</Menu.Item>
							</Menu.ItemGroup>
							<Menu.ItemGroup title="商品管理">
								<Menu.Item key="10">
									<NavLink to={match.url + "/Brandma"}>品牌管理</NavLink>
								</Menu.Item>
								<Menu.Item key="11">
									<NavLink to={match.url + "/Comclass"}>商品分类</NavLink>
								</Menu.Item>
								<Menu.Item key="12">
									<NavLink to={match.url + "/Cominfo"}>商品信息</NavLink>
								</Menu.Item>
							</Menu.ItemGroup>
						</Menu>
					</div>
				</Col>
				<Col span={20}>
					<div>
						<Route path={match.url} exact component={Gongsi} />
						<Route path={match.url + "/Department"} component={Department} />
						<Route path={match.url + "/Position"} component={Position}>
							<Position msg={match.url} />
						</Route>
						<Route path={match.url + "/Quanxian"} component={Quanxian} />
						<Route path={match.url + "/Employee"} component={Employee} />
						<Route path={match.url + "/Operation"} component={Operation} />
						<Route path={match.url + "/Warehouse"} component={Warehouse}>
							<Warehouse msg={match.url} his={props.history}></Warehouse>
						</Route>
						<Route path={match.url + "/AddWare"} component={AddWare} />
						<Route path={match.url + "/Cusinfo"} component={Cusinfo}>
							<Cusinfo msg={match.url}></Cusinfo>
						</Route>
						<Route path={match.url + "/Custype"} component={Custype} />
						<Route path={match.url + "/Supplier"} component={Supplier} />
						<Route path={match.url + "/addCus"} component={addCus}></Route>

<<<<<<< HEAD
						
						{/* 商品管理 */}
						<Route path={match.url + "/Brandma"} component={Brandma} />
						<Route path={match.url + "/Comclass"} component={Comclass} his={history}/>
						<Route path={match.url + "/Cominfo"} component={Cominfo} his={history}/>
						<Route path={match.url + "/secondary"} component={Secondary}>
							<Secondary his={history}></Secondary>
						</Route>
						<Route path={match.url + "/addgoods"} component={AddGoods}>
							<AddGoods his={history}></AddGoods>
						</Route>
						<Route path={match.url + "/addclass"} component={AddClass}>
							<AddClass his={history}></AddClass>
						</Route>
						<Route path={match.url + "/addbrand"} component={AddBrand}>
							<AddBrand his={history}></AddBrand>
						</Route>
					</div>
				</Col>
			</Row>
		</div>
	);
};
=======
const System = (props)=> {
  const {match} = props
  console.log('system:', match.url)
  return (
    <div className="system">
      <Row>
      <Col span={4}>
            <div className='system-nav'>
            <Menu style={{background: '#f3f3f3'}}>
                    <Menu.ItemGroup  title="基本资料">
                        <Menu.Item key="1">
                <NavLink to={match.url}>公司信息</NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                <NavLink to={match.url+'/Department' }>部门管理</NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                <NavLink to={match.url + '/Position' }>职位管理</NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                <NavLink to={match.url + '/Employee' }>员工管理</NavLink>
                </Menu.Item>
                <Menu.Item key="5">
                <NavLink to={match.url + '/Operation' }>操作日志</NavLink>
                </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="客户管理">
                <Menu.Item key="6">
                <NavLink to={match.url + '/Cusinfo'}>客户信息</NavLink>
                </Menu.Item>
                <Menu.Item key="7">
                <NavLink to={match.url + '/Custype'}>客户类型</NavLink>
                </Menu.Item>
                <Menu.Item key="8">
                <NavLink to={match.url + '/Supplier'}>供应厂商</NavLink>
                </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="商品管理">
                <Menu.Item key="9">
                <NavLink to={match.url + '/Brandma'}>品牌管理</NavLink>
                </Menu.Item>
                <Menu.Item key="10">
                <NavLink to={match.url + '/Comclass'}>商品分类</NavLink>
                </Menu.Item>
                <Menu.Item key="11">
                <NavLink to={match.url + '/Cominfo'}>商品信息</NavLink>
                </Menu.Item>
                </Menu.ItemGroup>
                </Menu>
          </div>
      </Col>
      <Col span={20}>
            <div>
                    <Route path={match.url} exact component={Gongsi} />
                    <Route path={match.url + '/Department'} component={Department} />
                    <Route path={match.url + '/Position'} component={Position} >
                      <Position msg={match.url} />
                    </Route>
                    <Route path={match.url + '/Quanxian'} component={Quanxian} />
                    <Route path={match.url + '/Employee'} component={Employee} />
                    <Route path={match.url + '/AddEmp'} component={AddEmp} />
                    <Route path={match.url + '/Operation'} component={Operation} />
                    <Route path={match.url + '/Cusinfo'} component={Cusinfo}>
                      <Cusinfo msg={match.url}></Cusinfo>
                    </Route>
                    <Route path={match.url + '/Custype'} component={Custype} />
                    <Route path={match.url + '/Supplier'} component={Supplier} />
                    <Route path={match.url + '/Brandma'} component={Brandma} />
                    <Route path={match.url + '/Comclass'} component={Comclass} />
                    <Route path={match.url + '/Cominfo'} component={Cominfo} />
                    <Route path={match.url + '/addCus'} component={addCus}></Route>
                   
          </div>
      </Col>
    </Row>
         
    </div>
  )
}
>>>>>>> depart

export default System;
