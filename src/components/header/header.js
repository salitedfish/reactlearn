import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import logo from "./images/logo.png"
import "./css/style.css"
import { Menu } from 'antd'
import { MailOutlined } from '@ant-design/icons'

class AppHeader extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      list: [

      ]
    }
  }

  componentDidMount() {
    axios.get("http://www.dell-lee.com/react/api/header.json")
      .then((res) => {
        this.setState({
          list: res.data.data
        })
      })
  }

  getMenuItems() {
    return this.state.list.map(item => {
      return (
        <Menu.Item key={item.id} icon={<MailOutlined />}>
          <Link to={`/${item.id}`}>
            {item.title}
          </Link>
        </Menu.Item>
      )
    })
  }

  render() {
    return (
      <Fragment>
        <Link to="/">
          <img src={logo} className="app-header-logo" alt="ok" />
        </Link>
        <Menu mode="horizontal" className="app-header-menu">
          {this.getMenuItems()}
        </Menu>
      </Fragment>

    )
  }

}

export default AppHeader