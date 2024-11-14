import { ReactNode, useState, useEffect, useRef } from 'react';
import { Close12 } from '../assets/CloseIcon';

export interface SChipProps {
	value: boolean;
	rounded?: boolean;
	clickable?: boolean;
	removable?: boolean;
	useInput?: boolean;
	inputValue?: string;
	onRemove?: () => void;
	onInput?: (value: string) => void;
	children?: ReactNode;
	className?: string;
}

const SChip = ({
	value,
	rounded = false,
	clickable = false,
	removable = false,
	useInput = false,
	inputValue = '',
	onRemove,
	onInput,
	children,
	className = '',
}: SChipProps) => {
	const [isVisible, setIsVisible] = useState(value);
	const [content] = useState(inputValue);
	const chipRef = useRef<HTMLSpanElement | null>(null);

	const handleRemove = () => {
		if (removable) {
			setIsVisible(false);
			onRemove?.();
		}
	};

	const handleInput = () => {
		if (useInput && onInput && chipRef.current) {
			onInput(chipRef.current.textContent || '');
		}
	};

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
		if ((useInput && e.key === 'Enter') || e.key === 'Escape') {
			e.preventDefault();
			chipRef.current?.blur();
		}
	};

	// inputValue prop이 변경될 때만 contentEditable 요소의 내용을 업데이트
	useEffect(() => {
		if (
			useInput &&
			chipRef.current &&
			inputValue !== chipRef.current.textContent
		) {
			chipRef.current.textContent = inputValue;

			// 커서 위치를 끝으로 이동
			const range = document.createRange();
			const sel = window.getSelection();
			range.selectNodeContents(chipRef.current);
			range.collapse(false);
			sel?.removeAllRanges();
			sel?.addRange(range);
		}
	}, [inputValue, useInput]);

	if (!isVisible) return null;

	return (
		<>
			{isVisible && (
				<div
					className={[
						's-chip flex h-24pxr w-fit items-center border  border-Grey_Default bg-white px-8pxr text-Grey_Darken-4 hover:bg-Grey_Lighten-5',
						`${rounded ? 'rounded-14pxr' : 'rounded-4pxr'}`,
						`${useInput ? 'cursor-text' : clickable ? 'cursor-pointer' : 'cursor-default'}`,
						className,
					].join(' ')}
				>
					{useInput ? (
						<span
							className='chip-input outline-none'
							ref={chipRef}
							role='textbox'
							contentEditable
							suppressContentEditableWarning
							onInput={handleInput}
							onKeyDown={handleInputKeyDown}
						>
							{content}
						</span>
					) : (
						children
					)}

					{removable && (
						<Close12
							className='close-btn ml-4pxr cursor-pointer text-Grey_Default'
							data-testid='close-btn'
							onClick={handleRemove}
						/>
					)}
				</div>
			)}
		</>
	);
};

export default SChip;
