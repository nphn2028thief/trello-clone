import Link from "next/link";
import { Manrope, Poppins } from "next/font/google";
import { Medal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EPath } from "@/constants/path";

const headingFont = Manrope({
  subsets: ["latin"],
  weight: ["700"],
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const LandingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={cn(
          "flex flex-col justify-center items-center",
          headingFont.className
        )}
      >
        <div className="flex items-center gap-2 border shadow-sm p-4 bg-amber-100 text-amber-700 uppercase rounded-full">
          <Medal className="w-6 h-6" />
          <p className="h-[22px]">No 1 task management</p>
        </div>

        <h1 className="text-2xl md:text-4xl text-center text-neutral-800 my-4">
          Taskify helps team move
        </h1>

        <div className="text-2xl md:text-4xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 py-2 rounded-md">
          work forward.
        </div>

        <div
          className={cn(
            "max-w-xs md:max-w-2xl text-center text-sm md:text-base font-medium text-neutral-400 mt-4",
            textFont.className
          )}
        >
          Collaborate, manage project and reach new productivity peaks. From
          high rises to the home office, the way your team work is unique,
          accomplish it all with Taskify
        </div>

        <Button className="mt-4" size="lg" asChild>
          <Link href={EPath.SIGNUP}>Get Taskify for free</Link>
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
