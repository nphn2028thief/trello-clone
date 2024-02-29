"use client";

import {
  Dispatch,
  ElementRef,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UseMutateFunction } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useOnClickOutside } from "usehooks-ts";

import useCardModal from "@/hooks/useCardModal";
import { Button } from "@/components/ui/button";
import FormTextarea from "@/components/Form/Textarea";
import { LoadingContext } from "@/context/Loading";
import { IResponse } from "@/types";
import { IUpdateCard } from "@/types/card";

interface IProps {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  updateCard: UseMutateFunction<IResponse, Error, IUpdateCard, unknown>;
}

const schema = Yup.object({
  title: Yup.string().min(5),
});

const CardDescription = (props: IProps) => {
  const { isEdit, setIsEdit, updateCard } = props;

  const formRef = useRef<ElementRef<"form">>(null);

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
    }
  }, [card, defaultValues, reset]);

  useEffect(() => {
    if (isEdit) {
      setFocus("description");
    }
  }, [isEdit, setFocus]);

  const onSubmit = (data: IUpdateCard) => {
    if (isDirty && card?._id) {
      setIsLoading(true);
      updateCard({ description: data.description });
    }

    setIsEdit(false);
    return;
  };

  useOnClickOutside(formRef, () => handleSubmit(onSubmit)());

  const handleRenderDescription = () => {
    if (isEdit) {
      return (
        <form
          ref={formRef}
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormTextarea
            htmlFor="description"
            placeholder="Pro Tip: Press 'Enter' for a line break and 'Shift + Enter' for a simple line break."
            register={register("description")}
          />
          <div className="flex items-center gap-2">
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      );
    }

    if (card && card.description) {
      return (
        <div
          className="flex-1 text-sm rounded-sm"
          onClick={() => setIsEdit(true)}
        >
          {card.description}
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
    <div className="flex-1 flex gap-3">
      <AlignLeft className="w-6 h-6" />
      <div className="flex-1 flex flex-col gap-4">
        <p className="font-semibold">Description</p>
        {handleRenderDescription()}
      </div>
    </div>
  );
};

export default CardDescription;
