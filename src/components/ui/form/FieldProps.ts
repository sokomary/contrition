import { CommonProps } from '../CommonProps';

interface FieldProps extends CommonProps {
  placeholder?: string;
  label?: string;
  name: string;
  validate?: (value: string) => any;
  required?: boolean;
  disabled?: boolean;
}

export type { FieldProps };
