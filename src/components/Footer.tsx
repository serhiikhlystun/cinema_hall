import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800">
      <p className="text-gray-300 p-4">
        &copy; {new Date().getFullYear()} Cinema Hall Application. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
