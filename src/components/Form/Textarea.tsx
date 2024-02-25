import { InputHTMLAttributes } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

import FormError from "./Error";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

interface IProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  htmlFor: string;
  label?: string;
  placeholder?: string;
  className?: string;
  register: UseFormRegisterReturn;
  errors?: FieldErrors;
}

const FormTextarea = (props: IProps) => {
  const { htmlFor, label, placeholder, className, register, errors, ...rest } =
    props;

  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <label htmlFor={htmlFor} className="text-sm">
          {label}
        </label>
      ) : null}
      <div className="flex flex-col gap-1">
        <Textarea
          id={htmlFor}
          className={cn(
            "resize-none focus-within:border-[#aaa] focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
            className
          )}
          placeholder={placeholder}
          {...register}
          {...rest}
        />
        <FormError htmlFor={htmlFor} errors={errors} />
      </div>
    </div>
  );
};

export default FormTextarea;
