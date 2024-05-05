import * as model from "./model.js";
import ResultsView from "./ResultsView.js";
import SearchView from "./SearchView.js";
import PaginationView from "./PaginationView.js";
import GenresView from "./GenresView.js";
import AnimationNavbar from "./AnimationNavbar.js";

const controlFirstResults = async () => {
  try {
    //render spinner
    ResultsView.renderSpinner();

    //fetching popular movies
    await model.loadMovies((page = 1));

    //fetching all genres
    await model.loadGenres();

    //render results
    ResultsView.render(model.state.movieResults);

    //render pagination
    PaginationView.render(model.state.movieResults);
  } catch (err) {
    ResultsView.renderErrorMessage(err);
  }
};

const controlSearchResults = async (query) => {
  try {
    //render spinner
    ResultsView.renderSpinner();

    //fetching search results by query
    await model.loadSearchResults(query, 1);

    //re-rendering movies
    ResultsView.render(model.state.movieResults);
  } catch (err) {
    ResultsView.renderErrorMessage();
  }
};

const controlPagination = async (goToPage) => {
  //depends on movieSource it calls fetch functions for certain type of movies
  if (model.state.movieResults.movieSource === "popular") {
    await model.loadMovies(goToPage);
  }

  if (model.state.movieResults.movieSource === "search") {
    const query = model.state.movieResults.query;
    await model.loadSearchResults(query, goToPage);
  }

  if (model.state.movieResults.movieSource === "genre") {
    const genreId = model.state.movieResults.genreId;
    await model.getMoviesByGenre(genreId, goToPage);
  }

  //render results
  ResultsView.render(model.state.movieResults);

  //render pagination
  PaginationView.render(model.state.movieResults);
};

const controlGenres = () => {
  //set Timeout because of waiting for fetch data which starts on load page
  setTimeout(() => {
    //render genres
    GenresView.render(model.state.movieResults.genres);
  }, 600);
};

const controlMoviesByGenres = async (genreId) => {
  //render spinner
  ResultsView.renderSpinner();

  //render movies by genre
  await model.getMoviesByGenre(genreId, 1);

  //automatically closeing navbar after click on genre
  AnimationNavbar._closeNavbarAnimation(GenresView._openNavBtn);
  //render results
  ResultsView.render(model.state.movieResults);
  //render pagination
  PaginationView.render(model.state.movieResults);
};

const init = () => {
  ResultsView.addHandlerRender(controlFirstResults);
  SearchView.addHandlerSearchResults(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  GenresView.addHandlerLoadGenres(controlGenres);
  GenresView.addHandlerLoadMoviesByGenre(controlMoviesByGenres);
};
init();
