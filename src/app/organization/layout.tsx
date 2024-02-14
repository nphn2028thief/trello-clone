import { ReactNode } from "react";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const OrganizationLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="max-w-6xl 2xl:max-w-screen-xl h-full pt-20 md:pt-24 px-4 mx-auto">
        <div className="flex gap-7">
          <div className="w-64 hidden md:block shrink-0">
            <Sidebar />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default OrganizationLayout;
