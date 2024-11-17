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
	parentId,
	options = [],
	onClick,
}: DropdownOptionsProps) => {
	const [position, setPosition] =
		useState<Omit<DOMRect, 'toJSON' | 'right'>>(initParentDOMRect);

	const handleOptionClick = (
		e: React.MouseEvent,
		option: DropdownOptionProps
	) => {
		e.stopPropagation(); // 이벤트 전파 중단
		onClick(option);
	};

	useEffect(() => {
		const parent = document.getElementById(parentId);

		const updatePosition = () => {
			if (parent) {
				const parentRect = parent.getBoundingClientRect();
				setPosition(parentRect);
			}
		};

		// 초기 위치 설정
		updatePosition();

		// 스크롤 이벤트 리스너 추가
		window.addEventListener('scroll', updatePosition, true);
		window.addEventListener('resize', updatePosition);

		return () => {
			window.removeEventListener('scroll', updatePosition, true);
			window.removeEventListener('resize', updatePosition);
		};
	}, [parentId]);

	if (!position) return null;

	return (
		<ul
			id={`s-dropdown__options--${parentId}`}
			className='s-dropdown__options z-[999] rounded-2pxr bg-white shadow-dropdownOptions'
			style={{
				position: 'fixed',
				top: position.bottom + 4 + window.scrollY,
				left: position.left + window.scrollX,
				minWidth: position.width,
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
