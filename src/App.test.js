import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App tl={true}/>);
  const linkElement = screen.getByAltText(/cbeebies/i);
  expect(linkElement).toBeInTheDocument();
});
