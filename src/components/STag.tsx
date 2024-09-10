import colors from '../css/colors.ts';
import Svg from './Svg.tsx';

type Color =
 | 'grey'
 | 'red'
 | 'orange'
 | 'yellow'
 | 'green'
 | 'blue'
 | 'darkblue'
 | 'indigo';

export interface TagProps {
 label: string;
 color?: Color;
 icon?: string;
 round?: boolean;
 size?: 'sm' | 'md';
 /**
  * @description This property cannot be used with the property 'color'. 
  * @description This property must be used with the property 'bgColor'.
  */
 textColor?: keyof typeof colors;
 /**
  * @description This property cannot be used with the property 'color'. 
  * @description This property must be used with the property 'textColor'.
  */
 bgColor?: keyof typeof colors;
 className?: string;
}

const STag = ({
 color,
 icon = '',
 label = '',
 size = 'md',
 round = false,
 textColor,
 bgColor,
 className,
}: TagProps) => {
 const tagSize = {
  sm: 'py-1pxr px-2 text-11pxr leading-6 font-normal',
  md: 'py-2pxr px-8pxr font-bold text-base leading-20pxr',
 };

 const rounded = round ? 'rounded-20pxr' : 'rounded-4pxr';

 const fixColors = {
  grey: 'bg-Grey_Lighten-4 text-Grey_Darken-1',
  red: 'bg-Red_Lighten-6 text-Red_Lighten-1',
  orange: 'bg-Orange_Lighten-6 text-Orange_Default',
  yellow: 'bg-Yellow_Lighten-5 text-Yellow_Darken-2',
  green: 'bg-Green_Lighten-6 text-Green_Lighten-1',
  blue: 'bg-Blue_C_Lighten-6 text-Blue_C_Default',
  darkblue: 'bg-Blue_B_Lighten-6 text-Blue_B_Lighten-1',
  indigo: 'bg-Blue_C_Lighten-7 text-Blue_C_Darken-2',
 } as Record<Color, string>;

 const argTextColor = textColor ? colors[textColor] : ''
 const argBgColor = bgColor ? colors[bgColor] : ''
 const textColors = `text-[${argTextColor}]`
 const bgColors = `bg-[${argBgColor}]`

 return (
  <label
   className={[
    tagSize[size],
    rounded,
    'inline-flex gap-8pxr w-fit',
    color ? fixColors[color] : `${textColors} ${bgColors}`,
    className,
   ].join(' ')}
  >
   {icon &&
    (!icon.includes('.svg') ? (
     <Svg svgString={icon} />
    ) : (
     <img
      alt='tag_icon'
      src={icon}
     />
    ))}
   {label}
  </label>
 );
};

export default STag;
