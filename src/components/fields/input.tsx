import { TextField, TextFieldProps, TextFieldVariants } from "@mui/material";

type InputProps = {
  field: { [key: string]: any };
  name: string;
  label: string;
  containerClassName: string;
  className: string;
  props: TextFieldProps;
  variant: TextFieldVariants;
};

const Input = ({
  field,
  name,
  label,
  containerClassName,
  className,
  variant,
}: InputProps) => {
  return (
    <div className={`flex flex-col gap-4 ${containerClassName}`}>
      <TextField
        className={className}
        {...field}
        name={name}
        label={label}
        variant={variant}
      />
    </div>
  );
};

export default Input;
