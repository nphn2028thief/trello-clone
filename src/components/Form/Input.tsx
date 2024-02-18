import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import FormError from "./Error";

interface IProps {
  htmlFor: string;
  type?: "text" | "password" | "email";
  label: string;
  placeholder: string;
  className?: string;
  register: UseFormRegisterReturn;
  errors: FieldErrors;
}

const FormInput = (props: IProps) => {
  const {
    htmlFor,
    type = "text",
    label,
    placeholder,
    className,
    register,
    errors,
  } = props;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={htmlFor} className="text-sm">
        {label}
      </label>
      <div className="flex flex-col gap-1">
        <input
          type={type}
          id={htmlFor}
          className="text-sm border border-[#ccc] hover:border-[#aaa] focus-within:border-[#aaa] rounded-sm px-3 py-1.5"
          placeholder={placeholder}
          {...register}
        />
        <FormError htmlFor={htmlFor} errors={errors} />
      </div>
    </div>
  );
};

export default FormInput;
