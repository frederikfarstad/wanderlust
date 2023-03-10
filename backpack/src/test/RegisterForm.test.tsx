import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import RegisterForm from "../pages/RegisterForm";

test("tests sign up with invalid data", async () => {
  render(<RegisterForm />);
});

test("tests feedback on input fields", async () => {
  render(<RegisterForm />);
});
