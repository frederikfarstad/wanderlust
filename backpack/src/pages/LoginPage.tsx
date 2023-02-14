import { useState } from "react";
import { SubmitButton } from "../components/Buttons";
import { SubmitSignup } from "../utils/FirebaseUtils";

type SelectedFormType = "signup" | "login";

const LoginSection = () => {
  return <div title="LoginSection"></div>;
};

export const SignupSection = (props: {
  setSelectedForm: React.Dispatch<React.SetStateAction<SelectedFormType>>;
}) => {
  const [email, setEmail] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [fullname, setFullname] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [repeatPassword, setRepeatPassword] = useState<string>();
  const [error, setError] = useState<string>();
  const { setSelectedForm } = props;

  const onSignupSubmitted = async () => {
    return await SubmitSignup({
      email,
      username,
      fullname,
      password,
      repeatPassword,
    });
  };

  return (
    <div title="SignupSection" className="flex flex-col items-center p-10">
      <p className="flex-1 text-center text-3xl mb-5 text-primary-details font-semibold">
        Create a new account
      </p>
      <div>
        <p className="text-lg font-semibold text-primary-details">
          E-mail <span className="text-red-600">*</span>
        </p>
        <input
          required
          title="EmailInput"
          type={"text"}
          placeholder="Type e-mail..."
          className="rounded-md shadow-inner border-2 py-3 px-2"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <p className="text-lg font-semibold text-primary-details">
          Username <span className="text-red-600">*</span>
        </p>
        <input
          required
          title="UsernameInput"
          type={"text"}
          placeholder="Type username..."
          className="rounded-md shadow-inner border-2 py-3 px-2"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <p className="text-lg font-semibold text-primary-details">
          Full name <span className="text-red-600">*</span>
        </p>
        <input
          required
          title="FullNameInput"
          type={"text"}
          placeholder="Type your full name..."
          className="rounded-md shadow-inner border-2 py-3 px-2"
          onChange={(event) => {
            setFullname(event.target.value);
          }}
        />
        <p className="text-lg font-semibold text-primary-details">
          Password <span className="text-red-600">*</span>
        </p>
        <input
          required
          title="PasswordInput"
          type={"password"}
          placeholder="Type password..."
          className="rounded-md shadow-inner border-2 py-3 px-2"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <p className="text-lg font-semibold text-primary-details">
          Repeat password <span className="text-red-600">*</span>
        </p>
        <input
          required
          title="PasswordRepeatInput"
          type={"password"}
          placeholder="Type password again..."
          className="rounded-md shadow-inner border-2 py-3 px-2"
          onChange={(event) => {
            setRepeatPassword(event.target.value);
          }}
        />
        <p className="text-red-600 text-left text-sm mt-2">* Required</p>
      </div>
      <br />
      <SubmitButton
        text="Sign up"
        submitFunction={onSignupSubmitted}
        title="SignupButton"
      />
      {error !== undefined && (
        <p className="text-red-300" title="signupErrorDisplay">
          {error}
        </p>
      )}
      <a
        onClick={() => {
          setSelectedForm("login");
        }}
        className="mt-5 underline text-blue-500 hover:cursor-pointer"
      >
        Already have an account?
      </a>
    </div>
  );
};

const LoginPage = () => {
  const [selectedForm, setSelectedForm] = useState<SelectedFormType>("signup");

  return (
    <div
      title="LoginPage"
      className="flex justify-center items-center h-screen bg-gradient-to-br from-primary-200 to-primary-500 flex-col"
    >
      <div className="flex flex-col items-center bg-primary-200 drop-shadow-md rounded-md">
        <div className="bg-inherit flex w-full rounded-t-md justify-around">
          <button
            title="SignupSwitchButton"
            onClick={() => {
              setSelectedForm("signup");
            }}
            className={`flex-1 rounded-tl-md rounded-br-md p-5 text-primary-details ${
              selectedForm === "login"
                ? "bg-white drop-shadow-md font-semibold"
                : "font-bold"
            }`}
          >
            Sign up
          </button>
          <button
            title="LoginSwitchButton"
            onClick={() => {
              setSelectedForm("login");
            }}
            className={`flex-1 rounded-tr-md rounded-bl-md p-5 text-primary-details ${
              selectedForm === "signup"
                ? "bg-white drop-shadow-md font-semibold"
                : "font-bold"
            }`}
          >
            Log in
          </button>
        </div>
        {selectedForm === "login" ? (
          <LoginSection />
        ) : (
          <SignupSection setSelectedForm={setSelectedForm} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;