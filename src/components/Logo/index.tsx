import Image from "next/image";
import Link from "next/link";
import { Manrope } from "next/font/google";

import { EPath } from "@/constants/path";
import { cn } from "@/lib/utils";

const headingFont = Manrope({
  subsets: ["latin"],
  weight: ["700"],
});

const Logo = () => {
  return (
    <Link href={EPath.HOME}>
      <div className="hidden md:flex items-center gap-2 hover:opacity-75 transition">
        <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
        <span
          className={cn(
            "text-lg text-neutral-700 pt-0.5",
            headingFont.className
          )}
        >
          Taskify
        </span>
      </div>
    </Link>
  );
};

export default Logo;
