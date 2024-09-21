import { useEffect, useState } from 'react';
type Value = boolean;

interface BaseToggleProps {
 label?: string;
 labelClass?: string;
 value: Value;
 onChange: (arg: Value) => void;
}

interface SwitchToggleProps extends BaseToggleProps {
 type?: 'switch';
}

interface ButtonToggleProps extends BaseToggleProps {
 /**
  * @description If you use the button type, you must need buttonLabel.
  */
 type: 'button';
 buttonLabel: string;
}

type ToggleProps = SwitchToggleProps | ButtonToggleProps;

const SToggle = ({
 label,
 onChange,
 value,
 type = 'switch',
 ...props
}: ToggleProps) => {
 const [isToggled, setIsToggled] = useState<Value>(false);

 useEffect(() => {
  setIsToggled(value);
 }, [value]);

 const handleToggle = () => {
  onChange(!isToggled);
 };

 return (
  <div className='flex items-center'>
   {label && <span className='mr-16pxr'>{label}</span>}
   {type === 'switch' ? (
    <div
     className={[
      'relative flex h-20pxr w-36pxr cursor-pointer items-center rounded-full p-2pxr transition-colors duration-300 ease-in-out',
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
   ) : (
    (() => {
     const buttonProps = props as ButtonToggleProps;
     return (
      <button
       onClick={handleToggle}
       className={[
        'relative rounded-14pxr px-12pxr py-4pxr leading-20pxr before:absolute before:w-full before:h-full before:left-0 before:top-0 before:rounded-14pxr before:border',
        isToggled
         ? 'text-Blue_C_Default before:border-Blue_C_Default'
         : 'text-Grey_Darken-1 before:border-Grey_Darken-1',
       ].join(' ')}
      >
       {buttonProps.buttonLabel}
      </button>
     );
    })()
   )}
  </div>
 );
};

export default SToggle;
