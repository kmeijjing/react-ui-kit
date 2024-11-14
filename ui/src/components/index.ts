import SButton, { type SButtonProps } from './SButton';
import SCaution, { type SCautionProps } from './SCaution';
import SCheckbox, { type SCheckboxProps } from './SCheckbox';
import SChip, { type SChipProps } from './SChip';
import SDropdown, { type SDropdownProps } from './SDropdown';
import SInput, { type SInputProps } from './SInput';
import SPagination, { type SPaginationProps } from './SPagination';
import SRadio, { type SRadioProps } from './SRadio';
import STable, {
	type Row,
	type TableColumn,
	type Pagination,
	type STableProps,
	type TableTdProps,
	type TableThProps,
} from './STable';
import STabPanel, { type STabPanelProps } from './STabPanel';
import STabs, { type STabsProps, type Tab } from './STabs';
import SToggle, { type SToggleProps } from './SToggle';
import STooltip, {
	type STooltipProps,
	type TooltipSectionProps,
} from './STooltip';

export interface ComponentLibrary {
	Button: typeof SButton;
	Caution: typeof SCaution;
	Checkbox: typeof SCheckbox;
	Chip: typeof SChip;
	Dropdown: typeof SDropdown;
	Input: typeof SInput;
	Pagination: typeof SPagination;
	Radio: typeof SRadio;
	Table: typeof STable;
	TabPanel: typeof STabPanel;
	Tabs: typeof STabs;
	Toggle: typeof SToggle;
	Tooltip: typeof STooltip;
}

export {
	SButton,
	SCaution,
	SCheckbox,
	SChip,
	SDropdown,
	SInput,
	SPagination,
	SRadio,
	STable,
	STabPanel,
	STabs,
	SToggle,
	STooltip,
};

export type {
	SButtonProps,
	SCautionProps,
	SCheckboxProps,
	SChipProps,
	SDropdownProps,
	SInputProps,
	SPaginationProps,
	SRadioProps,
	Row,
	TableColumn,
	Pagination,
	STableProps,
	TableTdProps,
	TableThProps,
	STabPanelProps,
	STabsProps,
	Tab,
	SToggleProps,
	STooltipProps,
	TooltipSectionProps,
};

export const S: ComponentLibrary = {
	Button: SButton,
	Caution: SCaution,
	Checkbox: SCheckbox,
	Chip: SChip,
	Dropdown: SDropdown,
	Input: SInput,
	Pagination: SPagination,
	Radio: SRadio,
	Table: STable,
	TabPanel: STabPanel,
	Tabs: STabs,
	Toggle: SToggle,
	Tooltip: STooltip,
};
