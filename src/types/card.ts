import { ILogResponse } from "./log";

export interface ICardCreateRequest {
  title: string;
  listId: string;
  orgId: string;
  userId: string;
}

export interface ICard {
  _id: string;
  title: string;
  description: string;
  order: number;
  listId: string;
  listTitle: string;
  logs: ILogResponse[];
}

export interface IUpdateOrderCard {
  sourceId: string;
  destId: string;
  cardId?: string;
  sourceCards: ICard[];
  destCards: ICard[];
}

export interface IUpdateCardFormRequest {
  title?: string;
  description?: string;
}

export interface IUpdateCard extends IUpdateCardFormRequest {
  userId: string;
  orgId: string;
}

export interface ICopyCard {
  orgId: string;
  listId: string;
  cardId: string;
  title: string;
  description: string;
}
