import { getOrgSubscription } from "@/api/http";

import useGet from "./useGet";
import { QUERY_KEY } from "@/constants/key";
import { IOrgSubscriptionResponse } from "@/types/orgSubscription";

const usePremium = (id: string) => {
  // Call and handle api get is premium
  const {
    data: orgSubscriptionData,
    isLoading,
    isFetching,
  } = useGet<IOrgSubscriptionResponse>(
    [QUERY_KEY.ORG_SUBSCRIPTION, id],
    () => getOrgSubscription(id),
    true,
    true
  );

  return { orgSubscriptionData, isLoading, isFetching };
};

export default usePremium;
