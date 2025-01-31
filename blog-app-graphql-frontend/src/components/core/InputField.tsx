import { forwardRef } from "react";

interface IProps {
  type?: string;
  className?: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
}

const InputField = forwardRef<HTMLInputElement, IProps>(
  ({ className, type, label, placeholder, required }, ref) => {
    const id = Math.random() * 10;

    return (
      <div className="mb-5">
        {label && (
          <label
            htmlFor={`input_${id}`}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type || "text"}
          id={`input_${id}`}
          className={`${className} border bg-white border-white text-gray-800 text-sm rounded-lg focus:primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-primary-700 dark:focus:primary-500 dark:focus:border-primary-500 duration-150 transition-all`}
          placeholder={placeholder}
          required={required}
        />
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
