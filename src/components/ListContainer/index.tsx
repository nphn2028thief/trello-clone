"use client";

import { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import axiosClient from "@/api/axiosClient";
import { getListsByBoardAndOrg } from "@/api/http";

import useGet from "@/hooks/useGet";
import ListForm from "./Form";
import ListItem from "./Item";
import LazyLoading from "../LazyLoading";
import { QUERY_KEY } from "@/constants/key";
import { EDndType } from "@/constants/dnd";
import { EApiPath } from "@/constants/path";
import { reorder } from "@/utils";
import { IResponse } from "@/types";
import { ICard, IUpdateOrderCard } from "@/types/card";
import { IListResponse, IUpdateOrderList } from "@/types/list";

interface IProps {
  boardId: string;
  orgId: string;
}

const ListContainer = (props: IProps) => {
  const { boardId, orgId } = props;

  const [lists, setLists] = useState<IListResponse[]>([]);

  // Call and handle api get lists by board and org
  const { data, isLoading, isFetching } = useGet(
    [QUERY_KEY.LISTS],
    () => getListsByBoardAndOrg(boardId, orgId),
    true,
    true
  );

  useEffect(() => {
    if (data) {
      setLists(data);
    }
  }, [data]);

  // Call and handle api update list order
  const { mutate: updateListOrder } = useMutation({
    mutationFn: async (data: IUpdateOrderList) => {
      const res = await axiosClient.patch<IResponse>(
        `${EApiPath.LIST_ORDER}`,
        data
      );
      return res.data;
    },
    onError: (error) => {
      toast.error(error.message || "Update list order failure!");
    },
  });

  // Call and handle api update list order
  const { mutate: updateCardOrder } = useMutation({
    mutationFn: async (data: IUpdateOrderCard) => {
      const res = await axiosClient.patch<IResponse>(
        `${EApiPath.CARD_ORDER}`,
        data
      );
      return res.data;
    },
    onError: (error) => {
      toast.error(error.message || "Update card order failure!");
    },
  });

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    // Nếu không chỉ định đúng vị trí để thả thì sẽ thoát khỏi hàm này
    if (!destination) {
      return;
    }

    // Nếu thả ở cùng vị trí thì cũng sẽ thoát khỏi hàm này
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Move a list
    if (type === EDndType.LIST) {
      const results = reorder<IListResponse>(
        lists,
        source.index,
        destination.index
      ).map((item, index) => ({ ...item, order: index + 1 }));

      setLists(results);
      updateListOrder({ lists: results });
    }

    // Move a card
    if (type === EDndType.CARD) {
      let newList = [...lists];

      // Source and destination list
      const sourceList = newList.find(
        (list) => list._id === source.droppableId
      );
      const destList = newList.find(
        (list) => list._id === destination.droppableId
      );

      if (!sourceList || !destList) {
        return;
      }

      // Check if cards exists on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // Check if cards exists on the destList
      if (!destList.cards) {
        destList.cards = [];
      }

      // Move the card in the same list
      if (source.droppableId === destination.droppableId) {
        const cardResults = reorder<ICard>(
          sourceList.cards,
          source.index,
          destination.index
        );

        cardResults.forEach((card, index) => (card.order = index + 1));

        sourceList.cards = cardResults;

        updateCardOrder({
          sourceId: source.droppableId,
          destId: destination.droppableId,
          sourceCards: sourceList.cards,
          destCards: destList.cards,
        });
      } else {
        // Move the card to another list
        // Remove card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // Add card to the destination list
        destList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, index) => (card.order = index + 1));

        // Update order for each card in the destination list
        destList.cards.forEach((card, index) => (card.order = index + 1));

        setLists(newList);

        updateCardOrder({
          sourceId: source.droppableId,
          destId: destination.droppableId,
          cardId: movedCard._id,
          sourceCards: sourceList.cards,
          destCards: destList.cards,
        });
      }
    }
  };

  if (isLoading || isFetching) {
    return (
      <ol className="h-full flex gap-3 pr-4 relative">
        <LazyLoading className="!bg-transparent" />
      </ol>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        type={EDndType.LIST}
        droppableId="lists"
        direction="horizontal"
      >
        {(provided) => (
          <ol
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="h-full flex gap-3 pr-4 relative"
          >
            {lists &&
              lists.map((item, index) => (
                <ListItem
                  key={item._id}
                  boardId={boardId}
                  orgId={orgId}
                  data={item}
                  index={index}
                />
              ))}

            {provided.placeholder}

            <ListForm boardId={boardId} orgId={orgId} />

            <div className="w-1 flex-shrink-0" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
