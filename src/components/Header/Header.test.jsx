import Header from '.';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../../__mocks__/initialState';

const mockStore = configureStore([]);

describe('<Header />', () => {
  it('should render <Header />', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
