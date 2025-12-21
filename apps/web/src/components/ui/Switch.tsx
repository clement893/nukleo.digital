/**
 * Switch Component
 * Toggle switch component
 */

'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
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
    const switchId = id || `switch-${Math.random().toString(36).substring(7)}`;

    return (
      <div className={clsx('flex items-center', fullWidth && 'w-full')}>
        <label
          htmlFor={switchId}
          className="relative inline-flex items-center cursor-pointer"
        >
          <input
            ref={ref}
            type="checkbox"
            id={switchId}
            className="sr-only peer"
            {...props}
          />
          <div
            className={clsx(
              "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600",
              error && 'ring-2 ring-red-500',
              className
            )}
          />
          {label && (
            <span
              className={clsx(
                'ml-3 text-sm font-medium text-gray-700 dark:text-gray-300',
                error && 'text-red-600 dark:text-red-400',
                props.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {label}
            </span>
          )}
        </label>
        {error && (
          <p className="ml-2 text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
