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
import { Row, Col } from 'antd';
import '../../assets/css/huang/system.css'

const System = (props)=> {
  const {match} = props
  return (
    <div className="system">
      <Row>
      <Col span={8}>
            <div className='system-nav'>
                <h3>基本资料</h3>
                <NavLink to={match.url}>公司信息</NavLink>
                <NavLink to={match.url+'/system/Department '}>部门管理</NavLink>
                <NavLink to={match.url + '/Position '}>职位管理</NavLink>
                <NavLink to={match.url + '/Employee '}>员工管理</NavLink>
                <NavLink to={match.url + '/Operation '}>操作日志</NavLink>
                <h3>客户管理</h3>
                <NavLink to={match.url + '/Cusinfo'}>客户信息</NavLink>
                <NavLink to={match.url + '/Custype'}>客户类型</NavLink>
                <NavLink to={match.url + '/Supplier'}>供应厂商</NavLink>
                <h3>商品管理</h3>
                <NavLink to={match.url + '/Brandma'}>品牌管理</NavLink>
                <NavLink to={match.url + '/Comclass'}>商品分类</NavLink>
                <NavLink to={match.url + '/Cominfo'}>商品信息</NavLink>
          </div>
      </Col>
      <Col span={16}>
            <div>
                    <Route path={match.url} exact component={Gongsi} />
                    <Route path={match.url + '/system/Department'} component={Department} />
                    <Route path={match.url + '/Position'} component={Position} />
                    <Route path={match.url + '/Employee'} component={Employee} />
                    <Route path={match.url + '/Operation'} component={Operation} />
                    <Route path={match.url + '/Cusinfo'} component={Cusinfo} />
                    <Route path={match.url + '/Custype'} component={Custype} />
                    <Route path={match.url + '/Supplier'} component={Supplier} />
                    <Route path={match.url + '/Brandma'} component={Brandma} />
                    <Route path={match.url + '/Comclass'} component={Comclass} />
                    <Route path={match.url + '/Cominfo'} component={Cominfo} />
          </div>
      </Col>
    </Row>
         
    </div>
  )
}

export default System