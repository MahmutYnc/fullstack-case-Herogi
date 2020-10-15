import React, { useState, useEffect } from "react";
import { List, Avatar } from "antd";
import axios from "../actions/axios";
import { Table } from "antd";

const dynamicSort = (property) => {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

const TableList = ({ title, fetchUrl }) => {
  const [users, setUsers] = useState([]);
  const [pace, setPace] = useState([]);
  const [list, setList] = useState([]);
  const [sortedBy, setSortedBy] = useState("speed");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/users");
      setUsers(response.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/pace");
      setPace(response.data);
      console.log("LOG", response.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (Array.isArray(pace) && pace.length > 0) {
      sortByAveragePace(pace);
    }
  }, [sortedBy]);

  useEffect(() => {
    if (Array.isArray(pace) && pace.length > 0) {
      sortByAveragePace(pace);
    }
  }, [pace]);

  const sortByAveragePace = (pace, data2) => {
    let tempArr = [];
    let tempPace = pace;

    for (let i = 0; i < pace.length; i++) {
      var speed = (
        Number(pace[i].distance / 1000) / Number(pace[i].total_time / 60)
      ).toFixed(2);

      tempPace[i].speed = Number(speed);
      tempPace[i].distance = Number(tempPace[i].distance);
      tempPace[i].total_time = Number(tempPace[i].total_time);
      tempArr.push(tempPace[i]);
    }
    let sortedArr = tempArr.sort(dynamicSort(sortedBy));
    setList(sortedArr);
    console.log("SONRASI", sortedArr);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Age",
      dataIndex: "age",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];
  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <div>
      <Table columns={columns} dataSource={data} onChange={onChange} />
      <button onClick={() => setSortedBy("-speed")}>Speed</button>
      <button onClick={() => setSortedBy("-distance")}>Distance</button>
      <button onClick={() => setSortedBy("-total_time")}>Time</button>
      <List
        itemLayout='horizontal'
        dataSource={list}
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
              title={
                <h3>
                  {
                    users[users.findIndex((x) => x.userid === item.userid)]
                      ?.username
                  }
                </h3>
              }
              description={
                " UserID : " +
                item.userid +
                " - UserName: " +
                users[users.findIndex((x) => x.userid === item.userid)]
                  ?.username +
                " - Speed: " +
                item.speed +
                " - Age: " +
                item.age +
                " - Time: " +
                item.total_time +
                " - Distance: " +
                item.distance
              }
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
};

export default TableList;
