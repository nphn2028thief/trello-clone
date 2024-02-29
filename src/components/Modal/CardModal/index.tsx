"use client";

import { memo, useContext, useState } from "react";
import { Copy, TrashIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-toastify";

import axiosClient from "@/api/axiosClient";

import useCardModal from "@/hooks/useCardModal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CarđHeader from "./Header";
import CardDescription from "./Description";
import { EApiPath } from "@/constants/path";
import { QUERY_KEY } from "@/constants/key";
import { LoadingContext } from "@/context/Loading";
import { IResponse } from "@/types";
import { ICopyCard, IUpdateCard } from "@/types/card";

const CardModal = () => {
  const queryClient = useQueryClient();

  const { orgId } = useAuth();

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

  // Call and handle api copy card
  const { mutate: copyCard } = useMutation({
    mutationFn: async (data: ICopyCard) => {
      const res = await axiosClient.post<IResponse>(
        `${EApiPath.COPY_CARD}`,
        data
      );
      return res.data;
    },
    onSuccess: (data) => {
      onClose();
      toast.success(data.message || "Card copied");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LISTS] });
    },
    onError: (error) => {
      toast.error(error.message || "Copy card failure!");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  // Call and handle api delete card
  const { mutate: deleteCard } = useMutation({
    mutationFn: async () => {
      const res = await axiosClient.delete<IResponse>(
        `${EApiPath.CARD}/${card?._id}`
      );
      return res.data;
    },
    onSuccess: (data) => {
      onClose();
      toast.success(data.message || "Card deleted");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LISTS] });
    },
    onError: (error) => {
      toast.error(error.message || "Delete card failure!");
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
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-3">
              <CardDescription
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                updateCard={updateCard}
              />

              <div className="flex flex-col gap-4">
                <p className="font-semibold">Actions</p>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="gray"
                    className="h-auto gap-2 rounded-sm"
                    onClick={() => {
                      if (card) {
                        setIsLoading(true);
                        copyCard({
                          orgId: orgId as string,
                          listId: card.listId,
                          cardId: card._id,
                          title: card.title,
                          description: card.description,
                        });
                      }
                    }}
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                  <Button
                    variant="error"
                    className="h-auto gap-2 rounded-sm"
                    onClick={() => {
                      if (card) {
                        setIsLoading(true);
                        deleteCard();
                      }
                    }}
                  >
                    <TrashIcon fill="#fff" className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mt-8">
            <CardActivity />
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(CardModal);
