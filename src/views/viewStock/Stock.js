import React from 'react'
import { Route,Link,Redirect } from 'react-router-dom'
import StockIn from './StockIn'
import StockOut from './StockOut'
import AddStockIn from './AddStockIn'
import AddStockOut from './AddStockOut'
import '../../assets/css/viewStock/stock.css'
import { Menu } from 'antd';

const Stock = (props) => {
    const { match } = props
    return (
        <div className="stock">
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
            <div className="stockContent">
                <Route path={match.url + '/stockout'}><StockOut /></Route>
                <Route path={match.url + '/addstockout'}><AddStockOut /></Route>
                <Route path={match.url + '/stockin'}><StockIn /></Route>
                <Route path={match.url + '/addstockin'}><AddStockIn /></Route>
                <Redirect exact to={match.url + '/stockout'} />
            </div>
        </div>
    )
}

export default Stock