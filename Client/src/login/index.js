import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userNameAndPassword, setUserNameAndPassword] = useState({
    emp_id: "",
    password: "",
  });
  const apiPostFetch = async () => {
    const payload = {
      emp_id: userNameAndPassword?.emp_id,
      password: userNameAndPassword?.password,
    };
    await fetch("http://localhost:3000/leave_management/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.status === 200) {
          navigate("/dashboard");
        }
      })
      .catch((err) => console.error("err1", err));
  };

  return (
    <>
      <h1>Welcome!</h1>
      <h1>Login</h1>
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
      <button onClick={apiPostFetch}>Login</button>
      <button onClick={() => navigate("/create")}>Create</button>
    </>
  );
};

export default Login;
