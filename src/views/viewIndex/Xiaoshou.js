import React, { useEffect,useState } from "react";
import { Route, NavLink } from "react-router-dom";
import Order from "../viewSales/order";
import NewOrder from "../viewSales/newOrder";
import orderDetail from '../viewSales/orderDetail'
import { Row, Col, Menu } from "antd";
import {connect} from 'react-redux'
import {getLimitList} from '../../store/user/selector'

const Xiaoshou = (props) => {
  const { match } = props;

  const [activeKey,setactiveKey] = useState(['1'])
    
    useEffect(()=>{
        setactiveKey([sessionStorage.getItem('activeKey')])
    },[])

    console.log("system:", match.url);
    // console.log(props,'SystemProps')
    const {checkedList} = props.state.userReducer//获取列表
    let sysList = getLimitList(checkedList,7,9)//该页权限列表

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
    <div className="about">
      <Row>
        <Col  span={4}>
            <div className='list'>
          <Menu style={{ background: "#f3f3f3" }} selectedKeys={activeKey} onClick={changeActiveKey}>
            {/* <Menu.ItemGroup key="g1">
              <Menu.Item key="1">
                <NavLink to={match.url}>订单列表</NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to={match.url + "/newOrder"}>新增订单</NavLink>
              </Menu.Item>
            </Menu.ItemGroup> */}
            {menuDOM}
          </Menu>
          </div>
        </Col>
        <Col span={20}>
          <Route path={match.url} exact component={Order} >
              <Order msg={match.url} his={props.history}></Order>
          </Route>
          <Route path={match.url + "/newOrder"} component={NewOrder} >
               <NewOrder his={props.history}></NewOrder>
          </Route>
          <Route path={match.url + '/orderDetail'} component={orderDetail}></Route>
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

export default connect(mapStateToProps)(Xiaoshou);
