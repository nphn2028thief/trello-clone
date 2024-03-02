"use client";

import { memo, useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import axiosClient from "@/api/axiosClient";

import useCardModal from "@/hooks/useCardModal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CarđHeader from "./Header";
import CardDescription from "./Description";
import CardActivity from "./Activity";
import CardAction from "./Action";
import { EApiPath } from "@/constants/path";
import { QUERY_KEY } from "@/constants/key";
import { LoadingContext } from "@/context/Loading";
import { IResponse } from "@/types";
import { IUpdateCard } from "@/types/card";

const CardModal = () => {
  const queryClient = useQueryClient();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { card, isOpen, onClose } = useCardModal();
  const { setIsLoading } = useContext(LoadingContext);

  // Call and handle api update title of card
  const { mutate: updateCard } = useMutation({
    mutationFn: async (data: IUpdateCard) => {
      const res = await axiosClient.patch<IResponse>(
        `${EApiPath.CARD}/${card?._id}`,
        data
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Card updated");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LISTS] });
    },
    onError: (error) => {
      toast.error(error.message || "Update card failure!");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsEdit(false);
        onClose();
      }}
    >
      <DialogContent>
        <div className="grid grid-cols-1">
          <CarđHeader updateCard={updateCard} />

          <div className="mt-8">
            <div className="flex flex-row gap-8 sm:gap-3">
              <CardDescription
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                updateCard={updateCard}
              />

              <div className="hidden md:block">
                <CardAction />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <CardActivity />
          </div>

          <div className="block md:hidden mt-8">
            <CardAction />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(CardModal);
