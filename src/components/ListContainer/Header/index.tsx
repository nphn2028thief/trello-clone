"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import axiosClient from "@/api/axiosClient";

import useClickOuside from "@/hooks/useClickOutside";
import ListOptions from "../Options";
import FormInput from "@/components/Form/Input";
import { EApiPath } from "@/constants/path";
import { QUERY_KEY } from "@/constants/key";
import { ICreate, IResponse } from "@/types";
import { IListResponse } from "@/types/list";

interface IProps {
  boardId: string;
  orgId: string;
  data: IListResponse;
  onEnableEdit: () => void;
}

const schema = Yup.object({
  title: Yup.string().required(),
});

const ListHeader = (props: IProps) => {
  const { boardId, orgId, data, onEnableEdit } = props;

  const queryClient = useQueryClient();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const defaultValues = useMemo<ICreate>(() => {
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
  } = useForm<ICreate>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isEdit) {
      setFocus("title");
    }
  }, [isEdit, setFocus]);

  useEffect(() => {
    if (data) {
      reset(defaultValues);
    }
  }, [data, reset, defaultValues]);

  const { mutate: updateList } = useMutation({
    mutationFn: async (value: ICreate) => {
      const res = await axiosClient.patch<IResponse>(
        `${EApiPath.LIST}/${data._id}`,
        value
      );
      return res.data;
    },
    onSuccess: (data) => {
      reset();
      setIsEdit(false);
      toast.success(data.message || "List updated!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LISTS] });
    },
    onError: (error) => {
      setFocus("title");
      toast.error(error.message || "Update list failure!");
    },
  });

  const onSubmit = (data: ICreate) => {
    isDirty ? updateList(data) : setIsEdit(false);
  };

  const formRef = useClickOuside(handleSubmit(onSubmit));

  return (
    <div className="flex justify-between items-center">
      {isEdit ? (
        <form
          ref={formRef}
          className="pl-0.5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            htmlFor="title"
            className="font-bold text-sm p-[1px] [&>div>input]:bg-transparent [&>div>input]:px-3"
            register={register("title")}
          />
        </form>
      ) : (
        <div
          className="w-full flex items-center gap-2 px-4 py-2 font-bold text-sm border-transparent"
          onClick={() => setIsEdit(true)}
        >
          {data.title}
        </div>
      )}
      <ListOptions
        data={data}
        boardId={boardId}
        orgId={orgId}
        onEnableEdit={onEnableEdit}
      />
    </div>
  );
};

export default memo(ListHeader);
