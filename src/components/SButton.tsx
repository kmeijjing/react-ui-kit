import colors from '../css/colors.ts'
import Svg from './Svg.tsx'
export interface ButtonProps {
 /**
  * Button size
  */
 size?: 'xs' | 'sm' | 'md' | 'lg';
 /**
  * Button color
  * @description Changing background color without outline or text color with outline
  */
 color?: keyof typeof colors;
 /**
  * Use button hover
  */
 noHover?: boolean;
 /**
  * Button text
  */
 label?: string;
 /**
  * Click handler
  */
 onClick?: () => void;
 /**
  * Button className
  */
 className?: string;
 /**
  * Button type
  */
 type?: HTMLButtonElement['type'];
 /**
  * Button outline
  * @description Outline 'true' means changing the color of the text to the color you specified.
  */
 outline?: boolean;
 /**
  * Button icon
  * @description Icon type should be just string or svg file path.
  * @example 'M1.xxx xxxx.xxx@@fill:none&&M1.xxx xxxx.xxx@@stroke:currentColor' // Icon type string is such as
  * @example './assets/icons/icon.svg' // and other type is such as 
  */
 icon?: string;
 /**
  * Button disable
  */
 disabled?: boolean;
}

const SButton = ({
 label,
 size = 'sm',
 color = 'Blue_B_Default',
 outline = false,
 icon,
 disabled,
 noHover,
 className,
 ...props
}: ButtonProps) => {
 const argColor = colors[color] || color
 const propsColor = !outline ? `bg-[${argColor}] text-white` : `text-[${argColor}] border border-[${argColor}]`

 const propsSize = {
  xs: !icon ? 'px-2.5 py-0.5 text-base leading-6.5' : 'p-1.5',
  sm: !icon ? 'py-1.5 px-4 text-base leading-6.5' : 'p-2',
  md: !icon ? 'py-1.5 px-6.5 text-16 leading-8.5' : 'p-[0.751rem]',
  lg: !icon ? 'py-5.5 px-9.5 text-2xl leading-10' : 'p-[1.917rem]',
 }

 const disableClass = 'disabled:bg-Grey_Lighten-3 disabled:border disabled:border-Grey_Lighten-2 disabled:text-Grey_Default disabled:cursor-not-allowed'

 const iconMargin = {
  xs: 'mr-1.5',
  sm: 'mr-1.5',
  md: 'mr-2.5',
  lg: 'mr-4',
 }

 const iconClass = label ? iconMargin[size] : ''

 const hover = 'hover:overflow-hidden hover:relative hover:before:w-full hover:before:h-full hover:before:top-0 hover:before:left-0 hover:before:absolute'

 const hoverClass = !outline
  ? 'hover:before:bg-black hover:before:opacity-10'
  : `hover:before:bg-[${argColor}] hover:before:opacity-20`

 return (
  <button
   className={[
    's-button rounded-4 inline-flex items-center',
    propsColor,
    propsSize[size],
    disabled ? disableClass : !noHover ? `${hoverClass} ${hover}` : '',
    className,
   ].join(' ')}
   {...props}
   disabled={disabled}
  >
   {icon && (
    !icon.includes('.svg')
     ? <Svg svgString={icon} className={iconClass} />
     : <img className={iconClass} src={icon}></img>
   )}
   {label}
  </button>
 );
};

export default SButton