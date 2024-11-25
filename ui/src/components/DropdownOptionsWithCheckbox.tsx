import { RefObject, useRef } from 'react';
import { useDropdownPosition } from '../hooks/useDropdownPositon';
import SCheckbox from '@/components/SCheckbox';

export interface DropdownOptionProps {
	label: string;
	value: string | number;
	disable?: boolean;
	display?: boolean;
}

interface DropdownOptionsProps {
	parentRef: RefObject<HTMLDivElement | HTMLButtonElement>;
	options: DropdownOptionProps[];
	selected: DropdownOptionProps[];
	onClick: (arg: DropdownOptionProps) => void;
}

const DropdownOptions = ({
	parentRef,
	options = [],
	selected = [],
	onClick,
}: DropdownOptionsProps) => {
	const ulRef = useRef<HTMLUListElement>(null);

	const optionStyle = useDropdownPosition({
		parentRef,
		ulRef,
	});

	return (
		<ul
			id='s-dropdown-options-with-checkbox'
			ref={ulRef}
			className='s-dropdown-options-with-checkbox fixed z-[999] overflow-y-auto rounded-2pxr bg-white shadow-dropdownOptions'
			style={optionStyle}
		>
			{options
				.filter((opt) => opt.display !== false)
				.map((opt, idx) => (
					<li
						key={idx}
						className={[
							'px-12pxr py-4pxr text-Grey_Darken-4 hover:bg-Blue_C_Default hover:text-white aria-disabled:bg-white aria-disabled:text-Grey_Lighten-1',
							opt?.disable ? 'cursor-not-allowed' : 'cursor-pointer',
						].join(' ')}
						aria-disabled={opt.disable}
						onClick={(e) => {
							e.stopPropagation();
							if (!opt.disable) onClick(opt);
						}}
					>
						<SCheckbox
							label={opt.label}
							checked={selected.some((item) => item.value === opt.value)}
							disabled={opt.disable}
							className='pointer-events-none'
						/>
					</li>
				))}
		</ul>
	);
};

export default DropdownOptions;
