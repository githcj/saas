import React from 'react'
import Stock from '../viewStock/Stock'
// import { Button, NavBar, Icon } from 'antd-mobile'

const Kucun = (props)=> {
  // const {match, history} = props
  return (
    <div className="about">
      <Stock {...props}/>
    </div>
  )
}

export default Kucun