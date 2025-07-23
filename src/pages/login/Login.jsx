import React, { useState } from "react";
import apiClient from "../../client/ApiClient";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!username || !password) {
      Swal.fire({
        title: "Semua field wajib diisi!",
        icon: "warning",
      });
      return;
    }

    try {
      const payload = { username, password };

      const response = await apiClient.post("/login", payload);

      if (response.data?.statusCode === 2110) {
        setUsername("");
        setPassword("");

        const token = response?.data?.data?.token;
        localStorage.setItem("accessToken", token);

        Swal.fire({
          title: response?.data?.message || "Anda berhasil Login",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate("/list-checklist");
        }, 2000);
      }
    } catch (error) {
      console.error("asa", error?.response?.data?.errorMessage);

      Swal.fire({
        title:
          error?.response?.data?.errorMessage ||
          "Terjadi Permasalahan saat registrasi",
        icon: "warning",
        draggable: true,
      });
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-[100px] bg-w">
        <h1 className="font-poppins mt-15 text-center text-[56px] font-bold text-[#44444F]">
          Sign In
        </h1>
      </div>
      <p
        className={`text-[#92929D] text-[16px] text-center mt-[14px] mb-[10px] font-roboto font-normal`}
      >
        Just sign in if you have an account in here. Enjoy our Website
      </p>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
        <div className="px-[30px] py-[30px] rounded-[10px] shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* username */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="peer w-full px-3 py-2 rounded-lg mb-4 block pb-2.5 pt-4 border bg-transparent border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 focus:outline-none focus:ring-0 focus:border-[#0062FF]  text-[14px] text-[#44444F]"
                  placeholder=" "
                />
                <label
                  htmlFor="username"
                  className="absolute text-[13px] text-[#44444F] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#0062FF] peer-focus:dark:text-[#0062FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 font-roboto"
                >
                  Username
                </label>
              </div>
            </div>
            {/* password */}
            <div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full px-3 py-2 rounded-lg mb-4 block pb-2.5 pt-4 border bg-transparent border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 focus:outline-none focus:ring-0 focus:border-[#0062FF] text-[14px] text-[#44444F]"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute text-[13px] text-[#44444F] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#0062FF] peer-focus:dark:text-[#0062FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 font-roboto"
                >
                  Enter Password
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full font-poppins cursor-pointer justify-center text-center rounded-[12px] bg-[#0062FF] pt-[15px] pb-[15px] text-[14px] font-medium text-white shadow-xs hover:bg-[#0062FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0062FF]"
              >
                Login
              </button>
            </div>
          </form>
        </div>

        <div>
          <p className="text-center mt-[10px] text-[16px] text-[#92929D] font-normal font-roboto">
            Don't have an account yet?
            <Link to={"/register"}>
              <span className="text-[#0062FF] pl-2 underline italic">
                Create Account
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
