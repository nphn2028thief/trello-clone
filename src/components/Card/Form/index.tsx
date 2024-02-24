import { Plus, X } from "lucide-react";
import { memo, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import axiosClient from "@/api/axiosClient";

import { Button } from "@/components/ui/button";
import FormTextarea from "@/components/Form/Textarea";
import { EApiPath } from "@/constants/path";
import { QUERY_KEY } from "@/constants/key";
import { LoadingContext } from "@/context/Loading";
import { ICreate, IResponse } from "@/types";
import { ICardCreateRequest } from "@/types/card";

interface IProps {
  listId: string;
  isEdit: boolean;
  onEnableEdit: () => void;
  onDisableEdit: () => void;
}

const schema = Yup.object({
  title: Yup.string().required("Title is required!"),
});

const CardForm = (props: IProps) => {
  const { listId, isEdit, onEnableEdit, onDisableEdit } = props;

  const queryClient = useQueryClient();

  const { setIsLoading } = useContext(LoadingContext);

  const {
    register,
    setFocus,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<ICreate>({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(schema),
  });

  const { mutate: createCard, isSuccess } = useMutation({
    mutationFn: async (data: ICardCreateRequest) => {
      const res = await axiosClient.post<IResponse>(`${EApiPath.CARD}`, data);
      return res.data;
    },
    onSuccess: (data) => {
      reset();
      toast.success(data.message || "Card created!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LISTS] });
    },
    onError: (error) => {
      setFocus("title");
      toast.error(error.message || "Create card failure!");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (isEdit || isSuccess) {
      setFocus("title");
    }
  }, [isEdit, isSuccess, setFocus]);

  const onSubmit = (data: ICreate) => {
    setIsLoading(true);
    createCard({
      title: data.title,
      listId,
    });
  };

  if (isEdit) {
    return (
      <form className="m-0.5 space-y-4 mt-2" onSubmit={handleSubmit(onSubmit)}>
        <FormTextarea
          htmlFor="title"
          register={register("title")}
          placeholder="Enter a title for this card..."
          errors={errors}
        />
        <div className="flex items-center gap-2">
          <Button type="submit" variant="primary">
            Add card
          </Button>
          <Button type="button" variant="ghost" onClick={onDisableEdit}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="pt-2">
      <Button
        variant="ghost"
        className="w-full justify-start gap-2 px-2 text-sm text-muted-foreground"
        onClick={onEnableEdit}
      >
        <Plus className="w-4 h-4" />
        Add a card
      </Button>
    </div>
  );
};

export default memo(CardForm);
