import { ReactNode } from "react";

import Sidebar from "@/components/Sidebar";

const OrganizationLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="max-w-6xl 2xl:max-w-screen-xl h-full pt-20 md:pt-24 px-4 mx-auto">
      <div className="h-full flex gap-7 pb-2">
        <div className="w-64 hidden md:block shrink-0 overflow-x-scroll">
          <Sidebar />
        </div>
        <div className="flex-1 overflow-y-scroll relative">{children}</div>
      </div>
    </main>
  );
};

export default OrganizationLayout;
