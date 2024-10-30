
export type RadioProps = {

  /**
   * The main content of the Radio.
   */
  label: string;

  value: string | number | boolean;

  /**
   * The secondary content that goes underneath the Radio
   */
  description?: string;

  /**
   * Specifies whether the radio is selected
   */
  checked?: boolean;

  disabled?: boolean;

};
