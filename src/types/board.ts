export interface IBoard {
  title: string;
  image: string;
}

export interface IBoardRequest extends IBoard {
  organizationId: string;
}

export interface IBoardResponse {
  _id: string;
  title: string;
}
