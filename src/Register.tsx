import React, { useState } from "react";
import axios from "axios";
import { USER_API_URL } from "./utils/apiUrl";
import { RegisterType, StateType } from "./utils/types";

type PropType = { setState: React.Dispatch<React.SetStateAction<StateType>> };
const Register = ({ setState }: PropType) => {
  const [user, setUser] = useState<RegisterType>({
    username: "",
    password: "",
    nameOnBankAccount: "",
    accountNumber: "",
    sortCodeWithDashes: "",
    amount: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(`${USER_API_URL}create`, user);
      setUser((prev) => ({
        ...prev,
        username: "",
        password: "",
        nameOnBankAccount: "",
        accountNumber: "",
        sortCodeWithDashes: "",
        amount: "",
      }));
      setState((prev) => ({ ...prev, action: "login" }));
    } catch (err: any) {
      setError(err.response.data.message);
      console.error(err);
    }
  };
  return (
    <div className="grid-pic">
      <h1>Travel to Class Expense</h1>
      <h2>Register</h2>
      <form action="" className="register-container" onSubmit={handleSubmit}>
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
          id="passwprd"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <label htmlFor="nameOnBankAccount">Name on Bank Account</label>
        <input
          id="nameOnBankAccount"
          type="text"
          name="nameOnBankAccount"
          value={user.nameOnBankAccount}
          onChange={handleChange}
        />
        <label htmlFor="accountNumber">Account Number</label>
        <input
          id="accountNumber"
          type="text"
          name="accountNumber"
          value={user.accountNumber}
          onChange={handleChange}
        />
        <label htmlFor="sortCodeWithDashes">Sort Code with dashes</label>
        <input
          id="sortCodeWithDashes"
          type="text"
          name="sortCodeWithDashes"
          value={user.sortCodeWithDashes}
          onChange={handleChange}
        />
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="text"
          name="amount"
          value={user.amount}
          onChange={handleChange}
        />
        <button>Submit</button>
        <br />
        <span className="error-msg">{error}</span>
        <button
          type="button"
          onClick={() => setState((prev) => ({ ...prev, action: "login" }))}
        >
          Already have an account? Login here.
        </button>
      </form>
    </div>
  );
};

export default Register;
