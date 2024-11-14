import { useEffect, useState } from 'react';

const initParentDOMRect = {
	height: 0,
	width: 0,
	x: 0,
	y: 0,
	bottom: 0,
	left: 0,
	top: 0,
};

export interface DropdownOptionProps {
	label: string;
	value: string | number;
	disable?: boolean;
	display?: boolean;
}

interface DropdownOptionsProps {
	parentId: string;
	options: DropdownOptionProps[];
	onClick: (arg: DropdownOptionProps) => void;
}

const DropdownOptions = ({
	parentId = '',
	options = [],
	onClick,
}: DropdownOptionsProps) => {
	const [position, setPosition] =
		useState<Omit<DOMRect, 'toJSON' | 'right'>>(initParentDOMRect);

	useEffect(() => {
		const parent = document.getElementById(`s-dropdown--${parentId}`) || null;

		if (parent) {
			setPosition(parent.getBoundingClientRect());
		}
	}, [parentId]);

	return (
		<ul
			id={`s-dropdown__options--${parentId}`}
			className='bg-white s-dropdown__options rounded-2pxr shadow-dropdownOptions'
			style={{
				position: 'absolute',
				top: position.top + position.height + 4 + window.scrollY,
				left: position.left + window.scrollX,
				width: position.width,
			}}
		>
			{options.map(
				(opt, idx) =>
					(opt.display === undefined || opt.display) && (
						<li
							key={`s-dropdown__option--${idx}`}
							className={[
								'px-12pxr py-4pxr text-Grey_Darken-4 hover:bg-Blue_C_Default hover:text-white aria-disabled:bg-white aria-disabled:text-Grey_Lighten-1',
								opt?.disable ? 'cursor-not-allowed' : 'cursor-pointer',
							].join(' ')}
							aria-disabled={opt.disable}
							onClick={() => onClick(opt)}
						>
							{typeof opt === 'string' ? (
								<div>{opt}</div>
							) : (
								<div dangerouslySetInnerHTML={{ __html: opt.label }}></div>
							)}
						</li>
					)
			)}
		</ul>
	);
};

export default DropdownOptions;
