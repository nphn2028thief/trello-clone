"use client";

import { useContext, useEffect, useMemo } from "react";
import { Layout, X } from "lucide-react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UseMutateFunction } from "@tanstack/react-query";

import useCardModal from "@/hooks/useCardModal";
import useClickOuside from "@/hooks/useClickOutside";
import { DialogClose } from "@/components/ui/dialog";
import FormInput from "@/components/Form/Input";
import { LoadingContext } from "@/context/Loading";
import { IResponse } from "@/types";
import { IUpdateCard } from "@/types/card";

const schema = Yup.object({
  title: Yup.string().min(5),
});

const CarđHeader = ({
  updateCard,
}: {
  updateCard: UseMutateFunction<IResponse, Error, IUpdateCard, unknown>;
}) => {
  const { card } = useCardModal();
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
    formState: { isDirty },
    handleSubmit,
  } = useForm<IUpdateCard>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (card) {
      reset(defaultValues);
    }
  }, [card, defaultValues, reset]);

  const onSubmit = (data: IUpdateCard) => {
    if (isDirty) {
      setIsLoading(true);
      updateCard({ title: data.title });
    }

    return;
  };

  const formRef = useClickOuside(handleSubmit(onSubmit));

  return (
    <div className="grid grid-cols-[1fr_28fr] md:grid-cols-[1fr_28fr_1fr] gap-1">
      <div className="w-6 h-6">
        <Layout className="w-full h-fulltext-neutral-700 mt-2" />
      </div>
      <div className="flex flex-col gap-1">
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            htmlFor="title"
            tabIndex={-1}
            register={register("title")}
            className="font-semibold [&>div>input]:text-xl [&>div>input]:px-2 [&>div>input]:border-transparent"
          />
        </form>
        <p className="text-sm text-muted-foreground ml-3">
          in list <span className="underline">{card?.listTitle}</span>
        </p>
      </div>
      <DialogClose className="hidden md:block h-fit rounded-full p-3 ml-2 mt-0.5 hover:bg-black/5">
        <X className="w-4 h-4" />
      </DialogClose>
    </div>
  );
};

export default CarđHeader;
