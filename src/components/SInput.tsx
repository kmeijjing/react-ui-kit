import { useState, useEffect } from "react";

export interface Rule {
  message: string;
  validate: (value: string) => boolean;
}

export interface SInputProps {
 value: string;
 type?: string;
 placeholder?: string;
	label?: string;
	useInsideLabel?: boolean;
 onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	maxByte?: number;
	rules?: Rule[];
	errorMessage?: string;
	hint?: string;
	disable?: boolean;
	readonly?: boolean;
	className?: string;

}

const SInput = ({
 value,
 type = 'text',
 placeholder,
 label,
 useInsideLabel = false,
 onChange,
	maxByte,
	rules = [],
	errorMessage = '',
	hint,
	disable = false,
	readonly = false,
	className = '',
}: SInputProps) => {
	const [internalError, setInternalError] = useState<string | null>(null);


	// Validation function
  const validateInput = (inputValue: string) => {
    for (let rule of rules) {
      if (!rule.validate(inputValue)) {
        setInternalError(rule.message);
        return false;
      }
    }
    setInternalError(null);
    return true;
  };
	
	useEffect(() => {
		console.log('useEffect')
		if (rules.length > 0) {
			validateInput(value);
		}
	}, [value])

	return (
		<div className={["s-input", className].join(' ')}>
			<div className={["s-input__inner h-28pxr flex items-center", className].join(' ')}>
				{label && (
					<label
						htmlFor={label}
						className={[
							"leading-20pxr relative",
							useInsideLabel ? 'before:rounded-l-2pxr before:absolute before:w-full before:h-full before:top-0 before:left-0 before:contents-[""] before:border before:border-Grey_Lighten-1 before:border-r-0 px-12pxr py-4pxr bg-Grey_Lighten-5' : 'mr-12pxr'
						].join(' ')}
					>
						{label}
					</label>
				)}

				<div className={["s-input__inner relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:contents-[''] before:border h-full py-4pxr px-12pxr",
					useInsideLabel ? "before:rounded-r-2pxr" : "before:rounded-2pxr",
					!disable ? 'before:border-Grey_Lighten-1 hover:before:border-positive hover:before:shadow-input focus-within:before:border-positive focus-within:before:shadow-input before:pointer-events-none' : 'before:border-Grey_Lighten-2 text-Grey_Default bg-Grey_Lighten-5 cursor-not-allowed',
					internalError && rules.length > 0 && 'before:border-Red_Default',
					!internalError && rules.length > 0 && 'before:border-Green_Lighten-2',
				].join(' ')}>
					<input
						id={label}
						type={type}
						value={value}
						onChange={onChange}
						placeholder={placeholder}
						disabled={disable}
						readOnly={readonly}
						className={'border-none focus:outline-none leading-20pxr h-full placeholder:text-Grey_Lighten-1'}
					/>
				</div>

			</div>
			{/* Error message (internal or external) */}
      {(internalError || errorMessage) && (
        <p className="pt-8pxr px-12pxr text-red-600">
          {internalError || errorMessage}
        </p>
      )}
		</div>
 )
}

export default SInput;