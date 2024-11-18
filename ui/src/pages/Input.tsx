import React, { ChangeEvent, useState } from 'react';
import SInput from '../components/SInput';
import SButton from '../components/SButton';

const Input = () => {
	const [inputValue, setInputValue] = useState('');

	const [formData, setFormData] = useState<Record<string, any>[]>([
		{
			label: 'AAA',
			useInsideLabel: true,
			value: '',
			rules: [
				{ message: 'AAA is required.', validate: (value: string) => !!value },
			],
			hint: 'aaa',
			labelClassName: 'w-50pxr',
			placeholder: 'AAA',
			error: '',
		},
		{
			label: 'BBB',
			useInsideLabel: true,
			value: '',
			rules: [
				{ message: 'BBB is required.', validate: (value: string) => !!value },
			],
			hint: 'bbb',
			labelClassName: 'w-50pxr',
			placeholder: 'BBB',
			error: '',
		},
		{
			label: 'CCC',
			useInsideLabel: true,
			value: '',
			rules: [
				{ message: 'CCC is required.', validate: (value: string) => !!value },
			],
			hint: 'ccc',
			labelClassName: 'w-50pxr',
			placeholder: 'CCC',
			error: '',
		},
	]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
		const newFormData = [...formData]; // 기존 상태 복사
		newFormData[idx].value = e.target.value; // 특정 인덱스의 value 업데이트
		setFormData(newFormData); // 상태 업데이트
	};

	function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
		evt.preventDefault();

		formData.forEach((data) => {
			data.rules.forEach((rule: { validate: (arg: any) => any; message: any }) => {
				if (!rule.validate(data.value)) {
					data.error = rule.message;
				} else {
					data.error = '';
				}
			});
		});
	}

	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>Input</b>
			</div>
			<form onSubmit={handleSubmit}>
				{formData.map((data, idx) => (
					<SInput
						key={idx}
						value={data.value}
						label={data.label}
						useInsideLabel={data.useInsideLabel}
						labelClassName={data.labelClassName}
						placeholder={data.placeholder}
						onChange={(e) => handleInputChange(e, idx)}
					/>
				))}
				<SButton
					label='submit'
					type='submit'
				/>
			</form>

			<SInput
				value={inputValue}
				placeholder='키워드를 입력해주세요.'
				onChange={(evt) => setInputValue(evt.target.value)}
				useInsideLabel
				label='useRealTimeRules'
				useRealTimeRules
				hint='최소 5글자 이상'
				rules={[
					{
						validate: (value) => !!value,
						message: '키워드를 입력해주세요.',
					},
					{
						validate: (value) => value.length >= 5,
						message: 'Must be at least 5 characters',
					},
				]}
			/>

			<SInput
				value={inputValue}
				placeholder='키워드를 입력해주세요.'
				onChange={(evt) => setInputValue(evt.target.value)}
				useInsideLabel
				label='label'
				hint='최소 5글자 이상'
				rules={[
					{
						validate: (value) => !!value,
						message: '키워드를 입력해주세요.',
					},
					{
						validate: (value) => value.length >= 5,
						message: 'Must be at least 5 characters',
					},
				]}
			/>

			<SInput
				value={inputValue}
				type='password'
				placeholder='키워드를 입력해주세요.'
				onChange={(evt) => setInputValue(evt.target.value)}
			/>
		</div>
	);
};

export default Input;
