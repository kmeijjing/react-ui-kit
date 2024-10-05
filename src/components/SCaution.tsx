import { Warning24 } from '../assets/WarningIcon';

export interface CautionProps {
 messages: (string | Element)[];
 title?: string;
 className?: string;
 messageClassName?: string;
 useModal?: boolean;
}

const SCaution = ({
 messages = [],
 title = '주의사항',
 className = '',
 messageClassName = '',
 useModal = false,
}: CautionProps) => {
 return (
  <aside
   className={[
    'flex overflow-hidden',
    className,
    !useModal 
    ? 'min-w-1140pxr rounded-8pxr border border-Red_Lighten-3' : 'rounded-4pxr',
   ].join(' ')}
  >
   {!useModal && (
    <div className='inline-flex flex-col items-center justify-center text-white gap-2pxr bg-Red_Lighten-1 px-24pxr'>
     <Warning24 className='text-Red_Lighten-1' />
     <strong className='text-16pxr leading-26pxr'>{title}</strong>
    </div>
   )}
   <ul
    className={[
     'flex-1 bg-Red_Lighten-6 text-Grey_Darken-4',
     !useModal ? 'py-20pxr pl-36pxr pr-32pxr' : 'py-12pxr px-24pxr',
     messageClassName,
    ].join(' ')}
   >
    {messages.map((message, idx) => (
     <li
      key={idx}
      dangerouslySetInnerHTML={{ __html: message }}
      className={
       [
        'list-["-"]', 
        !useModal ? 'indent-12pxr' : 'indent-4pxr'
       ].join(' ')}
     ></li>
    ))}
   </ul>
  </aside>
 );
};

export default SCaution;
