"use client";

import Link from "next/link";
import { OrganizationSwitcher, UserButton, useAuth } from "@clerk/nextjs";
import { Menu, Plus } from "lucide-react";

import { Button } from "../ui/button";
import Logo from "../Logo";
import { EPath } from "@/constants/path";
import useMobileSidebar from "@/hooks/useMobileSidebar";
import MobileSidebar from "../MobileSidebar";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const { onOpen } = useMobileSidebar();

  return (
    <>
      <nav className="h-14 flex items-center fixed left-0 top-0 right-0 px-4 border-b bg-white shadow-sm z-[999]">
        <div className="md:max-w-screen-2xl w-full flex justify-between items-center mx-auto">
          <div className="flex items-center md:gap-4">
            <Logo />
            {isSignedIn ? (
              <>
                <Button
                  size="icon"
                  variant="ghost"
                  className="md:hidden mr-3"
                  onClick={onOpen}
                >
                  <Menu className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  className="hidden md:block rounded-sm"
                >
                  Create
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  className="block md:hidden rounded-sm"
                >
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
      </nav>

      <MobileSidebar />
    </>
  );
};

export default Navbar;
