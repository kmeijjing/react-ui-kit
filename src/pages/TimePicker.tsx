import { useState } from 'react';
import STimePicker from '../components/STimePicker';

const TimePicker = () => {
	const [time, setTime] = useState('23:59');
	const handleChange = (value: string) => {
		setTime(value);
	};
	return (
		<div className='flex flex-col gap-y-12pxr'>
			<strong>{time}</strong>
			<STimePicker
				value={time}
				onChange={handleChange}
			/>
			<STimePicker
				value={time}
				useSeconds
				disabled
				// onChange={handleChange}
			/>
			<STimePicker
				value={time}
				use24
				// onChange={handleChange}
			/>
		</div>
	);
};

export default TimePicker;
