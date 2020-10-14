import React, { useState, useEffect } from "react";
import { List, Avatar } from "antd";
import axios from "../api/axios";

function Row({ title, fetchUrl }) {
  const [users, setUsers] = useState([]);
  const [pace, setPace] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get("/users");
      setUsers(request.data);
      return request;
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get("/pace");
      setPace(request.data);
      return request;
    }
    fetchData();
  }, []);

  return (
    <div>
      <List
        itemLayout='horizontal'
        dataSource={users}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={
                    "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  }
                />
              }
              title={<a href='https://herogi.com/'>{item.username}</a>}
              description='Ant Design, a design language for background applications, is refined by Ant UED Team '
            />
          </List.Item>
        )}
      />
      {/* <ul>
        {users.map((user, index) => {
          return <li>{user.username + " - " + user.userid}</li>;
        })}
      </ul> */}
    </div>
  );
}

export default Row;
