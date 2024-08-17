import clsx from "clsx";
import colors from "../css/colors";
import styled from "styled-components";
import { SVGProps } from "react";

type Colors = {
  [key: string]: string;
};

export interface ButtonProps {
  size?: "xs" | "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  color: string;
  icon?: SVGProps<SVGSVGElement>;
  label?: string;
  disabled?: boolean;
  outlined?: boolean;
  rounded?: boolean;
  className?: string;
}
const colorsPallete: Colors = colors;
const bgColor = (color: string): string => {
  console.log(color);
  return colorsPallete[color || "primary"];
};

const SButtonDiv = styled.button`
  min-height: 24px;
  min-width: 24px;
  width: fit-content;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  .s-button-content {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    .icon {
      margin-right: 4px;
    }
  }

  &.s-button--xs {
    height: 24px;
    padding: 0 8px;
    font-size: 12px;
    .icon {
      svg {
        width: 12px;
        height: 12px;
      }
    }
  }

  &.s-button--sm {
    height: 28px;
    padding: 0 12px;
    font-size: 12px;
    .icon {
      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  &.s-button--md {
    height: 34px;
    padding: 0 20px;
    font-size: 16px;
    font-weight: 500;
    .icon {
      margin-right: 8px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  &.s-button--lg {
    height: 62px;
    padding: 0 28px;
    font-size: 18px;
    font-weight: 500;
    .icon {
      margin-right: 12px;
      svg {
        width: 24px;
        height: 24px;
      }
    }
  }

  .s-button-helper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ color }) => bgColor(color || "primary")};
    z-index: -1;
  }

  &.s-btn-outlined {
    .s-button-helper {
      &:after {
        background-color: white !important;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        border: 1px solid ${({ color }) => bgColor(color || "primary")};
      }
    }

    .s-button-content {
      .label {
        color: ${({ color }) => bgColor(color || "primary")};
      }
      .icon {
        svg {
          color: ${({ color }) => bgColor(color || "primary")};
        }
      }
    }
  }

  &.s-btn-disabled {
    .s-button-helper {
      background-color: ${colors["Grey_Lighten-3"]} !important;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        border: 1px solid ${colors["Grey_Lighten-2"]};
      }
    }
    color: ${colors["Grey_Default"]} !important;
    cursor: no-drop;
    .label {
      color: ${colors["Grey_Default"]} !important;
    }
  }

  &:not(.s-btn-disabled) {
    &:not(.s-btn-outlined)&:hover {
      .s-button-helper {
        background-image: linear-gradient(
          rgba(0, 0, 0, 0.2),
          rgba(0, 0, 0, 0.2)
        ) !important;
      }
    }
    &.s-btn-outlined:hover {
      .s-button-helper {
        &:before {
          background-color: ${({ color }) =>
            bgColor(color || "primary")} !important;
          opacity: 0.3 !important;
        }
        &:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.85;
          background: #fff;
        }
      }
    }
    &.s-btn-icon-only {
      padding: 0;
      &.s-button--xs {
        width: 24px;
        svg {
          width: 16px;
          height: 16px;
        }
      }
      &.s-button--sm {
        width: 28px;
      }
      &.s-button--md {
        width: 34px;
        svg {
          width: 24px;
          height: 24px;
        }
      }
      &.s-button--lg {
        width: 62px;
        svg {
          width: 28px;
          height: 28px;
        }
      }
      .s-button-content {
        .icon {
          margin-right: 0px;
        }
      }
    }
  }
`;

const SButton = (props: ButtonProps) => {
  const {
    size,
    type,
    color,
    icon: Icon,
    label,
    disabled,
    outlined,
    rounded,
    className,
  } = props;

  const textColor: string = getTextColor(colorsPallete[color || "primary"]);

  const buttonClasses = clsx(
    "s-button",
    `s-button--${size || "sm"}`,
    `text-${textColor}`,
    Icon && !label && "s-btn-icon-only",
    outlined && `s-btn-outlined`,
    rounded && "s-btn-rounded",
    disabled && "s-btn-disabled",
    className
  );

  return (
    <SButtonDiv className={buttonClasses} {...props}>
      <div className="s-button-helper"></div>
      <div className="s-button-content">
        {Icon && (
          <div className="icon">
            <Icon />
          </div>
        )}
        <div className="label">{label}</div>
      </div>
    </SButtonDiv>
  );
};

// 명도 계산 함수
const getLuminance = (hex: string): number => {
  hex = hex.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

// 글자색 결정 함수
const getTextColor = (backgroundColor: string): string => {
  return getLuminance(backgroundColor) > 0.5 ? "black" : "white";
};

SButton.displayName = "Button";

export default SButton;
