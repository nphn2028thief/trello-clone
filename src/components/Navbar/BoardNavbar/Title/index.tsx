"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import axiosClient from "@/api/axiosClient";

import useClickOuside from "@/hooks/useClickOutside";
import FormInput from "@/components/Form/Input";
import { Button } from "@/components/ui/button";
import { EApiPath } from "@/constants/path";
import { IResponse } from "@/types";
import { IBoard, IBoardResponse } from "@/types/board";

const schema = Yup.object({
  title: Yup.string().required(),
});

const BoardNavbarTitle = ({ data }: { data: IBoardResponse }) => {
  const router = useRouter();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const defaultValues = useMemo<Omit<IBoard, "image">>(() => {
    return {
      title: data ? data.title : "",
    };
  }, [data]);

  const {
    register,
    setFocus,
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useForm<Omit<IBoard, "image">>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    isEdit && setFocus("title");
  }, [isEdit, setFocus]);

  useEffect(() => data && reset(defaultValues), [data, defaultValues, reset]);

  // Call and handle api update title board
  const { mutate: updateTitleBoard } = useMutation({
    mutationFn: async (value: Omit<IBoard, "image">) => {
      const res = await axiosClient.patch<IResponse>(
        `${EApiPath.UPDATE_BOARD}/${data._id}`,
        value
      );
      return res.data;
    },
    onSuccess: (data) => {
      reset();
      toast.success(data.message || "Board updated!");
      setIsEdit(false);
      router.refresh();
    },
    onError: (error) => {
      setFocus("title");
      toast.error(error.message || "Update board failure!");
    },
  });

  const onSubmit = (data: Omit<IBoard, "image">) => {
    isDirty ? updateTitleBoard(data) : setIsEdit(false);
  };

  const formRef = useClickOuside(handleSubmit(onSubmit));

  if (isEdit) {
    return (
      <form ref={formRef} className="flex items-center gap-2">
        <FormInput
          htmlFor="title"
          className="font-bold [&>div>input]:bg-transparent"
          register={register("title")}
        />
      </form>
    );
  }

  return (
    <Button
      variant="transparent"
      className="font-bold px-3"
      onClick={() => {
        setIsEdit(true);
      }}
    >
      {data.title}
    </Button>
  );
};

export default BoardNavbarTitle;
