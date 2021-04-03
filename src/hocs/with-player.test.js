import React from 'react';
import {render, screen} from '@testing-library/react';
import withVideoPlayer from './with-player';

jest.mock(`../components/player/player`, () => {
  const mockVideoPlayer = () => <>This is mock VideoPlayer</>;
  mockVideoPlayer.displayName = `MockVideoPlayer`;
  return {
    __esModule: true,
    default: () => {
      return mockVideoPlayer();
    }
  };
});

describe(`Test HOC 'withVideoPlayer`, () => {
  it(`Base component should be correct rendering when use with HOC`, () => {
    const BaseComponent = () => <h1>withVideoPlayer</h1>;
    const BaseComponentWrapped = withVideoPlayer(BaseComponent);
    render(<BaseComponentWrapped />);
    expect(screen.getByText(/withVideoPlayer/i)).toBeInTheDocument();
  });
});
