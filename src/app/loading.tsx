import Logo from "@/components/Logo";
import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white z-[99999]">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Logo />
      </div>
    </div>
  );
};

export default Loading;
