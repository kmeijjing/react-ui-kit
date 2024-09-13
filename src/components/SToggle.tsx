import { useState, useEffect, ReactNode } from 'react';

export interface SToggleProps {
	type?: 'switch' | 'button';
	value: boolean;
	disabled?: boolean;
	label?: string;
	onChange?: (value: boolean) => void;
	className?: string;
	children?: ReactNode;
}

const SToggle = ({
	type = 'switch',
	value,
	disabled = false,
	onChange,
	label = '',
	className = '',
	children = 'toggle',
}: SToggleProps) => {
	const [isOn, setIsOn] = useState(value);

	const handleChange = () => {
		if (disabled) return;
		const newValue = !isOn;
		setIsOn(newValue);
		onChange?.(newValue);
	};

	useEffect(() => {
		setIsOn(value);
	}, [value]);

	const renderSwitchToggle = () => (
		<label
			htmlFor='s-toggle-switch'
			className={[
				's-toggle s-toggle__switch group relative inline-flex w-fit items-center justify-between',
				disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
				className,
			].join(' ')}
		>
			{label && <span className='toggle-label mr-16pxr'>{label}</span>}
			<input
				id='s-toggle-switch'
				type='checkbox'
				checked={isOn}
				onChange={handleChange}
				disabled={disabled}
				className='sr-only'
			/>
			<span
				className={[
					'toggle-slider block h-20pxr w-36pxr rounded-full transition-colors duration-150 ease-in-out',
					isOn ? 'bg-blue-500' : 'bg-Grey_Lighten-2',
				].join(' ')}
			>
				<span
					className={[
						'toggle-thumb absolute top-2/4 z-50 flex h-16pxr  w-16pxr -translate-y-2/4 rounded-full bg-white transition-transform duration-150 ease-in-out',
						!disabled &&
							'group-hover:before:absolute group-hover:before:bottom-0 group-hover:before:left-0 group-hover:before:right-0 group-hover:before:top-0 group-hover:before:z-0 group-hover:before:scale-150 group-hover:before:rounded-full group-hover:before:opacity-[0.12] group-hover:before:content-[""]',
						!disabled &&
							'group-hover:after:absolute group-hover:after:bottom-0 group-hover:after:left-0 group-hover:after:right-0 group-hover:after:top-0 group-hover:after:rounded-full group-hover:after:shadow group-hover:after:content-[""]',
						isOn
							? 'translate-x-18pxr group-hover:before:bg-white'
							: 'translate-x-2pxr group-hover:before:bg-black',
					].join(' ')}
					style={{
						boxShadow:
							'0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
					}}
				/>
			</span>
		</label>
	);

	const renderButtonToggle = () => (
		<label
			htmlFor='s-toggle-button'
			className={[
				's-toggle s-toggle__button relative inline-flex w-fit items-center justify-between',
				className,
			].join(' ')}
		>
			{label && <span className='toggle-label mr-16pxr'>{label}</span>}

			<input
				id='s-toggle-switch'
				type='checkbox'
				checked={isOn}
				onChange={handleChange}
				disabled={disabled}
				className='sr-only' // 화면에 보이지 않지만 스크린 리더가 접근할 수 있게 숨김
			/>

			<button
				className={[
					'flex h-28pxr w-fit items-center rounded-14pxr border px-12pxr',
					disabled
						? 'cursor-not-allowed border-Grey_Lighten-2 bg-Grey_Lighten-4 text-Grey_Default'
						: 'cursor-pointer bg-white',
					isOn
						? 'border-Blue_C_Default text-Blue_C_Default'
						: 'border-Grey_Default text-Grey_Darken-1',
					className,
				].join(' ')}
				onClick={handleChange}
				data-testid='children-content'
			>
				{children}
			</button>
		</label>
	);

	return type === 'switch' ? renderSwitchToggle() : renderButtonToggle();
};

export default SToggle;
