import React from "react";
import { Button } from "antd";
import "./App.css";
import { Layout, Menu, Typography } from "antd";

//icons
import { UserOutlined } from "@ant-design/icons";
import {
  faRunning,
  faUsers,
  faStreetView,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//logo
import { logo } from "./utils/images/";

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header style={styles.header}>
          <Title level={1} style={{ margin: 10 }}>
            Herogi-StudyCase
            <img src={logo} style={{ float: "left" }} />
          </Title>
        </Header>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <Menu theme="light" mode="inline" defaultSelectedKeys={["bests"]}>
              <Menu.Item key="bests">
                <FontAwesomeIcon
                  style={{
                    marginRight: "20",
                  }}
                  icon={faRunning}
                />
                Bests
              </Menu.Item>
              <Menu.Item key="allRunners">
                <FontAwesomeIcon
                  style={{
                    marginRight: "16",
                  }}
                  icon={faUsers}
                />
                All Runners
              </Menu.Item>
              <Menu.Item key="12">
                <FontAwesomeIcon
                  style={{
                    marginRight: "20",
                  }}
                  icon={faStreetView}
                />
                User Groups
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content>Content</Content>
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
