import React from "react";
import { connect } from "react-redux";
import { loginActionSync } from "../../store/user/userActions";
import '../../assets/css/huang/login.css'
import axios from 'axios'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
	  password: "",
	  token:""
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

  getLogin = () => {
	  axios({
		  method:'POST',
		  url:'http://119.23.228.238:3031/mock/47/Login',
		  data:{
			  emp_account:this.state.username,
        emp_password:this.state.password,
        emp_last_time:new Date()
      }
	  })
	  .then(res=> {
		  console.log(res.data)
		  this.setState({
			  username:res.data.username,
			  token:res.data.token
      })
      localStorage.setItem('token',this.state.token)
      this.props.loginHandler(
        {
          username: this.state.username
        },
        this.props.history
      );
	  })
	  .catch(err=> {
		  console.log('err',err)
    })
    this.setState({
      username:'',
      password:''
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
    loginHandler: (user, history) => dispatch(loginActionSync(user, history)),
  };
}

export default connect(null, mapDispatchToProps)(Login);
