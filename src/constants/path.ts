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
  BOARD = "/board",
  BOARDS = "/boards",
  LIST = "/list",
  LISTS = "/lists",
  COPY_LIST = "/list/copy",
  LIST_ORDER = "/list/order",
  CARD = "/card",
  CARDS = "/cards",
  CARD_ORDER = "/card/order",
  COPY_CARD = "/card/copy",
  LOG = "/log",
  LOGS = "/logs",
  ORG_LIMIT = "/org-limit",
  ORG_SUBSCRIPTION = "/org-subscription",
}
