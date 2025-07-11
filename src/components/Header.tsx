import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800">
      <h1 className="text-white text-3xl font-bold p-4">
        Welcome to Cinema Hall Application
      </h1>
      <p className="text-gray-300 p-4">
        This is a simple React application styled with Tailwind CSS.
      </p>
    </header>
  );
};

export default Header;
