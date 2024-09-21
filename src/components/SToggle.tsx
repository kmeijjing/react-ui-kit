import { useEffect, useState } from 'react';

type Value = boolean

interface ToggleProps {
	label?: string;
 labelClass?: string;
 value: Value;
	onChange: (arg: Value) => void;
}

const SToggle = ({ label, onChange, value }: ToggleProps) => {
	const [isToggled, setIsToggled] = useState<Value>(false);

 useEffect(()=> {
  setIsToggled(value)
 }, [value])

	const handleToggle = () => {
  onChange(!isToggled)
	};

	return (
		<div className='flex items-center'>
			<span className='mr-16pxr'>{label}</span>
			<div
				className={[
					'relative flex w-36pxr h-20pxr cursor-pointer items-center rounded-full p-2pxr transition-colors duration-300 ease-in-out',
					isToggled ? 'bg-Blue_C_Default' : 'bg-Grey_Lighten-2',
				].join(' ')}
				onClick={handleToggle}
			>
				<span
					className={[
						'h-16pxr w-16pxr transform rounded-full bg-white shadow-md duration-300 ease-in-out',
						isToggled ? 'translate-x-16pxr' : 'translate-x-0',
					].join(' ')}
				></span>
			</div>
		</div>
	);
};

export default SToggle;
