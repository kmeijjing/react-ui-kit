import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Check12 } from '../assets/icons';

export interface CheckboxProps {
	label?: string;
	disabled?: boolean;
	checked: boolean | (string | number)[];
	val?: string | number;
	className?: string;
	onChange?: (checked: boolean | (string | number)[]) => void;
}

const SCheckbox = ({
	label,
	disabled = false,
	checked,
	val,
	className,
	onChange,
}: CheckboxProps) => {
	const [internalChecked, setInternalChecked] = useState<boolean>(
		Array.isArray(checked) ? checked.includes(val!) : checked
	);

	useEffect(() => {
		setInternalChecked(Array.isArray(checked) ? checked.includes(val!) : checked);
	}, [checked, val]);

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (disabled) return;

		const isChecked = event.target.checked;
		let newChecked: boolean | (string | number)[] = isChecked;

		if (val !== undefined) {
			if (Array.isArray(checked)) {
				newChecked = isChecked
					? [...new Set([...checked, val])]
					: checked.filter((item) => item !== val);
				console.log('newChecked : ', newChecked);
			} else {
				newChecked = isChecked ? [val] : [];
			}
		}

		setInternalChecked(Array.isArray(newChecked) ? newChecked.includes(val!) : !!newChecked);
		onChange?.(newChecked);
	};

	const checkboxClass = clsx(
		's-checkbox flex items-center',
		disabled ? '!cursor-not-allowed' : 'cursor-pointer',
		className
	);

	const checkmarkClass = clsx(
		'bg-wthie bw-1 relative mr-8 flex h-16 w-16 items-center justify-center rounded-2 border-1 border-Grey_Default transition-all duration-200',
		internalChecked && !disabled && 'border-positive bg-positive text-white',
		disabled && '!border-Grey_Lighten-2 !bg-Grey_Lighten-4 !text-Grey_Default',
		!internalChecked && !disabled && 'hover:!border-positive hover:!bg-Blue_B_Lighten-5'
	);

	return (
		<label className={checkboxClass}>
			<input
				type='checkbox'
				checked={internalChecked}
				disabled={disabled}
				className='hidden'
				onChange={handleCheckboxChange}
			/>
			<span className={clsx(checkmarkClass)}>{internalChecked && <Check12 />}</span>
			<span className='leading-20'>{label}</span>
		</label>
	);
};

export default SCheckbox;
