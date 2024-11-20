import React from "react";
import logo from "../assets/Logo.png";

const AuthLayouts = ({ children }) => {
  return (
    <div>
      <header className="flex justify-center items-center py-3 shadow-md">
        <img src={logo} alt="Logo" width={180} height={60} />
      </header>
      {children}
    </div>
  );
};

export default AuthLayouts;
