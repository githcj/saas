import React from 'react'
import { Route,Link,Redirect } from 'react-router-dom'
import StockIn from '../viewStock/StockIn'
import StockOut from '../viewStock/StockOut'
import AddStockIn from '../viewStock/AddStockIn'
import AddStockOut from '../viewStock/AddStockOut'
import '../../assets/css/viewStock/kucun.css'
import { Menu, Col, Row } from 'antd';
import StockOutDetail from '../viewStock/StockOutDetail'
import StockInDetail from '../viewStock/StockInDetail'

const Stock = (props) => {
    const { match } = props
    return (
        <div className="stock">
            <Row>
            <Col span={4}>
            <div className="stockTitle">
                <Menu style={{background: '#f3f3f3'}}>
                    <Menu.ItemGroup key="g1" title="出库">
                        <Menu.Item key="1">
                            <Link to={match.url + '/stockout'}>出库管理</Link>
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
                    </Menu.ItemGroup>
                </Menu>
            </div>
            </Col>
            <Col  span={20}>
            <div className="stockContent">
                <Route path={match.url + '/stockout'}><StockOut msg={props.history}/></Route>
                <Route path={match.url + '/stockin'}><StockIn/></Route>

                <Route path={match.url + '/addstockout'}><AddStockOut /></Route>
                <Route path={match.url + '/addstockin'}><AddStockIn /></Route>

                <Route path={match.url + '/stockindetail'}><StockInDetail/></Route>
                <Route path={match.url + '/stockoutdetail'}><StockOutDetail msg={props.location}/></Route>
                
                <Redirect exact to={match.url + '/stockout'} />
            </div>
            </Col>
            </Row>
        </div>
        
    )
}

export default Stock