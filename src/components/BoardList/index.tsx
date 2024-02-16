import { HelpCircle, User2 } from "lucide-react";

import Hint from "../Hint";
import FormPopover from "../Form/Popover";

const BoardList = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 font-semibold text-lg text-neutral-700">
        <User2 className="w-6 h-6" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <FormPopover side="right" sideOffset={10}>
          <div
            role="button"
            className="h-full relative flex-col justify-center items-center gap-1 p-3 aspect-video bg-muted flex rounded-sm hover:opacity-75 transition"
          >
            <p className="text-base">Create a new board</p>
            <span className="text-sm">5 remaining</span>
            <Hint
              description="Free workspaces can have up to 5 open boards. For unlimited boards upgrade this workspaces."
              sideOffset={40}
            >
              <HelpCircle className="w-4 h-4 absolute right-3 bottom-3" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

export default BoardList;
