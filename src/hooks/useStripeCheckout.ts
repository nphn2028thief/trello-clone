import axiosClient from "@/api/axiosClient";
import { EApiPath } from "@/constants/path";
import { LoadingContext } from "@/context/Loading";
import { IStripeCheckout } from "@/types/stripe";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "react-toastify";

const useStripeCheckout = () => {
  const { setIsLoading } = useContext(LoadingContext);

  const { mutate: stripeCheckout } = useMutation({
    mutationFn: async (data: IStripeCheckout) => {
      const res = await axiosClient.post(`${EApiPath.ORG_SUBSCRIPTION}`, data);
      return res.data;
    },
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: (error) => {
      toast.error(error.message || "Payment failure!");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  return stripeCheckout;
};

export default useStripeCheckout;
