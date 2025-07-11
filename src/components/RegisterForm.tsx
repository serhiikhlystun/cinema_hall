import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { AppDispatch, RootState } from "../store/store";
import { RegisterUserPayload } from "../types";

function RegisterForm() {
  const dispatch: AppDispatch = useDispatch();
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const authError = useSelector((state: RootState) => state.auth.error);

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!email || !name || !password) {
      alert("Please fill in all fields!");
      return;
    }

    const userData: RegisterUserPayload = {
      email,
      name,
      password,
      confirmPassword,
    };
    try {
      await dispatch(registerUser(userData)).unwrap();
      alert("Registration successful! You are now logged in.");
      // Clear form or redirect
      setEmail("");
      setName("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="max-w-[400px] mx-[auto] my-[20px] p-[20px] border-[1px] border-[solid] border-[#ccc] rounded-[8px]">
      <h2>Register</h2>
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
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          disabled={authStatus === "loading"}
          className="bg-green-500 text-white rounded p-2"
        >
          {authStatus === "loading" ? "Registering..." : "Register"}
        </button>
        {authError && <p className="text-red-500 mt-2">Error: {authError}</p>}
      </form>
    </div>
  );
}

export default RegisterForm;
