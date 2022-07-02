import React from "react";
import { Outlet } from "react-router-dom";

const LayoutContainerForm = () => {
  return (
    <div className="w-96 mx-auto mt-10">
      Layout
      <Outlet />
    </div>
  );
};

export default LayoutContainerForm;
