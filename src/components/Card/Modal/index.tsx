"use client";

import { memo, useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AlignLeft, Copy, Layout, TrashIcon, X } from "lucide-react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import axiosClient from "@/api/axiosClient";

import useCardModal from "@/hooks/useCardModal";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import FormInput from "@/components/Form/Input";
import FormTextarea from "@/components/Form/Textarea";
import { Button } from "@/components/ui/button";
import { EApiPath } from "@/constants/path";
import { QUERY_KEY } from "@/constants/key";
import { LoadingContext } from "@/context/Loading";
import { IResponse } from "@/types";
import { ICopyCard, IUpdateCard } from "@/types/card";

const schema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().default(undefined),
});

const CardModal = () => {
  const queryClient = useQueryClient();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  const { card, isOpen, onClose } = useCardModal();
  const { setIsLoading } = useContext(LoadingContext);

  const defaultValues = useMemo<IUpdateCard>(() => {
    return {
      title: card ? card.title : "",
      description: card ? card.description : "",
    };
  }, [card]);

  const {
    register,
    reset,
    setFocus,
    formState: { isDirty },
    handleSubmit,
  } = useForm<IUpdateCard>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (card) {
      reset(defaultValues);
      setDescription(card.description);
    }
  }, [card, defaultValues, reset]);

  useEffect(() => {
    if (isEdit) {
      setFocus("description");
    }
  }, [isEdit, setFocus]);

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
      setIsEdit(false);
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

  const onSubmit = (data: IUpdateCard) => {
    if (isDirty) {
      setIsLoading(true);
      updateCard(data);
    }

    return;
  };

  const handleRenderDescription = () => {
    if (isEdit) {
      return (
        <div className="flex flex-col gap-2">
          <FormTextarea
            htmlFor="description"
            placeholder="Pro Tip: Press 'Enter' for a line break and 'Shift + Enter' for a simple line break."
            register={register("description")}
            onBlur={handleSubmit(onSubmit)}
          />
          <div className="flex items-center gap-2">
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </div>
        </div>
      );
    }

    if (description) {
      return (
        <div className="text-sm rounded-sm" onClick={() => setIsEdit(true)}>
          {description}
        </div>
      );
    }

    return (
      <div
        role="button"
        className="h-20 text-sm rounded-sm px-3 py-2 bg-black/10 hover:bg-black/15"
        onClick={() => setIsEdit(true)}
      >
        Add a more detailed description...
      </div>
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsEdit(false);
        onClose();
      }}
    >
      <DialogContent>
        <form className="grid grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-1">
            <div className="w-6 h-6">
              <Layout className="w-full h-fulltext-neutral-700 mt-2" />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <FormInput
                htmlFor="title"
                tabIndex={-1}
                register={register("title")}
                className="font-semibold [&>div>input]:text-xl [&>div>input]:px-2 [&>div>input]:border-transparent"
                onBlur={handleSubmit(onSubmit)}
              />
              <p className="text-sm text-muted-foreground ml-2">
                in list <span className="underline">{card?.listTitle}</span>
              </p>
            </div>
            <DialogClose className="h-fit rounded-full p-3 ml-2 mt-0.5 hover:bg-black/5">
              <X className="w-4 h-4" />
            </DialogClose>
          </div>

          <div className="mt-8">
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-3">
              <div className="flex-1 flex gap-3">
                <AlignLeft className="w-6 h-6" />
                <div className="flex-1 flex flex-col gap-4">
                  <p className="font-semibold">Description</p>
                  {handleRenderDescription()}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-semibold">Actions</p>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="gray"
                    className="h-auto gap-2"
                    onClick={() => {
                      if (card) {
                        setIsLoading(true);
                        copyCard({
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
                    variant="gray"
                    className="h-auto gap-2"
                    onClick={() => {
                      if (card) {
                        setIsLoading(true);
                        deleteCard();
                      }
                    }}
                  >
                    <TrashIcon className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(CardModal);
