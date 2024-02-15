"use client";

import Link from "next/link";
import { OrganizationSwitcher, UserButton, useUser } from "@clerk/nextjs";
import { Menu, Plus } from "lucide-react";

import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import Logo from "../Logo";
import MobileSidebar from "../MobileSidebar";
import useMobileSidebar from "@/hooks/useMobileSidebar";
import { EPath } from "@/constants/path";

const Navbar = () => {
  // const { isSignedIn } = useAuth();
  const { isSignedIn, isLoaded } = useUser();

  const { onOpen } = useMobileSidebar();

  const handleRenderCreateBtn = () => {
    if (!isLoaded) {
      return <Skeleton className="w-16 h-8" />;
    }

    if (isSignedIn) {
      return (
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
      );
    }

    return null;
  };

  const handleRenderNavInfo = () => {
    if (!isLoaded) {
      return (
        <div className="flex items-center gap-4">
          <Skeleton className="w-[129px] h-8" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      );
    }

    if (isSignedIn) {
      return (
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
      );
    }

    return (
      <div className="w-full md:w-auto flex justify-between items-center space-x-4">
        <Button size="sm" variant="outline" asChild>
          <Link href={EPath.SIGNIN}>Login</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href={EPath.SIGNUP}>Get Taskify for free</Link>
        </Button>
      </div>
    );
  };

  return (
    <>
      <nav className="h-14 flex items-center fixed left-0 top-0 right-0 px-4 border-b bg-white shadow-sm z-[999]">
        <div className="md:max-w-screen-2xl w-full flex justify-between items-center mx-auto">
          <div className="flex items-center md:gap-4">
            <Logo />
            {handleRenderCreateBtn()}
          </div>

          {handleRenderNavInfo()}
        </div>
      </nav>

      <MobileSidebar />
    </>
  );
};

export default Navbar;
