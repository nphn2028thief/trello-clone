export interface IListRequest {
  title: string;
  boardId: string;
  organizationId: string;
}

export interface IListResponse {
  _id: string;
  title: string;
  order: number;
  cardIds: any[];
}
