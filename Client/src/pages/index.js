import React, { useState, useEffect } from "react";

const DashBoard = () => {
  const [userDetails, setUserDtails] = useState([]);
  useEffect(() => {
    apiPostFetch();
  }, []);
  const apiPostFetch = async () => {
    await fetch("http://localhost:4000/employee", {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("access_token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.status === 200) {
          setUserDtails(res?.response);
        }
      })
      .catch((err) => console.error("err1", err));
  };
  return (
    <table>
      <tr>
        <th>Employee name</th>
        <th>Employee ID</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Gender</th>
        <th>DOB</th>
        <th>Department</th>
      </tr>
      {userDetails?.map((data) => (
        <tr>
          <td>{data?.empName}</td>
          <td>{data?.empId}</td>
          <td>{data?.email}</td>
          <td>{data?.phoneNumber}</td>
          <td>{data?.gender}</td>
          <td>{data?.dob}</td>
          <td>{data?.departmentName}</td>
        </tr>
      ))}
    </table>
  );
};

export default DashBoard;
