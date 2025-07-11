import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import { useSelector } from "react-redux";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import AuthStatus from "./components/AuthStatus";
import { RootState } from "./store/store";

const App: React.FC = () => {
  const authToken = useSelector((state: RootState) => state.auth.token);

  return (
    <div className="text-center">
      <Header />
      <AuthStatus />
      {authToken ? (
        // If logged in, show film management components
        <Main />
      ) : (
        // If not logged in, show login and registration forms
        <div className="flex justify-around flex-wrap gap-[20px]">
          <RegisterForm />
          <LoginForm />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;
