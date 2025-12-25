import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Input from '../Input';

expect.extend(toHaveNoViolations);

describe('Input', () => {
  describe('Rendering', () => {
    it('renders input element', () => {
      const { container } = render(<Input />);
      expect(container.querySelector('input')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Input label="Email" />);
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Input helperText="Enter your email address" />);
      expect(screen.getByText('Enter your email address')).toBeInTheDocument();
    });

    it('renders error message', () => {
      render(<Input error="Email is required" />);
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toHaveClass('text-error-600');
    });

    it('shows required indicator when required', () => {
      render(<Input label="Email" required />);
      const label = screen.getByText('Email');
      const requiredSpan = label.querySelector('span[aria-label="required"]');
      expect(requiredSpan).toBeInTheDocument();
      expect(requiredSpan).toHaveTextContent('*');
    });

    it('renders with left icon', () => {
      const { container } = render(<Input leftIcon={<span>🔍</span>} />);
      expect(container.querySelector('.absolute.left-3')).toBeInTheDocument();
      expect(container.querySelector('input')).toHaveClass('pl-10');
    });

    it('renders with right icon', () => {
      const { container } = render(<Input rightIcon={<span>✓</span>} />);
      expect(container.querySelector('.absolute.right-3')).toBeInTheDocument();
      expect(container.querySelector('input')).toHaveClass('pr-10');
    });

    it('applies fullWidth class when fullWidth is true', () => {
      const { container } = render(<Input fullWidth />);
      expect(container.querySelector('.w-full')).toBeInTheDocument();
    });
  });

  describe('Value Handling', () => {
    it('handles controlled value', () => {
      const { rerender } = render(<Input value="test" onChange={vi.fn()} />);
      const input = screen.getByDisplayValue('test') as HTMLInputElement;
      expect(input.value).toBe('test');

      rerender(<Input value="updated" onChange={vi.fn()} />);
      expect(input.value).toBe('updated');
    });

    it('handles onChange event', () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('handles onBlur event', () => {
      const handleBlur = vi.fn();
      render(<Input onBlur={handleBlur} />);
      const input = screen.getByRole('textbox');
      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Error State', () => {
    it('applies error styles when error is present', () => {
      const { container } = render(<Input error="Error message" />);
      const input = container.querySelector('input');
      expect(input).toHaveClass('border-error-500');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('hides helper text when error is present', () => {
      render(<Input helperText="Helper text" error="Error message" />);
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Input label="Email" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('associates label with input', () => {
      render(<Input label="Email" id="email-input" />);
      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute('id', 'email-input');
    });

    it('associates error message with input via aria-describedby', () => {
      render(<Input label="Email" error="Email is required" id="email-input" />);
      const input = screen.getByLabelText('Email');
      const errorId = input.getAttribute('aria-describedby');
      expect(errorId).toBeTruthy();
      expect(screen.getByText('Email is required')).toHaveAttribute('id', errorId!);
    });

    it('associates helper text with input via aria-describedby', () => {
      render(<Input label="Email" helperText="Enter your email" id="email-input" />);
      const input = screen.getByLabelText('Email');
      const helperId = input.getAttribute('aria-describedby');
      expect(helperId).toBeTruthy();
      expect(screen.getByText('Enter your email')).toHaveAttribute('id', helperId!);
    });

    it('sets aria-required when required', () => {
      render(<Input required />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = vi.fn();
      render(<Input ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });

  describe('Input Types', () => {
    it('renders with different input types', () => {
      const { rerender } = render(<Input type="email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

      rerender(<Input type="password" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'password');

      rerender(<Input type="number" />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number');
    });
  });

  describe('Disabled State', () => {
    it('disables input when disabled prop is true', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('applies disabled styles', () => {
      const { container } = render(<Input disabled />);
      const input = container.querySelector('input');
      expect(input).toHaveClass('disabled:bg-gray-100');
    });
  });
});
