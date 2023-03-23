import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import Register from "./Register";

describe("App component", () => {
  test("renders login component when user is not logged in", () => {
    const { getByText } = render(<App />);
    const loginHeader = getByText("Login");
    expect(loginHeader).toBeInTheDocument();
  });

  test("logs in user with correct credentials", async () => {
    const { getByLabelText, getByText } = render(<App />);
    const usernameInput = getByLabelText("username:");
    const passwordInput = getByLabelText("password:");
    const submitButton = getByText("Submit");

    fireEvent.change(usernameInput, { target: { value: "user1" } });
    fireEvent.change(passwordInput, { target: { value: "user1" } });
    fireEvent.click(submitButton);

    const userDashboardHeader = await getByText("Travel to Class Expense");
    expect(userDashboardHeader).toBeInTheDocument();
  });
});
describe("Register component", () => {
  it("should render Register component", () => {
    render(<Register setState={() => {}} />);
    const registerElement = screen.getByText(/Register/i);
    expect(registerElement).toBeInTheDocument();
  });

  it("should render Submit button", () => {
    render(<Register setState={() => {}} />);
    const submitButton = screen.getByText(/Submit/i);
    expect(submitButton).toBeInTheDocument();
  });
});
