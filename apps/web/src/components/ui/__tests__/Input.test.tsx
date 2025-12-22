import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../Input';

describe('Input', () => {
  it('renders input element', () => {
    const { container } = render(<Input />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders with value', () => {
    render(<Input value="test@example.com" onChange={() => {}} />);
    const input = screen.getByDisplayValue('test@example.com');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('displays error message', () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toHaveAttribute('role', 'alert');
  });

  it('displays helper text when no error', () => {
    render(<Input helperText="Enter your email address" />);
    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
  });

  it('does not display helper text when error is present', () => {
    render(<Input error="Error" helperText="Helper text" />);
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders with left icon', () => {
    const { container } = render(
      <Input leftIcon={<span data-testid="left-icon">@</span>} />
    );
    expect(container.querySelector('[data-testid="left-icon"]')).toBeInTheDocument();
    const input = container.querySelector('input');
    expect(input).toHaveClass('pl-10');
  });

  it('renders with right icon', () => {
    const { container } = render(
      <Input rightIcon={<span data-testid="right-icon">✓</span>} />
    );
    expect(container.querySelector('[data-testid="right-icon"]')).toBeInTheDocument();
    const input = container.querySelector('input');
    expect(input).toHaveClass('pr-10');
  });

  it('renders with fullWidth', () => {
    const { container } = render(<Input fullWidth />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('w-full');
  });

  it('marks input as required', () => {
    render(<Input label="Email" required />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('required');
  });

  it('shows required indicator in label', () => {
    render(<Input label="Email" required />);
    const label = screen.getByText('Email').parentElement;
    expect(label?.querySelector('span[aria-label="required"]')).toBeInTheDocument();
  });

  it('has aria-invalid when error is present', () => {
    render(<Input error="Error" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('has aria-describedby when error or helper text is present', () => {
    const { rerender } = render(<Input error="Error" />);
    let input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby');
    
    rerender(<Input helperText="Helper" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('forwards HTML input attributes', () => {
    render(<Input type="email" placeholder="Enter email" disabled />);
    const input = screen.getByPlaceholderText('Enter email');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toBeDisabled();
  });
});
