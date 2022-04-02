import AxiosMockAdapter from 'axios-mock-adapter';
import { fireEvent, render, waitFor } from '@testing-library/react';
import api from '../../services/api';
import { Dashboard } from '../../pages/Dashboard';

const mockedAPI = new AxiosMockAdapter(api);

const mockedFoods = [
  {
    id: 1,
    name: 'fake-name-#1',
    description: 'fake-description-#1',
    price: 'fake-price-#1',
    available: true,
    image: 'fake-image-url-#1',
  },
  {
    id: 2,
    name: 'fake-name-#2',
    description: 'fake-description-#2',
    price: 'fake-price-#2',
    available: true,
    image: 'fake-image-url-#2',
  }
];

describe('Dashboard page tests', () => {
  beforeEach(() => {
    mockedAPI.onGet('foods').reply(200, mockedFoods);
  });

  it('renders correctly foods list', async () => {
    const { getByTestId } = render(<Dashboard />);

    const foodsList = getByTestId('foods-list');

    await waitFor(() => {
      expect(foodsList).toHaveTextContent('fake-name-#1');
    });
  });

  it('food is deleted when click in any food for delete it', async () => {
      mockedAPI.onDelete('foods/1').reply(200);

      const { findByTestId } = render(<Dashboard />);

      const foodsList = await findByTestId('foods-list');

      const deleteFoodButton = await findByTestId('remove-food-1');

      fireEvent.click(deleteFoodButton);

      await waitFor(() => {
        expect(foodsList).not.toHaveTextContent('fake-name-#1');
      });
  });

  it('food is edited when click in any food for edit it', async () => {
    const [food] = mockedFoods;

    mockedAPI.onPut('foods/1', { ...food, name: 'new-fake-name' }).reply(204, {
      ...food, name: 'new-fake-name',
    });

    const { findByTestId, findAllByRole } = render(<Dashboard />);

    const foodsList = await findByTestId('foods-list');
    
    const editFoodButtonOnDashboard = await findByTestId('edit-food-1');
    fireEvent.click(editFoodButtonOnDashboard);

    const [, foodNameInput] = await findAllByRole('textbox');

    fireEvent.change(foodNameInput, {
      target: {
        value: 'new-fake-name',
      },
    });
    
    const editFoodButtonOnModal = await findByTestId('edit-food-button');
    fireEvent.click(editFoodButtonOnModal);
    
    await waitFor(() => {
      expect(foodsList).toHaveTextContent('new-fake-name');
    });
  });

  it('a food is correctly added in foods list', async () => {
    const newFood = {
      name: 'fake-name-#3',
      description: 'fake-description-#3',
      price: 'fake-price-#3',
      available: true,
      image: 'fake-image-url-#3',
    }

    mockedAPI.onPost('foods', { ...newFood }).reply(200, { ...newFood, id: 3 });

    const { findByText, findAllByRole, findByTestId } = render(<Dashboard />);

    const foodsList = await findByTestId('foods-list');
    const newDishButton = await findByText('Novo Prato');

    fireEvent.click(newDishButton);

    const [
      foodImageInput,
      foodNameInput,
      foodPriceInput,
      foodDescriptionInput,
    ] = await findAllByRole('textbox');

    fireEvent.change(foodImageInput, {
      target: {
        value: 'fake-image-url-#3',
      },
    });

    fireEvent.change(foodNameInput, {
      target: {
        value: 'fake-name-#3',
      },
    });

    fireEvent.change(foodPriceInput, {
      target: {
        value: 'fake-price-#3',
      },
    });

    fireEvent.change(foodDescriptionInput, {
      target: {
        value: 'fake-description-#3',
      },
    });

    const addDishButton = await findByText('Adicionar Prato');
    fireEvent.click(addDishButton);

    await waitFor(() => {
      expect(foodsList).toHaveTextContent('fake-name-#3');
    });
  });
});