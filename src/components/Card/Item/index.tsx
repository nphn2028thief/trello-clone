import { Draggable } from "@hello-pangea/dnd";

import { ICard } from "@/types/card";

interface IProps {
  data: ICard;
  index: number;
}

const CardItem = (props: IProps) => {
  const { data, index } = props;

  return (
    <Draggable draggableId={data._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="border-[1px] border-transparent hover:border-black px-3 py-2 text-sm bg-white rounded-md shadow-sm break-words"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
