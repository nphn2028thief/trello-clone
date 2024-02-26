"use client";

import { ActivityIcon } from "lucide-react";
import { format } from "date-fns";

import useCardModal from "@/hooks/useCardModal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { generateLogMessage } from "@/utils";

const CardActivity = () => {
  const { card } = useCardModal();

  return (
    <div className="flex gap-3">
      <ActivityIcon className="w-6 h-6 text-neutral-700" />
      <div className="flex-1 flex flex-col gap-4">
        <p className="font-semibold">Activity</p>
        <ol className="flex flex-col gap-3">
          {card &&
            card.logs.map((item) => (
              <li key={item._id} className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={item.user.image} />
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-neutral-700">
                      {item.user.name}{" "}
                    </span>
                    {generateLogMessage(
                      item.action,
                      item.entity.type,
                      item.entity.title
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(
                      new Date(item.createdAt),
                      "MMM d, yyyy 'at' h:mm a"
                    )}
                  </p>
                </div>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default CardActivity;
