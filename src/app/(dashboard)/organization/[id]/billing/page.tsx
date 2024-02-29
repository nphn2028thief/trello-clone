"use client";

import { useContext } from "react";
import { getOrgSubscription } from "@/api/http";

import { getUser } from "@/app/actions";
import useGet from "@/hooks/useGet";
import useStripeCheckout from "@/hooks/useStripeCheckout";
import usePremiumModal from "@/hooks/usePremiumModal";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Info from "@/components/Info";
import { QUERY_KEY } from "@/constants/key";
import { LoadingContext } from "@/context/Loading";
import { IParams } from "@/types";
import { IOrgSubscriptionResponse } from "@/types/orgSubscription";

const BillingPage = ({ params }: { params: IParams }) => {
  const { onOpen } = usePremiumModal();
  const { setIsLoading } = useContext(LoadingContext);

  const stripeCheckout = useStripeCheckout();

  // Call and handle api get is premium
  const {
    data: orgSubscriptionData,
    isLoading,
    isFetching,
  } = useGet<IOrgSubscriptionResponse>(
    [QUERY_KEY.ORG_SUBSCRIPTION, params.id],
    () => getOrgSubscription(params.id),
    true,
    true
  );

  const handleRenderButton = () => {
    if (isLoading || isFetching) {
      return <Skeleton className="w-[172px] h-10" />;
    }

    if (orgSubscriptionData) {
      return (
        <Button
          variant="primary"
          onClick={async () => {
            if (orgSubscriptionData.isValid) {
              setIsLoading(true);

              const data = await getUser();

              if (data) {
                stripeCheckout({
                  userId: data.userId,
                  orgId: data.orgId,
                  userEmail: data.userEmail,
                });
              }
            } else {
              onOpen();
            }
          }}
        >
          {orgSubscriptionData?.isValid
            ? "Manage subscription"
            : "Upgrade to premium"}
        </Button>
      );
    }

    return null;
  };

  return (
    <div>
      <Info isValid={orgSubscriptionData?.isValid!} />
      <Separator className="my-4" />
      {handleRenderButton()}
    </div>
  );
};

export default BillingPage;
