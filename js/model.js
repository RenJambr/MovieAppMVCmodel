import { fetchData } from "./helpers.js";
import { async } from "regenerator-runtime";
import {
  RES_PER_PAGE,
  API_URL,
  GENRE_URL,
  SEARCH_URL,
  MOVIES_BY_GENRE_URL,
} from "./config.js";

export const state = {
  movieResults: {
    query: "",
    movieSource: "",
    results: [],
    page: 1,
    total_pages: 1,
    resultsPerPage: RES_PER_PAGE,
    genres: [],
    genreId: 1,
  },
};

export const loadMovies = async (page) => {
  try {
    state.movieResults.page = page;
    const data = await fetchData(`${API_URL}&page=${state.movieResults.page}`);

    state.movieResults.results = data.results;
    state.movieResults.page = data.page;
    state.movieResults.total_pages = data.total_pages;
    state.movieResults.movieSource = "popular";
  } catch (err) {
    throw err;
  }
};

export const loadGenres = async () => {
  try {
    const data = await fetchData(`${GENRE_URL}`);

    state.movieResults.genres = data.genres;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async (query, page) => {
  try {
    state.movieResults.page = page;
    state.movieResults.query = query;

    const data = await fetchData(
      `${SEARCH_URL}${query}"&page=${state.movieResults.page}`
    );

    state.movieResults.results = data.results;
    state.movieResults.page = data.page;
    state.movieResults.total_pages = data.total_pages;
    state.movieResults.movieSource = "search";
  } catch (err) {
    throw err;
  }
};

export const getMoviesByGenre = async (genreId, page) => {
  try {
    state.movieResults.page = page;

    const data = await fetchData(
      `${MOVIES_BY_GENRE_URL}${genreId}&page=${state.movieResults.page}`
    );

    state.movieResults.results = data.results;
    state.movieResults.page = data.page;
    state.movieResults.total_pages = data.total_pages;
    state.movieResults.movieSource = "genre";
    state.movieResults.genreId = genreId;
  } catch (err) {
    throw err;
  }
};
