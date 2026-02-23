import { forwardRef, InputHTMLAttributes } from "react";

export type TTextInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  //   textValue: string;
  //   onChangeFunction: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  maxLength?: number;
  disable?: boolean;
};

const TextInputField = forwardRef<HTMLInputElement, TTextInputFieldProps>(
  (props: TTextInputFieldProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      id,
      label,
      placeholder,
      required,
      errorMessage,
      maxLength,
      disable,
      ...inputProps
    } = props;
    return (
      <div id={`${id}-input`} className="flex flex-col gap-2">
        {label && (
          <p className="font-bold">
            {label}
            <span className={required ? "text-red-500" : "hidden"}> *</span>
          </p>
        )}
        <div className="flex flex-col gap-1">
          <input
            ref={ref}
            type="text"
            {...inputProps}
            className={`h-12 w-full outline-[#BEBEBE] outline-1 focus:outline-[#F28C28] rounded-2xl p-3 cursor-pointer ${
              disable ? "opacity-50 pointer-events-none" : ""
            }`}
            placeholder={placeholder ?? ""}
            //   value={props.textValue}
            maxLength={maxLength ?? 100}
            //   onChange={(e) => {
            //     props.onChangeFunction(e.target.value);
            //   }}
            disabled={disable}
          />
          {errorMessage && (
            <p className="text-red-500 text-[14px]">{errorMessage}</p>
          )}
        </div>
      </div>
    );
  }
);
TextInputField.displayName = "TextInputField";

export default TextInputField;
