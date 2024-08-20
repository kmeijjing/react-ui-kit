import { useState } from 'react';
import './css/App.css';
import SCheckbox from './components/SCheckbox';

function App() {
	const checkboxes = [
		{
			label: 'checkbox1',
			value: '1',
   disabled: true,
		},
		{
			label: 'checkbox2',
			value: '2',
		},
	];
	const [checked, setChecked] = useState<Record<string, boolean | null>>({});

	return (
		<>
			<main>
				{checkboxes.map((item) => (
					<SCheckbox
						label={item.label}
						value={item.value}
						key={item.value}
      disabled={item.disabled || false}
						onClick={(val) =>
							setChecked((prev) => {
								return { ...prev, [item.value]: val };
							})
						}
						checked={checked[item.value]}
					/>
				))}
			</main>
		</>
	);
}

export default App;
