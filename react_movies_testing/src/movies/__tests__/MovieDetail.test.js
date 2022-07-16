import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import MovieDetail from '../MovieDetail';

global.fetch = require('jest-fetch-mock');

afterEach(() => {
  cleanup;
  console.error.mockClear(); // reset after each test
});

const match = {
  params: {
    id: 'movieid',
  },
};

console.error = jest.fn();

// TODO: add rest of movie detail and add assertions for them
const movie = {
  id: 'hi',
  title: 'some movie title',
};

test('<MovieDetail />', async () => {
  fetch.mockResponseOnce(JSON.stringify(movie));

  const { debug, getByTestId } = render(<MovieDetail match={match} />);
  await waitForElement(() => getByTestId('movie-title'));

  expect(getByTestId('movie-title').textContent).toBe(movie.title);
});
