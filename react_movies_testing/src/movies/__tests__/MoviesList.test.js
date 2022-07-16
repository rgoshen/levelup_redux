import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import MoviesList from '../MoviesList';

global.fetch = require('jest-fetch-mock');

afterEach(() => {
  cleanup;
  console.error.mockClear(); // reset after each test
});

console.error = jest.fn();

const movies = {
  success: true,
  results: [
    {
      id: 'hi',
      title: 'some movie title',
      poster_path: 'somepic.jpg',
    },
    {
      id: 'hiz',
      title: 'something movie title',
      poster_path: 'somepic.jpg',
    },
    {
      id: 'him',
      title: 'sometime movie title',
      poster_path: 'somepic.jpg',
    },
    {
      id: 'hizse',
      title: 'somewhere movie title',
      poster_path: 'somepic.jpg',
    },
    {
      id: 'hiewr',
      title: 'some other movie title',
      poster_path: 'somepic.jpg',
    },
  ],
};

const movie = movies.results[0];

test('<MoviesList />', async () => {
  fetch.mockResponseOnce(JSON.stringify(movies));

  const { debug, getByTestId, queryByTestId, getAllByTestId } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>
  );

  expect(getByTestId('loading')).toBeTruthy(); // test loading state

  await waitForElement(() => getByTestId('movie-link'));

  expect(queryByTestId('loading')).toBeFalsy(); // test loading state
  expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`); // test for nested component
  expect(getAllByTestId('movie-link').length).toBe(movies.results.length); // tests to make sure it will render the same amount we expect is inputted
});

test('<MoviesList /> api fail', async () => {
  movies.success = false;
  fetch.mockResponseOnce(JSON.stringify(movies));

  const { getByTestId } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>
  );

  expect(getByTestId('loading')).toBeTruthy(); // test loading state
});
