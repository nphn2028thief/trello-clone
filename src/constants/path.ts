export enum EPath {
  HOME = "/",
  SIGNIN = "/sign-in",
  SIGNUP = "/sign-up",
  SELECT_ORGANIZATION = "/select-org",
  ORGANIZATION = "/organization",
  ORGANIZATION_DETAIL = "/organization/:id",
  BOARD = "/board",
  BOARD_DETAIL = "/board/:id",
}

export enum EApiPath {
  CREATE_BOARD = "/board",
  GET_BOARD = "/board",
  GET_BOARDS = "/boards",
  UPDATE_BOARD = "/board",
  DELETE_BOARD = "/board",
}
