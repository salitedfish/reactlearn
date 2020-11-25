import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom"

import "antd/dist/antd.css";
import { Layout } from 'antd';
import "./style.css"

import AppHeader from "./components/header/header.js"
import List from "./containers/list/index.js"
import Detail from "./containers/detail/index.js"
import Login from "./components/login/index.js"
import VipView from "./containers/vip/index.js"


const { Header, Footer, Content } = Layout;

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Layout style={{ minWidth: 800 }}>
          <Header className="header">
            <AppHeader></AppHeader>
            <Login></Login>
          </Header>
          <Content className="content">
            <Switch>
              <Route path="/vip" component={VipView}></Route>
              <Route path="/detail/:id" component={Detail}></Route>
              <Route path="/:id?" component={List}></Route>
            </Switch>
          </Content>
          <Footer className="footer">
            Footer
            </Footer>
        </Layout>
      </BrowserRouter>
    )
  }

}


ReactDOM.render(<App></App>, document.getElementById("root"))