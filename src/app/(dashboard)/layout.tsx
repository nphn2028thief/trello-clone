import { ReactNode } from "react";

import Navbar from "@/components/Navbar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
