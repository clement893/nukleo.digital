/**
 * DatePicker Component
 * Date input component
 */

'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import Input from './Input';

interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      label,
      error,
      helperText,
      className,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    return (
      <Input
        ref={ref}
        type="date"
        label={label}
        error={error}
        helperText={helperText}
        fullWidth={fullWidth}
        className={className}
        {...props}
      />
    );
  }
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
