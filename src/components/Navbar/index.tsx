"use client";

import Link from "next/link";
import { OrganizationSwitcher, UserButton, useAuth } from "@clerk/nextjs";
import { Plus } from "lucide-react";

import { Button } from "../ui/button";
import Logo from "../Logo";
import { EPath } from "@/constants/path";

const Navbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="h-14 flex items-center fixed left-0 top-0 right-0 px-4 border-b bg-white shadow-sm z-[999]">
      {/* Mobile sidebar */}
      {/* <div className="flex items-center gap-4">
        <div className="hidden md:flex">

        </div>
      </div> */}

      <div className="md:max-w-screen-2xl w-full flex justify-between items-center mx-auto">
        <div className="flex items-center md:gap-4">
          <Logo />
          {isSignedIn ? (
            <>
              <Button size="sm" className="hidden md:block rounded-sm">
                Create
              </Button>
              <Button size="sm" className="block md:hidden rounded-sm">
                <Plus className="w-4 h-4" />
              </Button>
            </>
          ) : null}
        </div>
        {isSignedIn ? (
          <div className="flex items-center gap-4">
            <OrganizationSwitcher
              hidePersonal
              afterCreateOrganizationUrl={EPath.ORGANIZATION_DETAIL}
              afterLeaveOrganizationUrl={EPath.SELECT_ORGANIZATION}
              afterSelectOrganizationUrl={EPath.ORGANIZATION_DETAIL}
              appearance={{
                elements: {
                  rootBox: {
                    display: "flex",
                  },
                },
              }}
            />
            <UserButton afterSignOutUrl={EPath.HOME} />
          </div>
        ) : (
          <div className="w-full md:w-auto flex justify-between items-center space-x-4">
            <Button size="sm" variant="outline" asChild>
              <Link href={EPath.SIGNIN}>Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={EPath.SIGNUP}>Get Taskify for free</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
