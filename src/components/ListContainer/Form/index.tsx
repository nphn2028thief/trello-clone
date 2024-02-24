"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, X } from "lucide-react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import axiosClient from "@/api/axiosClient";

import useClickOuside from "@/hooks/useClickOutside";
import FormInput from "@/components/Form/Input";
import { Button } from "@/components/ui/button";
import OverlayLoading from "@/components/OverlayLoading";
import { EApiPath } from "@/constants/path";
import { QUERY_KEY } from "@/constants/key";
import { ICreate } from "@/types";
import { IListRequest } from "@/types/list";

interface IProps {
  boardId: string;
  orgId: string;
}

const schema = Yup.object({
  title: Yup.string().required(),
});

const ListForm = (props: IProps) => {
  const { boardId, orgId } = props;

  const queryClient = useQueryClient();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const formRef = useClickOuside(() => setIsEdit(false));

  const { register, setFocus, reset, handleSubmit } = useForm<ICreate>({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(schema),
  });

  // Call and handle api create list
  const {
    mutate: createList,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: IListRequest) => {
      const res = await axiosClient.post(`${EApiPath.LIST}`, data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "List created!");
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEY.LISTS] })
        .finally(() => reset());
    },
    onError: (error) => {
      setFocus("title");
      toast.error(error.message || "Create board failure!");
    },
  });

  useEffect(() => {
    if (isEdit || isSuccess) {
      setFocus("title");
    }
  }, [isEdit, isSuccess, setFocus]);

  const onSubmit = (data: ICreate) => {
    createList({
      title: data.title,
      boardId,
      orgId,
    });
  };

  const handleRenderWhenEditMode = () => {
    if (isEdit) {
      return (
        <form
          ref={formRef}
          className="w-full flex flex-col gap-3 p-[9px] bg-white shadow-md rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            htmlFor="title"
            placeholder="Enter list title..."
            register={register("title")}
            className="font-medium border-transparent hover:border-input focus:border-input transition"
          />

          <div className="flex items-center gap-2">
            <Button type="submit" variant="primary" className="">
              Add list
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsEdit(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <button
        className="w-full flex items-center gap-2 p-3 font-medium text-sm bg-white/80 hover:bg-white/60 transition rounded-md shadow-md"
        onClick={() => setIsEdit(true)}
      >
        <Plus className="w-4 h-4" />
        Add a list
      </button>
    );
  };

  return (
    <li className="w-[288px] h-full shrink-0">
      {isPending ? <OverlayLoading /> : null}
      {handleRenderWhenEditMode()}
    </li>
  );
};

export default ListForm;
