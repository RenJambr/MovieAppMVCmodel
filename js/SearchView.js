import View from "./View.js";

class SearchView extends View {
  _parentElement = document.querySelector("#form");
  _errorMessage = "There's no results for your query! Please try again!";
  _genreName = document.querySelector(".genre");

  addHandlerSearchResults(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();

      const query = this._parentElement.querySelector("#search").value;
      this._parentElement.querySelector("#search").value = "";

      if (!query) return;

      this._genreName.innerText = "";
      handler(query);
    });
  }
}

export default new SearchView();
