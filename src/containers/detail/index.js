import React from "react"
import { Card } from 'antd'
import axios from "axios"
import "./style.css"


class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      content: ""
    }
  }

  componentDidMount() {
    let url = "http://www.dell-lee.com/react/api/detail.json?id="
    const id = this.props.match.params.id
    url = url + id
    axios.get(url).then((res)=>{
      const data = res.data.data
      this.setState(data)
    })
  }

  render() {
    return (
        <Card title={this.state.title}>
          <div className="detail" dangerouslySetInnerHTML={{__html:this.state.content}}></div>
        </Card>
    )
  }
}

export default Detail