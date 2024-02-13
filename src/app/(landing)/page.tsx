import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Medal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../../../public/fonts/font.woff2",
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
          <span>No 1 task management</span>
        </div>

        <h1 className="text-2xl md:text-4xl text-center text-neutral-800 mt-4 mb-6">
          Taskify helps team move
        </h1>

        <div className="text-2xl md:text-4xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 py-2 rounded-md">
          work forward.
        </div>

        <div
          className={cn(
            "max-w-xs md:max-w-2xl text-center text-sm md:text-base text-neutral-400 mt-4",
            textFont.className
          )}
        >
          Collaborate, manage project and reach new productivity peaks. From
          high rises to the home office, the way your team work is unique,
          accomplish it all with Taskify
        </div>

        <Button className="mt-4" size="lg" asChild>
          <Link href="/sign-up">Get Taskify for free</Link>
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
