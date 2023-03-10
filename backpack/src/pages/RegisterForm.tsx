import logo from "../public/mountain.png";
import { Link } from "react-router-dom";

import { useState } from "react";
import GoogleLoginButton from "../components/GoogleLogin";
import { SubmitSignup } from "../utils/FirebaseUtils";
import InputWithValidation from "../components/InputWithValidation";
import useFirebaseCollection from "../hooks/useFirebaseData";
import { ErrorPopup } from "../components/Popup";

interface User {
  id: string;
  bio: string;
  fullname: string;
  username: string;
  email: string;
}

/*
 * The register form will now find all users from the database, and store all the emails and usernames here. This is
 * to give live feedback to users, telling them if username is allowed or not. For large sites with millions of users, it is annoying to keep filling out the form every time
 * a username is taken.
 *
 * Google login also works, and is very easy. No extra work required here.
 *
 */

export default function RegisterForm() {
  const {
    data: users,
    loading,
    error,
  } = useFirebaseCollection<User>("users", false);

  const usernames = users?.map((u) => u.username);
  const emails = users?.map((u) => u.email);

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const [signupError, setSignupError] = useState<string>();

  const onSignupSubmitted = async (e: any) => {
    e.preventDefault();
    try {
      const { success, message } = await SubmitSignup({
        email,
        username,
        fullname,
        password,
        repeatPassword,
      });
      if (!success) {
        setSignupError(message + `(${Date.now()})`);
      } else {
        setSignupError(undefined);
      }
    } catch (err) {
      if (err instanceof Error) {
        setSignupError(err.message + `(${Date.now()})`);
      }
    }
  };

  const uniqueEmail = !emails.includes(email);
  const uniqueUsername = !usernames.includes(username);
  const passwordMatch = password === repeatPassword && password.length > 5;

  const fieldsNotEmpty =
    email.length > 1 &&
    username.length > 1 &&
    password.length > 5 &&
    fullname.length > 1;

  const errorMessageForPassword =
    password.length < 6
      ? "Password must be 6 characters or more"
      : "Passwords do not match";
  return (
    <section className="bg-gradient-to-br from-primary-200 to-primary-500 h-screen">
      <ErrorPopup
        message={signupError || ""}
        visible={signupError !== undefined}
      />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-8, h-8 mr-2" src={logo} alt="logo" />
          Wanderlust
        </div>

        <div className="w-full bg-primary-100 rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create a new account
            </h1>

            <form className="grid grid-cols-2 space-y-4 space-x-2 md:space-y-6">
              <div className="col-span-2 ">
                <InputWithValidation
                  label="Email"
                  type="email"
                  value={email}
                  isValid={uniqueEmail}
                  handleChange={setEmail}
                  explanation="Email is already in use"
                />
              </div>
              <div className="">
                <InputWithValidation
                  label="Username"
                  type="text"
                  value={username}
                  isValid={uniqueUsername}
                  handleChange={setUsername}
                  explanation="Username is taken"
                />
              </div>
              <div>
                <InputWithValidation
                  label="Full name"
                  type="text"
                  value={fullname}
                  isValid={true}
                  handleChange={setFullname}
                />
              </div>
              <div>
                <InputWithValidation
                  label="Password"
                  type="password"
                  value={password}
                  isValid={true}
                  handleChange={setPassword}
                />
              </div>
              <div>
                <InputWithValidation
                  label="Repeat Password"
                  type="password"
                  value={repeatPassword}
                  isValid={password.length < 1 || passwordMatch}
                  handleChange={setRepeatPassword}
                  explanation={errorMessageForPassword}
                />
              </div>

              <div className="col-span-2">
                <Link to="/register">
                  <button
                    type="submit"
                    onClick={onSignupSubmitted}
                    disabled={
                      !uniqueEmail ||
                      !uniqueUsername ||
                      !passwordMatch ||
                      !fieldsNotEmpty
                    }
                    className="w-full shadow-lg text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                               disabled:bg-primary-300 disabled:shadow-inner"
                  >
                    Create an account
                  </button>
                </Link>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-light text-gray-500">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Log in here
                  </Link>
                </p>
              </div>
            </form>
            <div className="flex flex-row items-center">
              <div className="flex-1 h-px bg-gray-300"></div>
              <div className="text-sm font-light text-gray-500 px-4">or</div>
              <div className="flex-1 h-px bg-gray-300"></div>
              <div></div>
            </div>
            <GoogleLoginButton />
          </div>
        </div>
      </div>
    </section>
  );
}
