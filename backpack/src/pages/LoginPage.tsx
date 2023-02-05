import { useState } from "react";
import { SubmitButton } from "../components/Buttons";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../App";

type SelectedFormType = "signup" | "login";

const LoginSection = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onLoginSubmitted = async () => {
    if (email === undefined || password === undefined) return false;
    const success = await signInWithEmailAndPassword(auth, email!, password!)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user);
        return true;
      })
      .catch((err) => {
        return false;
      });
    return success;
  };

  return (
    <div className="flex flex-col items-center p-10">
      <p className="flex-1 text-center text-3xl mb-5 text-primary-details font-semibold">
        Log in to start exploring
      </p>
      <div>
        <p className="text-lg font-semibold text-primary-details">E-mail</p>
        <input
          title="EmailInput"
          type={"text"}
          placeholder="Type e-mail..."
          className="rounded-md shadow-inner border-2 py-3 px-2"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <p className="text-lg font-semibold text-primary-details">Password</p>
        <input
          title="PasswordInput"
          type={"password"}
          placeholder="Type password..."
          className="rounded-md shadow-inner border-2 py-3 px-2"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <br />
      <SubmitButton text="Log in" submitFunction={onLoginSubmitted} />
      <a className="mt-5 underline text-blue-500 hover:cursor-pointer">
        Forgot password?
      </a>
    </div>
  );
};

const SignupSection = (props: {
  setSelectedForm: React.Dispatch<React.SetStateAction<SelectedFormType>>;
}) => {
  const [email, setEmail] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [fullname, setFullname] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [repeatPassword, setRepeatPassword] = useState<string>();
  const { setSelectedForm } = props;

  /**
   * @returns boolean indicating success with signup
   */
  const onSignupSubmitted = async () => {
    if (
      password !== repeatPassword ||
      email === undefined ||
      password === undefined
    )
      return false;
    const success = await createUserWithEmailAndPassword(
      auth,
      email!,
      password!
    )
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user);
        return true;
      })
      .catch((err) => {
        return false;
      });
    return success;
  };

  return (
    <div className="flex flex-col items-center p-10">
      <p className="flex-1 text-center text-3xl mb-5 text-primary-details font-semibold">
        Create a new account
      </p>
      <div>
        <p className="text-lg font-semibold text-primary-details">E-mail</p>
        <input
          title="EmailInput"
          type={"text"}
          placeholder="Type e-mail..."
          className="rounded-md shadow-inner border-2 py-3 px-2"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <p className="text-lg font-semibold text-primary-details">Username</p>
        <input
          title="UsernameInput"
          type={"text"}
          placeholder="Type username..."
          className="rounded-md shadow-inner border-2 py-3 px-2"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <p className="text-lg font-semibold text-primary-details">Full name</p>
        <input
          title="FullNameInput"
          type={"text"}
          placeholder="Type your full name..."
          className="rounded-md shadow-inner border-2 py-3 px-2"
          onChange={(event) => {
            setFullname(event.target.value);
          }}
        />
        <p className="text-lg font-semibold text-primary-details">Password</p>
        <input
          title="PasswordInput"
          type={"password"}
          placeholder="Type password..."
          className="rounded-md shadow-inner border-2 py-3 px-2"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <p className="text-lg font-semibold text-primary-details">
          Repeat password
        </p>
        <input
          title="PasswordRepeatInput"
          type={"password"}
          placeholder="Type password again..."
          className="rounded-md shadow-inner border-2 py-3 px-2"
          onChange={(event) => {
            setRepeatPassword(event.target.value);
          }}
        />
      </div>
      <br />
      <SubmitButton text="Sign up" submitFunction={onSignupSubmitted} />
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
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-yellow-200 to-orange-500 flex-col">
      <div className="flex flex-col items-center bg-orange-200 drop-shadow-md rounded-md">
        <div className="bg-orange-200 flex w-full rounded-t-md justify-around">
          <button
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
