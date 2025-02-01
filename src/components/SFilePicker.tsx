import { useEffect, useRef, useState } from 'react';
import { AttachFileIcon20 } from '../assets/AttachFileIcon';

export interface SFilePickerProps {
	placeholder?: string;
	disabled?: boolean;
	onChange?: (value: File | null) => void;
}

const SFilePicker = ({
	placeholder = '파일을 선택해주세요.',
	disabled,
	onChange,
}: SFilePickerProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [file, setFile] = useState<File | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setFile(file);
		}
	};

	const handleClick = () => {
		if (!disabled && fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	useEffect(() => {
		onChange?.(file);
	}, [file, onChange]);

	return (
		<div
			className={[
				'before:contents-[""] relative flex h-28pxr w-fit min-w-128pxr flex-nowrap items-center gap-x-8pxr py-4pxr pl-8pxr pr-12pxr before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-2pxr before:border before:border-Grey_Lighten-1',
				disabled
					? 'cursor-not-allowed bg-Grey_Lighten-4'
					: 'cursor-pointer hover:bg-Grey_Lighten-5',
			].join(' ')}
			onClick={() => handleClick()}
		>
			<AttachFileIcon20 className=' text-Grey_Darken-1' />
			<span
				className={[
					'textEllipsis text-12pxr',
					disabled
						? 'text-Grey_Default'
						: !file
							? 'text-Grey_Lighten-2'
							: 'text-Grey_Darken-5',
				].join(' ')}
			>
				{file?.name || placeholder}
			</span>
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
