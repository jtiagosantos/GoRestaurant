import { render, fireEvent } from '@testing-library/react';
import { Header } from '../../components/Header';

describe('Header component tests', () => {
  it(
    'openModal functin is called when click in button with "Novo Prato" text', 
    () => {
      const mockedOpenModal = jest.fn();

      const { getByText } = render(<Header openModal={mockedOpenModal} />);

      const button = getByText('Novo Prato');

      fireEvent.click(button);

      expect(mockedOpenModal).toBeCalledTimes(1);
  });
})