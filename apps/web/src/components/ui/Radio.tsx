/**
 * Radio Component
 * Radio button component
 */

'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      error,
      className,
      fullWidth = false,
      id,
      ...props
    },
    ref
  ) => {
    const radioId = id || `radio-${Math.random().toString(36).substring(7)}`;

    return (
      <div className={clsx('flex items-center', fullWidth && 'w-full')}>
        <input
          ref={ref}
          type="radio"
          id={radioId}
          className={clsx(
            'w-4 h-4 text-blue-600 border-gray-300',
            'focus:ring-2 focus:ring-blue-500 focus:ring-offset-0',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={radioId}
            className={clsx(
              'ml-2 text-sm font-medium text-gray-700 dark:text-gray-300',
              error && 'text-red-600 dark:text-red-400',
              props.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
