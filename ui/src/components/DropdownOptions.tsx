import { RefObject, useCallback, useRef } from 'react';
import { useDropdownPosition } from '../hooks/useDropdownPositon';

export interface DropdownOptionProps {
	label: string;
	value: string | number;
	disable?: boolean;
	display?: boolean;
}

interface DropdownOptionsProps {
	parentRef: RefObject<HTMLDivElement | HTMLButtonElement>;
	options: DropdownOptionProps[];
	onClick: (arg: DropdownOptionProps) => void;
}

const DropdownOptions = ({
	parentRef,
	options = [],
	onClick,
}: DropdownOptionsProps) => {
	const ulRef = useRef<HTMLUListElement>(null);

	const optionStyle = useDropdownPosition({
		parentRef,
		ulRef,
		maxHeight: 300, // 필요에 따라 값 변경 가능
		spacing: 4,
		viewportMargin: 12,
	});

	const handleOptionClick = useCallback(
		(e: React.MouseEvent, option: DropdownOptionProps) => {
			e.stopPropagation(); // 이벤트 전파 중단

			if (!option.disable) onClick?.(option);
		},
		[onClick]
	);

	return (
		<ul
			ref={ulRef}
			className='s-dropdown__options fixed z-[999] overflow-y-auto rounded-2pxr bg-white shadow-dropdownOptions'
			style={optionStyle}
		>
			{options.map(
				(opt, idx) =>
					opt.display !== false && (
						<li
							key={idx}
							className={[
								'px-12pxr py-4pxr text-Grey_Darken-4 hover:bg-Blue_C_Default hover:text-white aria-disabled:bg-white aria-disabled:text-Grey_Lighten-1',
								opt?.disable ? 'cursor-not-allowed' : 'cursor-pointer',
							].join(' ')}
							aria-disabled={opt.disable}
							onClick={(e) => handleOptionClick(e, opt)}
						>
							{typeof opt === 'string' ? (
								<div className='whitespace-nowrap'>{opt}</div>
							) : (
								<div
									dangerouslySetInnerHTML={{ __html: opt.label }}
									className='whitespace-nowrap'
								></div>
							)}
						</li>
					)
			)}
		</ul>
	);
};

export default DropdownOptions;
