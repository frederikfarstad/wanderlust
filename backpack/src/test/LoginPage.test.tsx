import LoginPage, { LoginSection } from "../pages/LoginPage";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

test("tests sign up button behavior", async () => {
  render(<LoginPage />);

  const signupButton = screen.getByTitle("SignupButton");
  await userEvent.click(signupButton);
  expect(signupButton).toHaveTextContent("Sign up");
});

test("tests login button behavior", async () => {
  render(<LoginSection />);

  const loginButton = screen.getByTitle("LoginButton");
  await userEvent.click(loginButton);
  expect(loginButton).toHaveTextContent("Log in");
});

test("tests client side input validation and response from UI", async () => {
  render(<LoginPage />);

  const signupButton = screen.getByTitle("SignupButton");
  const emailInput = screen.getByTitle("EmailInput");
  const usernameInput = screen.getByTitle("UsernameInput");
  const fullNameInput = screen.getByTitle("FullNameInput");
  const passwordInput = screen.getByTitle("PasswordInput");
  const passwordRepeatInput = screen.getByTitle("PasswordRepeatInput");

  userEvent.type(emailInput, "email@mail.com");
  userEvent.type(usernameInput, "Navn");
  userEvent.type(fullNameInput, "Navn Navan");
  userEvent.type(passwordInput, "passord");
  userEvent.type(passwordRepeatInput, "passord");
  userEvent.click(signupButton);

  setTimeout(() => {
    expect(signupButton).toHaveTextContent("Loading...");
  }, 1000);
});

test("tests form type switching", async () => {
  render(<LoginPage />);

  const loginSwitchButton = screen.getByTitle("LoginSwitchButton");
  const signupSwitchButton = screen.getByTitle("SignupSwitchButton");

  expect(screen.queryByTitle("SignupSection")).toBeInTheDocument();
  userEvent.click(loginSwitchButton);

  expect(await screen.findByTitle("LoginSection")).toBeInTheDocument();
  expect(screen.queryByTitle("SignupSection")).toBeFalsy();
  userEvent.click(signupSwitchButton);
  expect(await screen.findByTitle("SignupSection")).toBeInTheDocument();
  expect(screen.queryByTitle("LoginSection")).toBeFalsy();
});
