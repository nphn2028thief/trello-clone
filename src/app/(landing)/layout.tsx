import Link from "next/link";
import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { EPath } from "@/constants/path";

const LandingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full bg-slate-100">
      {/* Navbar */}
      <div className="h-14 flex items-center fixed left-0 top-0 right-0 px-4 border-b bg-white shadow-sm">
        <div className="md:max-w-screen-2xl w-full flex justify-between items-center mx-auto">
          <Logo />
          <div className="w-full md:w-auto flex md:block justify-between items-center space-x-4">
            <Button size="sm" variant="outline" asChild>
              <Link href={EPath.SIGNIN}>Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={EPath.SIGNUP}>Get Taskify for free</Link>
            </Button>
          </div>
        </div>
      </div>

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
