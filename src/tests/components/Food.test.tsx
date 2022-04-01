import AxiosMockAdapter from 'axios-mock-adapter';
import { render, fireEvent } from '@testing-library/react';
import api from '../../services/api';
import { Food } from '../../components/Food';

const mockedAPI = new AxiosMockAdapter(api);

const food = {
  id: 1,
  name: 'fake-name',
  description: 'fake-description',
  price: 'fake-price',
  available: true,
  image: 'fake-image-url',
}

const foodProps = {
  food,
  handleDelete: async () => {},
  handleEditFood: async () => {},
}

describe('Food component tests', () => {
  beforeEach(() => mockedAPI.reset());

  it('renders correctly texts', () => {
    const { getByText } = render(<Food {...foodProps} />);

    expect(getByText('fake-name')).toBeInTheDocument();
    expect(getByText('fake-description')).toBeInTheDocument();
    expect(getByText('fake-price')).toBeInTheDocument();
  });

  it('handleEditFood is called when click in edit button', () => {
    const mockedHandleEditFood = jest.fn();

    const { getByTestId } = render(
      <Food 
        {...foodProps} 
        handleEditFood={mockedHandleEditFood}
      />
    );

    const editButton = getByTestId('edit-food-1');

    fireEvent.click(editButton);

    expect(mockedHandleEditFood).toBeCalled();
  });

  it('handleDelete is called when click in delete button', () => {
    const mockedHandleDelete = jest.fn();

    const { getByTestId } = render(
      <Food 
        {...foodProps} 
        handleDelete={mockedHandleDelete}
      />
    );

    const deleteButton = getByTestId('remove-food-1');

    fireEvent.click(deleteButton);

    expect(mockedHandleDelete).toBeCalled();
  });

  it('show "Indisponível" text when click in checkbox', async () => {
    mockedAPI.onPut('foods/1', { ...food, available: false }).reply(204);

    const { getByTestId, findByText } = render(<Food {...foodProps} />);
  
    const checkbox = getByTestId('change-status-food-1');
  
    fireEvent.click(checkbox);

    expect(await findByText('Indisponível')).toBeInTheDocument();
  });
});