export interface ICardCreateRequest {
  title: string;
  listId: string;
}

export interface ICard {
  _id: string;
  title: string;
  description: string;
  order: number;
  listId: string;
  listTitle: string;
}

export interface IUpdateOrderCard {
  sourceId: string;
  destId: string;
  cardId?: string;
  sourceCards: ICard[];
  destCards: ICard[];
}

export interface IUpdateCard {
  title: string;
  description?: string;
}

export interface ICopyCard {
  listId: string;
  cardId: string;
  title: string;
  description: string;
}
