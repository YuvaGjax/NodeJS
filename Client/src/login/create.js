import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();
  const [userNameAndPassword, setUserNameAndPassword] = useState({
    emp_id: "",
    password: "",
  });
  const apiPostFetch = async () => {
    const payload = {
      empId: userNameAndPassword?.emp_id,
      password: userNameAndPassword?.password,
    };
    await fetch("http://localhost:4000/login/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.status === 200) {
          navigate("/");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h1>Welcome!</h1>
      <h1>Create User</h1>
      <input
        type="text"
        value={userNameAndPassword?.emp_id}
        onChange={(e) =>
          setUserNameAndPassword({
            ...userNameAndPassword,
            emp_id: e?.target?.value,
          })
        }
      />
      <input
        type="password"
        value={userNameAndPassword?.password}
        onChange={(e) =>
          setUserNameAndPassword({
            ...userNameAndPassword,
            password: e?.target?.value,
          })
        }
      />
      <button onClick={apiPostFetch}>Create</button>
    </>
  );
};

export default CreateUser;
