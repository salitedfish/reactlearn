import React from "react"
import { List } from "antd"
import axios from "axios"
import { Link } from "react-router-dom"


class appList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const id = nextProps.match.params.id
    axios.get("http://www.dell-lee.com/react/api/list.json?id=" + id)
      .then((res) => {
        this.setState({
          list: res.data.data
        })
      })
  }

  componentDidMount() {
    const id = this.props.match.params.id
    axios.get("http://www.dell-lee.com/react/api/list.json?id=" + id)
      .then((res) => {
        this.setState({
          list: res.data.data
        })
      })
  }


  render() {
    return (
      <List bordered dataSource={this.state.list}
        renderItem={item => (
          <List.Item>
            <Link to={`/detail/${item.id}`}>
              {item.title}
            </Link>
          </List.Item>
        )}
        style={{ backgroundColor: "#fff" }}
      />
    )
  }
}

export default appList