import React from "react"
import axios from "axios"
import { Link,withRouter} from "react-router-dom"
import { Modal, Button, Input } from 'antd';

import "./style.css"

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false,
      modalout: false,
      user: "",
      password: "",
      hidden: true,
    }
  }

  componentDidMount() {
    axios.get("http://www.dell-lee.com/react/api/isLogin.json", {
      withCredentials: true
    })
      .then((res) => {
        this.setState({
          login: res.data.data.login
        })
      })
  }

  //显示弹出层
  showModal() {
    this.setState({
      modalout: true
    })
  }

  //隐藏弹出层
  hidModal() {
    this.setState({
      modalout: false,
      user: "",
      password: "",
      hidden: true
    })
  }

  //输入用户名
  inputuser(event) {
    this.setState({
      user: event.target.value,
      hidden: true,
    })
  }

  //输入密码
  inputpassword(event) {
    this.setState({
      password: event.target.value,
      hidden: true
    })
  }

  //点击弹出层的ok登录
  login() {
    const { user, password } = this.state;
    axios.get("http://www.dell-lee.com/react/api/login.json?user=" + user + "&password=" + password,
      { withCredentials: true })
      .then((res) => {
        if (res.data.data.login) {
          this.setState({
            login: true
          })
          this.hidModal()
          alert("登录成功")
        } else {
          this.setState({
            hidden: false
          })
        }
      })
  }

  //退出
  logout() {
    axios.get("http://www.dell-lee.com/react/api/Logout.json", {
      withCredentials: true
    })
      .then((res) => {
        if (res.data.data.logout) {
          this.setState({
            login: false
          })
          this.props.history.push('/')
        }
      })
  }

  render() {
    const { login } = this.state
    return (
      <>
        <div className="login-button-box">

          {/*以下用三元运算符选择显示登录还是退出*/}
          {
            login ?
              <Button
                type="primary"
                className="login-button"
                onClick={this.logout.bind(this)}
              >
                退出
              </Button>
              :
              <Button
                type="primary"
                className="login-button"
                onClick={this.showModal.bind(this)}
              >
                登录
              </Button>
          }
          <Link to="/vip" className="vipbutton">
            <Button
              type="primary"
              className="login-button"
            >VIP</Button>
          </Link>
          <Button
            type="primary"
            className="login-button"
          >注册</Button>

          {/*以下为弹出框*/}
          <Modal
            title="登录"
            visible={this.state.modalout}
            onOk={this.login.bind(this)}
            onCancel={this.hidModal.bind(this)}
          >

            {/*以下用户名和密码输入框*/}
            <Input
              value={this.state.user}
              placeholder="请输入用户名"
              className="input"
              onInput={this.inputuser.bind(this)}
            ></Input>
            <Input
              value={this.state.password}
              type="password"
              placeholder="请输入密码"
              onInput={this.inputpassword.bind(this)}
            ></Input>
            {
              this.state.hidden ?
                "" : <div className="tip">用户名或密码错误</div>
            }

          </Modal>
        </div>
      </>
    )
  }
}

export default withRouter(Login)