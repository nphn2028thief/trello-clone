export interface ICardCreateRequest {
  title: string;
  listId: string;
}

export interface ICard {
  _id: string;
  title: string;
  description: string;
  order: number;
}

export interface IUpdateOrderCard {
  sourceId: string;
  destId: string;
  cardId?: string;
  sourceCards: ICard[];
  destCards: ICard[];
}
