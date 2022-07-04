import Microphone from '.';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../../__mocks__/initialState';

const mockStore = configureStore([]);

describe('<Microphone />', () => {
  const mockConnect = jest.fn();
  const mockcreateMediaElementSource = jest.fn(() => {
    return {
      connect: mockConnect,
    };
  });
  const mockgetByteFrequencyData = jest.fn();
  const mockcreateAnalyser = jest.fn(() => {
    return {
      connect: mockConnect,
      frequencyBinCount: [0, 1, 2],
      getByteFrequencyData: mockgetByteFrequencyData,
    };
  });
  const mockcreateOscillator = jest.fn(() => {
    return {
      channelCount: 2,
    };
  });
  const mockChannelSplitterConnect = jest.fn((n) => n);
  const mockcreateChannelSplitter = jest.fn(() => {
    return {
      connect: mockChannelSplitterConnect,
    };
  });
  const mockaudioContext = jest.fn(() => {
    return {
      createAnalyser: mockcreateAnalyser,
      createMediaElementSource: mockcreateMediaElementSource,
      createOscillator: mockcreateOscillator,
      createChannelSplitter: mockcreateChannelSplitter,
    };
  });

  beforeEach(() => {
    window.AudioContext = mockaudioContext;
  });

  it('should render <Microphone />', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Microphone start={true} />
      </Provider>
    );
    expect(screen.getByTestId('microphone')).toBeInTheDocument();
  });
});
