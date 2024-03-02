export interface IBoard {
  title: string;
  image: string;
}

export interface IBoardRequest extends IBoard {
  userId: string;
  orgId: string;
}

export interface IBoardResponse {
  _id: string;
  title: string;
  image: {
    id: string;
    thumbUrl: string;
    fullUrl: string;
    username: string;
    linkHtml: string;
  };
}

export interface IUpdateBoard {
  userId: string;
  title: string;
}
