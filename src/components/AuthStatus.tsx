import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { logout } from "../features/auth/authSlice";

function AuthStatus() {
  const token = useSelector((state: RootState) => state.auth.token);
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const authError = useSelector((state: RootState) => state.auth.error);
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    alert("Logged out successfully!");
  };

  return (
    <div className="text-center mx-[auto] my-[20px] p-[15px] border-[1px] border-[dashed] border-[#aaa] rounded-[8px]">
      {token ? (
        <>
          <p className="text-green-500 font-bold">You are logged in!</p>
          <button
            onClick={handleLogout}
            className="text-[white] border-[none] px-[12px] py-[8px] rounded-[5px] cursor-pointer mt-[10px] bg-[#6c757d]"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <p className="text-orange-500 font-bold">You are not logged in.</p>
          {authStatus === "loading" && <p>Authenticating...</p>}
          {authError && <p className="text-red-500">Auth Error: {authError}</p>}
        </>
      )}
    </div>
  );
}

export default AuthStatus;
