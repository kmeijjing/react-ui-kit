import { useEffect, useRef, useState } from 'react';

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
	onClick: (arg?: DropdownOptionProps) => void;
}

const DropdownOptions = ({ parentId = '', options = [], onClick }: DropdownOptionsProps) => {
	const [position, setPosition] = useState<Omit<DOMRect, 'toJSON' | 'right'>>(initParentDOMRect);
	const dropdownRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const parent = document.getElementById(`s-dropdown--${parentId}`) || null;

		if (parent) {
			setPosition(parent.getBoundingClientRect());
		}
	}, [parentId]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				onClick();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dropdownRef, onClick]);

	return (
		<ul
			id={`s-dropdown__options--${parentId}`}
			className='shadow-dropdownOptions py-1.5 round-2 bg-white'
			style={{
				position: 'absolute',
				top: position.top + position.height + 5,
				left: position.left,
				width: position.width,
			}}
			ref={dropdownRef}
		>
			{options.map(
				(opt, idx) =>
					(opt.display === undefined || opt.display) && (
						<li
							key={`s-dropdown__option--${idx}`}
							className={[
								'py-1.5 px-4 text-Grey_Darken-4 hover:bg-Grey_Lighten-5 aria-disabled:text-Grey_Lighten-1 aria-disabled:bg-white',
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
