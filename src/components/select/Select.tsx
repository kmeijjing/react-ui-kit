import { useRef, useState } from 'react';
import { Dropdown12 } from '../../assets/DropdownIcon';

export interface SelectProps {
	selected: string;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
}

const Select = ({
	selected,
	placeholder = '선택',
	disabled = false,
	className = '',
}: SelectProps) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const selectRef = useRef<HTMLButtonElement>(null);

	return (
		<button
			ref={selectRef}
			className={[
				`s-select relative inline-block cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap border border-Grey_Lighten-1 py-4pxr pl-12pxr pr-20pxr text-start hover:bg-Grey_Lighten-5 disabled:cursor-not-allowed disabled:border-Grey_Lighten-2 disabled:bg-Grey_Lighten-4 disabled:text-Grey_Default`,
				className,
			].join(' ')}
			onClick={() => setIsDropdownOpen((previousStatus) => !previousStatus)}
			disabled={disabled}
		>
			{!selected ? placeholder : selected}
			<Dropdown12
				className={`absolute right-8pxr top-8pxr ${isDropdownOpen && 'rotate-180'}`}
				style={{ transition: 'transform 0.3s' }}
			/>
		</button>
	);
};

export default Select;
