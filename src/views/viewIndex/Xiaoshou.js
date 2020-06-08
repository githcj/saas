import React from 'react'
import { Route,NavLink } from 'react-router-dom'
import Order from '../viewSales/order'


const Xiaoshou = (props)=> {
  const {match} = props
  return (
    <div className="about">
        <NavLink to={match.url }>订单列表</NavLink>

        <Route path={match.url} component={Order} />
    </div>
  )
}

export default Xiaoshou