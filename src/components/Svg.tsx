interface SvgProps {
 svgString: string;
 className: string;
}

const Svg = ({ svgString, ...props }: SvgProps) => {
 if (!svgString) {
  return
 }

 // Split the string to get the paths and attributes, and the viewBox
 const [pathsAndAttributes, viewBox] = svgString.split('|');
 const width = viewBox.split(' ')[2]
 const height = viewBox.split(' ')[3]

 // Split the paths and their attributes
 const paths = pathsAndAttributes.split('&&').map((pathString) => {
  const [d, attributesString] = pathString.split('@@');
  const attributes = attributesString.split(';').reduce((acc, attribute) => {
   const [key, value] = attribute.split(':');

   if (key || value) {
    const trimAttrKey = key.trim()
    const attrKey = trimAttrKey.includes('-')
     ? trimAttrKey.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()) // react attributes 카멜케이스로 변환
     : trimAttrKey
    acc[attrKey] = value.trim();
   }

   return acc;
  }, {} as Record<string, string>);
  return { d, attributes };
 });

 return (
  <svg
   width={width}
   height={height}
   viewBox={viewBox}
   xmlns="http://www.w3.org/2000/svg"
   className={props.className}
  >
   {paths.map((path, index) => (
    <path
     key={index}
     d={path.d}
     {...path.attributes}
    />
   ))}
  </svg>
 );
};

export default Svg