"use client";

import { memo, useContext } from "react";
import Image from "next/image";
import { currentUser, useAuth, useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import axiosClient from "@/api/axiosClient";

import usePremiumModal from "@/hooks/usePremiumModal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EApiPath } from "@/constants/path";
import { LoadingContext } from "@/context/Loading";
import { IStripeCheckout } from "@/types/stripe";
import { getUser } from "@/app/actions";

const PremiumModal = () => {
  const { orgId } = useAuth();

  const { isOpen, onClose } = usePremiumModal();
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex justify-center items-center">
          <Image
            src="/images/hero.svg"
            alt="hero"
            className="object-cover"
            fill
          />
        </div>
        <div className="mx-auto space-y-6 p-6 text-neutral-700">
          <h2 className="font-semibold text-xl">
            Upgrade to Taskify Premium Today!
          </h2>
          <p className="text-sm font-semibold text-neutral-600">
            Explore the best of Taskify
          </p>
          <div className="pl-4">
            <ul className="text-sm list-disc">
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button
            variant="primary"
            className="w-full"
            onClick={async () => {
              setIsLoading(true);

              const data = await getUser();

              if (data) {
                stripeCheckout({
                  userId: data.userId,
                  orgId: data.orgId,
                  userEmail: data.userEmail,
                });
              }
            }}
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(PremiumModal);
