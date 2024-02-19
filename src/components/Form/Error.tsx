import { FieldErrors } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface IProps {
  htmlFor: string;
  errors?: FieldErrors;
}

const FormError = (props: IProps) => {
  const { htmlFor, errors } = props;

  return errors ? (
    <ErrorMessage
      name={htmlFor}
      errors={errors}
      render={({ message }) => (
        <p className="text-red-600 text-xs">{message}</p>
      )}
    />
  ) : null;
};

export default FormError;
