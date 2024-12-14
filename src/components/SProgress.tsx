import { useEffect, useMemo, useState } from 'react';
import colors from '../css/colors';

const SProgress = ({
	percent = 0,
	state = 'active',
	label,
	className = '',
}: {
	className?: string;
	percent?: number;
	label?: string;
	state?: 'active' | 'error' | 'success';
}) => {
	const [percentValue, setPercentValue] = useState<number>(0);

	const getProgressBgColor = useMemo(() => {
		if (state === 'active') {
			return 'Blue_C_Default';
		} else if (state === 'error') {
			return 'Red_Lighten-1';
		} else if (state === 'success') {
			return 'Green_Lighten-1';
		}
		return 'Blue_C_Default';
	}, [state]);

	const getTextColor = useMemo(() => {
		if (percentValue > 50) {
			return 'text-white';
		}

		return 'text-Grey_Lighten-1';
	}, [percentValue]);

	const getProgressWidth = useMemo(() => {
		return percentValue + '%';
	}, [percentValue]);

	useEffect(() => {
		setPercentValue(percent);
	}, [percent]);

	return (
		<div className={['', className].join(' ')}>
			<div
				className={[
					'relative flex h-20pxr w-full items-center justify-center rounded-4pxr bg-Grey_Lighten-4',
				].join(' ')}
			>
				<b className={['z-10', getTextColor].join(' ')}>{percentValue} %</b>

				<div
					className={['absolute left-0 top-0 h-full rounded-4pxr'].join(' ')}
					style={{
						width: getProgressWidth,
						background: colors[getProgressBgColor],
					}}
				></div>
			</div>

			<div className='leaindg-20pxr mt-16pxr text-center'>{label}</div>
		</div>
	);
};

export default SProgress;
