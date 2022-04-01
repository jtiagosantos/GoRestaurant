import { render, fireEvent } from '@testing-library/react';
import { Input } from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return { 
        fieldName: '',
        defaultValue: '',
        registerField: () => {},
      }
    }
  }
});

describe('Input component tests', () => {
  it('renders correctly placeholder', () => {
    const { getByRole } = render(
      <Input 
        name='fake-name' 
        placeholder='fake-placeholder' 
      />
    );

    const input = getByRole('textbox');

    expect(input).toHaveAttribute('placeholder', 'fake-placeholder');
  });

  it('handleInputFocus function is called when input is focus', () => {
    const { getByRole, getByTestId } = render(
      <Input 
        name='fake-name' 
        placeholder='fake-placeholder' 
      />
    );

    const input = getByRole('textbox');

    fireEvent.focus(input);

    expect(getByTestId('on-focus')).toBeInTheDocument();
  });

  it('handleInputBlur function is called when input is blur', () => {
    const { getByRole, getByTestId } = render(
      <Input 
        name='fake-name' 
        placeholder='fake-placeholder' 
      />
    );

    const input = getByRole('textbox');

    fireEvent.blur(input);

    expect(getByTestId('no-focus')).toBeInTheDocument();
  });
});