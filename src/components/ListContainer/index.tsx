"use client";

import { ElementRef, useRef } from "react";

import { getListsByBoardAndOrg } from "@/api/http";

import useGet from "@/hooks/useGet";
import ListForm from "./Form";
import ListItem from "./Item";
import LazyLoading from "../LazyLoading";
import { QUERY_KEY } from "@/constants/key";

interface IProps {
  boardId: string;
  orgId: string;
}

const ListContainer = (props: IProps) => {
  const { boardId, orgId } = props;

  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const { data: lists, isLoading } = useGet(
    [QUERY_KEY.LISTS],
    () => getListsByBoardAndOrg(boardId, orgId),
    true,
    true
  );

  if (isLoading) {
    return (
      <ol className="h-full flex gap-3 pr-4 relative">
        <LazyLoading className="!bg-transparent" />
      </ol>
    );
  }

  return (
    <ol className="h-full flex gap-3 pr-4 relative">
      {lists &&
        lists.map((item) => (
          <ListItem
            key={item._id}
            boardId={boardId}
            orgId={orgId}
            data={item}
          />
        ))}

      <ListForm boardId={boardId} orgId={orgId} />
      <div className="w-1 flex-shrink-0" />
    </ol>
  );
};

export default ListContainer;
