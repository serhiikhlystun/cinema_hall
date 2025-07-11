import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { AppDispatch, RootState } from "../store/store";
import { LoginUserPayload } from "../types";

function LoginForm() {
  const dispatch: AppDispatch = useDispatch();
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const authError = useSelector((state: RootState) => state.auth.error);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password!");
      return;
    }

    const credentials: LoginUserPayload = { email, password };
    try {
      await dispatch(loginUser(credentials)).unwrap();
      alert("Login successful!");
      // Clear form or redirect
      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="max-w-[400px] mx-[auto] my-[20px] p-[20px] border-[1px] border-[solid] border-[#ccc] rounded-[8px]">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          disabled={authStatus === "loading"}
          className={`bg-blue-500 text-white rounded p-2 ${
            authStatus === "loading" ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {authStatus === "loading" ? "Logging In..." : "Login"}
        </button>
        {authError && <p className="text-red-500 mt-2">Error: {authError}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
