import { ICard } from "@/types/card";

interface IProps {
  data: ICard;
}

const CardItem = (props: IProps) => {
  const { data } = props;

  return (
    <div className="border-[1px] border-transparent hover:border-black px-3 py-2 text-sm bg-white rounded-md shadow-sm break-words">
      {data.title}
    </div>
  );
};

export default CardItem;
