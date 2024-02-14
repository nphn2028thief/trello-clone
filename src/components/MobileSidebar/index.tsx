"use client";

import { Sheet, SheetContent } from "../ui/sheet";
import Sidebar from "../Sidebar";
import useMobileSidebar from "@/hooks/useMobileSidebar";

const MobileSidebar = () => {
  const { isOpen, onClose } = useMobileSidebar();

  if (!isOpen) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="p-2 pt-10 z-[9999]">
        <Sidebar storageKey="t-sidebar-mobile-state" />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
