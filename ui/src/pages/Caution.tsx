import SCaution from '../components/SCaution';

const Caution = () => {
	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>Caution</b>
			</div>
			<div className='inline-flex items-center gap-8pxr'>
				<SCaution
					messages={[
						'Pizza ipsum dolor meat lovers buffalo.',
						'Platter pork NY pizza pizza steak beef dolor sautéed fresh.',
						'Extra Philly green platter red pork ipsum broccoli bbq Chicago.',
						'Party ham and string pepperoni pineapple broccoli extra.',
						'Pork tomato chicken bacon ham anchovies.',
						'Bacon mouth personal pineapple pork extra.',
						'Pineapple fresh pie bbq fresh pizza pizza meat.',
						'Style Hawaiian ricotta spinach burnt ham wing green mayo.',
					]}
				/>
			</div>
		</div>
	);
};

export default Caution;
