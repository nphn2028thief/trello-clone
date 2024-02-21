import { Copy, MoreHorizontal, Plus, Trash, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ListOptions = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="transparent" className="w-auto h-auto p-2 text-black">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={12}
        className="px-0 py-3"
      >
        <div className="text-center font-medium text-neutral-600 pb-4">
          List actions
        </div>

        <PopoverClose asChild>
          <Button
            variant="ghost"
            className="w-auto h-auto absolute top-2 right-2 p-2 text-neutral-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>

        <Button
          variant="ghost"
          className="w-full justify-between pl-5 pr-4 py-2 font-normal rounded-none"
        >
          Add card
          <Plus className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-between pl-5 pr-4 py-2 font-normal rounded-none"
        >
          Copy list
          <Copy className="w-4 h-4" />
        </Button>
        <Separator className="my-2" />
        <Button
          variant="ghost"
          className="w-full justify-between pl-5 pr-4 text-red-600 hover:text-red-500 py-2 font-normal rounded-none"
        >
          Delete this list
          <Trash className="w-4 h-4" />
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
