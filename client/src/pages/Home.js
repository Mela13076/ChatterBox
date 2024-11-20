import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      Home
      <section>
        {/* This is for the message component */}
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
