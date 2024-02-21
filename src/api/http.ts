import axiosClient from "./axiosClient";

import { EApiPath } from "@/constants/path";
import { unsplash } from "@/lib/unsplash";
import { IBoardResponse } from "@/types/board";
import { IListResponse } from "@/types/list";

// Unsplash
export const getUnsplashImage = async () => {
  const result = await unsplash.photos.getRandom({
    collectionIds: ["317099"],
    count: 9,
  });

  return result;
};

// Board
export const getBoards = async (id: string) => {
  const res = await axiosClient.get<IBoardResponse[]>(
    `${EApiPath.BOARDS}/${id}`
  );
  return res.data;
};

export const getBoardByIdAndOrgId = async (orgId: string, id: string) => {
  const res = await axiosClient.get<IBoardResponse>(
    `${EApiPath.BOARDS}/${orgId}/${id}`
  );
  return res.data;
};

// List
export const getListsByBoardAndOrg = async (
  boardId: string,
  organizationId: string
) => {
  const res = await axiosClient.get<IListResponse[]>(
    `${EApiPath.LISTS}/${boardId}/${organizationId}`
  );
  return res.data;
};
