import { ACTION, ENTITY_TYPE } from "@/constants/entity";
import { IUser } from "./user";

export interface IEntity {
  id: string;
  title: string;
  type: ENTITY_TYPE;
}

export interface ILogResponse {
  _id: string;
  action: ACTION;
  entity: IEntity;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}
