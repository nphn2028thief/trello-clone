import { useCallback, useState } from "react";

import ListHeader from "../Header";
import CardForm from "@/components/Card/Form";
import CardItem from "@/components/Card/Item";
import { cn } from "@/lib/utils";
import { IListResponse } from "@/types/list";

interface IProps {
  boardId: string;
  orgId: string;
  data: IListResponse;
}

const ListItem = (props: IProps) => {
  const { boardId, orgId, data } = props;

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEnableEdit = useCallback(() => {
    setIsEdit(true);
  }, []);

  const handleDisableEdit = useCallback(() => {
    setIsEdit(false);
  }, []);

  return (
    <li key={data._id} className="w-[272px] h-full shrink-0">
      <div className="w-full p-2 bg-[#f1f2f4] shadow-md rounded-md">
        <ListHeader
          data={data}
          boardId={boardId}
          orgId={orgId}
          onEnableEdit={handleEnableEdit}
        />

        <ol
          className={cn(
            "flex flex-col gap-2 m-1 p-1",
            data.cards.length > 0 ? "mt-2" : "mt-0"
          )}
        >
          {data.cards.map((item) => (
            <CardItem key={item._id} data={item} />
          ))}
        </ol>

        <CardForm
          listId={data._id}
          isEdit={isEdit}
          onEnableEdit={handleEnableEdit}
          onDisableEdit={handleDisableEdit}
        />
      </div>
    </li>
  );
};

export default ListItem;
