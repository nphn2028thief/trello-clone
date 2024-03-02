import axiosClient from "./axiosClient";

import { EApiPath } from "@/constants/path";
import { unsplash } from "@/lib/unsplash";
import { IBoardResponse } from "@/types/board";
import { IListResponse } from "@/types/list";
import { ILogResponse } from "@/types/log";
import { IOrgLimitResponse } from "@/types/orgLimit";
import { IOrgSubscriptionResponse } from "@/types/orgSubscription";

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
export const getListsByBoardAndOrg = async (boardId: string, orgId: string) => {
  const res = await axiosClient.get<IListResponse[]>(
    `${EApiPath.LISTS}/${boardId}/${orgId}`
  );
  return res.data;
};

// Log
export const getLogsByOrg = async (orgId: string) => {
  const res = await axiosClient.get<ILogResponse[]>(
    `${EApiPath.LOGS}/${orgId}`
  );
  return res.data;
};

// Org limit
export const getOrgLimit = async (orgId: string) => {
  const res = await axiosClient.get<IOrgLimitResponse>(
    `${EApiPath.ORG_LIMIT}/${orgId}`
  );
  return res.data;
};

export const getOrgSubscription = async (orgId: string) => {
  const res = await axiosClient.get<IOrgSubscriptionResponse>(
    `${EApiPath.ORG_SUBSCRIPTION}/${orgId}`
  );
  return res.data;
};
