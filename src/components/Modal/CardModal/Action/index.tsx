"use client";

import { useContext } from "react";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Copy, TrashIcon } from "lucide-react";
import { toast } from "react-toastify";

import axiosClient from "@/api/axiosClient";

import useCardModal from "@/hooks/useCardModal";
import { Button } from "@/components/ui/button";
import { QUERY_KEY } from "@/constants/key";
import { EApiPath } from "@/constants/path";
import { LoadingContext } from "@/context/Loading";
import { IResponse } from "@/types";
import { ICopyCard } from "@/types/card";

const CardAction = () => {
  const queryClient = useQueryClient();

  const { orgId, userId } = useAuth();

  const { card, onClose } = useCardModal();
  const { setIsLoading } = useContext(LoadingContext);

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
        `${EApiPath.CARD}/${card?._id}/${orgId}/${userId}`
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
    <div className="flex flex-col gap-2 md:gap-4">
      <p className="text-sm leading-6">Actions</p>
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
  );
};

export default CardAction;
