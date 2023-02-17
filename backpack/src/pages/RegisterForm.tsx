import logo from "../public/mountain.png";
import { Link } from "react-router-dom";

import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import GoogleLoginButton from "../components/GoogleLogin";
import { SubmitSignup } from "../utils/FirebaseUtils";

export default function RegisterForm() {
  const [email, setEmail] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [fullname, setFullname] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [repeatPassword, setRepeatPassword] = useState<string>();
  const [error, setError] = useState<string>();

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
    <section className="bg-gradient-to-br from-primary-200 to-primary-500 h-screen">
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

            <form className="grid grid-cols-2 space-y-4 md:space-y-6">
              <div className="col-span-2">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  title="EmailInput"
                  className="bg-primary-50 border border-primary-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
              <div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  title="UsernameInput"
                  className="bg-primary-50 border border-primary-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="username"
                  required
                />
              </div>
              <div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  title="FullNameInput"
                  className="bg-primary-50 border border-primary-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="full name"
                  required
                />
              </div>
              <div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  title="PasswordInput"
                  name="password"
                  id="password"
                  className="bg-primary-50 border border-primary-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="repeatpassword"
                  title="PasswordRepeatInput"
                  id="repeatpassword"
                  className="bg-primary-50 border border-primary-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="col-span-2">
                <Link to="/">
                  <button
                    type="submit"
                    onClick={onSignupSubmitted}
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Create an account
                  </button>
                </Link>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-light text-gray-500">
                  Already have an account?{" "}
                  <Link
                    to="/a"
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
