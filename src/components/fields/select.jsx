import { get } from "lodash";

const Select = ({
  label,
  options,
  name,
  field,
  optionValue = "",
  optionLabel = "",
  className,
  containerClassName,
  ...props
}) => {
  const { form, ...rest } = props;
  return (
    <div className={`flex flex-col gap-4 ${containerClassName}`}>
      {label && (
        <label
          className="font-medium text-base leading-[19px] text-black"
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <select
        className={` h-[60px] rounded-[8px] focus:border-blue-500 border text-base outline-none px-3 ${className}`}
        name={name}
        id={name}
        {...field}
        {...rest}
      >
        {options?.map((value) => {
          return (
            <option
              value={optionValue ? get(value, optionValue) : get(value, "id")}
              key={get(value, optionValue ? optionValue : "id")}
            >
              {get(value, optionLabel)}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
