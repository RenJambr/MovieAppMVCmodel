import View from "./View.js";
import AnimationNavbar from "./AnimationNavbar.js";

class GenresView extends View {
  _data;
  _parentElement = document.querySelector(".menu");
  _openNavBtn = document.querySelector(".open-nav");
  _closeNavBtn = document.querySelector(".close-nav");
  _genreName = document.querySelector(".genre");

  constructor() {
    super();
    this.addHandlerOpenNav();
    this.addHandlerCloseNav();
  }

  addHandlerOpenNav() {
    this._openNavBtn.addEventListener("click", (e) => {
      e.preventDefault();

      AnimationNavbar._openNavbarAnimation(this._openNavBtn);
    });
  }

  addHandlerCloseNav() {
    this._closeNavBtn.addEventListener("click", (e) => {
      e.preventDefault();

      AnimationNavbar._closeNavbarAnimation(this._openNavBtn);
    });
  }

  addHandlerLoadGenres(handler) {
    window.addEventListener("load", (e) => {
      e.preventDefault();

      handler();
    });
  }

  //add event listener for each genre in menu, there is a timeout of 2s because of waiting to build li element for each genre
  addHandlerLoadMoviesByGenre(handler) {
    setTimeout(() => {
      this._parentElement.querySelectorAll("li").forEach((genre) => {
        genre.addEventListener("click", (e) => {
          e.preventDefault();
          const genreId = genre.getAttribute("data-id");
          this._genreName.innerText = genre.innerText;
          window.scrollTo({ top: 0, behavior: "smooth" });

          handler(genreId);
        });
      });
    }, 2000);
  }

  generateMarkup() {
    return this._data
      .map((genre) => `<li data-id = "${genre.id}">${genre.name}</li>`)
      .join("");
  }
}

export default new GenresView();
