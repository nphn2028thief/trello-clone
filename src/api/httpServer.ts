import { baseURL } from "@/constants";
import { EApiPath } from "@/constants/path";

export const getBoardByIdAndOrgId = async (orgId: string, id: string) => {
  const res = await fetch(`${baseURL}${EApiPath.BOARDS}/${orgId}/${id}`).then(
    (res) => res.json()
  );

  return res;
};
