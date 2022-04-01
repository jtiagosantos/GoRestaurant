import { render, fireEvent } from '@testing-library/react';
import { ModalEditFood } from '../../components/ModalEditFood';

const mockedFunctions = {
  setIsOpen: jest.fn(),
  handleUpdateFood: jest.fn(),
}

const ModalEditFoodProps = {
  isOpen: true,
  setIsOpen: mockedFunctions.setIsOpen,
  editingFood: {
    id: 1,
    name: 'fake-name',
    description: 'fake-description',
    price: 'fake-price',
    available: true,
    image: 'fake-image',
  },
  handleUpdateFood: mockedFunctions.handleUpdateFood,
}

describe('ModalEditFood component tests', () => {
  it(
    'handleUpdateFood and setIsOpen functions are called when submit form',
    () => {
      const { getByTestId } = render(
        <ModalEditFood {...ModalEditFoodProps} />
      );

      const editFoodButton = getByTestId('edit-food-button');

      fireEvent.click(editFoodButton);

      const { setIsOpen, handleUpdateFood } = mockedFunctions;

      expect(setIsOpen).toBeCalledTimes(1);
      expect(handleUpdateFood).toBeCalledTimes(1);
  });
});