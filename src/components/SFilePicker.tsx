import { MouseEvent, useEffect, useRef, useState } from 'react';
import { AttachFileIcon20 } from '../assets/AttachFileIcon';
import { Close12 } from '../assets/CloseIcon';

export interface SFilePickerProps {
	placeholder?: string;
	disabled?: boolean;
	clearable?: boolean;
	className?: string;
	onChange?: (value: File | null) => void;
}

const SFilePicker = ({
	placeholder = '파일을 선택해주세요.',
	disabled = false,
	clearable = false,
	className = '',
	onChange,
}: SFilePickerProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [file, setFile] = useState<File | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		console.log(event);
		console.log(file);
		if (file) {
			setFile(file);
			event.target.value = '';
		}
	};

	const handleClick = () => {
		if (!disabled && fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleClearable = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		if (!file) return;

		setFile(null);
	};

	useEffect(() => {
		onChange?.(file);
	}, [file, onChange]);

	return (
		<div
			data-testid='s-file-picker'
			className={[
				'before:contents-[""] relative flex h-28pxr w-fit min-w-128pxr flex-nowrap items-center gap-x-8pxr py-4pxr pl-8pxr pr-12pxr before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-2pxr before:border before:border-Grey_Lighten-1',
				disabled
					? 'cursor-not-allowed bg-Grey_Lighten-4'
					: 'cursor-pointer hover:bg-Grey_Lighten-5',
				className,
			].join(' ')}
			onClick={() => handleClick()}
		>
			<AttachFileIcon20 className=' min-w-20pxr text-Grey_Darken-1' />
			<span
				className={[
					'truncate text-12pxr',
					disabled
						? 'text-Grey_Default'
						: !file
							? 'text-Grey_Lighten-2'
							: 'text-Grey_Darken-5',
				].join(' ')}
			>
				{file?.name || placeholder}
			</span>

			{clearable && (
				<button
					type='button'
					title='clearable'
					className='z-10 ml-auto'
					onClick={(event) => handleClearable(event)}
				>
					<Close12 className='text-Grey_Default' />
				</button>
			)}

			<input
				type='file'
				title='file picker'
				hidden
				ref={fileInputRef}
				onChange={handleFileChange}
				disabled={disabled}
			/>
		</div>
	);
};

export default SFilePicker;
