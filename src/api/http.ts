import axiosClient from "./axiosClient";

import { EApiPath } from "@/constants/path";
import { unsplash } from "@/lib/unsplash";
import { IBoardResponse } from "@/types/board";

export const getBoards = async (id: string) => {
  const res = await axiosClient.get<IBoardResponse[]>(
    `${EApiPath.GET_BOARDS}/${id}`
  );
  return res.data;
};

export const getBoardByIdAndOrgId = async (orgId: string, id: string) => {
  const res = await axiosClient.get<IBoardResponse>(
    `${EApiPath.GET_BOARDS}/${orgId}/${id}`
  );
  return res.data;
};

export const getUnsplashImage = async () => {
  const result = await unsplash.photos.getRandom({
    collectionIds: ["317099"],
    count: 9,
  });

  return result;
};
