import { getListsByBoardAndOrg } from "@/api/http";

import useGet from "@/hooks/useGet";
import ListHeader from "./Header";
import ListForm from "./Form";
import { QUERY_KEY } from "@/constants/key";

interface IProps {
  boardId: string;
  orgId: string;
}

const ListContainer = (props: IProps) => {
  const { boardId, orgId } = props;

  const { data: lists } = useGet([QUERY_KEY.LISTS], () =>
    getListsByBoardAndOrg(boardId, orgId)
  );

  return (
    <ol className="h-full flex gap-3 pr-4">
      {lists &&
        lists.map((item) => (
          <li key={item._id} className="w-[272px] h-full shrink-0">
            <ListHeader data={item} />
          </li>
        ))}

      <div className="w-1 flex shrink-0 mr-4">
        <ListForm boardId={boardId} orgId={orgId} />
      </div>
    </ol>
  );
};

export default ListContainer;
