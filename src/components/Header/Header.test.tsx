import Header from '.';
import '@testing-library/jest-dom';
import { screen, render, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../../__mocks__/initialState';

const mockStore = configureStore([]);

describe('<Header />', () => {
  it('should render <Header />', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Header showSettings={false} />
      </Provider>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('should render showSettings=true <Header />', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Header showSettings={true} />
      </Provider>
    );
    expect(screen.getByTestId('settings-icon')).toBeInTheDocument();
  });
});
