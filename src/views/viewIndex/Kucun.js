import React,{useState,useEffect} from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import StockIn from '../viewStock/StockIn'
import StockOut from '../viewStock/StockOut'
import AddStockIn from '../viewStock/AddStockIn'
import AddStockOut from '../viewStock/AddStockOut'
import '../../assets/css/viewStock/kucun.css'
import { Menu, Col, Row } from 'antd';
import StockOutDetail from '../viewStock/StockOutDetail'
import StockInDetail from '../viewStock/StockInDetail'
import {getLimitList} from '../../store/user/selector'
import {connect} from 'react-redux'

const Stock = (props) => {
    const { match } = props

    const [activeKey,setactiveKey] = useState(['1'])
    
    useEffect(()=>{
        setactiveKey([sessionStorage.getItem('activeKey')])
    },[])

    console.log("system:", match.url);
    // console.log(props,'SystemProps')
    const {checkedList} = props.state.userReducer//获取列表
    let sysList = getLimitList(checkedList,5,7)//该页权限列表
    let cukuList = getLimitList(checkedList,9,11)
    if(cukuList.length !== 0){
        sysList.push(cukuList[0])
    }
    console.log(sysList,'SysList')

    const menuDOM = sysList.map((item,index) => {//节点生成
        // console.log(item,'item')
        return (<Menu.ItemGroup title={item.power_name} key={index}>
            { !item.children ? '':
                item.children.map(cItem => {
                return (
                    <Menu.Item key={cItem.power_path} key={cItem.power_path}>
                        <Link to={cItem.power_path}>{cItem.power_name}</Link>
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
        <div className="stock">
            <Row>
                <Col span={4}>
                    <div className="stockTitle">
                        <Menu style={{ background: '#f3f3f3' }} selectedKeys={activeKey} onClick={changeActiveKey} >
                            {/* <Menu.ItemGroup key="g1" title="出库">
                                <Menu.Item key="1">
                                    <Link to={match.url}>出库管理</Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Link to={match.url + '/addstockout'}>添加出库单</Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup key="g2" title="入库">
                                <Menu.Item key="3">
                                    <Link to={match.url + '/stockin'}>入库管理</Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Link to={match.url + '/addstockin'}>添加入库单</Link>
                                </Menu.Item>
                            </Menu.ItemGroup> */}

                            {menuDOM}
                        </Menu>
                    </div>
                </Col>
                <Col span={20}>
                    <div className="stockContent">
                        <Route path={match.url} exact><StockOut msg={props.history} /></Route>
                        <Route path={match.url + '/stockin'}><StockIn msg={props.history} /></Route>

                        <Route path={match.url + '/addstockout'}><AddStockOut msg={props.history} /></Route>
                        <Route path={match.url + '/addstockin'}><AddStockIn /></Route>

                        <Route path={match.url + '/stockindetail'}><StockInDetail msg={props.location} /></Route>
                        <Route path={match.url + '/stockoutdetail'}><StockOutDetail msg={props.location} /></Route>

                        {/* <Redirect exact to={match.url + '/stockout'} /> */}
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

export default connect(mapStateToProps)(Stock);