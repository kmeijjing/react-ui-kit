import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Check12, Minus8 } from '../assets/icons';

export interface CheckboxProps {
	label?: string;
	disabled?: boolean;
	checked: boolean;
	className?: string;
	multi?: boolean;
	onChange?: (checked: boolean) => void;
}

const SCheckbox = ({
	label,
	disabled = false,
	checked,
	multi = false,
	className,
	onChange,
}: CheckboxProps) => {
	const [internalChecked, setInternalChecked] = useState(checked);

	useEffect(() => {
		setInternalChecked(checked);
	}, [checked]);

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (disabled) return;
		const isChecked = event.target.checked;
		setInternalChecked(isChecked);
		if (onChange) {
			onChange(isChecked);
		}
	};

	const checkboxClass = clsx(
		's-checkbox flex items-center',
		disabled ? '!cursor-not-allowed' : 'cursor-pointer',
		className
	);

	const checkmarkClass = clsx(
		'w-16 h-16 bg-wthie border-1 bw-1 border-Grey_Default rounded-2 transition-all duration-200 mr-8 relative flex justify-center items-center',
		internalChecked && !disabled && 'bg-positive border-positive text-white',
		disabled && '!bg-Grey_Lighten-4 !border-Grey_Lighten-2 !text-Grey_Default',
		!internalChecked && !disabled && 'hover:!bg-Blue_B_Lighten-5 hover:!border-positive'
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
			<span className={clsx(checkmarkClass)}>
				{internalChecked && !multi && <Check12 />}
				{internalChecked && multi && <Minus8 />}
			</span>
			<span className='leading-20'>{label}</span>
		</label>
	);
};

export default SCheckbox;
