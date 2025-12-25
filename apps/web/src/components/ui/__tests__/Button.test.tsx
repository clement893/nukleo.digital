import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from '../Button';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders with default variant (primary)', () => {
      const { container } = render(<Button>Test</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('bg-primary-600');
    });

    it('renders with different variants', () => {
      const { rerender, container } = render(<Button variant="secondary">Test</Button>);
      expect(container.querySelector('button')).toHaveClass('bg-secondary-600');

      rerender(<Button variant="outline">Test</Button>);
      expect(container.querySelector('button')).toHaveClass('border-primary-600');

      rerender(<Button variant="ghost">Test</Button>);
      expect(container.querySelector('button')).toHaveClass('text-gray-700');

      rerender(<Button variant="danger">Test</Button>);
      expect(container.querySelector('button')).toHaveClass('bg-danger-600');
    });

    it('renders with different sizes', () => {
      const { rerender, container } = render(<Button size="sm">Test</Button>);
      expect(container.querySelector('button')).toHaveClass('text-sm');

      rerender(<Button size="md">Test</Button>);
      expect(container.querySelector('button')).toHaveClass('text-base');

      rerender(<Button size="lg">Test</Button>);
      expect(container.querySelector('button')).toHaveClass('text-lg');
    });

    it('renders with fullWidth prop', () => {
      const { container } = render(<Button fullWidth>Test</Button>);
      expect(container.querySelector('button')).toHaveClass('w-full');
    });

    it('applies custom className', () => {
      const { container } = render(<Button className="custom-class">Test</Button>);
      expect(container.querySelector('button')).toHaveClass('custom-class');
    });
  });

  describe('Loading State', () => {
    it('shows loading spinner when loading is true', () => {
      const { container } = render(<Button loading>Test</Button>);
      const spinner = container.querySelector('svg.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('disables button when loading', () => {
      render(<Button loading>Test</Button>);
      const button = screen.getByText('Test').closest('button');
      expect(button).toBeDisabled();
    });

    it('shows children alongside spinner when loading', () => {
      render(<Button loading>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('disables button when disabled prop is true', () => {
      render(<Button disabled>Test</Button>);
      const button = screen.getByText('Test').closest('button');
      expect(button).toBeDisabled();
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Test
        </Button>
      );
      fireEvent.click(screen.getByText('Test'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      fireEvent.click(screen.getByText('Click me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles multiple clicks', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      fireEvent.click(screen.getByText('Click me'));
      fireEvent.click(screen.getByText('Click me'));
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Button>Test</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('forwards aria attributes', () => {
      render(
        <Button aria-label="Close dialog" aria-pressed="false">
          X
        </Button>
      );
      const button = screen.getByLabelText('Close dialog');
      expect(button).toHaveAttribute('aria-pressed', 'false');
    });

    it('forwards data attributes', () => {
      const { container } = render(<Button data-testid="custom-button">Test</Button>);
      expect(container.querySelector('[data-testid="custom-button"]')).toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    it('forwards HTML button attributes', () => {
      render(
        <Button type="submit" form="test-form" name="submit-btn">
          Submit
        </Button>
      );
      const button = screen.getByText('Submit').closest('button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('form', 'test-form');
      expect(button).toHaveAttribute('name', 'submit-btn');
    });
  });
});
