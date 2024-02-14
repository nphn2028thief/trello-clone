import { ReactNode } from "react";

import Navbar from "@/components/Navbar";

const OrganizationDetailLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full bg-slate-100">
      {/* Navbar */}
      <Navbar />

      {/* Body */}
      <div className="h-full pt-14">{children}</div>
    </div>
  );
};

export default OrganizationDetailLayout;
