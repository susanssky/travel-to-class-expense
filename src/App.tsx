import React, { useState } from "react";
import "./App.scss";
import Login from "./Login";
import Register from "./Register";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import { StateType } from "./utils/types";

function App() {
  const [state, setState] = useState<StateType>({
    action: "login",
    user: null,
  });

  return (
    <>
      {state.action === "login" && !state.user && <Login setState={setState} />}
      {state.action === "register" && !state.user && (
        <Register setState={setState} />
      )}
      {state.action === "userDashboard" && state.user && (
        <UserDashboard currentUser={state.user} setState={setState} />
      )}
      {state.action === "adminDashboard" && state.user && (
        <AdminDashboard currentUser={state.user} setState={setState} />
      )}
    </>
  );
}

export default App;
