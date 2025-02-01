import SFilePicker from '../components/SFilePicker';

const FilePicker = () => {
	return (
		<>
			<SFilePicker />
			<SFilePicker
				disabled
				placeholder='긴파일을 선택해주세요. 긴파일을 선택해주세요. 긴파일을 선택해주세요.'
			/>
		</>
	);
};

export default FilePicker;
