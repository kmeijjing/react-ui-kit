import styled, { StyleSheetManager } from "styled-components";
import { SVGProps, useState, useRef } from "react";
import { ArrowDown24 } from "../assets/icons";
import clsx from "clsx";
import colors from "../css/colors";
import useOutsideClick from "../utils/useOutsideClick";
import isPropValid from "@emotion/is-prop-valid";
import { getBgColor, getTextColor } from "../utils/colorUtils.tsx";

type OptionType = {
  label: string;
  value: string;
  disabled?: boolean;
};

interface DropdownButtonProps {
  size?: "xs" | "sm" | "md" | "lg";
  icon?: SVGProps<SVGSVGElement>;
  label: string;
  color?: string;
  disabled?: boolean;
  outlined?: boolean;
  className?: string;
  options: OptionType[];
  handleOptionSelect: (option: OptionType) => void;
}

const SDropdownButtonDiv = styled.button<DropdownButtonProps>`
  width: fit-content;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition:
    background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1),
    opacity 0.4s cubic-bezier(0.25, 0.8, 0.5, 1);

  .s-dropdown-btn-helper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ color }) => getBgColor(color)};
    border-radius: 4px;
    z-index: -1;
  }
  .arrow-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: ${({ size }) =>
      size === "xs" ? "6px" : size === "lg" ? "12px" : "8px"};

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      border-left: 1px solid rgba(255, 255, 255, 0.3);
    }
    svg {
      width: ${({ size }) => (size === "lg" ? "24px" : "12px")};
      height: ${({ size }) => (size === "lg" ? "24px" : "12px")};
    }
  }

  &.s-dropdown-btn--xs {
    height: 24px;
    .s-dropdown-btn-content {
      padding: 0 6px 0 8px;
      font-size: 12px;
    }
  }

  &.s-dropdown-btn--sm {
    height: 28px;
    .s-dropdown-btn-content {
      padding: 0 10px 0 12px;
      font-size: 12px;
    }
  }

  &.s-dropdown-btn--md {
    height: 34px;
    .s-dropdown-btn-content {
      padding: 0 16px 0 20px;
      font-size: 16px;
    }
  }

  &.s-dropdown-btn--lg {
    height: 62px;
    font-size: 18px;
    .s-dropdown-btn-content {
      padding: 0 28px 0 24px;
    }
  }

  &.s-dropdown-btn-outlined {
    .s-dropdown-btn-helper {
      &:after {
        background-color: white !important;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        border: 1px solid ${({ color }) => getBgColor(color)};
      }
    }
    .s-dropdown-btn-content .label {
      color: ${({ color }) => getBgColor(color)};
    }
    .arrow-btn {
      svg {
        color: ${({ color }) => getBgColor(color)};
      }
      &:before {
        border-color: ${({ color }) => getBgColor(color)};
      }
    }
  }

  &:not(.s-dropdown-btn-disabled) {
    &:not(.s-dropdown-btn-outlined)&:hover {
      .s-dropdown-btn-helper {
        background-image: linear-gradient(
          rgba(0, 0, 0, 0.1),
          rgba(0, 0, 0, 0.1)
        ) !important;
      }
    }
    &.s-dropdown-btn-outlined:hover {
      .s-dropdown-btn-helper {
        &:before {
          background-color: ${({ color }) => getBgColor(color)} !important;
          opacity: 0.3 !important;
        }
        &:after {
          opacity: 0.95;
          background: #fff;
        }
      }
    }
  }
  &.s-dropdown-btn-disabled {
    .s-dropdown-btn-helper {
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

    .arrow-btn {
      &:before {
        border-color: ${colors["Grey_Lighten-2"]};
      }
    }
  }
`;

const MenuDiv = styled.div`
  width: fit-content;
  left: 0;
  top: calc(100% + 4px);
  box-shadow: 0px 2px 6px 0px #00000020 !important;
  border-radius: 2px;

  .item {
    padding: 4px 12px;
    line-height: 20px;
    white-space: nowrap;
    font-size: 12px;
    text-align: left;
    cursor: pointer;
    display: block;

    transition:
      background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1),
      opacity 0.4s cubic-bezier(0.25, 0.8, 0.5, 1);
    &.disabled {
      color: ${colors["Grey_Lighten-1"]};
      cursor: not-allowed;
      &:hover {
        background-color: white !important;
      }
    }
    &:hover {
      background-color: rgba(232, 232, 232, 0.7);
    }
  }
`;

const SDropdownButton = (props: DropdownButtonProps) => {
  const {
    size = "sm",
    icon: Icon,
    color = "primary",
    label,
    disabled,
    outlined,
    className,
    options,
    handleOptionSelect,
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownBtnRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: dropdownBtnRef,
    handler: () => setIsOpen(false),
  });

  const handleToggle = () => !disabled && setIsOpen(!isOpen);
  const handleChange = (opt: OptionType) => {
    if (!opt.disabled) {
      setIsOpen(false);
      if (handleOptionSelect) {
        handleOptionSelect(opt);
      }
    }
  };

  const dropdownClass = clsx(
    `s-dropdown-btn--${size}`,
    `text-${getTextColor(getBgColor(color))}`,
    outlined && "s-dropdown-btn-outlined",
    disabled && "s-dropdown-btn-disabled",
    className
  );

  const MenuClass = clsx(
    "s-dropdown-menu",
    `s-dropdown-menu--${size || "sm"}`,
    "absolute",
    "bg-white",
    "shadow-md",
    "z-10"
  );

  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <div className="s-dropdown-btn relative" ref={dropdownBtnRef}>
        <SDropdownButtonDiv
          className={dropdownClass}
          {...props}
          onClick={handleToggle}
        >
          <div className="s-dropdown-btn-helper"></div>
          <div className="s-dropdown-btn-content">
            {Icon && (
              <div className="icon">
                <Icon />
              </div>
            )}
            <div className="label">{label}</div>
          </div>
          <div className="arrow-btn">
            <ArrowDown24 />
          </div>
        </SDropdownButtonDiv>
        {isOpen && (
          <MenuDiv className={MenuClass}>
            {options.map((opt) => (
              <span
                key={opt.value}
                className={clsx("item", opt.disabled && "disabled")}
                dangerouslySetInnerHTML={{ __html: opt.label }}
                onClick={() => handleChange(opt)}
              ></span>
            ))}
          </MenuDiv>
        )}
      </div>
    </StyleSheetManager>
  );
};

export default SDropdownButton;
