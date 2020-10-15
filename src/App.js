import React from "react";

import "./App.css";
import { Layout, Menu, Typography } from "antd";

import { faRunning, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//logo
import { logo } from "./utils/images/";

import Row from "./components/rows";

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <div className='App'>
      <Layout>
        <Header style={styles.header}>
          <Title level={1} style={{ margin: 10 }}>
            StudyCase-Runner LeaderBoard
            <img src={logo} style={{ float: "left", margin: 10 }} />
          </Title>
        </Header>
        <Layout>
          <Sider
            breakpoint='lg'
            collapsedWidth='0'
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
            style={{ backgroundColor: "white" }}
          >
            <Menu theme='light' mode='inline' defaultSelectedKeys={["bests"]}>
              <Menu.Item key='bests'>
                <FontAwesomeIcon
                  style={{
                    marginRight: "20",
                  }}
                  icon={faRunning}
                />
                <a href={"https://github.com/mahmutync"}>My LinkedIn Profile</a>
              </Menu.Item>
              <Menu.Item key='allRunners'>
                <FontAwesomeIcon
                  style={{
                    marginRight: "16",
                  }}
                  icon={faUsers}
                  onClick={() => {
                    "https://github.com/mahmutync";
                  }}
                />
                <a href={"https://github.com/mahmutync"}>My GitHub</a>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content
              className='site-layout-background'
              style={{
                padding: 20,
                margin: 10,
                minHeight: 280,
              }}
            >
              <Row title='This is title' fetchUrl='/users' />
            </Content>

            {/* <Footer style={{ textAlign: "center" }}>
              Ant Design ©2020 Created by MahmutYnc
            </Footer> */}
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

const styles = {
  header: {
    padding: 8,
    paddingTop: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flex: 1,
    // alignItems: "center",
    justifyContent: "flex-start",
    background: "lightskyblue",
    //background: rgb(2, 0, 36),
    //background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(98,195,149,1) 28%, rgba(75,144,221,1) 100%);
  },
};

export default App;
