import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { createPortal } from 'react-dom';
import DropdownOptionsWithCheckbox, {
	type DropdownOptionProps,
} from './DropdownOptionsWithCheckbox.tsx';
export type Option = {
	label: string;
	value: string | number;
};

export interface SSelectCheckboxProps {
	options: DropdownOptionProps[];
	value: DropdownOptionProps[] | null;
	name?: string;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	onChange?: (selectedOptions: DropdownOptionProps[]) => void;
}

const SSelectCheckbox = ({
	options,
	value = [],
	name = 's-select-checkbox',
	label,
	placeholder = '선택',
	disabled = false,
	className = '',
	onChange,
}: SSelectCheckboxProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValues, setSelectedValues] = useState<DropdownOptionProps[]>(
		value as []
	);
	const sSelectCheckboxRef = useRef<HTMLDivElement | null>(null);

	const handleChange = (option: DropdownOptionProps) => {
		let updatedValues;
		if (selectedValues.some((item) => item.value === option.value)) {
			// 이미 선택된 옵션이면 제거
			updatedValues = selectedValues.filter((item) => item.value !== option.value);
		} else {
			// 선택되지 않은 옵션이면 추가
			updatedValues = [...selectedValues, option];
		}
		setSelectedValues(updatedValues);
		onChange?.(updatedValues);
	};

	const toggleDropdown = () => {
		if (disabled) return;
		setIsOpen((prev) => !prev);
	};

	const closeDropdown = useCallback(() => {
		setIsOpen(false);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const dropdownElement = document.getElementById(
				's-dropdown-options-with-checkbox'
			);
			if (
				sSelectCheckboxRef.current &&
				!sSelectCheckboxRef.current.contains(event.target as Node) &&
				dropdownElement &&
				!dropdownElement.contains(event.target as Node)
			) {
				closeDropdown();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, closeDropdown]);

	useEffect(() => {
		setSelectedValues(value as []);
	}, [value]);

	return (
		<div
			ref={sSelectCheckboxRef}
			className={[
				's-select relative flex h-28pxr flex-nowrap items-center  before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:z-10 before:border before:border-Grey_Lighten-1 before:content-[""]',
				disabled
					? 'cursor-not-allowed bg-Grey_Lighten-4 before:border-Grey_Lighten-2'
					: 'cursor-pointer bg-white before:border-Grey_Lighten-1',
				className,
			].join(' ')}
			onClick={toggleDropdown}
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
			<div className='s-select__content--container w-auto min-w-0 max-w-full flex-auto '>
				<div className='s-select__content overflow-hidden text-ellipsis whitespace-nowrap pl-12pxr'>
					{selectedValues.length === 0 ? (
						<span className='text-Grey_Lighten-1'>{placeholder}</span>
					) : (
						<span>{selectedValues.map((val) => val.label).join(', ')}</span>
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
					<DropdownOptionsWithCheckbox
						onClick={handleChange}
						parentRef={sSelectCheckboxRef}
						options={options}
						selected={selectedValues}
					/>,
					document.body
				)}
		</div>
	);
};

export default SSelectCheckbox;
