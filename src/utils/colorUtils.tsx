import colors from "../css/colors";

type Colors = {
  [key: string]: string;
};

const colorsPallete: Colors = colors;

// 배경색 결정
const getBgColor = (color: string = "primary"): string => {
  return colorsPallete[color] || colorsPallete["primary"];
};

// 명도 계산
const getLuminance = (hex: string): number => {
  hex = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map(
    (offset) => parseInt(hex.substring(offset, offset + 2), 16) / 255
  );
  const luminance = (v: number) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);

  return 0.2126 * luminance(r) + 0.7152 * luminance(g) + 0.0722 * luminance(b);
};

// 글자색 결정
const getTextColor = (backgroundColor: string): string => {
  return getLuminance(backgroundColor) > 0.5 ? "black" : "white";
};

export { getBgColor, getLuminance, getTextColor };
