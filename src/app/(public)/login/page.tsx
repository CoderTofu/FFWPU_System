"use client";
import { FormEvent, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/app/axiosInstance";
import Cookies from "js-cookie";

export default function Login() {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  const router = useRouter();

  const logIn = async (e: FormEvent) => {
    e.preventDefault();
    const res = await axiosInstance.post("/login/", loginForm);
    if (res.status === 200) {
      Cookies.set("access_token", res.data.access);
      Cookies.set("refresh_token", res.data.refresh);
      router.refresh();
    } else {
      alert("An error occurred while logging in.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div>
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">
          ADMIN LOGIN
        </h1>
        <div className="bg-white py-14 px-10 rounded-lg shadow-2xl min-w-[500px] ">
          <form onSubmit={logIn}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Username:
              </label>
              <input
                onKeyUp={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
                type="text"
                className="w-full mt-2 text-sm p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter username"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                onKeyUp={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                type="password"
                className="w-full mt-2 text-sm p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
