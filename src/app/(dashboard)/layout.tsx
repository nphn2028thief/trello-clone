import { ReactNode } from "react";

import Navbar from "@/components/Navbar";
import CardModal from "@/components/Modal/CardModal";
import PremiumModal from "@/components/Modal/PremiumModal";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      {children}
      <CardModal />
      <PremiumModal />
    </div>
  );
};

export default DashboardLayout;
