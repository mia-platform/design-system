import { ReactNode } from 'react'

export type RadioProps = {

  /**
   * The main content of the Radio.
   */
  label: string;

  /**
   * The secondary content that goes underneath the Radio
   */
  description?: ReactNode;

  value: string | number | boolean;

  /**
   * Specifies whether the radio is selected
   */
  checked?: boolean;

  disabled?: boolean;

};
