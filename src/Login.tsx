import React, { useState } from "react";
import { LoginType, PropLoginType } from "./utils/types";
import { URL } from "./utils/apiUrl";
import axios from "axios";

const Login = ({ setState }: PropLoginType) => {
  const [user, setUser] = useState<LoginType>({ username: "", password: "" });
  const [error, setError] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await axios.post(`${URL}login`, user);
      console.log(result);
      console.log(result.data);
      if (result.status === 200 && !result.data.isAdmin) {
        setState({ action: "userDashboard", user: result.data });
      } else if (result.status === 200 && result.data.isAdmin) {
        setState({ action: "adminDashboard", user: result.data });
      }
    } catch (err: any) {
      setError(err.response?.data?.message);
      console.error(err);
    }
  };

  return (
    <div className="grid-pic">
      <h1>Travel to Class Expense</h1>
      <h2>Login</h2>
      <form className="login-container" onSubmit={handleSubmit}>
        <label htmlFor="username">username:</label>
        <input
          id="username"
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <label htmlFor="password">password:</label>
        <input
          id="password"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <button>Submit</button>
        <br />
        <button
          type="button"
          onClick={() => setState((prev) => ({ ...prev, action: "register" }))}
        >
          Don't have an account? Register here
        </button>
        <span className="error-msg">{error}</span>
      </form>
      <div className="login-container">
        <h2>User template</h2>
        <p>username&pw:user1</p>
        <p>username&pw:user2</p>
        <p>username&pw:admin</p>
      </div>
    </div>
  );
};

export default Login;
