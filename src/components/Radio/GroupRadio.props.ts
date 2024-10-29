import { ChangeEventHandler, ReactNode } from 'react'

export type Option = {
  label: string;
  description?: string;
  value: string | number | boolean;
  disabled?: boolean;
  title?: string;
  id?: string;
};

export type GropupRadioProps = {
  defaultValue: string | number | boolean;
  disabled?: boolean;
  options: Option[];
  onChange?: ChangeEventHandler;
};
