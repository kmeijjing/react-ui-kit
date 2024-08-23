import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SButton from '../components/SButton';
import '@testing-library/jest-dom';

describe('SButton Component', () => {
  it('renders the button with the correct label', () => {
    render(<SButton label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies the correct classes based on size prop', () => {
    const { container } = render(<SButton label="Button" size="lg" />);
    expect(container.firstChild).toHaveClass('py-5.5 px-9.5 text-2xl leading-10');
  });

  it('applies the correct background color based on color prop', () => {
    render(<SButton label="Colored Button" color="Red_Default" />);
    expect(screen.getByText('Colored Button')).toHaveClass('bg-[#E30000] text-white');
  });

  it('applies the correct outline classes when outline prop is true', () => {
    render(<SButton label="Outlined Button" color="Red_Default" outline />);
    expect(screen.getByText('Outlined Button')).toHaveClass('text-[#E30000]');
  });

  it('handles button click event', () => {
    const handleClick = vi.fn();
    render(<SButton label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables the button when disabled prop is true', () => {
    render(<SButton label="Disabled Button" disabled />);
    const button = screen.getByText('Disabled Button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:bg-Grey_Lighten-3 disabled:text-Grey_Default');
  });

  it('applies hover classes correctly when noHover prop is false', () => {
    const { container } = render(<SButton label="Hover Button" />);
    expect(container.firstChild).toHaveClass('hover:before:bg-black hover:before:opacity-10');
  });

  it('does not apply hover classes when noHover prop is true', () => {
    const { container } = render(<SButton label="No Hover Button" noHover />);
    expect(container.firstChild).not.toHaveClass('hover:before:bg-black hover:before:opacity-10');
  });
});
