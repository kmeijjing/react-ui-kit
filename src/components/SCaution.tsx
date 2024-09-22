import { Warning24 } from '../assets/WarningIcon';

interface CautionProps {
	messages: (string | Element)[];
	title?: string;
}

const SCaution = ({ messages, title = '주의사항' }: CautionProps) => {
	return (
		<aside className='rounded-8pxr border border-Red_Lighten-3 flex overflow-hidden min-w-1140pxr'>
			<div className='bg-Red_Lighten-1 text-white px-24pxr inline-flex flex-col justify-center items-center gap-2pxr'>
				<Warning24 className='text-Red_Lighten-1' />
    <strong className='text-16pxr leading-26pxr'>{title}</strong>
			</div>
			<ul className='bg-Red_Lighten-6 text-Grey_Darken-4 pl-36pxr pr-32pxr py-20pxr flex-1'>
				{messages.map((message, idx) => (
					<li
						key={idx}
						dangerouslySetInnerHTML={{ __html: message }}
      className='list-["-"] indent-12pxr'
					></li>
				))}
			</ul>
		</aside>
	);
};

export default SCaution;
