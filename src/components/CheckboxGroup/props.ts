
export type CheckboxGroupOption<T> = {

  /**
   * Adds the Radio id attribute value
   */
  value: T;

  /**
   * The text used to display the radio option
   */
  label: string;

  /**
   * description of the label that is placed underneath the label
   */
  description?: string;

  /**
   * Specifies whether the Radio option is disabled
   */
  disabled?: boolean;

}

export type CheckboxGroupProps<T> = {
  defaultValue?: T[];
  value?: T[];
  options: CheckboxGroupOption<T>[];
  onChange?: (checkedValue: T[]) => void;
  isDisabled?: boolean;
}
