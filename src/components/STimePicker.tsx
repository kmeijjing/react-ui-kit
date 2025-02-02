import {
	ChangeEvent,
	KeyboardEvent,
	Fragment,
	useMemo,
	useRef,
	useState,
	useEffect,
} from 'react';
import SInput from './SInput';
import { ClockOutlineIcon16 } from '../assets/ClockOutlineIcon';
import { ArrowLeft12 } from '../assets/ArrowLeftIcon';
import DatePickerPortal from './datePicker/DatePickerPortal';

export interface STimePickerProps {
	value: string;
	disabled?: boolean;
	label?: string;
	useSeconds?: boolean;
	use24?: boolean;
	onChange?: (value: string) => void;
}

interface Time {
	hour: string;
	minute: string;
	second?: string;
	period?: Period | null;
}

type Period = 'AM' | 'PM';

const PERIOD: Period[] = ['AM', 'PM'];

const STimePicker = ({
	value,
	disabled = false,
	label,
	useSeconds = false,
	use24 = false,
	onChange,
}: STimePickerProps) => {
	const TIME: (keyof Time)[] = !useSeconds
		? ['hour', 'minute']
		: ['hour', 'minute', 'second'];

	const initialTime = useMemo(() => {
		const [hour, minute, second = '00'] = value
			.split(':')
			.map((v) => v.padStart(2, '0'));

		let newHour = hour;
		let period: Period | null = null;

		if (!use24) {
			const hourNum = Number(hour);
			period = hourNum > 12 ? 'PM' : 'AM';
			newHour = String(hourNum % 12 || 12).padStart(2, '0');
		}

		return {
			hour: newHour,
			minute,
			second: useSeconds ? second : '',
			period: period,
		};
	}, [use24, useSeconds, value]);

	const timePickerRef = useRef<HTMLDivElement>(null);
	const [timePickerRect, setTimePickerRect] = useState<DOMRect | null>(null);
	const [debouncedValue, setDebouncedValue] = useState<Time>(initialTime);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const updateTime = (type: keyof Time, direction: 'up' | 'down') => {
		const { hour, minute, second = '00', period } = debouncedValue;

		const increment = direction === 'up' ? 1 : -1;

		let newHour = Number(hour);
		let newMinute = Number(minute);
		let newSecond = Number(second);
		let newPeriod = period;

		switch (type) {
			case 'hour':
				newHour = (newHour + increment + (use24 ? 24 : 12)) % (use24 ? 24 : 12);

				if (!use24) {
					if (direction === 'up' && newHour === 0) {
						newHour = 12;
						newPeriod = newPeriod === 'AM' ? 'PM' : 'AM';
					} else if (direction === 'down' && newHour === 0) {
						newHour = 12;
					} else if (direction === 'down' && newHour === 11) {
						newPeriod = newPeriod === 'AM' ? 'PM' : 'AM';
					}
				}
				break;
			case 'minute':
				newMinute = (newMinute + increment + 60) % 60;

				if (newMinute === 0 && direction === 'up') {
					if (!use24) {
						newHour = (newHour + 1) % 12;
						if (newHour === 0) {
							newHour = 12;
							newPeriod = newPeriod === 'AM' ? 'PM' : 'AM';
						}
					} else {
						newHour = (newHour + 1) % 24;
					}
				}
				if (newMinute === 59 && direction === 'down') {
					if (!use24) {
						newHour = (newHour - 1 + 12) % 12;
						if (newHour === 0) {
							newHour = 12;
						}
						if (newHour === 11) {
							newPeriod = newPeriod === 'AM' ? 'PM' : 'AM';
						}
					} else {
						newHour = (newHour - 1 + 24) % 24;
					}
				}
				break;
			case 'second':
				newSecond = (newSecond + (direction === 'up' ? 1 : -1) + 60) % 60;

				newMinute =
					newMinute +
					(direction === 'up' && newSecond === 0
						? 1
						: direction === 'down' && newSecond === 59
							? -1
							: 0);

				newMinute = (newMinute + 60) % 60;

				newHour =
					newHour +
					(direction === 'up' && newMinute === 0 && newSecond === 0
						? 1
						: direction === 'down' && newMinute === 59 && newSecond === 59
							? -1
							: 0);

				if (!use24) {
					newHour = (newHour + 12) % 12;
					if (
						newHour === 0 &&
						newMinute === 0 &&
						newSecond === 0 &&
						direction === 'up'
					) {
						newHour = 12;
						newPeriod = newPeriod === 'AM' ? 'PM' : 'AM';
					} else if (newHour === 0) {
						newHour = 12;
					} else if (
						newHour === 11 &&
						newMinute === 59 &&
						newSecond === 59 &&
						direction === 'down'
					) {
						newPeriod = newPeriod === 'AM' ? 'PM' : 'AM';
					}
				}

				newHour = (newHour + 24) % 24;
				break;
		}

		setDebouncedValue(() => {
			const updated = {
				hour: String(newHour).padStart(2, '0'),
				minute: String(newMinute).padStart(2, '0'),
				second: useSeconds ? String(newSecond).padStart(2, '0') : '',
				period: use24 ? null : newPeriod,
			};

			return updated;
		});
	};

	const handleKeyDown = (
		event: KeyboardEvent<HTMLInputElement>,
		type: keyof Time
	) => {
		if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			updateTime(type, event.key === 'ArrowUp' ? 'up' : 'down');
		}
	};

	const handleInput = (
		event: ChangeEvent<HTMLInputElement>,
		type: keyof Time
	) => {
		let rawValue = event.target.value;

		// 허용 범위를 벗어나면 빈 값 처리
		if (type === 'hour') {
			const maxHours = use24 ? 23 : 12;
			if (rawValue && (Number(rawValue) > maxHours || Number(rawValue) < 0)) {
				rawValue = '';
			}
		} else if (type === 'minute' || type === 'second') {
			if (rawValue && (Number(rawValue) > 59 || Number(rawValue) < 0)) {
				rawValue = '';
			}
		}

		setDebouncedValue((prev) => {
			const updated = {
				...prev,
				[type]: rawValue,
			};

			return updated;
		});
	};

	const handleChangeAmPm = (period: Period) => {
		if (!use24 && debouncedValue.period !== period) {
			setDebouncedValue((prev) => ({
				...prev,
				period: period,
			}));
		}
	};

	useEffect(() => {
		const handler = setTimeout(() => {
			let hourIn24 = debouncedValue.hour;

			if (!use24) {
				if (debouncedValue.period === 'PM') {
					hourIn24 = String((Number(debouncedValue.hour) + 12) % 24).padStart(
						2,
						'0'
					);
				}

				if (hourIn24 === '12' && debouncedValue.period === 'AM') {
					hourIn24 = '00';
				}
			}

			const time = useSeconds
				? `${hourIn24}:${debouncedValue.minute}:${debouncedValue.second}`
				: `${hourIn24}:${debouncedValue.minute}`;
			onChange?.(time);
		}, 500);

		return () => clearTimeout(handler);
	}, [debouncedValue, use24, useSeconds, onChange]);

	useEffect(() => {
		if (timePickerRef.current) {
			setTimePickerRect(timePickerRef.current.getBoundingClientRect());
		}
	}, [isOpen]);

	return (
		<>
			<div
				ref={timePickerRef}
				data-testid='s-time-picker'
				className='w-fit'
				onClick={() => {
					if (disabled) return;
					setIsOpen((prev) => !prev);
				}}
			>
				<SInput
					useInsideLabel
					label={label}
					value={`${!use24 ? `${debouncedValue.period === 'AM' ? '오전 ' : '오후 '}` : ''}${useSeconds ? [debouncedValue.hour, debouncedValue.minute, debouncedValue.second].join(':') : [debouncedValue.hour, debouncedValue.minute].join(':')}`}
					readonly
					disable={disabled}
					prepend={<ClockOutlineIcon16 className='text-Grey_Darken-1' />}
					inputContainerClassName='px-8pxr'
					inputClassName='w-106pxr text-center'
				/>
			</div>

			<DatePickerPortal
				parentRect={timePickerRect}
				parentRef={timePickerRef}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			>
				<div className='flex w-fit flex-nowrap rounded-8pxr shadow-dropdownOptions'>
					{!use24 && (
						<div className='flex flex-col gap-y-8pxr px-24pxr py-30pxr'>
							{PERIOD.map((period) => (
								<button
									key={period}
									type='button'
									className={[
										'h-28pxr w-45pxr rounded-4pxr',
										debouncedValue.period === period
											? 'bg-positive text-white'
											: 'relative text-Grey_Darken-2 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-4pxr before:border before:border-Grey_Default before:content-[""]',
									].join(' ')}
									onClick={() => handleChangeAmPm(period)}
								>
									{period === 'AM' ? '오전' : '오후'}
								</button>
							))}
						</div>
					)}

					<div className='h-124pxr w-1pxr bg-Grey_Lighten-4'></div>

					<div className='flex flex-nowrap items-center gap-x-9pxr p-24pxr'>
						{TIME.map((type, index) => (
							<Fragment key={index}>
								{index !== 0 && <span className=''>:</span>}

								<div className='flex flex-col items-center gap-y-12pxr'>
									<button
										title={`${type}_up`}
										type='button'
										onClick={() => updateTime(type, 'up')}
									>
										<ArrowLeft12 className='rotate-90 text-Grey_Lighten-2' />
									</button>

									<div className='relative h-28pxr w-38pxr text-center before:pointer-events-none before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-4pxr before:border before:border-Grey_Lighten-1 before:content-[""] focus-within:before:border-positive focus-within:before:shadow-input hover:before:border-positive hover:before:shadow-input'>
										<input
											title={`${type}-input`}
											type='text'
											value={debouncedValue[type] || ''}
											placeholder='00'
											className='h-full w-full border-none text-center placeholder:text-Grey_Lighten-1 focus:outline-none'
											onKeyDown={(event) => handleKeyDown(event, type)}
											onChange={(event) => handleInput(event, type)}
										/>
									</div>

									<button
										type='button'
										title={`${type}_down`}
										onClick={() => updateTime(type, 'down')}
									>
										<ArrowLeft12 className='-rotate-90 text-Grey_Lighten-2' />
									</button>
								</div>
							</Fragment>
						))}
					</div>
				</div>
			</DatePickerPortal>
		</>
	);
};

export default STimePicker;
