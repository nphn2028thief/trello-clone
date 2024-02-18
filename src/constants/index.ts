export const baseURL =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEV_API_URL
    : process.env.NEXT_PUBLIC_API_URL;
