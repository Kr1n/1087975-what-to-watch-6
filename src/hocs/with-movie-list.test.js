import React from 'react';
import {render, screen} from '@testing-library/react';
import withMovieList from './with-movie-list';

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

describe(`Test HOC 'withMovieList`, () => {
  it(`Base component should be correct rendering when use with HOC`, () => {
    const BaseComponent = () => <h1>withMovieList</h1>;
    const BaseComponentWrapped = withMovieList(BaseComponent);
    render(<BaseComponentWrapped />);
    expect(screen.getByText(/withMovieList/i)).toBeInTheDocument();
  });
});
