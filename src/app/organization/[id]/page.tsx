"use client";

import { Suspense } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import LazyLoading from "@/components/LazyLoading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/api/axiosClient";
import { IBoard, IBoardResponse } from "@/types/board";
import { EApiPath } from "@/constants/path";
import { IResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { QUERY_KEY } from "@/constants/key";
import Info from "@/components/Info";
import { Separator } from "@/components/ui/separator";
import BoardList from "@/components/BoardList";

const schema = Yup.object({
  title: Yup.string().required(),
});

const OrganizationDetailPage = () => {
  const queryClient = useQueryClient();

  const { register, reset, setFocus, handleSubmit } = useForm<IBoard>({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(schema),
  });

  // Call and handle api create board
  const { mutate: createBoard, isPending } = useMutation({
    mutationFn: async (data: IBoard) => {
      const res = await axiosClient.post<IResponse>(
        `${EApiPath.CREATE_BOARD}`,
        data
      );
      return res.data;
    },
    onSuccess: (data) => {
      reset();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BOARD] });
    },
    onError: (error) => {
      setFocus("title");
    },
  });

  // Call and handle api get boards
  const { data: boards } = useQuery({
    queryKey: [QUERY_KEY.BOARD],
    queryFn: async () => {
      const res = await axiosClient.get<IBoardResponse[]>(
        `${EApiPath.GET_BOARDS}`
      );
      return res.data;
    },
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const onSubmit = (data: IBoard) => {
    createBoard(data);
  };

  return (
    <Suspense fallback={<LazyLoading />}>
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </Suspense>
  );
};

export default OrganizationDetailPage;
