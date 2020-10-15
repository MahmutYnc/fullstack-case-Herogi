import React, { useState, useEffect } from "react";
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

const Row = () => {
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
        Number(pace[i].distance / 1000) / Number(pace[i].total_time)
      ).toFixed(2);

      tempPace[i].speed = Number(speed);
      tempPace[i].distance = Number(tempPace[i].distance);
      tempPace[i].total_time = Number(tempPace[i].total_time);
      tempPace[i].username =
        users[
          users.findIndex((x) => x.userid === tempPace[i].userid)
        ]?.username;
      tempPace[i].age =
        users[users.findIndex((x) => x.userid === tempPace[i].userid)]?.age;
      if (tempPace[i].age > 20 && tempPace[i].age < 30) {
        tempPace[i].ageGroup = "group1";
      } else if (tempPace[i].age > 30 && tempPace[i].age < 40) {
        tempPace[i].ageGroup = "group2";
      } else {
        tempPace[i].ageGroup = "group3";
      }

      tempArr.push(tempPace[i]);
    }
    let sortedArr = tempArr.sort(dynamicSort(sortedBy));
    setList(sortedArr);
    console.log("SONRASI", sortedArr);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "username",
    },
    {
      title: "Age",
      dataIndex: "age",
      filters: [
        {
          text: "20 - 30",
          value: "group1",
        },
        {
          text: "30 - 40",
          value: "group2",
        },
        {
          text: "40+",
          value: "group3",
        },
      ],
      onFilter: (value, record) => record.ageGroup.indexOf(value) === 0,
      sorter: dynamicSort("age"),
    },
    {
      title: "Distance",
      dataIndex: "distance",
      sorter: dynamicSort("distance"),
    },
    {
      title: "Avg Pace",
      dataIndex: "speed",
      defaultSortOrder: "descend",
      sorter: dynamicSort("speed"),
    },
    {
      title: "Total Time",
      dataIndex: "total_time",
      sorter: dynamicSort("total_time"),
      sortDirections: ["descend", "ascend"],
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <div>
      <Table columns={columns} dataSource={list} onChange={onChange} />
    </div>
  );
};
export default Row;
