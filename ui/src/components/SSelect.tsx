import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { createPortal } from 'react-dom';
import DropdownOptions, {
	type DropdownOptionProps,
} from './DropdownOptions.tsx';
export type Option = {
	label: string;
	value: string | number;
};

export interface SSelectProps {
	options: DropdownOptionProps[];
	value: DropdownOptionProps | null;
	name?: string;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	onChange?: (option: DropdownOptionProps) => void;
}

const SSelect = ({
	options,
	value,
	name = 's-select',
	label,
	placeholder = '선택',
	disabled = false,
	className = '',
	onChange,
}: SSelectProps) => {
	const id = useId();
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState(value);
	const sSelectRef = useRef<HTMLDivElement | null>(null);

	const handleChange = (option: DropdownOptionProps) => {
		setSelectedValue(option);
		setIsOpen((prev) => !prev);
		onChange?.(option);
	};

	const handleToggleDropdown = () => {
		if (disabled) return;
		setIsOpen((prev) => !prev);
	};

	const handleClickOutSide = useCallback(
		(e: MouseEvent) => {
			const dropdownElement = document.getElementById(
				`s-dropdown__options--s-select--${id}`
			);

			if (
				sSelectRef.current &&
				!sSelectRef.current.contains(e.target as Node) &&
				dropdownElement &&
				!dropdownElement.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		},
		[id]
	);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutSide);
		} else {
			document.removeEventListener('mousedown', handleClickOutSide);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutSide);
		};
	}, [isOpen, handleClickOutSide]);

	useEffect(() => {
		setSelectedValue(value);
	}, [value]);

	return (
		<div
			id={`s-select--${id}`}
			className={[
				's-select relative flex h-28pxr w-full flex-nowrap items-center  before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:z-10 before:border before:border-Grey_Lighten-1 before:content-[""]',
				disabled
					? 'cursor-not-allowed bg-Grey_Lighten-4 before:border-Grey_Lighten-2'
					: 'cursor-pointer bg-white before:border-Grey_Lighten-1',
				className,
			].join(' ')}
			ref={sSelectRef}
			onClick={handleToggleDropdown}
		>
			{label && (
				<label
					htmlFor={name}
					className={[
						's-select__prepend full-height relative z-0 flex h-full items-center whitespace-nowrap border-r bg-Grey_Lighten-5 px-12pxr',
						disabled ? 'border-Grey_Lighten-2' : 'border-Grey_Lighten-1',
					].join(' ')}
				>
					{label}
				</label>
			)}
			<div className='s-select__content--container w-auto min-w-0 max-w-full flex-auto overflow-hidden text-ellipsis whitespace-nowrap'>
				<div className='s-select__content pl-12pxr'>
					{!selectedValue ? (
						<span className='text-Grey_Lighten-1'>{placeholder}</span>
					) : (
						<span>{selectedValue.label}</span>
					)}
				</div>
			</div>
			<div className='s-select__append px-8pxr'>
				<Icon
					name='ArrowDown_12'
					color='Grey_Default'
				/>
			</div>
			{isOpen &&
				createPortal(
					<DropdownOptions
						onClick={handleChange}
						parentId={`s-select--${id}`}
						options={options}
					/>,
					document.body
				)}
		</div>
	);
};

export default SSelect;
