import { ElementRef, useCallback, useRef, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";

import ListHeader from "../Header";
import CardForm from "@/components/Card/Form";
import CardItem from "@/components/Card/Item";
import { EDndType } from "@/constants/dnd";
import { cn } from "@/lib/utils";
import { IListResponse } from "@/types/list";

interface IProps {
  boardId: string;
  orgId: string;
  data: IListResponse;
  index: number;
}

const ListItem = (props: IProps) => {
  const { boardId, orgId, data, index } = props;

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEnableEdit = useCallback(() => {
    setIsEdit(true);
  }, []);

  const handleDisableEdit = useCallback(() => {
    setIsEdit(false);
  }, []);

  return (
    <Draggable draggableId={data._id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="w-[272px] h-full shrink-0"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full p-2 bg-[#f1f2f4] shadow-md rounded-md"
          >
            <ListHeader
              data={data}
              boardId={boardId}
              orgId={orgId}
              onEnableEdit={handleEnableEdit}
            />

            <Droppable type={EDndType.CARD} droppableId={data._id}>
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "flex flex-col gap-2 p-0.5",
                    data.cards.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {data.cards.map((item, index) => (
                    <CardItem key={item._id} data={item} index={index} />
                  ))}

                  {provided.placeholder}
                </ol>
              )}
            </Droppable>

            <CardForm
              listId={data._id}
              isEdit={isEdit}
              onEnableEdit={handleEnableEdit}
              onDisableEdit={handleDisableEdit}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ListItem;
