import { RadioChangeEvent } from 'antd'

export type GroupRadioOption = {
  label: string;
  description?: string;
  value: string | number | boolean;
  disabled?: boolean;
  title?: string;
  id?: string;
};

export type GroupRadioChangeEvent = {
  value: string | number | boolean | undefined;
  event?: RadioChangeEvent;
};

export type GroupRadioProps = {
  options: GroupRadioOption[];
  defaultValue?: string | number | boolean;
  disabled?: boolean;
  onChange?: (changeEvent: GroupRadioChangeEvent) => void;
};
