import BoardNavbarOptions from "./Options";
import BoardNavbarTitle from "./Title";
import { IBoardResponse } from "@/types/board";

const BoardNavbar = ({ data }: { data: IBoardResponse }) => {
  return (
    <div className="h-navbar flex justify-between items-center fixed left-0 top-navbar right-0 pl-5 pr-[17px] md:px-4 text-white bg-black/50 z-20">
      <BoardNavbarTitle data={data} />
      <BoardNavbarOptions id={data._id} />
    </div>
  );
};

export default BoardNavbar;
