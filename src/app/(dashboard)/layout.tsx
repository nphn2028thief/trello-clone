import { ReactNode } from "react";

import Navbar from "@/components/Navbar";
import CardModal from "@/components/Card/Modal";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      {children}
      <CardModal />
    </div>
  );
};

export default DashboardLayout;
