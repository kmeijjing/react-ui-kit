import clsx from "clsx";
import styled, { StyleSheetManager } from "styled-components";
import { SVGProps } from "react";
import colors from "../css/colors";
import { getBgColor, getTextColor } from "../utils/colorUtils.tsx";
import isPropValid from "@emotion/is-prop-valid";

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

const SButtonDiv = styled.button<ButtonProps>`
  min-height: 24px;
  min-width: 24px;
  width: fit-content;
  position: relative;
  overflow: hidden;
  border-radius: ${({ rounded }) => (rounded ? "50%" : "4px")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? "no-drop" : "pointer")};
  .s-button-content {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    .icon {
      margin-right: ${({ label }) => (label ? "4px" : "0")};
    }
  }

  &.s-button--xs {
    height: 24px;
    padding: 0 8px;
    font-size: 12px;

    .icon svg {
      width: 12px;
      height: 12px;
    }
  }

  &.s-button--sm {
    height: 28px;
    padding: 0 12px;
    font-size: 12px;

    .icon svg {
      width: 16px;
      height: 16px;
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
    background-color: ${({ color }) => getBgColor(color)};
    z-index: -1;
    border-radius: inherit;
  }

  &.s-btn-outlined {
    .s-button-helper {
      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: white !important;
        border-radius: inherit;
        border: 1px solid ${({ color }) => getBgColor(color)};
      }
    }

    .s-button-content {
      .label,
      .icon svg {
        color: ${({ color }) => getBgColor(color)};
      }
    }
  }

  &.s-btn-disabled {
    .s-button-helper {
      background-color: ${colors["Grey_Lighten-3"]} !important;
      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        background-color: ${colors["Grey_Lighten-3"]} !important;
        border: 1px solid ${colors["Grey_Lighten-2"]} !important;
      }
    }
    color: ${colors["Grey_Default"]} !important;

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
          background-color: ${({ color }) => getBgColor(color)} !important;
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
    size = "sm",
    type = "button",
    color = "primary",
    icon: Icon,
    label,
    disabled,
    outlined,
    rounded,
    className,
  } = props;

  const buttonClasses = clsx(
    "s-button",
    `s-button--${size}`,
    `text-${getTextColor(getBgColor(color))}`,
    Icon && !label && "s-btn-icon-only",
    outlined && "s-btn-outlined",
    rounded && "s-btn-rounded",
    disabled && "s-btn-disabled",
    className
  );

  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <SButtonDiv className={buttonClasses} type={type} {...props}>
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
    </StyleSheetManager>
  );
};

export default SButton;
