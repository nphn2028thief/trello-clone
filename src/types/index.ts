import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export interface IResponse {
  message: string;
  code: number;
}

export interface IParams extends Params {
  id: string;
}
