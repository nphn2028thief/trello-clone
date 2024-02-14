import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";

const LandingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full bg-slate-100">
      {/* Navbar */}
      <Navbar />

      {/* Body */}
      <main className="pt-32 md:pt-40 pb-20 bg-slate-100">{children}</main>

      {/* Footer */}
      <div className="fixed left-0 bottom-0 right-0 p-4 border-t bg-slate-100">
        <div className="md:max-w-screen-2xl w-full flex justify-between items-center mx-auto">
          <Logo />
          <div className="w-full md:w-auto flex md:block justify-between items-center space-x-4">
            <Button size="sm" variant="ghost">
              Privacy Policy
            </Button>
            <Button size="sm" variant="ghost">
              Terms of Service
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingLayout;
