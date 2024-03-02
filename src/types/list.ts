import { ICard } from "./card";

export interface IListCreateRequest {
  title: string;
  boardId: string;
  orgId: string;
  userId: string;
}

export interface IListResponse {
  _id: string;
  title: string;
  order: number;
  cards: ICard[];
}

export interface IListCopyRequest extends Omit<IListCreateRequest, "userId"> {
  listId: string;
  cards: Omit<ICard, "_id">[];
}

export interface IUpdateOrderList {
  lists: IListResponse[];
}

export interface IUpdateListRequest {
  title: string;
  userId: string;
  orgId: string;
}
