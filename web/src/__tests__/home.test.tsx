import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('Home Page', () => {
  it('renders the title', () => {
    render(<Home />);
    const heading = screen.getByText(/Professional Online Language Testing/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders get started button', () => {
    render(<Home />);
    const button = screen.getByText(/Get Started/i);
    expect(button).toBeInTheDocument();
  });
});

