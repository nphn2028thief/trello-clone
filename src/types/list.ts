import { ICard } from "./card";

export interface IListRequest {
  title: string;
  boardId: string;
  orgId: string;
}

export interface IListResponse {
  _id: string;
  title: string;
  order: number;
  cards: ICard[];
}

export interface IListCopyRequest extends IListRequest {
  listId: string;
  cards: Omit<ICard, "_id">[];
}

export interface IUpdateOrderList {
  lists: IListResponse[];
}
