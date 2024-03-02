"use client";

import { format } from "date-fns";

import { getLogsByOrg } from "@/api/http";

import useGet from "@/hooks/useGet";
import usePremium from "@/hooks/usePremium";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Info from "@/components/Info";
import { QUERY_KEY } from "@/constants/key";
import { generateLogMessage } from "@/utils";
import { IParams } from "@/types";

const ActivityPage = ({ params }: { params: IParams }) => {
  // Call and handle api get is premium
  const { orgSubscriptionData } = usePremium(params.id);

  const {
    data: logs,
    isLoading,
    isFetching,
  } = useGet(
    [QUERY_KEY.LOGS, params.id],
    () => getLogsByOrg(params.id),
    true,
    true
  );

  const handleRenderLogs = () => {
    if (isLoading || isFetching) {
      return Array.from({ length: 7 }, (_, index) => (
        <div key={index} className="w-full flex items-center gap-2">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex-1 flex flex-col gap-1">
            <Skeleton className="w-[50%] h-5" />
            <Skeleton className="w-[25%] h-3" />
          </div>
        </div>
      ));
    }

    if (!logs || !logs.length) {
      return (
        <p className="hidden last:block text-sm text-center text-muted-foreground">
          No activity found inside this organization
        </p>
      );
    }

    return logs.map((item) => (
      <li key={item._id} className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={item.user.image} />
        </Avatar>
        <div className="flex flex-col space-y-0.5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold lowercase text-neutral-700">
              {`${item.user.firstName} ${item.user.lastName}`}
            </span>{" "}
            {generateLogMessage(
              item.action,
              item.entity.type,
              item.entity.title
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            {format(new Date(item.createdAt), "MMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
      </li>
    ));
  };

  return (
    <div className="relative">
      <div className="sticky top-0 bg-white z-[99] pb-4">
        <Info isValid={orgSubscriptionData?.isValid!} />
        <Separator className="mt-4" />
      </div>
      <ol className="flex flex-col gap-4 overflow-scroll">
        {handleRenderLogs()}
      </ol>
    </div>
  );
};

export default ActivityPage;
