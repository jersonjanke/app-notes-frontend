import Register from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../../__mocks__/initialState';

const mockStore = configureStore([]);

describe('<Register />', () => {
  it('should render <Register />', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Register />
      </Provider>
    );
    expect(screen.getByTestId('register')).toBeInTheDocument();
  });
});
