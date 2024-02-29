"use client";

import { useRouter } from "next/navigation";
import { Suspense, useLayoutEffect } from "react";
import { useAuth } from "@clerk/nextjs";

import { getOrgSubscription } from "@/api/http";

import useGet from "@/hooks/useGet";
import { Separator } from "@/components/ui/separator";
import BoardList from "@/components/BoardList";
import Info from "@/components/Info";
import LazyLoading from "@/components/LazyLoading";
import { QUERY_KEY } from "@/constants/key";
import { EPath } from "@/constants/path";
import { IOrgSubscriptionResponse } from "@/types/orgSubscription";

const OrganizationDetailPage = () => {
  const router = useRouter();

  const { orgId } = useAuth();

  useLayoutEffect(() => {
    if (!orgId) {
      router.push(EPath.SELECT_ORGANIZATION);
    }
  }, [orgId, router]);

  // Call and handle api get is premium
  const { data: orgSubscriptionData } = useGet<IOrgSubscriptionResponse>(
    [QUERY_KEY.ORG_SUBSCRIPTION, orgId],
    () => getOrgSubscription(orgId!),
    true,
    true
  );

  return (
    <Suspense fallback={<LazyLoading />}>
      <Info isValid={orgSubscriptionData?.isValid!} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList isValid={orgSubscriptionData?.isValid!} />
      </div>
    </Suspense>
  );
};

export default OrganizationDetailPage;
