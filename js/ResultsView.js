import View from "./View.js";
import { IMG_PATH } from "./config";

class ResultsView extends View {
  _data;
  _parentElement = document.querySelector(".movies");

  addHandlerRender(handler) {
    window.addEventListener("load", (e) => {
      e.preventDefault();
      handler();
    });
  }

  generateMarkup() {
    return this._data.results
      .map(
        (movie) => `
    <div class = "movie">
        <img src = "${IMG_PATH + movie.poster_path}" alt = "" id = "movie-img">
        <div class = "movie-info">
            <div>
                <h3 id = "movie-title">${movie.original_title}</h3>
                <span class = "movie-genre">${this._generateMarkupGenre(
                  movie.genre_ids[0]
                )}</span>
            </div>
            <span class = "${
              movie.vote_average >= 8
                ? "green"
                : movie.vote_average >= 5
                ? "orange"
                : "red"
            }" id = "grade">${parseFloat(movie.vote_average).toFixed(1)}</span>
        </div>
        <div class = "overview" id = "movie-overview">
            <h3>Overview</h3>
            ${movie.overview}
        </div>                
    </div>
    `
      )
      .join("");
  }

  _generateMarkupGenre(genreId) {
    return this._data.genres
      .map((genre) => (genreId === genre.id ? genre.name : ""))
      .join("");
  }
}
export default new ResultsView();
