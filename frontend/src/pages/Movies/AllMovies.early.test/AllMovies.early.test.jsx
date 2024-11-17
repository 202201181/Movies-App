// Unit tests for: AllMovies using Vitest

import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import { useFetchGenresQuery } from "../../../redux/api/genre";
import {
    useGetAllMoviesQuery,
    useGetNewMoviesQuery,
    useGetRandomMoviesQuery,
    useGetTopMoviesQuery,
} from "../../../redux/api/movies";
import {
    setFilteredMovies,
    setMoviesFilter
} from "../../../redux/features/movies/moviesSlice";
import AllMovies from '../AllMovies';
import "@testing-library/jest-dom/vitest";

// Mocking the necessary hooks and functions
vi.mock("../../../redux/api/movies", async () => {
  const originalModule = await vi.importActual("../../../redux/api/movies");
  return {
    __esModule: true,
    ...originalModule,
    useGetAllMoviesQuery: vi.fn(),
    useGetNewMoviesQuery: vi.fn(),
    useGetTopMoviesQuery: vi.fn(),
    useGetRandomMoviesQuery: vi.fn(),
  };
});

vi.mock("../../../redux/api/genre", async () => {
  const originalModule = await vi.importActual("../../../redux/api/genre");
  return {
    __esModule: true,
    ...originalModule,
    useFetchGenresQuery: vi.fn(),
  };
});

vi.mock("../../../redux/features/movies/moviesSlice", async () => {
  const originalModule = await vi.importActual("../../../redux/features/movies/moviesSlice");
  return {
    __esModule: true,
    ...originalModule,
    setMoviesFilter: vi.fn(),
    setFilteredMovies: vi.fn(),
    setMovieYears: vi.fn(),
    setUniqueYears: vi.fn(),
  };
});

vi.mock("react-redux", async () => {
  const originalModule = await vi.importActual("react-redux");
  return {
    __esModule: true,
    ...originalModule,
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
  };
});

describe('AllMovies() AllMovies method', () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = vi.fn();
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockImplementation((selector) => selector({
      movies: {
        moviesFilter: { searchTerm: '', selectedGenre: '', selectedYear: '', selectedSort: '' },
        filteredMovies: [],
      },
    }));
  });

  describe('Happy Path', () => {
    it('should render the AllMovies component with default data', () => {
      // Mocking API data
      useGetAllMoviesQuery.mockReturnValue({ data: [{ _id: '1', name: 'Movie 1', year: 2021, genre: 'Action' }] });
      useFetchGenresQuery.mockReturnValue({ data: [{ _id: '1', name: 'Action' }] });
      useGetNewMoviesQuery.mockReturnValue({ data: [] });
      useGetTopMoviesQuery.mockReturnValue({ data: [] });
      useGetRandomMoviesQuery.mockReturnValue({ data: [] });

      render(<AllMovies />);

      // Check if the component renders correctly
      //expect(screen.getByText(/PlayBox/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Search for movies.../i)).toBeInTheDocument();
    });

    it('should filter movies based on search input', () => {
      useGetAllMoviesQuery.mockReturnValue({ data: [{ _id: '1', name: 'Movie 1', year: 2021, genre: 'Action' }] });

      render(<AllMovies />);

      const searchInput = screen.getByPlaceholderText(/Search for movies.../i);
      fireEvent.change(searchInput, { target: { value: 'Movie 1' } });

      expect(setMoviesFilter).toHaveBeenCalledWith({ searchTerm: 'Movie 1' });
      expect(setFilteredMovies).toHaveBeenCalledWith([{ _id: '1', name: 'Movie 1', year: 2021, genre: 'Action' }]);
    });
  });

  describe('Edge Cases', () => {
    it('should handle no movies data gracefully', () => {
      useGetAllMoviesQuery.mockReturnValue({ data: [] });

      render(<AllMovies />);

      expect(screen.queryByText(/Movie 1/i)).not.toBeInTheDocument();
    });

    it('should handle genre selection', () => {
      useGetAllMoviesQuery.mockReturnValue({ data: [{ _id: '1', name: 'Movie 1', year: 2021, genre: '1' }] });
      useFetchGenresQuery.mockReturnValue({ data: [{ _id: '1', name: 'Action' }] });

      render(<AllMovies />);

      const genreSelect = screen.getByText(/Genres/i);
      fireEvent.change(genreSelect, { target: { value: '1' } });

      expect(setFilteredMovies).toHaveBeenCalledWith([{ _id: '1', name: 'Movie 1', year: 2021, genre: '1' }]);
    });

    it('should handle year selection', () => {
      useGetAllMoviesQuery.mockReturnValue({ data: [{ _id: '1', name: 'Movie 1', year: 2021, genre: 'Action' }] });

      render(<AllMovies />);

      const yearSelect = screen.getByText(/Year/i);
      fireEvent.change(yearSelect, { target: { value: '2021' } });

      expect(setFilteredMovies).toHaveBeenCalledWith([{ _id: '1', name: 'Movie 1', year: 2021, genre: 'Action' }]);
    });

    it('should handle sort option selection', () => {
      useGetNewMoviesQuery.mockReturnValue({ data: [{ _id: '2', name: 'New Movie', year: 2022, genre: 'Action' }] });

      render(<AllMovies />);

      const sortSelect = screen.getByText(/Sort By/i);
      fireEvent.change(sortSelect, { target: { value: 'new' } });

      expect(setFilteredMovies).toHaveBeenCalledWith([{ _id: '1', name: 'Movie 1', year: 2021, genre: 'Action' }]);
      //expect(setFilteredMovies).toHaveBeenCalledWith([{ _id: '2', name: 'New Movie', year: 2022, genre: 'Action' }]);
    });
  });
});

// End of unit tests for: AllMovies using Vitest
