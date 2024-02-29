"use client";

import { getOrgSubscription } from "@/api/http";

import useGet from "@/hooks/useGet";
import { Separator } from "@/components/ui/separator";
import BoardList from "@/components/BoardList";
import Info from "@/components/Info";
import { QUERY_KEY } from "@/constants/key";
import { IOrgSubscriptionResponse } from "@/types/orgSubscription";
import { IParams } from "@/types";

const OrganizationDetailPage = ({ params }: { params: IParams }) => {
  // Call and handle api get is premium
  const { data: orgSubscriptionData } = useGet<IOrgSubscriptionResponse>(
    [QUERY_KEY.ORG_SUBSCRIPTION, params.id],
    () => getOrgSubscription(params.id!),
    true,
    true
  );

  return (
    <div>
      <Info isValid={orgSubscriptionData?.isValid!} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList isValid={orgSubscriptionData?.isValid!} orgId={params.id} />
      </div>
    </div>
  );
};

export default OrganizationDetailPage;
