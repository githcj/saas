import React, { Component } from 'react'
import { Route,NavLink } from 'react-router-dom'
import Caigou from './Caigou'
import Xiaoshou from './Xiaoshou'
import Kucun from './Kucun'
import Zijin from './Zijin'
import Dongtai from './Dongtai'
import System from './System'


export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const { match } = this.props
    return (
      <div className="home">
          <h1>z9525</h1>
          <div>
              <NavLink to={match.url}>系统</NavLink>
              <NavLink to={match.url+'/Caigou'}>采购</NavLink>
              <NavLink to={match.url+'/Xiaoshou'}>销售</NavLink>
              <NavLink to={match.url + '/Kucun'}>库存</NavLink>
              <NavLink to={match.url + '/Zijin'}>资金</NavLink>
              <NavLink to={match.url + '/Dongtai'}>动态</NavLink>
          </div>
          <div>
            <Route path={match.url} exact>
                <System />
            </Route>
            <Route path={match.url + '/Caigou'} component={Caigou} />
            <Route path={match.url + '/Xiaoshou'} component={Xiaoshou} />
            <Route path={match.url + '/Kucun'} component={Kucun} />
            <Route path={match.url + '/Zijin'} component={Zijin} />
            <Route path={match.url + '/Dongtai'} component={Dongtai} />
            </div>
        </div>
        )
    }
}