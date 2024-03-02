"use client";

import { useContext } from "react";

import { getUser } from "@/app/actions";
import useStripeCheckout from "@/hooks/useStripeCheckout";
import usePremiumModal from "@/hooks/usePremiumModal";
import usePremium from "@/hooks/usePremium";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Info from "@/components/Info";
import { LoadingContext } from "@/context/Loading";
import { IParams } from "@/types";

const BillingPage = ({ params }: { params: IParams }) => {
  const { onOpen } = usePremiumModal();
  const { setIsLoading } = useContext(LoadingContext);

  const stripeCheckout = useStripeCheckout();

  // Call and handle api get is premium
  const { orgSubscriptionData, isLoading, isFetching } = usePremium(params.id);

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
