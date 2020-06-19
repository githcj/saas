import React, { useState, useEffect } from "react"
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
import AddEmp from '../viewSetting/AddEmp'
import { Row, Col, Menu } from "antd";
import "../../assets/css/huang/system.css";
import Quanxian from "../viewSetting/Quanxian";
import Secondary from "../viewSetting/Secondary";
import Unit from '../viewSetting/Unit'
import {connect} from 'react-redux'
import {getLimitList} from '../../store/user/selector'
import Item from "antd/lib/list/Item"

const System = (props) => {
    
    const { match, history } = props;
    
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
		<div className="system">
			<Row>
				<Col span={4}>
					<div className='system-nav'>
						<Menu style={{ background: '#f3f3f3' }} selectedKeys={activeKey} onClick={changeActiveKey}>
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
									<NavLink to={match.url + "/Warehouse"}>仓库管理</NavLink>
								</Menu.Item>
								<Menu.Item key="6">
									<NavLink to={match.url + "/Unit"}>计量单位管理</NavLink>
								</Menu.Item>
								<Menu.Item key="7">
									<NavLink to={match.url + "/Operation"}>操作日志</NavLink>
								</Menu.Item>
							</Menu.ItemGroup>
							<Menu.ItemGroup title="客户管理">
								<Menu.Item key="8">
									<NavLink to={match.url + "/Cusinfo"}>客户信息</NavLink>
								</Menu.Item>
								<Menu.Item key="9">
									<NavLink to={match.url + "/Custype"}>客户类型</NavLink>
								</Menu.Item>
								<Menu.Item key="10">
									<NavLink to={match.url + "/Supplier"}>供应厂商</NavLink>
								</Menu.Item>
							</Menu.ItemGroup>
							<Menu.ItemGroup title="商品管理">
								<Menu.Item key="11">
									<NavLink to={match.url + "/Brandma"}>品牌管理</NavLink>
								</Menu.Item>
								<Menu.Item key="12">
									<NavLink to={match.url + "/Comclass"}>商品分类</NavLink>
								</Menu.Item>
								<Menu.Item key="13">
									<NavLink to={match.url + "/Cominfo"}>商品信息</NavLink>
								</Menu.Item>
							</Menu.ItemGroup>

                            {/* 权限渲染节点 */}
                            {/* {menuDOM} */}
						</Menu>
					</div>
				</Col>
				<Col span={20}>
					<div>
						<Route path={match.url} exact component={Gongsi} />
						<Route path={match.url + "/Department"} component={Department} />
						<Route path={match.url + "/Position"} component={Position} />
						<Route path={match.url + "/Quanxian"} component={Quanxian} />
                        <Route path={match.url + "/Unit"} component={Unit} />
						<Route path={match.url + "/Employee"} component={Employee} />
                        <Route path={match.url + '/AddEmp'} component={AddEmp} />
						<Route path={match.url + "/Operation"} component={Operation} />
						<Route path={match.url + "/Warehouse"} component={Warehouse}>
							<Warehouse msg={match.url} history={props.history}></Warehouse>
						</Route>
						<Route path={match.url + "/AddWare"} component={AddWare} />
						<Route path={match.url + "/Cusinfo"} component={Cusinfo}>
							<Cusinfo msg={match.url}></Cusinfo>
						</Route>
						<Route path={match.url + "/Custype"} component={Custype} />
						<Route path={match.url + "/Supplier"} component={Supplier} />
						<Route path={match.url + "/addCus"} component={addCus}></Route>

						
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

function mapStateToProps(state) {
    return {
      state
    }
}

export default connect(mapStateToProps)(System);
