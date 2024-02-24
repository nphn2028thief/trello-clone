import { useParams } from "next/navigation";
import { ElementRef, ReactNode, useContext, useEffect, useRef } from "react";
import { X } from "lucide-react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import axiosClient from "@/api/axiosClient";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import FormInput from "./Input";
import FormPicker from "./Picker";
import { EApiPath } from "@/constants/path";
import { QUERY_KEY } from "@/constants/key";
import { LoadingContext } from "@/context/Loading";
import { IParams, IResponse } from "@/types";
import { IBoard, IBoardRequest } from "@/types/board";

interface IProps {
  children: ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const schema = Yup.object({
  title: Yup.string().required("Title is required!"),
  image: Yup.string().required("Image is required!"),
});

const FormPopover = (props: IProps) => {
  const { children, side = "bottom", align, sideOffset = 0 } = props;

  const params = useParams<IParams>();

  const queryClient = useQueryClient();

  const closeRef = useRef<ElementRef<"button">>(null);

  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    const handleResize = () => {
      closeRef.current?.click();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const {
    register,
    reset,
    setFocus,
    setValue,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<IBoard>({
    defaultValues: {
      title: "",
      image: "",
    },
    resolver: yupResolver(schema),
  });

  // Call and handle api create board
  const { mutate: createBoard } = useMutation({
    mutationFn: async (data: IBoardRequest) => {
      const res = await axiosClient.post<IResponse>(`${EApiPath.BOARD}`, data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEY.BOARDS] })
        .then(() => {
          reset();
          closeRef.current?.click();
          toast.success(data.message || "Board created!");
        });
    },
    onError: (error) => {
      setFocus("title");
      toast.error(error.message || "Create board failure!");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = (data: IBoard) => {
    setIsLoading(true);
    createBoard({
      ...data,
      orgId: params.id,
    });
  };

  return (
    <Popover onOpenChange={(e) => e && reset()}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="w-80 pt-3"
      >
        <div className="text-base font-medium text-center text-neutral-600 pb-4">
          Create board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant="ghost"
            className="w-auto h-auto absolute top-2 right-2 p-2 text-neutral-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FormPicker<IBoard>
              name="image"
              setValue={setValue}
              setError={setError}
              errors={errors}
            />

            <FormInput
              htmlFor="title"
              label="Board title"
              placeholder="Enter the title of board"
              register={register("title")}
              errors={errors}
            />
            <Button type="submit" size="sm" variant="primary">
              Create
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
