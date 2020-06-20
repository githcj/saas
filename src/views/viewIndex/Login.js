import React from "react";
import { connect } from "react-redux";
import { loginActionSync, powerAction } from "../../store/user/userActions";
import '../../assets/css/huang/login.css'
// import axios from '../../plugins/axios'
import axios from 'axios'

const checkedList = [{
    power_id:0,
    power_name:'基本信息',
    children:[{
        power_id:1,
        power_name:'商品管理',
        power_path:'/home/system',
        parent_id:0,
        children:[
            {power_id:2,
            power_name:'商品管理添加',
            power_path:'/home/system',},
            {power_id:5,
            power_name:'商品管理查询',
            power_path:'/home/system',},
            {power_id:6,
            power_name:'商品管理查看',
            power_path:'/home/system',},
            {power_id:7,
            power_name:'商品管理的撒看见',
            power_path:'/home/system',},
        ]
    },{
        power_id:8,
        power_name:'职位管理',
        power_path:'/home/system/Position',
        parent_id:0,
        children:[
            {power_id:9,
            power_name:'职位管理添加',
            power_path:'/home/system',},
            {power_id:10,
            power_name:'职位管理删除',
            power_path:'/home/system',},
            {power_id:11,
            power_name:'职位管理编辑',
            power_path:'/home/system',},
            {power_id:12,
            power_name:'职位管理查询',
            power_path:'/home/system',},
        ]
    }]
},{
    power_id:13,
    power_name:'测试',
    children:[{
        power_id:14,
        power_name:'测试管理',
        power_path:'/home/system',
        parent_id:13,
        children:[
            {power_id:15,
            power_name:'测试管理添加',
            power_path:'/home/system',},
            {power_id:16,
            power_name:'测试管理查询',
            power_path:'/home/system',},
            {power_id:17,
            power_name:'测试管理查看',
            power_path:'/home/system',},
            {power_id:18,
            power_name:'测试管理的撒看见',
            power_path:'/home/system',},
        ]
    }]
}]


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: ""
    }
  }

  setUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  setPassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  getLogin = async () => {
	  await axios({
		  method:'POST',
		  url:'http://172.16.6.27:8080/login/login',
		  data:{
			  emp_account:this.state.username,
        emp_password:this.state.password,
        emp_last_time:new Date()
      }
	  })
	  .then(res=> {
		  console.log(res.data)
		  this.setState({
			  token:res.data.token
        })
      localStorage.setItem('token',this.state.token)
      localStorage.setItem('username',this.state.username)

        console.log(checkedList,'loginCheck')

      this.props.loginHandler(
        {
          username: this.state.username
        },
        this.props.history,
        checkedList
      );

	  })
	  .catch(err=> {
		  console.log('err',err)
    })
    this.setState({
      password: ''
    })
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="login">
        <div className='login-form'>
          <div className='login-biaoti'>
            <h1>Saas经销商业务管理系统</h1>
            <p>Saas Dealer Management System</p>
          </div>
          <input
            type="text"
            placeholder="请输入账号"
            value={username}
            onChange={this.setUsername}
          />
          <input
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={this.setPassword}
          />

          <button onClick={this.getLogin}>登录</button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginHandler: (user, history,checkedList) => dispatch(loginActionSync(user, history,checkedList)),
    // setCheckedList: (checkedList) => dispatch(powerAction(checkedList))
  };
}

export default connect(null, mapDispatchToProps)(Login);
