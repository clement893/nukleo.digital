import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders with default variant (primary)', () => {
    const { container } = render(<Button>Test</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-primary-600');
  });

  it('renders with secondary variant', () => {
    const { container } = render(<Button variant="secondary">Test</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-secondary-600');
  });

  it('renders with outline variant', () => {
    const { container } = render(<Button variant="outline">Test</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('border-2');
    expect(button).toHaveClass('border-primary-600');
  });

  it('renders with danger variant', () => {
    const { container } = render(<Button variant="danger">Test</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-danger-600');
  });

  it('renders with ghost variant', () => {
    const { container } = render(<Button variant="ghost">Test</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('text-gray-700');
  });

  it('renders with small size', () => {
    const { container } = render(<Button size="sm">Test</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('text-sm');
  });

  it('renders with large size', () => {
    const { container } = render(<Button size="lg">Test</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('text-lg');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const { container } = render(<Button disabled>Test</Button>);
    const button = container.querySelector('button');
    expect(button).toBeDisabled();
  });

  it('is disabled when loading prop is true', () => {
    const { container } = render(<Button loading>Test</Button>);
    const button = container.querySelector('button');
    expect(button).toBeDisabled();
  });

  it('shows loading spinner when loading', () => {
    const { container } = render(<Button loading>Test</Button>);
    const spinner = container.querySelector('svg.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Button className="custom-class">Test</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-class');
  });

  it('forwards HTML button attributes', () => {
    render(<Button type="submit" aria-label="Submit form">Submit</Button>);
    const button = screen.getByLabelText('Submit form');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
