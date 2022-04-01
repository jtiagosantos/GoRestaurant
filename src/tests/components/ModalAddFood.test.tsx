import { render, fireEvent } from '@testing-library/react';
import { ModalAddFood } from '../../components/ModalAddFood';

const mockedFunctions = {
  setIsOpen: jest.fn(),
  handleAddFood: jest.fn(),
}

const ModalAddFoodProps = {
  isOpen: true,
  setIsOpen: mockedFunctions.setIsOpen,
  handleAddFood: mockedFunctions.handleAddFood,
}

describe('Modal component tests', () => {
  it(
    'isOpen and handleAddFood functions are called when submit form', 
    () => {
      const { getByTestId } = render(
        <ModalAddFood {...ModalAddFoodProps} />
      );

      const addFoodButton = getByTestId('add-food-button');

      fireEvent.click(addFoodButton);

      const { setIsOpen, handleAddFood } = mockedFunctions;

      expect(setIsOpen).toBeCalledTimes(1);
      expect(handleAddFood).toBeCalledTimes(1);
  });
});