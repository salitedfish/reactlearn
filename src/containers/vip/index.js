import axios from "axios"
import React from "react"
import { Redirect} from "react-router-dom"
import "./style.css"

class VipView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      login: true,
      fetchFinish: false
    }
  }

  componentDidMount() {
    axios.get("http://www.dell-lee.com/react/api/isLogin.json", {
      withCredentials: true
    })
      .then((res) => {
        this.setState({
          login: res.data.data.login,
          fetchFinish: true
        })
      })
  }

  render() {
    if(this.state.login) {
      if(this.state.fetchFinish) {
        return <div className="vip">这里是vip内容</div>
      }else {
        return <div className="vip">抱歉，您还未登录</div>
      }
    }else{
      alert("请登录后再尝试")
      return <Redirect to="/"></Redirect>
    }
  }
}

export default VipView