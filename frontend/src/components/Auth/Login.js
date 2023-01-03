import React, { useState } from "react";
import {  authenticate, isAuth } from "../../utils/auth";
import { signin} from './../../api/auth'
import SignInWith from "./SignInWith";
import { useNavigate } from "react-router-dom";

function Login() {
  const initialData = {
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
  };
  const navigate = useNavigate();

  const [data, setData] = useState(initialData);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: false, loading: true });
    try {
      const { email, password } = data;
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const result = await signin({ email, password });

      if (result.error) {
        setData({ ...data, loading: false, error: result.error });
      } else {
        authenticate(result, () => {
          if (isAuth() && isAuth().role === 1) {
            navigate(`/admin`);
          } else {
            navigate(`/chat`);
          }
        });
      }
    } catch (error) {
      console.log(error)
      setData({ ...data, loading: false, error: error });
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form onSubmit={onFormSubmit}>
              <SignInWith />
              {/* Email input */}

              <div className="mb-6">
                <input
                  type="text"
                  name="email"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email address"
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
              {/* Password input */}
              <div className="mb-6">
                <input
                  type="password"
                  name="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                  value={data.password}
                  onChange={handleChange}
                  autoComplete="false"
                />
              </div>
              <div className="flex justify-between items-center mb-6">
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="exampleCheck2"
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor="exampleCheck2"
                  >
                    Remember me
                  </label>
                </div>
                {data.error && (
                  <div
                  className="p-2 bg-red-600 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
                    role="alert"
                  >
                    <span className="flex rounded-full bg-red-200 uppercase px-2 py-1 text-xs font-bold mr-3">
                      Error
                    </span>
                    <span className="font-semibold mr-2 text-left flex-auto">
                      {data.error}
                    </span>
                  </div>
                )}
                <a href="#!" className="text-gray-800">
                  Forgot password?
                </a>
              </div>
              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  {data.loading ? "Loading..." : "Login"}
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <a
                    href="#!"
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
